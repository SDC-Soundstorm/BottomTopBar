const redis = require('redis');

const client = redis.createClient({
  host: 'localhost',
});


module.exports = client;
