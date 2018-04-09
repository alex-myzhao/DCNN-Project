import Settings from '@/config/cifar-config'
import HTTP from '@/lib/http'
import * as tf from '@tensorflow/tfjs'

class Engine {
  constructor () {
    this.input = null // [n * h * w * c]
    this.$tf = tf
  }

  async _init_ () {
    await this._loadImages_()
    console.log(this.input)
    // this._standardlizeImageData_()
  }

  /**
   * Load Image Data
   */
  async _loadImages_ () {
    try {
      let response = await HTTP.get('/static/cifar-10/test-imgs-data/data.json')
      this.input = response.data
      console.log('Engine: load image')
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    }
  }

  /**
   * Pre-Processes Image Data on 1D tensor.
   * Same with the pre-processing methods during training period.
   * @param {Array} tensor1D
   * @returns {null}
   */
  _standardlizeImageData_ (tensor1D) {

  }

  /**
   * Pre-Processes Image Data on 1D tensor.
   * Same with the pre-processing methods during training period.
   * @param {Array} resultTensor1D [batch_size * height * width * channel]
   * @returns {Array} [batch_size]
   */
  _translateResult_ (resultTensor1D) {
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
