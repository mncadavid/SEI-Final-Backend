const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models').Users;
const Child = require('../models').Child;

const signup = (req,res) => {
    bcrypt.genSalt(10, (err, salt) => {
        if(err){
            return res.status(500).json(err);
        }

        bcrypt.hash(req.body.password, salt, (err, hashedPwd) => {
            if (err){
                return res.status(500).json(err);
            }
            req.body.password = hashedPwd;
            let child = {
                name: req.body.childName,
                age: req.body.childAge
            }
            Child.create(child)
            .then(newChild => {
                let user = {
                    username: req.body.username,
                    password: req.body.password,
                    name: req.body.name,
                    childId: newChild.id
                }
                User.create(user)
                .then(newUser => {
                    const token = jwt.sign(
                        {
                            username: newUser.username,
                            id: newUser.id
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "30 days"
                        }
                    )
                    newUser.dataValues.token = token;
                    delete newUser.dataValues.password;
                    data={
                        user: newUser,
                        child: newChild
                    }
                    res.send(data);
                })
                .catch(err => {
                    console.log(err)
                    if(err.name === 'SequelizeUniqueConstraintError'){
                        res.status(400).send(`Error: ${err.name}`)
                    }
                    else{
                        res.status(400).send(`Error: ${err}`);
                    }
                })
            })
            .catch(err => console.log(err))
        })
    })
}

const login = (req,res) => {
    User.findOne({
        where: {
            username: req.body.username
        },
        attributes: ['name','childId','id','username','password'],
        include: [
            {
                model: Child,
                attributes: ['name', 'age']
            }
        ]
    })
    .then(foundUser => {
        if(foundUser){
            bcrypt.compare(req.body.password, foundUser.password, (err,match) => {
                if(match){
                    const token = jwt.sign(
                        {
                            id: foundUser.id,
                            username: foundUser.username
                        },
                        process.env.JWT_SECRET,
                        {
                            expiresIn: "30 days"
                        }
                    )
                    foundUser.dataValues.token = token;
                    delete foundUser.dataValues.password;
                    res.send(foundUser);
                } else{
                    res.send(`Incorrect Password`)
                }
            })
        }
        else if(!foundUser){
            return res.send(`Incorrect Username`)
        }
    })
    .catch(err => {
        res.status(400).send(`Error: ${err}`);
    }
    )
}

const verifyUser = (req, res) => {
    User.findByPk(req.user.id, {
        attributes: ['id', 'username','name','childId']
    })
    .then(foundUser => {
        res.status(200).json(foundUser);
    })
    .catch(err => {
        res.status(500).send(`Error: ${err}`);
    })
}

module.exports = {
    signup,
    login,
    verifyUser
}