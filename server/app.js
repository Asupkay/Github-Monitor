const express = require('express');
const bodyParser = require('body-parser');
const configRoutes = require('./routes');
const app = express();

require('dotenv').config();
app.use(bodyParser.json());
app.use(express.static(__dirname + './../client/build'));
configRoutes(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

