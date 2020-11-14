const child = require('../models/child');

const User = require('../models').users;
const Children = require('../models').child;

const index = (req, res) => {
    res.send('API is working properly');
};


module.exports = {
    index
}