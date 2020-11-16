require('dotenv').config();

const express = require('express');
const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

const routes = require('./routes');
const app = express();

const corsOptions = {
    // origin: ['http://localhost:3000'],
    origin: ['http://picky-preventer.surge.sh'],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

const verifyToken = (req,res,next) => {
    let token = req.headers['authorization'];

    if(token){
        token = token.substring(7)
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedUser) => {
        if(err || !decodedUser){
            if(err.name == "JsonWebTokenError"){
                return res.status(400).send(`Error: ${err}`);
            }
            return res.send(err);
        }
        req.user = decodedUser;
        next();
    });
}

app.use('/users', routes.users);
app.use('/lists', routes.lists);
app.use('/auth', routes.auth);
app.use('/auth/verify', verifyToken, routes.auth);
app.use('/browse', routes.browse);
app.use('/exposures', routes.exposures);

app.get('/', (req,res) => {
    res.send('Splash page')
})

app.listen(process.env.PORT, () => {
    console.log("listening");
});