const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const options = {
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

const InternalStrategy = new JwtStrategy(options, (jwt_payload, done) => {
  // Check if the apiKey is valid or return 401
  if (jwt_payload.apiKey === process.env.API_KEY) {
    return done(null, jwt_payload);
  } else {
    return done(null, false);
  }
});



module.exports =  {
  InternalStrategy,
  options
};