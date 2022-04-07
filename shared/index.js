// Export dependencies 
module.exports = {
  Interceptors: require('./config/axios-jwt-interceptor'),
  JwtStrategy: require('./config/jwt-strategy'),	
  Database: require('./config/database')
}
