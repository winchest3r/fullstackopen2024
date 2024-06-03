const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./utils/config');
const logger = require('./utils/logger');
const blogsRouter = require('./controllers/blogs');

const app = express();

app.use(cors());
app.use(express.static('dist'));
app.use(express.json());
app.use('/api/blogs', blogsRouter);


logger.info('Connecting to MongoDB');
mongoose.connect(config.MONGODB_URL).then(() => {
    logger.info('Connected to MongoDB');
}).catch(error => {
    logger.error(error.message);
});

module.exports = app;