const blogsRouter = require('express').Router();
const middleware = require('../utils/middleware');

const Blog = require('../models/blog');
const User = require('../models/user');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const body = request.body;

  const user = await User.findById(request.user.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const blog = await Blog.findById(request.params.id);

    if (blog.user.toString() !== request.user.id) {
      return response
        .status(401)
        .json({ error: 'cannot delete a blog unrelated to user' });
    }

    await blog.deleteOne();

    response.status(204).end();
  }
);

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const { title, author, url, likes, user } = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    { title, author, url, likes, user },
    { new: true, runValidators: true }
  );
  response.json(updatedBlog);
});

module.exports = blogsRouter;
