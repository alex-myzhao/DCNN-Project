/**
 * @fileoverview WS is a class whose instances maintain a WebSocket client keeping the connection
 * between this SPA and a WebSocket ws.
 */
class WS {
  constructor () {
    /**
     * @property {WebSocket} ws
     * Maintain a WebSocket Instance
     */
    this.ws = null

    /**
     * @property {string} localIP
     * Store the local IP address
     */
    this.localIP = null

    /**
     * @property {Object} listenerMap
     * Registered listeners; format: { funcName: func }
     * Registered functions require exactally one argument, `data`, extracted from transmitted JSON object
     */
    this.listenerMap = {}
  }

  /**
   * @private
   * Pre-set a list of functions. Private method.
   * @returns {null}
   */
  _presetListeners () {
    this.listenerMap['setIP'] = (data) => {
      console.log(`WS setIP: My IP is ${data}`)
      this.localIP = data
    }
  }

  /**
   * Initalize the connection between client & the WS server.
   * @param {string} destIP ws://xxx.xxx.xxx.xxx:xxxx
   * @returns {Promise}
   */
  createConnection (destIP) {
    this._presetListeners()
    return new Promise((resolve, reject) => {
      // create a websocket instance
      this.ws = new WebSocket(destIP)

      this.ws.onmessage = (event) => {
        let recData = JSON.parse(event.data)
        console.log('WS: receive data')
        if (recData.func && this.listenerMap[recData.func]) {
          console.log(`WS: Hit Listener ${recData.func}`)
          this.listenerMap[recData.func](recData.data)
        } else {
          console.error(`Listener ${recData.func} Not Found`)
        }
      }

      this.ws.onopen = (event) => { resolve(event) }
      this.ws.onerror = (event) => { reject(event) }
    })
  }

  /**
   * Send JSON to the server.
   * @param {Object} jsonMsg
   * @returns {null}
   */
  sendMsg (jsonMsg) {
    if (this.ws === null) {
      console.error('WS: WS Not Create')
    } else if (this.ws.readyState !== WebSocket.OPEN) {
      console.error('WS: WS Not Open')
    } else {
      console.log('WS: Successfully Send JSON')
      this.ws.send(JSON.stringify(jsonMsg))
    }
  }

  /**
   * Add a listener to this WS.
   * @param {string} listenerName
   * @param {function} listener
   * @returns {boolean} whether the listener is regisered
   */
  setListener (listenerName, listener) {
    this.listenerMap[listenerName] = listener
    return true
  }

  /**
   * Remove a listener.
   * @param {string} listenerName
   * @returns {null}
   */
  removeListener (listenerName) {
    if (this.listenerMap[listenerName] !== null) {
      this.listenerMap[listenerName] = null
      this._refreshListeners()
    }
  }

  /**
   * Close the WS.
   * @returns {null}
   */
  closeConnection () {
    this.ws.close()
  }
}

export default WS
