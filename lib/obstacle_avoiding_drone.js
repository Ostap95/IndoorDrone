const Drone = require('./drone.js');

const COMMAND_SPEED_DANGER_ZONE = 1; // the speed of the motors
const COMMAND_SPEED_WARNING_ZONE = 0.5;

class ObstacleAvoidingDrone extends Drone {
  constructor() {
    super();
    this._distances = [null, null, null, null]; // front | back | left | right
  }

  /**
   * Updataes distances values based on the values received from the sensors
   * @param {*} sensor: Object containing the values from 4 ultrasonic sensors.
   */
  updateSensorData(distances) {
    this._distances[0] = distances.front;
    this._distances[1] = distances.back;
    this._distances[2] = distances.left;
    this._distances[3] = distances.right;
  }

  /**
   * This functions determines if there is any obstacle detected by any of the 4
   * sensors. If the obstacle is detected, the appropriate measures are taken.
   */
  checkForObstacles() {
    for(let direction = 0; direction < this._distances.length; direction++) {
      let zone = this.determineZone(this._distances[direction]);
      switch (direction) {
        case 0: // front sensor
          if (zone === 0) this.back(COMMAND_SPEED_DANGER_ZONE);
          else if (zone === 1) this.back(COMMAND_SPEED_WARNING_ZONE);
          break;
        
        case 1: // back sensor
          if (zone === 0) this.front(COMMAND_SPEED_DANGER_ZONE);
          else if (zone === 1) this.front(COMMAND_SPEED_WARNING_ZONE);
          break;

        case 2: // left sensor
          if (zone === 0) this.right(COMMAND_SPEED_DANGER_ZONE);
          else if (zone === 1) this.right(COMMAND_SPEED_WARNING_ZONE);
          break;

        case 3: // right sensor
          if (zone === 0) this.left(COMMAND_SPEED_DANGER_ZONE);
          else if (zone === 1) this.left(COMMAND_SPEED_WARNING_ZONE);
          break;
      }
    }
  }

  /**
   * Determines in which zone lies the distance value measured by the sensor
   * @param {numeric} value the sensor distance measured in cm
   */
  determineZone(value) {
    if (value != null) {
      if (value >= 0 && value <= 50) return 0; // danger zone
      else if (value > 50 <= 100) return 1; // warning zone
      else return 2; // safe zone
    }
  }
}

module.exports = ObstacleAvoidingDrone;