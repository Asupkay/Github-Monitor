const express = require('express');
const bodyParser = require('body-parser');
const configRoutes = require('./routes');
const app = express();

const PORT = process.env.PORT || 5000;

require('dotenv').config();
app.use(bodyParser.json());

if(PORT != 5000) {
  app.use(express.static(__dirname + './../client/build'));
}

configRoutes(app);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

