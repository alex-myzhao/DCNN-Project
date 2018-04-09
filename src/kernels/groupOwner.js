import * as tf from '@tensorflow/tfjs'

class GroupOwner {
  testTF () {
    const x = tf.tensor2d([1, 2, 3, 4], [2, 2])
    x.slice([1, 0], [1, 2]).print()
  }
}

export default GroupOwner
