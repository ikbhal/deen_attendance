const redis = require('redis');

// Create a Redis client
const client = redis.createClient();

// Listen for the 'connect' event
client.on('connect', () => {
  console.log('Connected to Redis server');

  // Set a key-value pair
  client.set('mykey', 'myvalue', (err, reply) => {
    if (err) {
      console.error('Error setting key:', err);
    } else {
      console.log('Key set:', reply);

      // Get the value for the key
      client.get('mykey', (err, value) => {
        if (err) {
          console.error('Error getting key:', err);
        } else {
          console.log('Value for mykey:', value);

          // Close the Redis connection
          client.quit();
        }
      });
    }
  });
});

// Listen for the 'error' event
client.on('error', (err) => {
  console.error('Redis error:', err);
});
