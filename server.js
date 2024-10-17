const express = require('express');
// require("./config/db"); uncommnet to connect db
const app = express();
const dotenv = require('dotenv'); // For managing environment variables
dotenv.config(); // Load environment variables from .env file
const PORT = parseInt(process.env.PORT) || 8080;
const routes = require('./routes/index');
const cors= require('cors');
 
app.use(express.json());
app.use(cors());
 
app.use(routes);
 
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});