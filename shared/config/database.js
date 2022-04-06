const mongoose = require('mongoose');

// Export db conn based on env
module.exports = () => {
  // This prevents the gateway from crashing as our current ECMA version does not support module lazy loading :))
  if(process.env.MONGO_URL !== undefined) {
    mongoose.connect(process.env.MONGO_URL)
  }
} 