<template>
  <div class="form-field">
    <div class="image-upload-container">
      <input
        class="u-visually-hidden"
        type="file"
        @change="handleUpload"
        ref="name"
        accept="image/*"
        :multiple="multiple ? 'multiple' : 'false'"
      />

      <div
        class="image-upload-button"
        :class="photoUploaded? 'has-upload': ''"
        @click="uploadButtonClick"
      >
        <img :ref="`${name}-img`">
        <span class="image-upload-button__label">
          Click to upload photo
        </span>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: How to handle multi-file upload?
//          Maybe multiple smaller upload boxes?
//          Each time one is added, another will
//          automatically pop up next to it

export default {
  data() {
    return {
      photoUploaded: false,
    };
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    multiple: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    handleUpload(event) {
      const upload = event.target;
      const reader = new FileReader();

      reader.onload = () => {
        // get upload result
        const dataURL = reader.result;
        // set photoUploaded to true to style Upload button
        this.photoUploaded = true;

        // insert uploaded photo
        this.$refs[`${this.name}-img`].src = dataURL;

        // tell parent component the image has been uploaded
        // the parent component will be passed the file
        this.$emit('uploadComplete', upload.files);
        console.log(upload.files);
        // this.item.mainImage = upload.files[0];

        // upload photo
        // this.uploadImage(upload.files[0]);
      };
      reader.readAsDataURL(upload.files[0]);
    },
    uploadButtonClick() {
      // console.log(this.name, this.$refs, this.$refs.name);
      this.$refs.name.click();
    },
  },
};
</script>

<style lang="scss" scoped>
.image-upload-container {
  position: relative;
}

.image-upload-button {
  box-shadow: 1px 1px 3px #555;
  border-radius: 4px;
  color: #555;
  padding: 4px 8px;
  box-sizing: border-box;
  width: 225px;
  height: 225px;
  cursor: pointer;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  overflow: hidden;

  &:after {
    content: '';
  }

  &.has-upload {
    .image-upload-button__label {
      color: #fff;
      text-shadow: 1px 1px 3px #555;
    }
  }
}

.image-upload-button__label {
  font-size: 13px;
  z-index: 10;
}

img {
  position: absolute;
  z-index: 5;
  scale: .4;
}
</style>
