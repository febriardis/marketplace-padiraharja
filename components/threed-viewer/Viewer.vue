<template lang="pug">
  .viewer.position-relative
    .viewer-object(id="object-viewer")
  
    .progress-bar-object(v-if="isModelLoading")
      .text-center
        el-progress(type="circle" color="#e7a84c" :stroke-width="3" :width="50" :percentage="loadProgress === 100 ? loadProgress - 10 : loadProgress")
      
</template>

<script>
const BACKGROUND_COLOR = '#ffffff'

let theModel
let initRotate = 0
let requestAnimationId

export default {
  props: {
    isModelChanged: {
      type: Boolean,
      default: false,
    },
    isModelLoaded: {
      type: Boolean,
      default: false,
    },
    modelPath: {
      type: String,
      default: null,
    },
    fabricData: {
      type: Object,
      default: null,
    },
    colorData: {
      type: Object,
      default: null,
    },
    optionsData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      loadProgress: 0,
      isLoading: true,
      camera: null,
      scene: null,
      renderer: null,
      controls: null,
      isModelLoading: false,
      isModelError: false,
    }
  },

  computed: {
    threedPath() {
      let output = null
      if (this.modelPath) {
        const path = this.modelPath.split('/')
        output = `${path[0]}//${path[2]}/${path[3]}/`
      }
      return output
    },
    threedFile() {
      let output = null
      if (this.modelPath) {
        const path = this.modelPath.split('/')
        output = path[4]
      }
      return output
    },
  },

  watch: {
    fabricData: {
      deep: true,
      handler(newValue) {
        this.selectSwatch(newValue)
      },
    },
    colorData: {
      deep: true,
      handler(newValue) {
        this.selectSwatch(newValue)
      },
    },
    modelPath(newValue) {
      if (newValue) {
        this.init()
        this.animate()
      }
    },
    isModelChanged(newValue) {
      if (newValue) {
        this.dispose()
      }
    },
    isModelLoading(newValue) {
      if (newValue) {
        this.$emit('update:isModelLoaded', true)
      } else {
        this.$emit('update:isModelLoaded', false)
      }
    },
  },

  mounted() {
    if (this.modelPath) {
      this.init()
      this.animate()
    }
  },

  methods: {
    init() {
      // Init the scene
      this.scene = new this.$THREE.Scene()
      // Set background
      this.scene.background = new this.$THREE.Color(BACKGROUND_COLOR)
      this.scene.fog = new this.$THREE.Fog(BACKGROUND_COLOR, 20, 100)

      // Init the renderer
      const objectViewer = document.querySelector('#object-viewer')
      requestAnimationId = undefined
      this.renderer = new this.$THREE.WebGLRenderer({ antialias: true })
      this.renderer.shadowMap.enabled = true
      this.renderer.setPixelRatio(objectViewer.devicePixelRatio)
      objectViewer.appendChild(this.renderer.domElement)

      // Add a camerra
      this.camera = new this.$THREE.PerspectiveCamera(
        35,
        objectViewer.innerWidth / objectViewer.innerHeight,
        1,
        10000
      )

      this.camera.position.set(0, 0, 8)
      this.camera.zoom = 1.4
      // this.camera.position.set(x, y, z)

      // Initial material
      const INITIAL_MTL = new this.$THREE.MeshPhongMaterial({
        color: '#f1f1f1',
        shininess: 0,
        side: this.$THREE.DoubleSide,
      })

      const INITIAL_MAP = []

      this.optionsData.forEach((element) => {
        INITIAL_MAP.push({
          childID: element,
          mtl: INITIAL_MTL,
        })
      })

      this.isModelLoading = true

      // Init the object loader
      const loader = new this.$GLTFLoader().setPath(this.threedPath)

      // Optional: Provide a DRACOLoader instance to decode compressed mesh data
      const dracoLoader = new this.$DRACOLoader()
      dracoLoader.setDecoderPath(
        // '/node_modules/three/examples/js/libs/draco/gltf/'
        'https://www.gstatic.com/draco/versioned/decoders/1.4.1/'
        // 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/js/libs/draco/'
      )
      dracoLoader.preload()
      // dracoLoader.setDecoderConfig({ type: 'js' })
      loader.setDRACOLoader(dracoLoader)

      loader.load(
        this.threedFile,
        (gltf) => {
          theModel = gltf.scene

          theModel.traverse((o) => {
            if (o.isMesh) {
              o.castShadow = true
              o.receiveShadow = true
            }
          })

          // Set the models initial scale
          theModel.scale.set(2, 2, 2)

          // Offset the y position a bit
          theModel.position.y = -1.8

          // Set initial textures
          for (const object of INITIAL_MAP) {
            this.initColor(theModel, object.childID, object.mtl)
          }

          // Add the model to the scene
          this.scene.add(theModel)

          this.isModelLoading = false

          // Remove the loader
          this.isLoading = false

          this.selectSwatch(this.fabricData)
          this.selectSwatch(this.colorData)
        },

        (xhr) => {
          const load = (xhr.loaded / xhr.total) * 100
          this.loadProgress = Math.round(load)
          // called while loading is progressing
          // console.log(
          //   `this.threedFile ${this.threedFile}, ${
          //     (xhr.loaded / xhr.total) * 100
          //   }% loaded`
          // )
        },

        (error) => {
          // eslint-disable-next-line
          console.error('error', error)
          this.$message.error('Oops, something wrong, object failed to load.')
          this.isModelLoading = false
          this.dispose()
        }
      )

      // Add lights
      const hemiLight = new this.$THREE.HemisphereLight(
        '#ffffff',
        '#ffffff',
        0.1
      )
      // hemiLight.position.set(0, 0, 0)
      hemiLight.position.set(0, 50, 0)
      // Add hemisphere light to scene
      this.scene.add(hemiLight)

      const dirLight1 = new this.$THREE.DirectionalLight('#ffffff', 0.8)
      dirLight1.position.set(-4, 4, 4)
      dirLight1.shadow.mapSize = new this.$THREE.Vector2(1024, 1024)
      // Add directional Light to scene
      this.scene.add(dirLight1)

      const dirLight2 = new this.$THREE.DirectionalLight('#ffffff', 0.8)
      dirLight2.position.set(4, 4, -4)
      dirLight2.shadow.mapSize = new this.$THREE.Vector2(1024, 1024)
      // Add directional Light to scene
      this.scene.add(dirLight2)

      const dirLight3 = new this.$THREE.DirectionalLight('#ffffff', 0.8)
      dirLight3.position.set(4, 4, 4)
      dirLight3.shadow.mapSize = new this.$THREE.Vector2(1024, 1024)
      // Add directional Light to scene
      this.scene.add(dirLight3)

      const dirLight4 = new this.$THREE.DirectionalLight('#ffffff', 0.8)
      dirLight4.position.set(-4, 4, -4)
      dirLight4.shadow.mapSize = new this.$THREE.Vector2(1024, 1024)
      // Add directional Light to scene
      this.scene.add(dirLight4)

      // Floor
      const floorGeometry = new this.$THREE.PlaneGeometry(5000, 5000, 1, 1)
      const floorMaterial = new this.$THREE.MeshPhongMaterial({
        color: '#fafafa',
        shininess: 0,
      })
      const floor = new this.$THREE.Mesh(floorGeometry, floorMaterial)
      floor.receiveShadow = true
      floor.rotation.x = -0.5 * Math.PI
      floor.position.y = -2
      this.scene.add(floor)

      // Add controls
      this.controls = new this.$OrbitControls(
        this.camera,
        this.renderer.domElement
      )
      this.controls.minDistance = 0
      this.controls.maxDistance = Infinity
      this.controls.minPolarAngle = 0 // Math.PI / 2
      this.controls.maxPolarAngle = Math.PI // Math.PI / 3
      this.controls.enableDamping = true
      this.controls.enablePan = false
      this.controls.dampingFactor = 0.1
      this.controls.autoRotate = false // Toggle this if you'd like the chair to automatically rotate
      this.controls.autoRotateSpeed = 0.2 // 30
    },

    dispose() {
      // eslint-disable-next-line
      // console.log('dispose renderer!', this.renderer)
      const _this = this
      _this.stopRender()
      if (_this.renderer) {
        _this.renderer.renderLists.dispose()
        _this.renderer.dispose()
        _this.controls.dispose()
        _this.scene.traverse((object) => {
          if (!object.isMesh) return
          // eslint-disable-next-line
          // console.log('dispose geometry!')
          object.geometry.dispose()
          if (object.material.isMaterial) {
            _this.cleanMaterial(object.material)
          } else {
            // an array of materials
            for (const material of object.material)
              _this.cleanMaterial(material)
          }
        })
        _this.renderer.domElement.parentElement.removeChild(
          _this.renderer.domElement
        )
      }
      // _this.scene = null
      // _this.camera = null
      // _this.renderer = null
      // _this.loadProgress = 0
    },

    cleanMaterial(material) {
      // eslint-disable-next-line
      // console.log('dispose material!')
      material.dispose()

      // dispose textures
      for (const key of Object.keys(material)) {
        const value = material[key]
        if (value && typeof value === 'object' && 'minFilter' in value) {
          // eslint-disable-next-line
          // console.log('dispose texture!')
          value.dispose()
        }
      }
    },

    stopRender() {
      if (requestAnimationId) {
        cancelAnimationFrame(requestAnimationId)
      }
      requestAnimationId = undefined
    },

    // Function - Add the textures to the models
    initColor(parent, type, mtl) {
      parent.traverse((o) => {
        if (o.isMesh) {
          if (o.name.includes(type)) {
            o.material = mtl
            o.nameID = type // Set a new property to identify this object
          }
        }
      })
    },

    animate() {
      requestAnimationId = requestAnimationFrame(this.animate)
      this.controls.update()
      this.renderer.render(this.scene, this.camera)

      if (this.resizeRendererToDisplaySize(this.renderer)) {
        const canvas = this.renderer.domElement
        this.camera.aspect = canvas.clientWidth / canvas.clientHeight
        this.camera.updateProjectionMatrix()
      }

      if (theModel !== null && this.isLoading === false) {
        this.initialRotation()
      }
    },

    initialRotation() {
      initRotate++
      if (initRotate <= 120) {
        theModel.rotation.y += Math.PI / 60
      } else {
        this.isLoading = true
      }
    },

    resizeRendererToDisplaySize(renderer) {
      const canvas = renderer.domElement
      const width = window.innerWidth
      const height = window.innerHeight
      const canvasPixelWidth = canvas.width / window.devicePixelRatio
      const canvasPixelHeight = canvas.height / window.devicePixelRatio

      const needResize =
        canvasPixelWidth !== width || canvasPixelHeight !== height
      if (needResize) {
        renderer.setSize(width, height, false)
      }
      return needResize
    },

    // select swatch
    selectSwatch(data) {
      const color = data.data
      let newMaterial
      if (color.file) {
        const img = color.file.file_url
        const txt = new this.$THREE.TextureLoader().load(img)

        // txt.repeat.set(color.size[0], color.size[1], color.size[2])
        // txt.repeat.set(4, 4)
        txt.wrapS = this.$THREE.RepeatWrapping
        txt.wrapT = this.$THREE.RepeatWrapping
        txt.flipY = false

        newMaterial = new this.$THREE.MeshPhongMaterial({
          map: txt,
          shininess: 0,
          side: this.$THREE.DoubleSide,
        })
      } else {
        newMaterial = new this.$THREE.MeshPhongMaterial({
          color: color.color,
          shininess: 0,
          side: this.$THREE.DoubleSide,
        })
      }
      this.setMaterial(theModel, data.id, newMaterial)
    },

    setMaterial(parent, type, mtl) {
      if (parent) {
        parent.traverse((o) => {
          if (o.isMesh && o.nameID != null) {
            if (o.nameID === type) {
              o.material = mtl
            }
          }
        })
      }
    },
  },
}
</script>

<style lang="scss">
.viewer-object {
  canvas {
    // border: 1px solid red;
    // margin-top: -100px;
    width: 100%;
    height: 400px;
    @media (min-width: 768px) {
      height: 620px;
    }
    &:focus {
      outline: unset !important;
    }
  }
}

.progress-bar-object {
  position: absolute;
  width: 100%;
  top: 50%;
  bottom: 50%;
}
</style>
