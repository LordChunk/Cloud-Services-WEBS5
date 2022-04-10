const {
  RabbitMQ,
  Exchanges,
} = require('cloud-shared');


function createdTarget(target) {
  RabbitMQ().connect(async (connection) => {
    const channel = await connection.createChannel();

    channel.publish(Exchanges.Target, '', Buffer.from(target));
  });
}

module.exports = createdTarget;