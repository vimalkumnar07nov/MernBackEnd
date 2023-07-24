const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    confirmpassword: {
        type: String,
        required: true,
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
});

// generate Tokens----code----- function defines here
userSchema.methods.generateAuthToken = async function () {
    try {
        // console.log(`User's id:- ${this._id}`);
        const token = jwt.sign({ _id: this._id.toString() }, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;

    } catch (error) {
        // res.send("the error par" + error);
        console.log("error to genrate Token :" + error);
    }
};

// function createToken() {
//     const token = jwt.sign({ _id: this._id }, process.env.JWT);
//     return token;
// }
// UserSchema.methods.createToken = createToken();
// generate Tokens-------end------


// password hash or secure before registration-------
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        // console.log(`current password is:- ${this.password}`);

        this.password = await bcrypt.hash(this.password, 10);

        // console.log(`secure password is:- ${this.password}`);
        this.confirmpassword = await bcrypt.hash(this.password, 10);
    }
    next();
});



const Register = new mongoose.model("Register", userSchema);
module.exports = Register;