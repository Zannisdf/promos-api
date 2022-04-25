const fs = require('fs/promises');
const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const APP_PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/api/promos', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'promos.json');

  fs.readFile(filePath)
    .then((data) => {
      res.status(200).json(JSON.parse(data));
    })
    .catch(() => {
      res.status(500).json({ error: 'Something went wrong' });
    });
});

app.use('*', (req, res) => {
  res.status(404).send();
});

app.listen(APP_PORT, () => {
  console.log(`Server listening in port ${APP_PORT}`);
});
