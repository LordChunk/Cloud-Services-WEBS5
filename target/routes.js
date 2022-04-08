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

const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();

// for parsing multipart/form-data
router.use(upload.array()); 
router.use(express.static('public'));

//Create a target
router.post('/',upload.fields([
    { name: 'img', maxCount: 1 },
]), (req, res) => {
    console.log('Registering target...');

    const body = req.body;

    console.log(body);

    const target = new Target({
        // Generate UID
        uid: mongoose.Types.ObjectId(),
        name: body.name,
        desc: body.desc,
        img: body.img
    });

    target.save()
        .then(target => {
            //todo Fix rabbitmq
            //publisher.publishTarget(target);
            res.status(201).json(target);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

//Get all targets
router.get('/', async (req, res) => {
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