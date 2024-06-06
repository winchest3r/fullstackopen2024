const blogsRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

const getTokenFrom = (request) => {
    const auth = request.get('authorization');
    if (auth && auth.startsWith('Bearer ')) {
        return auth.replace('Bearer ', '');
    }
    return null;
};

const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({}).populate('user', {username: 1, name: 1 });
    response.json(blogs);
});

blogsRouter.post('/', async (request, response) => {
    const body = request.body;

    const decodedToken = jwt.verify(getTokenFrom(request), config.SECRET);
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token is missing or invalid' });
    }
    const user = await User.findById(decodedToken.id);

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    });

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
    const { title, author, url, likes } = request.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,
        { title, author, url, likes },
        { new: true, runValidators: true }
    );
    response.json(updatedBlog);
});

module.exports = blogsRouter;