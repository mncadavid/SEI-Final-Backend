const Food = require('../models').food;
const Exposure = require('../models').exposure;

//Gets a lists of all of the exposures that the child
//has had with the given food and orders them by date
const getFoodData = (req, res) => {
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
//Adds a new exposure for the food with the given child.
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
    getFoodData,
    addExposure
}