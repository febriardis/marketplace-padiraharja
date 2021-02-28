import Vue from 'vue'
import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

Vue.use({
  install(Vue, options) {
    Vue.prototype.$THREE = THREE
    Vue.prototype.$FBXLoader = FBXLoader
    Vue.prototype.$GLTFLoader = GLTFLoader
    Vue.prototype.$DRACOLoader = DRACOLoader
    Vue.prototype.$OrbitControls = OrbitControls
  },
})
