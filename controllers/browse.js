const Food = require('../models').food;
const Exposure=require('../models').exposure;

//Returns a list of all of the foods in the database
const index = (req, res) => {
    Food.findAll()
    .then(food => {
        res.status(200).json(food);
    })
    .catch(err => {
        res.send(err);
    })
}
//Creates a new food
const addFood = (req, res) => {
    Food.create(req.body)
    .then(newFood => {
        Food.findAll()
        .then(food => {
            res.status(200).json(food);
        })
    })
    .catch(err => {
        if(err.name === 'SequelizeUniqueConstraintError'){
            res.send(`Error: Food already exists`)
        }
        else{
            res.send(`Error: ${err}`);
        }
    })
}
//Gets the most recent exposure for the given food and child
const getLastExposure = (req,res) => {
    Exposure.findOne({
        where: {
            child_id: req.params.child_id,
            food_id: req.params.food_id
        },
        order: [
            ['date', 'DESC']
        ]
    })
    .then(exposure => {
        res.send(exposure);
    })
}


module.exports = {
    index,
    addFood,
    getLastExposure
}