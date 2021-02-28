<template>
  <div
    class="upload-image"
    :class="{ center: isCenter }"
    :style="{ width: width }"
  >
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
          <button
            class="button-image"
            type="button"
            @click="$refs.file.click()"
          >
            Pilih {{ label }}
          </button>
        </div>
      </div>
      <button
        v-if="imageUrl"
        class="button-image mt-2"
        type="button"
        @click="$refs.file.click()"
      >
        Pilih {{ label }}
      </button>
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
      default: 'Gambar',
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
      default: 'https://via.placeholder.com/150',
    },
  },
  data: () => ({
    imageUrl: null,
  }),
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
.button-image {
  width: 100%;
  padding: 8px 12px;
  background-color: #fff;
  color: rgba(0, 0, 0, 0.54);
  cursor: pointer;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
