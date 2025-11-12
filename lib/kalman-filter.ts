// Kalman Filter implementation for sensor fusion
export class KalmanFilter {
  private x: number // State estimate
  private P: number // Estimate covariance
  private Q: number // Process noise covariance
  private R: number // Measurement noise covariance

  constructor(initialValue = 0, processNoise = 0.001, measurementNoise = 0.1) {
    this.x = initialValue
    this.P = 1
    this.Q = processNoise
    this.R = measurementNoise
  }

  // Prediction step
  predict() {
    // State prediction (assume constant model)
    // x = x (no change in prediction)

    // Covariance prediction
    this.P = this.P + this.Q
  }

  // Update step with new measurement
  update(measurement: number): number {
    // Kalman gain
    const K = this.P / (this.P + this.R)

    // State update
    this.x = this.x + K * (measurement - this.x)

    // Covariance update
    this.P = (1 - K) * this.P

    return this.x
  }

  // Process new measurement (predict + update)
  filter(measurement: number): number {
    this.predict()
    return this.update(measurement)
  }

  // Get current state estimate
  getState(): number {
    return this.x
  }

  // Reset filter
  reset(value = 0) {
    this.x = value
    this.P = 1
  }
}

// Multi-sensor fusion using Kalman filtering
export class SensorFusion {
  private filters: Map<string, KalmanFilter>

  constructor() {
    this.filters = new Map()
  }

  // Initialize filter for a sensor
  initSensor(sensorId: string, initialValue = 0, processNoise = 0.001, measurementNoise = 0.1) {
    this.filters.set(sensorId, new KalmanFilter(initialValue, processNoise, measurementNoise))
  }

  // Process measurement from a sensor
  processMeasurement(sensorId: string, measurement: number): number {
    const filter = this.filters.get(sensorId)
    if (!filter) {
      this.initSensor(sensorId, measurement)
      return measurement
    }
    return filter.filter(measurement)
  }

  // Fuse multiple sensor readings with weighted average
  fuseSensors(readings: { sensorId: string; value: number; weight?: number }[]): number {
    if (readings.length === 0) return 0

    let totalWeight = 0
    let weightedSum = 0

    readings.forEach(({ sensorId, value, weight = 1 }) => {
      const filtered = this.processMeasurement(sensorId, value)
      weightedSum += filtered * weight
      totalWeight += weight
    })

    return totalWeight > 0 ? weightedSum / totalWeight : 0
  }
}
