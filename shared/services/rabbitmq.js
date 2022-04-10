var amqp = require('amqplib');

// Singleton for handling all RabbitMQ connections
class RabbitSingletonConnection {

  connection = null;

  constructor() {
    console.log('Trying to connect to RabbitMQ');
    this.connection = amqp.connect(process.env.RABBIT_ENDPOINT)
      .then(connection => {
        console.log('Connected to RabbitMQ');
        return connection;
      })
      .catch(error => {
        console.log('Failed to connect to RabbitMQ');
        console.log(error);
        throw error;
      }
    );
  }

  connect(callback) {
    // Check if connection is already established
    if (this.connection === null) {
      throw new Error('RabbitMQ connection is not open');
    }
    
    this.connection.then(callback);
  }
}

module.exports = new RabbitSingletonConnection();