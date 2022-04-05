const express      = require('express');
require('dotenv').config(); 
const app          = express();
const cors         = require("cors");
const bodyparser   = require("body-parser");
const port         = process.env.PORT || 3015;

async function startup(){ 
    try {
 
    }catch (error) {
        console.log ('err in publisher : ' +error);
    }
}

//Je kunt hier passport-jwt gebruiken om de jwt uit te lezen
//voor de api-key
//https://www.npmjs.com/package/passport-jwt
const passport     = require('passport');
const jwt          = require('jsonwebtoken');
const JwtStrategy  = require('passport-jwt').Strategy;
const ExtractJwt   = require('passport-jwt').ExtractJwt;

app.use(bodyparser.json());

//Een target aanmaken
app.post('/target',(req,res)=>{
    //check if the api-key is correct
    if(data.apiKey !== process.env.API_KEY){
        res.status(401).send('Unauthorized');
    }

    // get the data from the request
    const data = req.body;

    //check if the data is correct
    if(!data.email || !data.hash || !data.salt){
        res.status(400).send('Bad request');
    }

    //create a new target
    const target = new Target({
        name: data.name,
        desc: data.desc,
        img:
        {
            data: Buffer.from(data.img.data),
            contentType: data.img.contentType
        }
    });

    //save the target
    target.save((err)=>{
        if(err){
            res.status(500).send('Internal server error');
        }
        res.status(201).send('Target created');
    });

    //do a fanout to all the clients
    io.emit('target',target);

})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})