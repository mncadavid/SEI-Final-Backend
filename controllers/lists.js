const User = require('../models').users;
const Food = require('../models').food;
const GroceryList = require('../models').grocerylist;
const GroceryListsFood = require('../models').grocerylistsfood;

const getLists = (req,res) => {
    GroceryList.findAll({
        where: {
            user_id: req.params.user_id
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

// const show = (req, res) => {
//     User.findByPk(1, {
//         include: [Children]
//     })
//     .then(user => {
//         console.log(user);
//         res.send(`User: ${user.name}. Child: ${user.Children[0].dataValues.name}`)
//     })
// }

const createList = (req, res) => {
    GroceryList.create(req.body)
    .then(newList => {
        res.redirect(`/lists/${req.body.user_id}`);
    })
}

const deleteList = (req,res) => {
    console.log(req.body);
    GroceryList.destroy({
        where: {
            id: req.body.id
        }
    })
    .then(()=> {
        res.redirect(`/lists/${req.body.user_id}`)
    })
}

const addFoodToList = (req,res) => {
    GroceryListsFood.create(req.body)
    .then(newFoodEntry => {
        res.send(newFoodEntry);
    })
}

module.exports = {
    getLists,
    createList,
    addFoodToList,
    deleteList
}