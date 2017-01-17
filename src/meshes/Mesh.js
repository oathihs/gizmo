import {
 Vector3,
 Color,
 MeshStandardMaterial,
 MeshLambertMaterial,
 Mesh as MeshNative,
 BoxHelper
} from 'three'

import 'src/utils/THREE.CSG'
import { Element } from '../core/index'

export class Mesh extends Element {
  constructor (config) {
    super()
    this._color = '#eaebec'
    if (!config) this.throw('parameter required')
    if (config && config.material) {
      this._color = config.material.color ? config.material.color : this._color
      switch (config.material.type) {
        case 'basic':
          this._material = new MeshStandardMaterial({color: this._color})
          break
        case 'lambert':
        default:
          this._material = new MeshLambertMaterial({color: this._color})
      }
      if (config.material.opacity) {
        this._material.transparent = true
        this._material.opacity = config.material.opacity
      }
    } else this._material = new MeshLambertMaterial({color: this._color})


    if (config && config.geometry && config.geometry.isGeometry) {
      this._geometry = config.geometry
      this._obj = new MeshNative(this._geometry, this._material)
      this._obj.name = 'mesh'
      this._obj.geometry.center()
      this._class = 'Mesh'
    }
    this._trackable = config.trackable || false
  }

  get $pivot () {
    let _pivot
    if (this._geometry.isGeometry) {
      this._geometry.computeBoundingBox()
      let x = (Number(this._geometry.boundingBox.min.x) + Number(this._geometry.boundingBox.max.x)) / 2
      let y = (Number(this._geometry.boundingBox.min.y) + Number(this._geometry.boundingBox.max.y)) / 2
      let z = (Number(this._geometry.boundingBox.min.z) + Number(this._geometry.boundingBox.max.z)) / 2
      _pivot = new Vector3(x, y, z)
      return _pivot
    }
  }

  // get bounding box
  get $boundingBox () {
    let box = new BoxHelper(this._obj)
    box.geometry.computeBoundingBox()
    return box.geometry.boundingBox
  }

  get $color () {
    return this._material.color
  }

  set $color (val) {
    this._color = val
    this._material.color = new Color(val)
  }

  get $opacity () {
    return this._material.opacity
  }

  set $opacity (val) {
    if (!this._material.transparent) this._material.transparent = true
    this._material.opacity = val
  }

  get $geometry () {
    return this._obj.geometry
  }

  set $geometry (val) {
    if (val.isGeometry) {
      this._geometry = val
      this._obj.geometry.dispose()
      this._obj.geometry = this._geometry
    }
  }

  get $material () {
    return this._obj._material
  }

  set $material (val) {
    if (val.isMaterial) {
      this._obj.material = val
      this._material = val
    }
  }

  // TODO: integrate Boolean operations
  union (target) {
    if (target instanceof Mesh) {
      let csg = THREE.CSG.fromMesh(this.$obj).union(THREE.CSG.fromMesh(target.$obj))
      return new Mesh({
        geometry: THREE.CSG.toGeometry(csg)
      })
    }
  }

  subtract (target) {
    if (target instanceof Mesh) {
      let csg = THREE.CSG.fromMesh(this.$obj).subtract(THREE.CSG.fromMesh(target.$obj))
      return new Mesh({
        geometry: THREE.CSG.toGeometry(csg)
      })
    }
  }

  intersect (target) {
    if (target instanceof Mesh) {
      let csg = THREE.CSG.fromMesh(this.$obj).intersect(THREE.CSG.fromMesh(target.$obj))
      return new Mesh({
        geometry: THREE.CSG.toGeometry(csg)
      })
    }
  }
}
