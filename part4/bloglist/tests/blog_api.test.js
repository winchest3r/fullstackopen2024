const { test, beforeEach, after } = require('node:test');
const assert = require('node:assert');
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);

const helper = require('./test_helper');

const Blog = require('../models/blog');

beforeEach(async () => {
    await Blog.deleteMany({});

    await Blog.insertMany(helper.initialBlogs);
});

test('correct amount of blog posts in json format', async () => {
    const blogs = await helper.getBlogsInDB();

    assert.strictEqual(blogs.length, helper.initialBlogs.length);
});

test('right id naming', async () => {
    const blogs = await helper.getBlogsInDB();
    assert(blogs.every(b => Boolean(b.id)));
});

test('post a valid blog to database', async () => {
    const blogsAtStart = await helper.getBlogsInDB();

    const newBlog = {
        title: 'What is a void operator?',
        author: 'loverajoel',
        url: 'https://www.jstips.co/en/javascript/what-is-a-void-operator/',
        likes: 1,
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.getBlogsInDB();
    assert.strictEqual(blogsAtStart.length, blogsAtEnd.length - 1);
    assert(helper.findBlog(blogsAtEnd, newBlog));
});

test('insert likes in data without them', async () => {
    const newBlog = {
        title: 'Title without likes',
        author: 'evgenii',
        url: 'http://example.com/title-without-likes'
    };

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/);
    
    const blogsAtEnd = await helper.getBlogsInDB();
    const newBlogWithLikes = {
        ...newBlog,
        likes: 0,
    };
    assert(helper.findBlog(blogsAtEnd, newBlogWithLikes));
});

test('post an invalid data', async () => {
    await api
        .post('/api/blogs')
        .send({ title: 'data without url' })
        .expect(400)
        .expect('Content-Type', /application\/json/);
    
    await api
        .post('/api/blogs')
        .send({ url: 'http://data-without-title.com'})
        .expect(400)
        .expect('Content-Type', /application\/json/);
});

after(async () => {
    mongoose.connection.close();
});