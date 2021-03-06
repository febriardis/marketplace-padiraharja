<template>
  <div
    class="upload-image"
    :class="{ center: isCenter }"
    :style="{ width: width }"
  >
    <div class="clear"></div>
    <div class="input-icon">
      <div class="preview-container" :style="{ width: width, height: height }">
        <img
          v-if="imageUrl"
          :src="imageUrl"
          width="100%"
          height="100%"
          alt=""
        />
        <div
          v-else
          class="d-flex justify-content-center align-items-center"
          style="height: 100%"
        >
          <el-button plain size="small" @click="$refs.file.click()">
            Choose {{ label }}
          </el-button>
        </div>
      </div>
      <el-button
        v-if="imageUrl"
        plain
        size="small"
        class="w-100 mt-1"
        @click="$refs.file.click()"
      >
        Change {{ label }}
      </el-button>
      <input
        v-show="false"
        ref="file"
        size="2"
        accept="image/jpeg,image/png"
        type="file"
        @change="onFileChange"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isCenter: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: 'Image',
    },
    width: {
      type: String,
      default: '100%',
    },
    height: {
      type: String,
      default: '300px',
    },
    previewImage: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    imageUrl: null,
  }),
  watch: {
    previewImage(value) {
      this.imageUrl = value
    },
  },
  mounted() {
    this.imageUrl = this.previewImage
  },
  methods: {
    onFileChange(e) {
      this.$emit('input', e.target.files[0])
      this.imageUrl = e.target.files[0]
        ? URL.createObjectURL(e.target.files[0])
        : ''
    },
  },
}
</script>

<style lang="scss">
.upload-image {
  &.center {
    margin: 0 auto;
  }
  .input-icon {
    // text-align: center;
    .preview-container {
      border: 1px solid #ababab;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
