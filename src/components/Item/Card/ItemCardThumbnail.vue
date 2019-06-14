<template>
  <div class="image-wrap">
    <div
      class="image-container"
      :style="{backgroundImage: `url(${mainImageURL})`}"
    >
      <img :src="mainImageURL">
  </div>
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/storage';

export default {
  data() {
    return {
      mainImageURL: '',
    };
  },
  props: {
    mainImage: {
      type: String,
      required: true,
    },
  },
  created() {
    if (this.mainImage) {
      const storageRef = firebase.storage().ref();
      storageRef.child(this.mainImage).getDownloadURL()
        .then((url) => {
          this.mainImageURL = url;
        });
    }
  },
};
</script>

<style lang="scss">
.image-wrap {
  background: #fff;
}
  .image-container {
    background-size: 0 0;
    background-color: #fff;
    height: 240px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      // flex: 0;
      max-width: 100%;
      max-height: 100%;
      display: block;
    }

    &.no-bg {
        background-size: 0 0;
        background-image: none !important;
    }

    @media screen and (min-width: 640px) {
      background-size: cover;
      display: flex;
      flex: 1;
      height: 300px;
      background-position: center center;

      img {
        display: none;
      }

      &.no-bg {
        background-size: 0 0;
        background-image: none !important;
        img {
          display: block;
        }
      }
    }
  }
</style>
