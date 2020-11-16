const Food = require('../models').food;
const Exposure=require('../models').exposure;

const index = (req, res) => {
    Food.findAll()
    .then(food => {
        res.status(200).json(food);
    })
    .catch(err => {
        res.send(err);
    })
}

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