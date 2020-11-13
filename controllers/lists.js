const User = require('../models').Users;
const Food = require('../models').Food;
const GroceryList = require('../models').GroceryList;

const getLists = (req,res) => {
    GroceryList.findAll({
        where: {
            userId: req.params.userId
        },
        attributes: ['id','name','notes'],
        include: [{
            model: Food,
            attributes: ['name','category']
        }]
    })
    .then(foundLists => {
        res.send(foundLists);
    })
}

const show = (req, res) => {
    User.findByPk(1, {
        include: [Children]
    })
    .then(user => {
        console.log(user);
        res.send(`User: ${user.name}. Child: ${user.Children[0].dataValues.name}`)
    })
}

const createList = (req, res) => {
    GroceryList.create(req.body)
    .then(newList => {
        res.redirect(`/lists/${req.body.userId}`);
    })
}

module.exports = {
    getLists,
    show,
    createList
}