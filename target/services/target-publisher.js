const {
  RabbitMQ,
  Exchanges,
} = require('cloud-shared');


function createdTarget(target) {
  RabbitMQ().connect(async (connection) => {
    const channel = await connection.createChannel();

    // Publish the target to the target-created exchange
    await channel.publish(Exchanges.Target, '', Buffer.from(JSON.stringify(target)));
  });
}

module.exports = createdTarget;