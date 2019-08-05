var arDrone = require('ar-drone');
var client = arDrone.createClient();
client.on('navdata', console.log);

client.takeoff();

client.after(2000, () => {
  client.land();
});