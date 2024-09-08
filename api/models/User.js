const mongoose = require("mongoose");
const {schema} = mongoose;


const UserSchema = new schema({
    name: String,
    email: {type: String, Unique: true},
    password: String,
});


const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel; 