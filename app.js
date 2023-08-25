const express = require('express');
const cors = require('cors');

const app = express();
const port = 3053;

// Middleware
app.use(cors());

// Serve static files (like index.html)
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
