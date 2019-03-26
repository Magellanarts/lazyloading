<template>
  <div class="form-field">
    <input
        class="u-visually-hidden"
        type="file"
        @change="handleUpload"
        ref="name"
        accept="image/*"
      />
    <button type="button" @click="uploadButtonClick">Add Image</button>

    <div class="images">
      <div v-for="(image, index) in localImages" :key="`image-${index}`" class="mfu-image-container">
        <img :src="image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numImages: this.images.length,
      photoUploaded: false,
      imgSrc: '',
      localImages: this.images,
    };
  },
  components: {

  },
  props: {
    images: {
      required: true,
    },
  },
  methods: {
    handleUpload(event) {
      const upload = event.target;
      const reader = new FileReader();

      reader.onload = () => {
        // get upload result
        const dataURL = reader.result;

        this.numImages += this.numImages;


        // insert uploaded photo
        this.localImages.push(dataURL);

        // tell parent component the image has been uploaded
        // the parent component will be passed the file
        console.log(upload.files);
        this.$emit('uploadComplete', upload.files);
      };
      reader.readAsDataURL(upload.files[0]);
    },
    uploadButtonClick() {
      this.$refs.name.click();
    },
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

  &:not(:first-child) {
    margin-left: 8px;
  }
}
img {
  position: absolute;
  z-index: 5;
  scale: 1.25;
  top: 0;
  bottom: 0;
  max-width: 100%;
  left: -10%;
  right: -10%;
  margin: auto;
}

</style>
