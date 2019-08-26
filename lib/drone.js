const arDrone = require('ar-drone');

const DEFAULT_DRONE_IP = "192.168.1.1"
const STATES = {
  FLYING: 1,
  ON_GROUND: 2,
}

class Drone {
  constructor(commandSpeed = 0.5, commandTimeout = 500) {
    this._state = STATES.ON_GROUND;
    this._client = null;
    this._commandSpeed = commandSpeed;
    this._commandTimeout = commandTimeout; // ms
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
  connect(ip = DEFAULT_DRONE_IP) {
    this._client = arDrone.createClient({ ip: ip });
  }
  client() {
    return this._client;
  }
  setCommandSpeed(speed) {
    this._commandSpeed = speed;
  }
  front(speed = this._commandSpeed) {
    this._client.front(speed);
    setTimeout(() => this._client.front(0), this._commandTimeout);
  }
  back(speed = this._commandSpeed) {
    this._client.back(speed);
    setTimeout(() => this._client.back(0), this._commandTimeout);
  }
  left(speed = this._commandSpeed) {
    this._client.left(speed);
    setTimeout(() => this._client.left(0), this._commandTimeout);
  }
  right(speed = this._commandSpeed) {
    this._client.right(speed);
    setTimeout(() => this._client.right(0), this._commandTimeout);
  }
  counterClockwise(speed = this._commandSpeed) {
    this._client.counterClockwise(speed);
    setTimeout(() => this._client.counterClockwise(0), this._commandTimeout);
  }
  clockwise(speed = this._commandSpeed) {
    this._client.clockwise(speed);
    setTimeout(() => this._client.clockwise(0), this._commandTimeout);
  }
  up(speed = this._commandSpeed) {
    this._client.up(speed);
    setTimeout(() => this._client.up(0), this._commandTimeout);
  }
  down(speed = this._commandSpeed) {
    this._client.down(speed);
    setTimeout(() => this._client.down(0), this._commandTimeout);
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