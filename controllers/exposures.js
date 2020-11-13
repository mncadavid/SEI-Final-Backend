const Food = require('../models').food;
const Exposure = require('../models').exposure;
const Child = require('../models/').child;

const index = (req, res) => {
    Child.findByPk(3, {
        include: [
            {
                model: Exposure,
                attributes: ['food_id', 'date', 'reaction'],
                include: [{
                    model: Food,
                    attributes: ['name', 'category']
                }]
            }
        ],
        attributes: ['name', 'age']
    })
    .then(foundChild => {
        res.send(foundChild);
    })
};


const getFoodData = (req, res) => {
    console.log("======================")
    console.log(req.params.child_id)
    Exposure.findAll({
        where: {
            child_id: req.params.child_id,
            food_id: req.params.food_id
        },
        order: [
            ['date','DESC']
        ]
    })
    .then(foundExposures => {
        let response = {
            exposures: foundExposures
        };
        Food.findAll({
            where: {
                id: req.params.food_id
            }
        })
        .then(food => {
            response.food_id = req.params.food_id;
            response.food = food[0].dataValues.name;
            res.send(response);
        })
    })
};

const addExposure = (req,res) => {
    Exposure.create(req.body)
    .then(newExposure => {
        Food.findByPk(newExposure.dataValues.food_id)
        .then(food => {
            res.redirect(`/exposures/${food.id}/${newExposure.dataValues.child_id}`)
        })
    })
}

module.exports = {
    index,
    getFoodData,
    addExposure
}