require('dotenv').config({ path: '.env.local' });

const MONGODB_URL = process.env.MONGODB_URL;

const PORT = process.env.PORT;

module.exports = {
    MONGODB_URL,
    PORT
};