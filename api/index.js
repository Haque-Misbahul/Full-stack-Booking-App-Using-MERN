const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require("mongoose");
require('dotenv').config();
const User = require('./models/User.js'); 
const bcrypt = require('bcryptjs');



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

app.post('/register',(req,res) => {
    const {name, email, password} = req.body;
    User.create({
        name,
        email,
        password,
    });

    res.json({name, email, password})
});
//Swn2zcfzPkYuUq5Z
app.listen(4000);