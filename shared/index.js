// Export dependencies 
module.exports = {
  JwtStrategy: require('./config/jwt-strategy'),
  Exchanges: require('./config/exchanges'),
  Database: require('./services/database'),
  RabbitMQ: require('./services/rabbitmq'),
  PrometheusConfig: require('./config/prometheus'),
}
