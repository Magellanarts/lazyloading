<template>
  <div class="form-field">
    <input
        class="u-visually-hidden"
        type="file"
        @change="handleUpload"
        ref="name"
        accept="image/*"
        multiple
      />
    <button type="button" @click="uploadButtonClick">Add Images</button>

    <div v-if="localURLs" class="images">
      <div
        v-for="(image, index) in localURLs"
        :key="`image-${index}`"
        class="mfu-image-container"
        @click="deletePhoto(image.url, image.image)"
        :data-index="image.index"
      >
        <img :src="image.url" />
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/storage';

export default {
  data() {
    return {
      photoUploaded: false,
      imgSrc: '',
      localImages: this.images,
      localURLs: [],
    };
  },
  props: {
    images: {
      required: true,
    },
  },
  methods: {
    handleUpload(event) {
      const upload = event.target;

      // eslint-disable-next-line no-restricted-syntax
      for (const file of upload.files) {
        const reader = new FileReader();
        reader.onload = () => {
          // get upload result
          const dataURL = reader.result;

          // insert uploaded photo
          this.localURLs.push({ url: dataURL, image: dataURL });

          // tell parent component the image has been uploaded
          // the parent component will be passed the file and dataURL
          this.$emit('uploadComplete', { file, dataURL });
        };

        reader.readAsDataURL(file);
      }
    },
    uploadButtonClick() {
      this.$refs.name.click();
    },
    deletePhoto(url, image) {
      this.localURLs = this.localURLs.filter(e => e.url !== url);
      this.$emit('imageDeleted', image);
    },
  },
  mounted() {
    // this.localURLs = this.localImages.slice();
    if (this.images) {
      // if there are already images,
      // that means we are editing an existing item
      // grab the real url for the img and show
      const storageRef = firebase.storage().ref();

      this.localImages.forEach((image) => {
        storageRef.child(image).getDownloadURL()
          .then((url) => {
            this.localURLs.push({ url, image });
          });
      });
    } else {
      this.localURLs = this.localImages.slice();
    }
  },
};
</script>

<style lang="scss" scoped>
.images {
  display: flex;
  margin-top: 16px;
}
.mfu-image-container {
  box-shadow: 1px 1px 3px #555;
  border-radius: 4px;
  padding: 4px 8px;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  cursor: pointer;
  position: relative;
  display: inline-block;
  overflow: hidden;
  max-width: 100px;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
    background-color: rgba(#ff0015, .4);
    opacity: 0;
  }

  &:not(:first-child) {
    margin-left: 8px;
  }

  &:hover {
    &:after {
      opacity: 1;
    }
  }
}
img {
  position: absolute;
  z-index: 2;
  scale: 1.25;
  top: 0;
  bottom: 0;
  max-width: 100%;
  left: -10%;
  right: -10%;
  margin: auto;
}

</style>
