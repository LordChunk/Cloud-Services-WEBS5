const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');

const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const authService = require('./auth-service');

// Routes
const authRoutes = require('./routes/auth');

app.use(cors());
app.use(express.json());

// Setup Passport
const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

const strategy = new JwtStrategy(options, (jwt_payload, done) => {
    console.log('payload received', jwt_payload);
    jwt_payload.
    done(null, jwt_payload);
});

passport.use(strategy);
app.use(passport.initialize());

// Register routes
app.use('/auth',authRoutes)


app.listen(port, () => {
    console.log('Gateway is up on localhost:' + port)
})

module.exports = app;