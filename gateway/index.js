const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const shared = require('cloud-shared');
const Interceptor = require('./config/axios-jwt-interceptor');

const passport = require('passport');

// Generic Express setup
app.use(cors());
app.use(express.json());

// Passport setup
passport.use(shared.JwtStrategy.InternalStrategy);
app.use(passport.initialize());

// Setup prometheus
app.use(shared.PrometheusConfig);

// JWT header injection setup
const { default: axios } = require('axios');
axios.interceptors.request.use(Interceptor);

// Register imported routes
app.use('/auth', require('./routes/auth'));
app.use('/like', passport.authenticate('jwt', {session: false}), require('./routes/like'));
app.use('/target', passport.authenticate('jwt', { session: false }), require('./routes/target'));
app.use('/challenger', passport.authenticate('jwt', { session: false }), require('./routes/challenger'));

app.listen(port, () => {
    console.log('Gateway is up on http://localhost:' + port);
})

module.exports = app;