const arDrone = require('ar-drone');
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Ground station server is listening on port ${port}!`));
