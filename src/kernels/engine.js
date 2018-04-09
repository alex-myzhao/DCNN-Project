import Settings from '@/config/cifar-config'

class Engine {
  constructor () {
    this._loadImages()
  }

  /**
   * Load Image Data
   */
  async _loadImages () {

  }

  /**
   * Pre-Processes Image Data on 1D tensor.
   * Same with the pre-processing methods during training period.
   * @param {Array} tensor1D
   * @returns {null}
   */
  _standardlizeImageData (tensor1D) {

  }

  /**
   * Pre-Processes Image Data on 1D tensor.
   * Same with the pre-processing methods during training period.
   * @param {Array} resultTensor1D [batch_size * height * width * channel]
   * @returns {Array} [batch_size]
   */
  _translateResult (resultTensor1D) {
    let resultList = []
    let labelNum = Settings.LABELS.length
    for (let i = 0; i < resultTensor1D.length; i += labelNum) {
      let maxIndex = 0
      for (let j = 0; j < labelNum; ++j) {
        maxIndex = resultTensor1D[i + j] > resultTensor1D[i + maxIndex] ? j : maxIndex
      }
      resultList.push(Settings.LABELS[maxIndex])
    }
    return resultList
  }
}

export default Engine
