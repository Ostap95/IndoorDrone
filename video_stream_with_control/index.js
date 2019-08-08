var http = require('http');
var drone = require('dronestream');
require('../keyboard_control');

var server = http.createServer((req, res) => {
  require('fs').createReadStream(__dirname + "/index.html").pipe(res);
});

drone.listen(server);
server.listen(5555);

console.log("\nVideo stream started at: 127.0.0.1:5555\n");