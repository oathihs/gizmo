// Event
import {toArray} from './utils'
class Events {
  constructor () {
    this._listeners = {}
  }

  get $listeners () {
    return this._listeners
  }

  on (type, listener) {
    let listeners = this._listeners
    listeners[type] = listeners[type] || []
    if (!listeners[type].includes(listener)) listeners[type].push(listener)
  }

  off (type, listener) {
    let listeners = this._listeners
    let list = listeners[type] || []
    let index = list.findIndex(listener)
    if (index !== -1) list.splice(index, 1)
  }

  emit (type) {
    let listeners = this._listeners
    let list = listeners[type] || []
    let args = toArray(arguments, 1)
    list.forEach((listener) => {
      listener.apply(this, args)
    })
  }
}

export default Events