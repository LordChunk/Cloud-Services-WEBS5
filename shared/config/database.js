const mongoose = require('mongoose');

// Export db conn based on env
module.exports = () => {
  if(process.env.MONGO_URL !== undefined) {
    mongoose.connect(process.env.MONGO_URL)
  }
} 