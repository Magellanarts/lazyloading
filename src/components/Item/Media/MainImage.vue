<template>
  <div
    v-if="mainImage"
    :ref="mainImage"
    class="image-container"
    :class="noBG ? 'no-bg' : ''"

    alt="">
      <img :src="mainImage">
  </div>
  <!-- :style="{backgroundImage: `url(${mainImage})`}" -->
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/storage';
import { itemBus } from '@/views/item/slug.vue';

export default {
  props: {
    mainImage: {
      required: true,
    },
    noBG: {
      type: Boolean,
    },
  },
  created() {
    if (this.mainImage) {
      const storageRef = firebase.storage().ref();
      storageRef.child(this.mainImage).getDownloadURL()
        .then((url) => {
          itemBus.$emit('updateMain', url);
        });
    }
  },
};
</script>

<style lang="scss">
  .image-container {
    background-size: 0 0;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;

    order: 2;


    &.no-bg {
        background-size: 0 0;
        background-image: none !important;
    }

    @media screen and (min-width: 760px) {
      background-size: cover;
      display: flex;
      flex: 1;
      // height: auto;
      margin-bottom: 0;
      order: 0;

      img {
        display:  block !important;
        // visibility: hidden;
      }

      &.no-bg {
        background-size: 0 0;
        background-image: none !important;
        img {
          display: block;
        }
      }
    }

    @media screen and (min-width: 1100px) {
      height: 600px;
    }
  }
</style>
