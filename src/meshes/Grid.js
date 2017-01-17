import { GridHelper } from 'three'
import { Element } from '../core/index'

export class Grid extends Element {
  constructor (size, step, colorCenterLine, colorGrid) {
    super()
    this._colors = {}
    if (colorCenterLine) {
      this._colors.colorCenterLine = colorCenterLine
      this._colors.colorGrid = colorCenterLine
    }
    if (colorGrid) this._colors.colorGrid = colorGrid
    this._size = size
    this._step = step
    this._divisions = this._size / this._step
    this._scene = null
    this._obj = new GridHelper(size / 2, this._divisions, this._colors.colorCenterLine, this._colors.colorGrid)
    this._obj.name = 'grid'
  }

  get $obj () {
    return this._obj
  }

  get $scene () {
    return this._scene
  }

  get $size () {
    return this._size
  }

  set $size (val) {
    this._size = val
    this.update()
  }

  get $step () {
    return this._step
  }

  set $step (val) {
    this._step = val
    this.update()
  }

  get $colors () {
    return this._colors
  }

  set $colors (val) {
    if (val instanceof Array) {
      this._colors.colorCenterLine = val[0]
      this._colors.colorGrid = val[1]
    } else {
      this._colors.colorCenterLine = this._colors.colorGrid = val
    }
    this.update()
  }

  update () {
    this._divisions = this._size / this._step
    let helper = new GridHelper(this._size / 2, this._divisions, this._colors.colorCenterLine, this._colors.colorGrid)
    this._obj.geometry = helper.geometry

    return this
  }
}
