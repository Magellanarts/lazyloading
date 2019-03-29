<template>
  <div
    v-if="mainImage"
    :ref="mainImage"
    class="image-container"
    :class="noBG ? 'no-bg' : ''"
    :style="{backgroundImage: `url(${mainImage})`}"
    alt="">
      <img :src="mainImage">
  </div>
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/storage';
import { mapActions } from 'vuex';
import * as types from '@/store/types';

export default {
  props: {
    mainImage: {
      required: true,
    },
    noBG: {
      type: Boolean,
    },
  },
  methods: {
    ...mapActions({
      updateMain: types.UPDATE_MAIN_IMAGE,
    }),
  },
  created() {
    if (this.mainImage) {
      const storageRef = firebase.storage().ref();
      storageRef.child(this.mainImage).getDownloadURL()
        .then((url) => {
          this.updateMain(url);
        });
    }
  },
};
</script>

<style lang="scss">
  .image-container {
    background-size: 0 0;

    height: 460px;
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      flex: 0;
      max-width: 100%;
      max-height: 100%;
    }

    &.no-bg {
        background-size: 0 0;
        background-image: none !important;
    }

    @media screen and (min-width: 760px) {
      background-size: cover;
      display: flex;
      flex: 1;
      height: 300px;
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
