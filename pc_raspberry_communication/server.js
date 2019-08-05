const express = require('express');
const bodyParser = require('body-parser');
 
const SERVER_PORT = 3000;
const SERVER_ADDRESS = '192.168.1.6';
 
const app = express();
 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
 
app.post('/sensor_data', (req, res) => {
  res.sendStatus(200);
  console.log(req.body);
});

app.listen(SERVER_PORT, SERVER_ADDRESS, () => console.log(`Server is listening on port ${SERVER_PORT}!\n`));