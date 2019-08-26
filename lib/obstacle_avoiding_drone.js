require('./drone.js');

class ObstacleAvoidingDrone extends Drone {
  constructor() {
    super();
    this._sensorData = {
      front: null,
      back: null,
      left: null,
      right: null,
      top: null
    };
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
      let zone = determineZone(this._distances[direction])
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