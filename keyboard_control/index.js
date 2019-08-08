let arDrone = require('ar-drone');
let readline = require('readline');

/* Global variables */
let drone = arDrone.createClient();

const states = {
  FLYING: 3,
  ON_GROUND: 4
};
let droneState = states.ON_GROUND;
/* End global variables */

readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);

// Accepting key presses
process.stdin.on('keypress', (str, key) => {
  if (key.ctrl && key.name === 'c') {
    process.exit();
  } else {
    // TODO check if successfully connected to the drone.
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
async function runDroneCommand(key) {
  switch (key.name) {
    case 'up':
      console.log('Moving forward...');
      drone.front(1);
      await sleep(500);
      drone.front(0);
      break;
    case 'down':
      console.log('Moving backwards...');
      drone.back(1);
      await sleep(500);
      drone.back(0);
      break;
    case 'left':
      console.log('Moving to the left...');
      drone.left(1);
      await sleep(500);
      drone.left(0);
      break;
    case 'right':
      console.log('Moving to the right...');
      drone.right(1);
      await sleep(500);
      drone.right(0);
      break;
    case 'a':
      console.log('Rotating counterclockwise...');
      drone.counterClockwise(1);
      await sleep(500);
      drone.counterClockwise(0);
      break;
    case 'w':
      console.log('Moving up...');
      drone.up(1);
      await sleep(500);
      drone.up(0);
      break;
    case 'd':
      console.log('Rotating clockwise...');
      drone.clockwise(1);
      await sleep(500);
      drone.clockwise(0);
      break;
    case 's':
      console.log('Moving down...');
      drone.down(1);
      await sleep(500);
      drone.down(0);
      break;
    case 'space':
      if (droneState === states.ON_GROUND) {
        console.log('Taking off...');
        drone.takeoff();
        droneState = states.FLYING;
      } else if (droneState === states.FLYING) {
        console.log('Landing...');
        drone.land();
        droneState = states.ON_GROUND;
      }
      break;
  }
}

/**
 * Responsible for returning after a certain amount of time.
 * @param {number} ms - the amout of time(milliseconds) after which to return.
 * @return {object} Returns a Promise
 * @example 
 *  sleep(5000)
 */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
