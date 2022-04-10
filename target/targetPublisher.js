var amqp = require('amqplib/callback_api');

function createdTarget(uid) {
  amqp.connect(process.env.RABBIT_ENDPOINT, function (error0, connection) {
    if (error0) {
      console.log(error0);
      throw error0;
    }
    connection.createChannel(function (error1, channel) {
      if (error1) {
        console.log(error1);
        throw error1;
      }

      var exchange = 'target';

      channel.assertExchange(exchange, 'fanout', {
        durable: true
      });
      channel.publish(exchange, '', Buffer.from(uid));
      console.log(" [x] Sent %s", uid);
    });

    setTimeout(function () {
      connection.close();
    }, 500);
  });
}

module.exports = createdTarget;