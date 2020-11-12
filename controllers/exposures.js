const Food = require('../models').Food;
const Exposure = require('../models').Exposure;
const Child = require('../models/').Child;

const index = (req, res) => {
    Child.findByPk(3, {
        include: [
            {
                model: Exposure,
                attributes: ['foodId', 'date', 'reaction'],
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
    console.log(req.params.childId)
    Exposure.findAll({
        where: {
            childId: req.params.childId,
            foodId: req.params.foodId
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
                id: req.params.foodId
            }
        })
        .then(food => {
            response.foodId = req.params.foodId;
            response.food = food[0].dataValues.name;
            res.send(response);
        })
    })
};

const addExposure = (req,res) => {
    Exposure.create(req.body)
    .then(newExposure => {
        Food.findByPk(newExposure.dataValues.foodId)
        .then(food => {
            res.redirect(`/exposures/${food.id}/${newExposure.dataValues.childId}`)
        })
    })
}

module.exports = {
    index,
    getFoodData,
    addExposure
}