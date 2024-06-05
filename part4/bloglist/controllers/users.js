const usersRouter = require('express').Router();
const bcrypt = require('bcryptjs');

const User = require('../models/user');

usersRouter.get('/', async (request, response) => {
    const users = await User.find({});
    response.json(users);
});

usersRouter.post('/', async (request, response) => {
    const body = request.body;

    const passwordHash = await bcrypt.hash(body.password, 10);

    const newUser = new User({
        username: body.username,
        name: body.name || 'unknown',
        password: passwordHash
    });

    const result = await newUser.save();
    response.status(201).json(result);
});

module.exports = usersRouter;