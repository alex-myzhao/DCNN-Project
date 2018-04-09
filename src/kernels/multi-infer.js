import Engine from '@/kernels/engine'
import WS from '@/lib/ws'

class MultiInfer extends Engine {
  constructor () {
    super()

    this.server = new WS()
  }

  /**
   * DCNN only.
   * Compute the height range of each worker.
   * @returns {Array} ['the_range_workers_received', 'the_range_workers_responsible']
   */
  _computeWorkerRanges (height, paddingHeight, workerNum) {
    let averHeight = Math.floor(height / workerNum)
    let [workerInitRange, workerMaintainRange] = [[], []]
    let cursor = 0
    for (let i = 0; i < workerNum; ++i) {
      if (i === 0) {
        cursor = averHeight
        workerInitRange.push([0, cursor + paddingHeight])
        workerMaintainRange.push([0, cursor])
      } else if (i === workerNum - 1) {
        workerInitRange.push([cursor - paddingHeight, height])
        workerMaintainRange.push([cursor, height])
        cursor = height
      } else {
        workerInitRange.push([cursor - paddingHeight, cursor + averHeight + paddingHeight])
        workerMaintainRange.push([cursor, cursor + averHeight])
        cursor += averHeight
      }
    }
    return [ workerInitRange, workerMaintainRange ]
  }

  /**
   * DCNN only.
   * Set up Master's listeners.
   */
  _registerMasterListeners () {
    this.server.setListener('reduce', data => {
      let ip = data.sourceIP
      this.reduceCollector[ip] = data.result
      console.log('GO: Receive result from the worker')
      console.log(data.result)
    })
  }

  /**
   * DCNN only.
   * Performs the inference of cifar-10 network, with multi devices.
   * @param {Array} tensor1D: 1D tensor [batch_szie * height * width * channel]
   * @returns {Promise}
   */
  async performInference (tensor1D) {}
}

export default MultiInfer
