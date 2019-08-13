const arDrone = require('ar-drone');

const DEFAULT_TIMEOUT = 500; // ms
const COMMAND_SPEED = 0.5;
const DEFAULT_IP = "192.168.1.1"
const STATES = {
  FLYING: 1,
  ON_GROUND: 2,
}

class Drone {
  constructor() {
    this._state = STATES.ON_GROUND;
    this._client = null;
  }

  state() {
    return this._state;
  }
  setState(state) {
    this._state = state;
  }
  states() {
    return STATES;
  }
  connect(ip = DEFAULT_IP) {
    // TODO check if the connection was successfull
    this._client = arDrone.createClient({ ip: ip });
  }
  client() {
    return this._client;
  }
  front() {
    this._client.front(COMMAND_SPEED);
  }
  back() {
    this._client.down(COMMAND_SPEED);
  }
  left() {
    this._client.left(COMMAND_SPEED);
  }
  right() {
    this._client.right(COMMAND_SPEED);
  }
  counterClockwise() {
    this._client.counterClockwise(COMMAND_SPEED);
  }
  clockwise() {
    this._client.clockwise(COMMAND_SPEED);
  }
  up() {
    this._client.up(COMMAND_SPEED);
  }
  down() {
    this._client.down(COMMAND_SPEED);
  }
  takeoff() {
    this._client.takeoff(COMMAND_SPEED);
    this._state = STATES.FLYING;
  }
  land() {
    this._client.land(COMMAND_SPEED);
    this._state = STATES.ON_GROUND;
  }

  /**
   * Responsible for returning after a certain amount of time.
   * @param {number} ms - the amout of time(milliseconds) after which to return.
   * @return {object} Returns a Promise
   * @example 
   *  sleep(5000)
   */
  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = Drone;