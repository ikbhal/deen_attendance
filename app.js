const express = require('express');
const cors = require('cors');
const redis = require('redis');

const app = express();
const port = 3053;

// Redis Client
const client = redis.createClient();

// Middleware
app.use(cors());

// use json express body
app.use(express.json());

app.get('/ping', (req, res) => {
    res.send('pong');
  });

app.get('/check-redis', (req, res) => {
    if (client.connected) {
      res.send('Redis client is connected.');
    } else {
      res.send('Redis client is not connected.');
    }
  });

// Serve static files (like index.html)
app.use(express.static('public'));



client.on('connect', () => {
  console.log('Connected to Redis');
});


// Set key-value pair in Redis
app.post('/set', (req, res) => {
    const { key, value } = req.body;
  
    client.set(key, value, (err, reply) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error setting data in Redis');
      } else {
        console.log(reply);
        res.status(200).send('Key-value pair set successfully');
      }
    });
  });
  
  // Get value for a given key from Redis
  app.get('/get/:key', (req, res) => {
    const key = req.params.key;
  
    client.get(key, (err, reply) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error getting data from Redis');
      } else {
        console.log(reply);
        res.status(200).json({ key, value: reply });
      }
    });
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
