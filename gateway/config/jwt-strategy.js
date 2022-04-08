const JwtStrategy = require('passport-jwt').Strategy;
const options = require('cloud-shared').JwtStrategy.options;
const UserFetcher = require('../services/user-fetcher');

const GatewayStrategy = new JwtStrategy(options, (jwt_payload, done) => {
  // Check if JWT contains user uid
  if (jwt_payload.uid !== undefined) {
    return done(null, jwt_payload);
  }

  return done(null, false);
});

module.exports = GatewayStrategy;