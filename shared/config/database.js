// Export db conn based on env
module.exports = (mongoose) => {
  console.log('Connecting to MongoDB');
  mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Could not connect to MongoDB', err));
} 