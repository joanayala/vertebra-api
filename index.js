require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Create server express
const app = express();

// Setting CORS
app.use(cors());

// Read and parsing body
app.use(express.json());

// Endpoints
app.get('/', (req, res) => {
  return res.status(200).json({
    status: true,
    msg: 'Welcome vertebra-api',
  });
});

app.use('/api/login', require('./src/auth/auth.router'));
app.use('/api/users', require('./src/user/user.route'));
app.use('/api/roles', require('./src/rol/rol.router'));
app.use('/api/logs', require('./src/log/log.router'));

// Main
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port: ${process.env.PORT}`);
});