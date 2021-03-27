const EventBus = {
  callbackMap: {
    // eventA: [callback1, callback2]
  },
  stickyEventMap: {
    // eventA: {}
  },
  on(eventName, options) {
    if (!eventName || !options || typeof options.callback !== 'function') {
      return
    }
    const callbacks = this.callbackMap[eventName] || []
    callbacks.push(options.callback)
    this.callbackMap[eventName] = callbacks
    if (options.sticky === true) {
      options.callback(this.stickyEventMap[eventName])
    }
  },
  emit(eventName, options) {
    if (!eventName) {
      return
    }
    const { sticky = false, data } = options || {}
    if (sticky === true) {
      this.stickyEventMap[eventName] = data
    }
    const callbacks = this.callbackMap[eventName] || []
    for (let callback of callbacks) {
      callback(data)
    }
  },
  off(eventName, options) {
    if (!eventName) {
      return
    }
    if (typeof options === 'undefined') {
      // 移除eventName下的所有callback
      delete this.callbackMap[eventName]
      return
    }
    const callbacks = this.callbackMap[eventName] || []
    const index = callbacks.findIndex(callback => {
      return callback === options.callback
    })
    if (index !== -1) {
      callbacks.splice(index, 1)
    }
  },
  removeStickyEvent(eventName) {
    if (!eventName) {
      return
    }
    if (typeof this.stickyEventMap[eventName] !== 'undefined') {
      delete this.stickyEventMap[eventName]
    }
  }
}

export { EventBus }
