// Export dependencies 
module.exports = {
  JwtStrategy: require('./config/jwt-strategy'),	
  Database: require('./config/database'),
  Helpers: {
    ForeignKey: require('./helpers/foreign-key'),
  }
}
