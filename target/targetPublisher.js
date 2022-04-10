const rabbitmq = require('cloud-shared/config/rabbitmq');

function createdTarget(uid) {
  rabbitmq.connect(async (connection) => {
    const channel = await connection.createChannel();

    const exchange = 'target';

    channel.assertExchange(exchange, 'fanout', {
      durable: true
    });

    channel.publish(exchange, '', Buffer.from(uid));
  });
}

module.exports = createdTarget;