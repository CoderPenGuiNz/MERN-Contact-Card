const express = require("express");
//const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const UserModel = require('./models/Users');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
//app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb+srv://penguin:panda@cluster0.adhvd.mongodb.net/MERNPROJECT")

app.get("/getUsers",(req,res) => {
    UserModel.find({},(err,result) => {
        if(err){
            res.json(err)
        }else{
            res.json(result)
        }
    });
});

app.post("/createUser", async (req,res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();

    res.json(user);
})

app.listen(3001, () =>{
    console.log("Server connected!")
})