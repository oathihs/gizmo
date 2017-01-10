import {
  Scene as SceneNative,
  WebGLRenderer,
  Color
} from 'three'

import { PerspectiveCamera } from '../cameras/index'
import { Cursor } from './Cursor'

export class Scene {
  constructor () {
    this._obj = new SceneNative()
    this._data = {}
    this._elements = []
    this._pickable = []
    this._class = 'Scene'
  }

  // Getters/Setters
  get $class () {
    return this._class
  }

  get $obj () {
    return this._obj
  }

  get $dom () {
    return this._dom
  }

  get $data () {
    return this._data
  }

  get $elements () {
    return this._elements
  }

  get $camera () {
    return this._camera
  }

  set $camera (camera) {
    this._camera = camera
  }

  get $cursor () {
    return this._cursor
  }

  get $control () {
    return this._control
  }

  set $control (control) {
    this._control = control
  }

  get $renderer () {
    return this._renderer
  }

  set $renderer (renderer) {
    this._renderer = renderer
  }

  // Methods
  render () {
    if (this._control) this._control.update()
    window.requestAnimationFrame(this.render.bind(this))
    this._renderer.render(this._obj, this._camera.$obj)
  }

  init (config) {
    // pass dom element
    this._data.size = config.size ? config.size : {width: window.innerWidth, height: window.innerHeight}
    this._data.origin = {
      x: this._data.size.width / 2,
      y: this._data.size.height / 2,
      z: 0
    }
    this._data.color = config.color ? config.color : '#fafbfc'

    // camera
    this._camera = new PerspectiveCamera({
      camera: {
        fov: 50,
        aspect: this._data.size.width / this._data.size.height,
        near: 1,
        far: 1000
      },
      position: {
        x: 0,
        y: 150,
        z: 500
      }
    })

    // renderer
    if (config.canvas) {
      this._renderer = new WebGLRenderer({canvas: config.canvas, antialias: true})
      this._dom = config.canvas
    } else {
      this._renderer = new WebGLRenderer()
      document.body.appendChild(this._renderer.domElement)
      this._dom = this._render.domElement
    }
    this._renderer.setSize(this._data.size.width, this._data.size.height)
    this._renderer.setClearColor(new Color(this._data.color), 1.0)
    this._renderer.shadowMap.enabled = true

    // cursor
    this._cursor = new Cursor().install(this)
  }
}
