<template>
  <div
    v-if="mainImage"
    :ref="mutableMainImage"
    class="image-container"
    :class="{'no-bg' : noBG, autoHeight : autoHeight }"
    v-touch:swipe="swipeHandler"
    alt="">
      <img :src="mutableMainImage">
  </div>
  <!-- :style="{backgroundImage: `url(${mainImage})`}" -->
</template>

<script>
import firebase from 'firebase/app';
import 'firebase/storage';
import { itemBus } from '@/components/Item/ItemHeader.vue';

export default {
  data() {
    return {
      mutableMainImage: this.mainImage,
    };
  },
  watch: {
    mainImage() {
      this.mutableMainImage = this.mainImage;
    },
  },
  props: {
    mainImage: {
      required: true,
    },
    noBG: {
      type: Boolean,
    },
    autoHeight: {
      type: Boolean,
    },
  },
  methods: {
    swipeHandler(direction) {
      itemBus.$emit('handleSwipe', direction);
    },
  },
  created() {
    if (this.mutableMainImage) {
      const storageRef = firebase.storage().ref();
      storageRef.child(this.mutableMainImage).getDownloadURL()
        .then((url) => {
          this.mutableMainImage = url;
          // itemBus.$emit('updateMain', url);
        });
    }
  },
};
</script>

<style lang="scss" scoped>
  .image-container {
    background-size: 0 0;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    order: 2;

    &.autoHeight {
      height: auto !important;
    }

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
