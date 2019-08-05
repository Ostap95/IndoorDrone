const readline = require('readline');
const Drone = require('../lib/drone.js');

const drone = new Drone();
drone.connect(); // Connect to the drone

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