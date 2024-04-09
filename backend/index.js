import express from "express";

import mongoose from "mongoose";

import user from "./models/userModel.js";

import cors from "cors";

import { PORT , mongoDBURL } from "./config.js";

const app = express();

app.use(express.json());

app.use(cors());

app.get("/" , (req , res) => {
    res.send("Hello World");
})

app.post("/register" , async (req , res) => {

    try {

        const {username , email , password} = req.body;

        if(!username || !email || !password){
            return res.status(400).send("All fields are required");
        }

        let exist = await user.findOne({email});

        if(exist){
            return res.status(400).send("User already exist");
        }

        const newUser = new user({  username , email , password});

        await newUser.save();

        res.status(200).send("registraion successfull");
    } catch (error) {

        console.log(error);
    }



})
app.post("/" , async (req , res) => {

    try {
        const {email , password} = req.body;
        let exist = await user.findOne({email});
        if (!exist){
            return res.status(400).send("User does not exist");
        }

        if(exist.password !== password){
            return res.status(400).send("Incorrect password");
        }
        return res.status(200).send("Login successfull");
    
    } catch (error) {

        console.log(error);
    }
})

app.post("/logout" , (req , res) => {

    res.status(200).send("Logout successfull");
})


mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT ,()=>{
            console.log(`Server is running on port ${PORT}`);
        })
    })
    .catch((error)=>{
        console.log(error);
    })



