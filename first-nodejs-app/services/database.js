const { MongoClient } = require('mongodb');
// Connection URI
const uri = 'mongodb://localhost:27017';

const client = new MongoClient(uri, {
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

          dbConnection = db.db('myapp');
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
