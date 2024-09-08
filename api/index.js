const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const User = require('./models/User.js'); 
const bcrypt = require('bcryptjs');
const bcryptSalt =  bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const jwtSecret = 'lkjsl78394kjslödkf9o893jlkjldsf098723o'; // just a random string



app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));
console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req,res) => {
    res.json('test ok');
})

app.post('/register', async (req,res) => {
    const {name, email, password} = req.body;
    try {
        const userDoc = await User.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt),
        });
    
        res.json({userDoc})
    } catch (e) {
        res.status(422).json(e);
    }
});

app.post('/login', async (req,res) =>{
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if (passOk) {
            jwt.sign({email:userDoc.email, id:userDoc._id}, jwtSecret, {}, (err, token) => {
            if (err) throw err;
            res.cookie('token', token).json(userDoc);
            });
        }else {
            res.status(422).json('pass not ok');
        }
    } else {
        res.json('Not found');
    }
});
 

//Swn2zcfzPkYuUq5Z
app.listen(4000);