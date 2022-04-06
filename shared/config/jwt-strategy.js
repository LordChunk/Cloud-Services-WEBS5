const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const strategy = new JwtStrategy(options, (jwt_payload, done) => {
  console.log('payload received', jwt_payload);
  // jwt_payload
  done(null, jwt_payload);
});

module.exports = strategy;