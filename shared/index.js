// Export dependencies 
module.exports = {
  JwtStrategy: require('./config/jwt-strategy'),
  Exchanges: require('./config/exchanges'),
  Database: require('./services/database'),
  // Lazy load RabbitMQ as it should not be instantiated in the gateway service
  RabbitMQ: () => require('./services/rabbitmq'),
  PrometheusConfig: require('./config/prometheus'),
  Helpers: {
    ForeignKey: require('./helpers/foreign-key'),
  }
}
