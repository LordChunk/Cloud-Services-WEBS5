const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const blogRoute = require('./routes.js');
const cors = require('cors');

app.use(cors())
app.use(express.json());
app.use('/blog',blogRoute)


app.listen(port, () => {
    console.log('Gateway is up on port ' + port)
})