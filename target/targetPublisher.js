#!/usr/bin/env node

var amqp = require('amqplib/callback_api');

function createdTarget(target) {
  amqp.connect(process.env.RABBIT_ENDPOINT, function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }

    var exchange = 'target';

    channel.assertExchange(exchange, 'fanout', {
      durable: true
    });
    channel.publish(exchange, '', Buffer.from(target));
    console.log(" [x] Sent %s", target);
  });

  setTimeout(function() {
    connection.close();
    process.exit(0);
  }, 500);
});
}