const User = require('../models').users;
const Food = require('../models').food;
const GroceryList = require('../models').grocerylist;
const GroceryListsFood = require('../models').grocerylistsfood;

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid,authToken);
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: process.env.NEXMO_API_KEY,
  apiSecret: process.env.NEXMO_API_SECRET,
});

//Gets all the lists for the given user
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
//Creates a new list for the given user
const createList = (req, res) => {
    GroceryList.create(req.body)
    .then(newList => {
        res.redirect(`/lists/${req.body.user_id}`);
    })
}
//Deletes the given list
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
//Adds a food to the given list. Returns an error if the food has already 
//been added to this list
const addFoodToList = (req,res) => {
    let newEntry = {
        list_id: req.body.list_id,
        food_id: req.body.food_id
    }
    GroceryListsFood.create(newEntry)
    .then(newFoodEntry => {
        res.redirect(`/lists/${req.body.user_id}`);
    })
    .catch(err => {
        if(err.name === 'SequelizeUniqueConstraintError'){
            res.send(`Error: Food already added to list`)
        }
        else{
            res.send(`Error: ${err}`);
        }
    })
}
//Removes a food from the given list.
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
//Sends the list as a text to the given phone number
const sendListText = (req,res) => {
    // This code was required for Twilio.  It does work but I
    // have left the code below which works for Nexmo instead.
    // I did want to keep this for reference.
    // client.messages
    // .create({
    //    body: req.body.message,
    //    from: '+19036239049',
    //    to: req.body.phoneNumber
    //  })
    // .then(message => {
    //     console.log(message.sid);
    //     res.send("Success");
    // })
    // .catch(err => {
    //     console.log(err);
    // });
    const from = '18632382512';
    const to = req.body.phoneNumber;
    const text = req.body.message;
    let resp = nexmo.message.sendSms(from,to,text,{type: 'unicode'}, (err,responseData) => {
        if(err){
            console.log(err);
        }
        else{
            if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    });
    console.log(resp);
}

module.exports = {
    getLists,
    createList,
    addFoodToList,
    deleteList,
    removeFood,
    sendListText
}
