var http = require('http');
var drone = require('dronestream');

var server = http.createServer((req, res) => {
  require('fs').createReadStream(__dirname + "/index.html").pipe(res);
});

drone.listen(server);
server.listen(5555);