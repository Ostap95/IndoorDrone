const Drone = require('../lib/drone');
const express = require('express');
const readline = require('readline');

const SERVER_PORT = 3000;
const app = express();
const drone = new Drone();

var droneSensorsStatus = {
  front: null,
  back: null,
  left: null,
  right: null,
  top: null,
  bottom: null
}

let droneState = {
  flying: 0,
  motorProblem: 0,
  softwareFault: 0,
  lowBattery: 0,
  magnometerNeedsCalibration: 0,
  tooMuchWind: 0,
  emergencyLanding: 0,
  controlState: '',
  flyState: '',
  altitudeMeters: 0,
  velocity: { x: 0, y: 0, z: 0 }
}
drone.connect();
drone.client().on('navdata', data => { // In average every 65ms [when connected directly to the drone]
  droneState.flying = data.droneState.flying;
  droneState.motorProblem = data.droneState.motorProblem;
  droneState.softwareFault = data.droneState.softwareFault;
  droneState.lowBattery = data.droneState.lowBattery;
  droneState.magnometerNeedsCalibration = data.droneState.MagnometerNeedsCalibration;
  droneState.tooMuchWind = data.droneState.tooMuchWind;
  droneState.emergencyLanding = data.droneState.emergencyLanding;

  droneState.controlState = data.demo ? data.demo.controlState : '';
  droneState.flyState = data.demo ? data.demo.flyState : '';
  droneState.altitudeMeters = data.demo ? data.demo.altitudeMeters : 0;
  droneState.velocity = data.demo ? data.demo.velocity : {x:0, y:0, z:0};
});

drone.client().on('error', error => {
  console.log(`Error!!! ${error}`)
});

app.get('/', (req, res) => res.send('Hello World!'));

app.post('/sensor_data', (req, res) => {

});

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// Accepting key presses
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else {
    runDroneCommand(key);
  }
});

const initialMessage =
  '\n\nAvailable commands:\n\n' + 
  '    a : rotates the drone in a counterclockwise direction.\n' +
  '    d : rotates the drone in a clockwise direction.\n' +
  '    w : increases the drone\'s altitude.\n' +
  '    s : decreases the drone\'s altitude.\n' +
  '    ↑ : up arrow moves the drone in a forward direction.\n' +
  '    ↓ : down arrow moves the drone in a backward direction.\n' +
  '    ← : left arrow moves the drone in the left direction.\n' +
  '    → : right arrow moves the drone in the right direction.\n' +
  ' space: space key serves as a takeoff command when the drone is on the ground, and land command when the drone is in the air.\n' +
  '\n\nPress space for the drone to takeoff.\n';

console.log(initialMessage);

/**
 * Sends commands to the drone based on the typed key.
 * @param {object} key - key object from the stdin keypress stream.
 */
function runDroneCommand(key) {
  switch (key.name) {
    case 'up':
      console.log('Moving forward...');
      drone.front();
      break;
    case 'down':
      console.log('Moving backwards...');
      drone.back();
      break;
    case 'left':
      console.log('Moving to the left...');
      drone.left();
      break;
    case 'right':
      console.log('Moving to the right...');
      drone.right();
      break;
    case 'a':
      console.log('Rotating counterclockwise...');
      drone.counterClockwise();
      break;
    case 'w':
      console.log('Moving up...');
      drone.up();
      break;
    case 'd':
      console.log('Rotating clockwise...');
      drone.clockwise();
      break;
    case 's':
      console.log('Moving down...');
      drone.down();
      break;
    case 'space':
      if (drone.state() === drone.states().ON_GROUND) {
        console.log('Taking off...');
        drone.takeoff();
      } else if (drone.state() === drone.states().FLYING) {
        console.log('Landing...');
        drone.land();
      }
      break;
  }
}

app.listen(SERVER_PORT, () => console.log(`Ground station server is listening on port ${SERVER_PORT}!\n`));

