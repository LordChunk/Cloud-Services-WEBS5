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

router.use(express.urlencoded({ extended: true }));
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

var fs = require('fs');

//Create a target
router.post('/', upload.single('img'), (req, res) => {
    console.log('Registering target...');

    const body = req.body;

    const img = req.file.buffer.toString('base64');

    const target = new Target({
        name: body.name,
        desc: body.desc,
        lat: body.lat,
        long: body.long,
        radius: body.radius,
        img: img
    });

    target.save()
        .then(target => {
            //todo Fix rabbitmq
            publisher(target._id);
            res.status(201).json(target);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
            console.log(err);
        });
});

//Get all targets
router.get('/', async (req, res) => {
    console.log("yes");
    try {
        const targets = await Target.find();
        res.send(targets);
    }catch (error) {
        res.status(500).send(error);
    }
});

// Get a target
router.get('/:id',(req,res)=>{
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