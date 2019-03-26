<template>
  <div class="form-field">
    <div class="image-upload-container">
      <input
        class="u-visually-hidden"
        type="file"
        @change="handleUpload"
        ref="name"
        accept="image/*"
      />

      <div
        class="image-upload-button"
        :class="classObject"
        @click="uploadButtonClick"
      >
        <img :ref="`${name}-img`" :src="imgSrc">
        <span class="image-upload-button__label">
          Click to upload photo
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/storage';
// TODO: How to handle multi-file upload?
//          Maybe multiple smaller upload boxes?
//          Each time one is added, another will
//          automatically pop up next to it

export default {
  data() {
    return {
      photoUploaded: false,
      imgSrc: '',

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
    curImage: {
      type: String,
      required: false,
    },
  },
  computed: {
    classObject() {
      return {
        'has-upload': this.photoUploaded,
        multiple: this.multiple,
      };
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
        this.imgSrc = dataURL;

        // tell parent component the image has been uploaded
        // the parent component will be passed the file
        this.$emit('uploadComplete', upload.files);
      };
      reader.readAsDataURL(upload.files[0]);
    },
    uploadButtonClick() {
      this.$refs.name.click();
    },
  },
  mounted() {
    if (this.curImage) {
      // if a currentImage was passed in,
      // that means we are editing an existing item
      // grab the real url for the img and show
      const storageRef = firebase.storage().ref();
      storageRef.child(this.curImage).getDownloadURL()
        .then((url) => {
          this.imgSrc = url;
        });
    }
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

  &.multiple {
    width: 100px;
    height:  100px;
  }

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
