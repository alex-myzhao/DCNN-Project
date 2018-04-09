import Engine from '@/kernels/engine'

class LocalInfer extends Engine {
  constructor () {
    super()

    this.model = {
      isLoad: false,
      conv1Biases: null, // 64
      conv1Weights: null, // 5 5 3 64
      conv2Biases: null, // 64
      conv2Weights: null, // 5 5 3 64
      local3Biases: null, // 384
      local3Weights: null, // 2304 384
      local4Biases: null, // 192
      local4Weights: null, // 384 192
      softmaxBiases: null, // 10
      softmaxWeights: null // 192 10
    }
  }

  /**
   * Load Model from NetFiles
   * @returns {Promise}
   */
  async _loadModel () {}

  /**
   * Performs the local inference of cifar-10 network, with only 1 device.
   * @param {Array} tensor1D: 1D tensor [batch_szie * height * width * channel]
   * @returns {Promise}
   */
  performInference (tensor1D) {}
}

export default LocalInfer
