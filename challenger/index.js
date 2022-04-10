const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const passport = require('passport');
const shared = require('cloud-shared');

// Generic Express setup
app.use(cors());
app.use(express.json());

// Passport setup
passport.use(shared.JwtStrategy.InternalStrategy);
app.use(passport.initialize());

// Register RabbitMQ queues and exchanges
shared.RabbitMQ().connect(async (connection) => {
  const channel = await connection.createChannel();
  
  channel.assertExchange(shared.Exchanges.Target, 'fanout', {
    durable: true
  });
});

// Setup prometheus
app.use(shared.PrometheusConfig);

// Register routes
// app.use('/', passport.authenticate('jwt', {session: false}), require('./routes'));
app.use('/', require('./routes'));


app.listen(port,  () => {
  console.log('Started service at: ' + new Date().toLocaleString())
  console.log('Target service is up on http://localhost:' + port)
});

module.exports = app;