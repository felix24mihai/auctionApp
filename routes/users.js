const express = require('express');
const router = express.Router();
const User = require('../models/User');

//Get all the users
router.get('/', async (req, res) => {
    try{
        const users = await User.find();
        res.json(users);
    } catch{
        res.status(420).json({message: "This is Felix's error" + err})
    }
});


//Add a user
router.post('/', (req, res) => {
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    user.save()
    .then(data => {
        res.status(200).json(data);
    })
    .catch(err => {
        res.status(400).json(err);
    })
});

//Get a specific user
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(209).json(user);
    } catch(err){
        res.json({message: "There are some problems.. " + err});
    }
});

//Delete a specific user
router.delete('/:id', async (req, res) => {
    try{
        const userDeleted = await User.deleteOne({_id: req.params.id}); //or maybe I should try remove instead of deleteOne
        res.status(200).json(userDeleted);
    } catch(err){
        res.json({message: err})
    }
    
});

module.exports = router;