const { MongoClient } = require('mongodb');

// Connection client
const client = new MongoClient(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;

module.exports = {
  client,
  async getDb() {
    return new Promise((resolve, reject) => {
      if (!dbConnection) {
        // eslint-disable-next-line no-console
        console.log('Opening connection');
        client.connect((err, db) => {
          if (err || !db) {
            reject(err);
          }

          dbConnection = db.db(process.env.DB_NAME);
          // eslint-disable-next-line no-console
          console.log('Successfully connected to MongoDB.');

          resolve(dbConnection);
        });
      } else {
        resolve(dbConnection);
      }
    });
  },
};
