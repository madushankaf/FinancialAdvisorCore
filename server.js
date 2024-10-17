const express = require('express');
const app = express();
const dotenv = require('dotenv'); // For managing environment variables
dotenv.config(); // Load environment variables from .env file
const PORT = parseInt(process.env.PORT) || 8080;
const route=require('./routes/index');
const cors= require('cors');
 
app.use(cors());
 
app.use('/financialAdviser',route);
 
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});