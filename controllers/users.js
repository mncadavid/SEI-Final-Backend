const child = require('../models/child');

const User = require('../models').Users;
const Children = require('../models').Child;

const index = (req, res) => {
    res.send('API is working properly');
};

// const show = (req, res) => {
//     User.findByPk(1, {
//         include: [Children]
//     })
//     .then(user => {
//         console.log(user);
//         res.send(`User: ${user.name}. Child: ${user.Children[0].dataValues.name}`)
//     })
// }

module.exports = {
    index
}