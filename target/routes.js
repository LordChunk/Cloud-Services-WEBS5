// Startup db connection
const mongoose = require('mongoose');
const shared = require('cloud-shared');
shared.Database(mongoose);

// Import express
const express = require('express');
const router = new express.Router();

// Import route specific dependencies
const publisher = require("./targetPublisher");
const Target = require("./models/target");

//Create a target
router.post('/target', (req, res) => {
    console.log('Registering target...');	
    const body = req.body;
    const target = new Target({
        // Generate UID
        uid: mongoose.Types.ObjectId(),
        name: body.name,
        desc: body.desc,
        img: body.img
    });

    target.save()
        .then(target => {
            publisher.publishTarget(target);
            res.status(201).json(target);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

//Get all targets
router.get('/targets', async (req, res) => {
    try {
        const targets = await Target.find();
        res.send(targets);
    }catch (error) {
        res.status(500).send(error);
    }
});

// Get a target
router.get('/target/:id',(req,res)=>{
    //get the id from the request
    const id = req.params.id;

    //get the target
    Target.findById(id,(err,target)=>{
        if(err){
            res.status(500).send('Internal server error');
        }
        res.status(200).send(target);
    });
})

module.exports = router;