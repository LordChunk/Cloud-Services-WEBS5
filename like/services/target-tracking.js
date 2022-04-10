const Queues = require('../config/queues');
const mongoose = require('mongoose');
const shared = require('cloud-shared');
const Exchanges = shared.Exchanges;
const Target = require('../models/target');


// This service tracks the creation of new targets and updates the target table accordingly.
class TargetTrackingService  {
  _rabbiqMq = shared.RabbitMQ()

  constructor() {
    // Connect to database
    shared.Database(mongoose);
    shared.RabbitMQ().connect(this.start);
  }

  async start(connection) {
    const channel = await connection.createChannel();

    // Subscribe to queue for Target exchange
    await channel.assertQueue(Queues.TargetCreate, { durable: true });
    await channel.bindQueue(Queues.TargetCreate, Exchanges.Target, '#');
    await channel.consume(Queues.TargetCreate, async (message) => {
      const targetId = message.content.toString();
      
      // Create new target in database
      const target = new Target({
        id: targetId
      });

      console.log('Target created: ' + targetId);
      await target.save();
    });
  }
}

module.exports = new TargetTrackingService();