require('./drone.js');

const COMMAND_SPEED_DANGER_ZONE = 1;
const COMMAND_SPEED_WARNING_ZONE = 0.5;

class ObstacleAvoidingDrone extends Drone {
  constructor() {
    super();
    this._distances = [null, null, null, null, null]; // front | back | left | right | top
  }

  updateSensorData(sensor) {
    this._distances[0] = sensor.front;
    this._distances[1] = sensor.back;
    this._distances[2] = sensor.left;
    this._distances[3] = sensor.right;
    this._distances[4] = sensor.top;
  }

  checkForObstacles() {
    for(let direction = 0; direction < this._distances.length; direction++) {
      let zone = determineZone(this._distances[direction]);
      switch (direction) {
        case 0: // front
          if (zone === 0) this.back(COMMAND_SPEED_DANGER_ZONE);
          else if (zone === 1) this.back(COMMAND_SPEED_WARNING_ZONE);
          break;
        
        case 1: // back
          if (zone === 0) this.front(COMMAND_SPEED_DANGER_ZONE);
          else if (zone === 1) this.front(COMMAND_SPEED_WARNING_ZONE);
          break;

        case 2: // left
          if (zone === 0) this.right(COMMAND_SPEED_DANGER_ZONE);
          else if (zone === 1) this.right(COMMAND_SPEED_WARNING_ZONE);
          break;

        case 3: // right
          if (zone === 0) this.left(COMMAND_SPEED_DANGER_ZONE);
          else if (zone === 1) this.left(COMMAND_SPEED_WARNING_ZONE);
          break;

        case 4: // top
          if (zone === 0) this.right(COMMAND_SPEED_DANGER_ZONE);
          else if (zone === 1) this.right(COMMAND_SPEED_WARNING_ZONE);
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
      else return 2;
    }
  }
}