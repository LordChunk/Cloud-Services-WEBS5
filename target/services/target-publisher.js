const {
  RabbitMQ,
  Exchanges,
} = require('cloud-shared');


function createdTarget(uid) {
  RabbitMQ().connect(async (connection) => {
    const channel = await connection.createChannel();

    channel.publish(Exchanges.Target, '', Buffer.from(uid));
  });
}

module.exports = createdTarget;