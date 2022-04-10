// Startup db connection
const mongoose = require('mongoose');
const shared = require('cloud-shared');
shared.Database(mongoose);

// Import express
const express = require('express');
const router = new express.Router();

// Import route specific dependencies
const Challenger = require("./models/challenger");
const Target = require("./models/target");

//Create a target
router.post('/',(req, res) => {
    console.log('Registering challenger...');

    // get the data from the request
    const body = req.body;
    
    //check if target exists
    const target = Target.findOne({
        _id: body.targetid
    });

    // if target doesnt exist return error
    if(target === null) {
        res.status(400).json({
            error: "Target does not exist"
        });
        return;
    }

    console.log("user = ", req.user);

    // create a new challenger
    const challenger = new Challenger({
        //TODO fix userid
        creatorid: req.user.uid,
        targetid: body.targetid,
        img: body.img
    });

    // save the challenger
    challenger.save()
        .then(challenger => {
            res.status(201).json(challenger);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
            console.log(err);
        });

    // 
});

module.exports = router;