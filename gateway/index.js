const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const authRoutes = require('./routes/auth');
const cors = require('cors');

app.use(cors())
app.use(express.json());
app.use('/auth',authRoutes)


app.listen(port, () => {
    console.log('Gateway is up on port ' + port)
})