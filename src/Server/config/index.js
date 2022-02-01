require('dotenv').config();

const {ENV, PORT} = process.env

module.exports = {
    env: ENV,
    port: PORT
}