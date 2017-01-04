// Event
import { toArray } from '../utils/index'

export class Events {
  constructor () {
    this._class = 'Events'
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
    list = list.filter(el => { return el !== listener })
  }

  emit (type) {
    let listeners = this._listeners
    let list = listeners[type] || []
    let args = toArray(arguments, 1)
    list.forEach(el => { el.apply(this, args) })
  }
}