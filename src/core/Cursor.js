// Cursor

import {
  Vector2,
  Vector3,
  Plane,
  Raycaster
} from 'three'

import { Events } from './Events'
import { getMousePositionInElement } from '../utils/index'

export class Cursor extends Events {
  constructor () {
    super()
    this._class = 'Cursor'
    this._scene = null
    this._plane = new Plane(new Vector3(0, 0, 1), 0)
    this._raycaster = new Raycaster()
    this._coords = new Vector2()
    this._target = null
  }

  // the scene this cursor installed on
  get $scene () {
    return this._scene
  }

  // 2D coordinates of the mouse, in normalized device coordinates (NDC)---X and Y components should be between -1 and 1
  get $coordsX () {
    return this._coords.x
  }

  get $coordsY () {
    return this._coords.y
  }

  // the plane to instersect with
  get $plane () {
    return this._plane
  }

  set $plane (val) {
    this._plane = val 
  }

  // the current target the mouse is over
  get $target () {
    return this._target
  }

  // mouseevent handlers
  set $onclick (fn) {
    this.on('click', fn)
  }

  set $ondblclick (fn) {
    this.on('dblclick', fn)
  }

  set $onmouseover (fn) {
    this.on('mouseover', fn)
  }

  set $onmouseout (fn) {
    this.on('mouseout', fn)
  }

  set $onmousemove (fn) {
    this.on('mousemove', fn)
  }

  set $onmousedown (fn) {
    this.on('mousedown', fn)
  }

  set $onmouseup (fn) {
    this.on('mouseup', fn)
  }

  // install cursor on the scene
  install (scene) {
    this._scene = scene
    let self = this
    // events listener
    let eventList = ['mouseover', 'mouseout', 'mousemove', 'mousedown', 'mouseup', 'click', 'dblclick']
    eventList.forEach(event => {
      scene.$dom.addEventListener(event, e => {
        self[event](e)
      })
    })
    return this
  }

  // get projection on the plane
  project (plane) {
    plane = plane || this._plane
    return this._raycaster.ray.intersectPlane(plane)
  }

  mousemove (e) {
    let self = this
    let scene = this._scene
    let canvas = scene.$dom
    let viewSize = scene.$data.size

    self._coords.x = (getMousePositionInElement(e).x / viewSize.width) * 2 - 1
    self._coords.y = -(getMousePositionInElement(e).y / viewSize.height) * 2 + 1
    self._raycaster.setFromCamera(self._coords, scene.$camera.$obj)
    self.emit('mousemove', e)
  }

  mouseover (e) {
    this.emit('mouseover', e)
  }

  mouseout (e) {
    this.emit('mouseout', e)
  }

  click (e) {
    this.emit('click', e)
  }

  dblclick (e) {
    this.emit('dblclick', e)
  }

  mousedown (e) {
    this.emit('mousedown', e)
  }

  mouseup (e) {
    this.emit('mouseup', e)
  }

  // check all intersection between the ray and the object with the descendants
  getIntersection (mesh) {
    return this._raycaster.intersectObject(mesh.$obj, true)
  }

  // check if the ray hovers on the object, return boolean
  hovers (mesh) {
    let result = this.getIntersection(mesh).length > 0 ? true : false
    return result
  }

  // track or do-not-track the object, depends on the 'trackable' property of the object
  track (mesh) {
    let isHovered = false

    let mousemoveHandler = e => {
      if (this.hovers(mesh)) {
        document.body.style.cursor = 'pointer'
        this._target = mesh
        if (isHovered) mesh.emit('mousemove', e)
        else {
          mesh.emit('mouseover', e)
          isHovered = true
        }
      } else if (isHovered) {
        this._target = null
        document.body.style.cursor = 'default'
        mesh.emit('mouseout', e)
        isHovered = false
      }
    }

    let mousedownHandler = e => {
      if (isHovered) mesh.emit('mousedown', e)
    }

    let mouseupHandler = e => {
      if (isHovered) mesh.emit('mouseup', e)
    }

    let clickHandler = e => {
      if (isHovered) mesh.emit('click', e)
    }

    let dblclickHandler = e => {
      if (isHovered) mesh.emit('dblclick', e)
    }

    if (!mesh.$trackable) {
      // unbind events
      this.off('mousemove', mousemoveHandler)
      this.off('mousedown', mousedownHandler)
      this.off('mouseup', mouseupHandler)
      this.off('click', clickHandler)
      this.off('dblclick', dblclickHandler)
    }
    else {
      // bind events
      this.on('mousemove', mousemoveHandler)
      this.on('mousedown', mousedownHandler)
      this.on('mouseup', mouseupHandler)
      this.on('click', clickHandler)
      this.on('dblclick', dblclickHandler)
    }
  }
}
