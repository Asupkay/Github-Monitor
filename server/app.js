const express = require('express');
const bodyParser = require('body-parser');
const configRoutes = require('./routes');
const app = express();

require('dotenv').config;
app.use(bodyParser.json());
configRoutes(app);

app.listen(5000, () => {
  console.log(`Server running on http://localhost:5000`);
});

