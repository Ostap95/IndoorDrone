require('./drone.js');

class ObstacleAvoidingDrone extends Drone {
  constructor() {
    super();
    this._sensorData = {
      front: null,
      back: null,
      left: null,
      right: null,
      top: null,
      bottom: null
    };
  }

  updateSensorData(data) {
    this._sensorData = data;
  }  
}