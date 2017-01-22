import {
  Object3D,
  Scene,
  SceneUtils
} from 'three'
import { Events } from './Events'

export class Element extends Events{
  constructor () {
    super()
    this._obj = new Object3D()
    this._scene = null
    this._parent = null
    this._children = []
    this._class = 'Element'
    this._trackable = false
  }

  get $class () {
    return this._class
  }

  get $obj () {
    return this._obj
  }

  get $name () {
    return this._obj.name
  }

  set $name (name) {
    this._obj.name = name
  }

  get $scene () {
    return this._scene
  }

  get $children () {
    return this._children
  }

  get $parent () {
    return this._parent
  }

  get $trackable () {
    return this._trackable
  }

  set $trackable (val) {
    this._trackable = val
    this._scene.$cursor.track(this)
  }

  set $onmousemove (fn) {
    this.on('mousemove', fn)
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

  set $onmousedown (fn) {
    this.on('mousedown', fn)
  }

  set $onmouseup (fn) {
    this.on('mouseup', fn)
  }
  addTo (parent) {
    if (!this.$obj) this.throw('no THREE object binded')
    if (!parent.$obj) this.throw('cannot add to this parent')
    parent.$obj.add(this.$obj)

    if (parent.$obj instanceof Scene) {
      this._scene = parent
      this.$trackable = this._trackable
    } else {
      parent.$children.push(this)
      this._parent = parent
    }
    return this
  }

  removeFrom (parent) {
    if (!this.$obj) this.throw('no THREE object binded')
    if (!parent.$obj) this.throw('cannot add to this parent')
    parent.remove(this.$obj)

    if (parent.$obj instanceof Scene) {
      this._scene = null
    } else {
      parent._children = parent._children.filter(el => {
        return el !== this
      })
      this._parent = null
    }
    return this
  }

  get $position () {
    return this.$obj.position
  }

  set $position (arr) {
    if (arr instanceof Array) {
      this.$obj.position.x = arr[0] ? arr[0] : this.$obj.position.x
      this.$obj.position.y = arr[1] ? arr[1] : this.$obj.position.y
      this.$obj.position.z = arr[2] ? arr[2] : this.$obj.position.z
    }
  }

  get $rotation () {
    return this.$obj.rotation
  }

  set $rotation (arr) {
    if (arr instanceof Array) {
      this.$obj.rotation.x = arr[0] ? arr[0] : this.$obj.rotation.x
      this.$obj.rotation.y = arr[1] ? arr[1] : this.$obj.rotation.y
      this.$obj.rotation.z = arr[2] ? arr[2] : this.$obj.rotation.z
    }
  }

  get $scle () {
    return this.$obj.scale
  }

  set $scale (arr) {
    if (arr instanceof Array) {
      this.$obj.scale.x = arr[0] ? arr[0] : this.$obj.scale.x
      this.$obj.scale.y = arr[1] ? arr[1] : this.$obj.scale.y
      this.$obj.scale.z = arr[2] ? arr[2] : this.$obj.scale.z
    }
  }

  setPosition (arr) {
    this.$position = arr
    return this
  }

  setRotation (arr) {
    this.$rotation = arr
    return this
  }

  translate (axis, distance) {
    switch (axis) {
      case 'x':
      case 'X':
        this.$obj.translateX(distance)
        break
      case 'y':
      case 'Y':
        this.$obj.translateY(distance)
        break
      case 'z':
      case 'Z':
        this.$obj.translateZ(distance)
        break
    }
    return this
  }

  rotate (axis, radians, pivot) {
    // if (pivot) {
    //   let pivotPoint = new Object3D()
    //   pivotPoint.position.set(pivot.x, pivot.y, pivot.z)
    //   SceneUtils.attach(this.$obj, this.$scene.$obj, pivotPoint)
    //   pivotPoint.updateMatrixWorld()
    //   switch (axis) {
    //     case 'x':
    //     case 'X':
    //       pivotPoint.rotateX(radians)
    //       break
    //     case 'y':
    //     case 'Y':
    //       pivotPoint.rotateY(radians)
    //       break
    //     case 'z':
    //     case 'Z':
    //       pivotPoint.rotateZ(radians)
    //       break
    //   }
    //   SceneUtils.detach(this.$obj, pivotPoint, this.$scene.$obj)
    //   pivotPoint.updateMatrixWorld()
    // } else {
      switch (axis) {
        case 'x':
        case 'X':
          this.$obj.rotateX(radians)
          break
        case 'y':
        case 'Y':
          this.$obj.rotateY(radians)
          break
        case 'z':
        case 'Z':
          this.$obj.rotateZ(radians)
          break
      }
    // }

    return this
  }

  show () {
    this.$obj.visible = true
    return this
  }

  hide () {
    this.$obj.visible = false
    return this
  }
}

