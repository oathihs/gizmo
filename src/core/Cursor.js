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
    this._mouse = new Vector2()
  }

  get $mouseX () {
    return this._mouse.x
  }

  get $mouseY () {
    return this._mouse.y
  }

  get $plane () {
    return this._plane
  }

  set $plane (val) {
    this._plane = val 
  }

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

  project (plane) {
    plane = plane || this._plane
    return this._raycaster.ray.intersectPlane(plane)
  }

  mousemove (e) {
    let self = this
    let scene = this._scene
    let canvas = scene.$dom
    let viewSize = scene.$data.size

    self._mouse.x = (getMousePositionInElement(e).x / viewSize.width) * 2 - 1
    self._mouse.y = -(getMousePositionInElement(e).y / viewSize.height) * 2 + 1
    self._raycaster.setFromCamera(self._mouse, scene.$camera.$obj)
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

  getIntersection (mesh) {
    return this._raycaster.intersectObject(mesh.$obj, true)
  }

  hovers (mesh) {
    let result = this.getIntersection(mesh).length > 0 ? true : false
    return result
  }

  track (mesh) {
    let isHovered = false

    let mousemoveHandler = () => {
      if (this.hovers(mesh)) {
        document.body.style.cursor = 'pointer'
        if (isHovered) mesh.emit('mousemove')
        else {
          mesh.emit('mouseover')
          isHovered = true
        }
      } else if (isHovered) {
        document.body.style.cursor = 'default'
        mesh.emit('mouseout')
        isHovered = false
      }
    }

    let mousedownHandler = () => {
      if (isHovered) mesh.emit('mousedown')
    }

    let mouseupHandler = () => {
      if (isHovered) mesh.emit('mouseup')
    }

    let clickHandler = () => {
      if (isHovered) mesh.emit('click')
    }

    let dblclickHandler = () => {
      if (isHovered) mesh.emit('dblclick')
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