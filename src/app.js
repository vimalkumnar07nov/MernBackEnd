require('dotenv').config()
const express = require('express');
const path = require('path');
const hbs = require('hbs');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');


const app = express();
const port = process.env.PORT || 3000;

require("./db/conn");
const Register = require("./models/registers");
const auth = require("./middleware/auth");


const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
// console.log(static_path);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.use(express.static(static_path));


// console.log(process.env.SECRET_KEY);

app.get("/", (req, res) => {
    res.render("index");
    // res.send("Hello Pitter parker");  
});
app.get("/secret",auth, (req, res) => {
    console.log(`cookies are : ${req.cookies.mernbackend}`);
    res.render("secret");
    // res.send("Hello Pitter parker");  
});
app.get("/logout", auth, async (req, res) => {
     try {
        
         console.log(`user:- ${req.user}`);

        //  single user logout code------
        //  req.user.tokens = req.user.tokens.filter((curEle) => {
        //      return curEle.token !== req.token;
        //  });
        //  all user logout in different devices-------
         
         req.user.tokens = [];


         res.clearCookie("mernbackend");
         console.log("log out successfully");
         await req.user.save();
         res.render("login");
         
     } catch (error) {
         res.status(500).send(error);
     }
 })

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async(req, res) => {
    try {
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;

        if (password === cpassword) {
            
            const registerUser = new Register({
                firstname: req.body.fname,
                lastname: req.body.lname,
                email: req.body.email,
                mobile: req.body.mobile,
                password: password,
                confirmpassword : cpassword,
            })
            // To Generate Token middleware---------call a function here and define it in registered schema-----
            // console.log(`the success part`);
            const token = await registerUser.generateAuthToken();
            // console.log(`the token generated: ${token}`);

            // set cookie--------
            // syntex : - res.cookie("name", value, { optional});

            res.cookie('mernbackend', token, {
                httpOnly: true,
                expires: new Date(Date.now() + 60000),
            });
            
            // to secure password before save (go to model register schema and write code)----
            const registered = await registerUser.save();
            console.log("the registered User's "+ registered);
            res.status(201).render("login");  
            
        } else {
            res.send("passwords are not matching")
        }

    } catch (error) {
        res.status(400).send(error);
        
    }
});

// log in route define
 
app.get("/login", (req, res) => {
    res.render("login");
});
// login check
app.post("/login", async (req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;
        // console.log(`email:${email} and password : ${password}`);

        const userEmail = await Register.findOne({ email: email });
        const isPassMatch = await bcrypt.compare(password, userEmail.password);

        const token = await userEmail.generateAuthToken();
        console.log(`Login token generated: ${token}`);
        
        // generate cookie on login time========-----
        res.cookie('mernbackend', token, {
            httpOnly: true,
            expires : new Date(Date.now() + 60000),
        });
        
        // generate cookie on login time code end----------

        if (isPassMatch) {
            res.status(201).render("index");
        } else {
            res.send(" Wrong password entered");
        }
  
    } catch (error) {
        res.status(404).send("invalid email id , plz re-try");
    }
});










app.listen(port , (req,res) => {
    console.log(`App is running on port no. ${port}`);
})