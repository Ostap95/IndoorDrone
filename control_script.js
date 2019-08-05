var arDrone = require('ar-drone');
var readline = require('readline');

/* Global variables */
var drone = arDrone.createClient();

const states = {
  FLYING: 3,
  ON_GROUND: 4
};
var droneState = states.ON_GROUND;
/* End global variables */

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

console.log('Press space to startup the drone...');

async function runDroneCommand(key) {
  switch(key.name) {
    case 'up':
      drone.front(1); // value from 0 to 1
      await sleep(500); // waits hallf a second
      drone.front(0);
      break;
    case 'down':
      drone.back(1); // value from 0 to 1
      await sleep(500); 
      drone.back(0);
      break;
    case 'left':
      drone.left(1); // value from 0 to 1
      await sleep(500);
      drone.left(0);
      break;
    case 'right':
      drone.right(1); // value from 0 to 1
      await sleep(500);
      drone.right(0);
      break;
    case 'a':
      drone.counterClockwise(1); // value from 0 to 1
      await sleep(500);
      drone.counterClockwise(0);
      break;
    case 'w':
      drone.up(1); // value from 0 to 1
      await sleep(500);
      drone.up(0);
      break;
    case 'd':
      drone.clockwise(1); // value from 0 to 1
      await sleep(500);
      drone.clockwise(0);
      break;
    case 's':
      drone.down(1); // value from 0 to 1
      await sleep(500);
      drone.down(0);
      break;
    case 'space':
      if (droneState === states.ON_GROUND) {
        console.log('taking off...');
        drone.takeoff();
        droneState = states.FLYING;
      } else if (droneState === states.FLYING) {
        console.log('landing...');
        drone.land();
        droneState = states.ON_GROUND;
      }
      break;
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

