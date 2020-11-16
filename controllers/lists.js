const User = require('../models').users;
const Food = require('../models').food;
const GroceryList = require('../models').grocerylist;
const GroceryListsFood = require('../models').grocerylistsfood;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid,authToken);

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

const createList = (req, res) => {
    GroceryList.create(req.body)
    .then(newList => {
        res.redirect(`/lists/${req.body.user_id}`);
    })
}

const deleteList = (req,res) => {
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
    let newEntry = {
        list_id: req.body.list_id,
        food_id: req.body.food_id
    }
    GroceryListsFood.create(newEntry)
    .then(newFoodEntry => {
        res.redirect(`/lists/${req.body.user_id}`);
    })
}
const removeFood = (req, res) => {
    GroceryListsFood.destroy({
        where: {
            food_id: req.body.food_id,
            list_id: req.body.list_id
        }
    })
    .then(()=> {
        GroceryList.findByPk(req.body.list_id)
        .then(foundList => {
            res.redirect(`/lists/${foundList.user_id}`);
        })
    })
}

const sendListText = (req,res) => {
    client.messages
    .create({
       body: req.body.message,
       from: '+19036239049',
       to: req.body.phoneNumber
     })
    .then(message => {
        console.log(message.sid);
        res.send("Success");
    })
    .catch(err => {
        console.log(err);
    });
}

module.exports = {
    getLists,
    createList,
    addFoodToList,
    deleteList,
    removeFood,
    sendListText
}