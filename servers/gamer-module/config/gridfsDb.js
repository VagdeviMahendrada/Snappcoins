const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;

// Wrap the connection setup in a promise to wait for the connection to be established
const gfsPromise = new Promise((resolve, reject) => {
  conn.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
      bucketName: 'images',
    });
    resolve(gfs); // Resolve the promise with the initialized gfs object
  });

  conn.on('error', (err) => {
    reject(err); // Reject the promise if an error occurs during the connection setup
  });
});

// Export the promise instead of the gfs object directly
module.exports = gfsPromise;
