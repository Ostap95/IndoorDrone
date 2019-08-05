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
    this._commandSpeed = commandSpeed; // value in 0 to 1 range
    this._commandTimeout = commandTimeout; // ms
  }

  /**
   * Returns the current drone's state.s
   */
  state() {
    return this._state;
  }

  /**
   * Sets a new state for the drone.
   * @param {*} state represents the new state to be set.
   */
  setState(state) {
    this._state = state;
  }

  /**
   * Returns the states object, containing the possible states that the drone
   * can be in.
   */
  states() {
    return STATES;
  }

  /**
   * Connects to the drone.
   * @param {*} ip address of the AR.Drone 2.0
   */
  connect(ip = DEFAULT_DRONE_IP) {
    this._client = arDrone.createClient({ ip: ip });
  }

  /**
   * Returns the client object.
   */
  client() {
    return this._client;
  }

  /**
   * Sets the speed with which the maneuver commands are executed.
   * @param {*} speed 
   */
  setCommandSpeed(speed) {
    this._commandSpeed = speed;
  }

  /**
   * Instructs the drone to move forwards.
   * @param {*} speed indicates the speed with which to move forward.
   * It's value is in range between 0 and 1.
   */
  front(speed = this._commandSpeed) {
    this._client.front(speed);
    setTimeout(() => this._client.front(0), this._commandTimeout);
  }

  /**
   * Instructs the drone to move backwards.
   * @param {*} speed indicates the speed with which to move backwards.
   * It's value is in range between 0 and 1.
   */
  back(speed = this._commandSpeed) {
    this._client.back(speed);
    setTimeout(() => this._client.back(0), this._commandTimeout);
  }

  /**
   * Instructs the drone to swing to the left.
   * @param {*} speed indicates the speed with which to swing to the left.
   * It's value is in range between 0 and 1.
   */
  left(speed = this._commandSpeed) {
    this._client.left(speed);
    setTimeout(() => this._client.left(0), this._commandTimeout);
  }

  /**
   * Instructs the drone to swing to the right.
   * @param {*} speed indicates the speed with which to swing to the right.
   * It's value is in range between 0 and 1.
   */
  right(speed = this._commandSpeed) {
    this._client.right(speed);
    setTimeout(() => this._client.right(0), this._commandTimeout);
  }

  /**
   * Instructs the drone to rotate in a counter-clockwise direction.
   * @param {*} speed indicates the speed with which to rotate.
   * It's value is in range between 0 and 1.
   */
  counterClockwise(speed = this._commandSpeed) {
    this._client.counterClockwise(speed);
    setTimeout(() => this._client.counterClockwise(0), this._commandTimeout);
  }

  /**
   * Instructs the drone to rotate in a clockwise direction.
   * @param {*} speed indicates the speed with which to rotate.
   * It's value is in range between 0 and 1.
   */
  clockwise(speed = this._commandSpeed) {
    this._client.clockwise(speed);
    setTimeout(() => this._client.clockwise(0), this._commandTimeout);
  }

  /**
   * Instructs the drone to gain the altitude.
   * @param {*} speed indicates the speed with which to gain the altitude.
   * It's value is in range between 0 and 1.
   */
  up(speed = this._commandSpeed) {
    this._client.up(speed);
    setTimeout(() => this._client.up(0), this._commandTimeout);
  }

  /**
   * Instructs the drone to reduce the altitude.
   * @param {*} speed indicates the speed with which to reduce the altitude.
   * It's value is in range between 0 and 1.
   */
  down(speed = this._commandSpeed) {
    this._client.down(speed);
    setTimeout(() => this._client.down(0), this._commandTimeout);
  }

  /**
   * Instructs the drone to take off and hover in the air.
   */
  takeoff() {
    this._client.takeoff();
    this._state = STATES.FLYING;
  }

  /**
   * Instructs the drone to land.
   */
  land() {
    this._client.land();
    this._state = STATES.ON_GROUND;
  }
}

module.exports = Drone;