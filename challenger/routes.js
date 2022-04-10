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

router.use(express.urlencoded({ extended: true }));
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


//Create a target
router.post('/', upload.single('img'), (req, res) => {
    console.log('Registering challenger...');

    const body = req.body;

    const img = req.file.buffer.toString('base64');

    // check if body.targetid exists is database
    const target = Target.findOne({
        _id: body.targetid
    });

    if(target === null) {
        res.status(400).json({
            error: "Target does not exist"
        });
    }

    const challenger = new Challenger({
        //TODO fix userid
        creatorid: body.creatorid,
        targetid: body.targetid,
        img: img
    });

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
});

module.exports = router;