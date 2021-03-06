const express = require('express');
const router = express.Router();
const User = require('../models/User');


//Add a user route = /
const addUser =  async (req, res) => {
    console.log(req.query);
    const user = new User({
        email: req.query.email,
        password: req.query.password,
        username : "",
        first_name : "",
        last_name : "",
        location : "",
        phoneNumber : "",
        bids_won : [],
        bids_placed : []
    });

    try {
        const newUser = await user.save();
        res.status(200).send(newUser);
    } catch (err){
        res.status(400).send(err);
    }
};


//Get a specific user router.get('/:id', 
const getUser = async (req, res) => {
    console.log(req);
    try {
        const user = await User.findOne({email: req.query.email});
        if (!user)
            return res.status(400).send('No user found');
        res.status(200).send(user);
    } catch(err){
        res.json("No user found");
    }
};

//Delete a specific user router.delete('/:id',
const deleteUser = async (req, res) => {
    try{
        const userDeleted = await User.deleteOne({email:req.query.email}); //or maybe I should try remove instead of deleteOne
        res.status(200).json(userDeleted);
    } catch(err){
        res.json({message: err})
    }
};

//Update a specific user router.patch('/:id',
 const updateUser = async (req, res) => {
    try{
        const updatedUser = "";
        //WARNING : add parameters that were updated
        if(req.query.won === "true") {
            console.log("user bid updated")
             updateUser = await User.updateOne(
                {email: req.query.email}, 
                {$push: {bids_won:req.query.bids_won}});    
        }
        else if(req.query.placed === "true") {
            console.log("user bid_placed updated")

            updateUser = await User.updateOne(
                {email: req.query.email}, 
                {$push: {bids_placed:req.query.bids}});
        }
        else {
            updatedUser = await User.updateOne(
                {email: req.query.email}, 
                {$set: req.query});
        }
        res.json(updatedUser);
    } catch (err) {
        res.json({message: err});
    }
};

module.exports = {getUser,deleteUser,addUser,updateUser};