const arDrone = require('ar-drone');

const DEFAULT_TIMEOUT = 500; // ms
const COMMAND_SPEED = 1;
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
    this._client = arDrone.createClient({ ip: ip });
  }
  client() {
    return this._client;
  }
  front() {
    this._client.front(COMMAND_SPEED);
    setTimeout(this.keyboard_control.front(0), DEFAULT_TIMEOUT);
  }
  back() {
    this._client.back(COMMAND_SPEED);
    setTimeout(this._client.back(0), DEFAULT_TIMEOUT);
  }
  left() {
    this._client.left(COMMAND_SPEED);
    setTimeout(this._client.left(0), DEFAULT_TIMEOUT);
  }
  right() {
    this._client.right(COMMAND_SPEED);
    setTimeout(this._client.right(0), DEFAULT_TIMEOUT);
  }
  counterClockwise() {
    this._client.counterClockwise(COMMAND_SPEED);
    setTimeout(this._client.counterClockwise(0), DEFAULT_TIMEOUT);
  }
  clockwise() {
    this._client.clockwise(COMMAND_SPEED);
    setTimeout(this._client.clockwise(0), DEFAULT_TIMEOUT);
  }
  up() {
    this._client.up(COMMAND_SPEED);
    setTimeout(this._client.up(0), DEFAULT_TIMEOUT);
  }
  down() {
    this._client.down(COMMAND_SPEED);
    setTimeout(this._client.down(0), DEFAULT_TIMEOUT);
  }
  takeoff() {
    this._client.takeoff();
    this._state = STATES.FLYING;
  }
  land() {
    this._client.land();
    this._state = STATES.ON_GROUND;
  }
}

module.exports = Drone;