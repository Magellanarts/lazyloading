<template>
  <div
    :ref="mainImage"
    class="image-container"
    :class="noBG ? 'no-bg' : ''"
    :style="{backgroundImage: `url(${bgImage})`}"
    alt="">
      <img :src="bgImage">
    </div>
</template>

<script>
export default {
  props: {
    mainImage: {
      type: String,
      required: true,
    },
    noBG: {
      type: Boolean,
    },
  },
  computed: {
    bgImage() {
      if (this.mainImage) {
        return require(`@/assets/img/placeholder/${this.mainImage}`);
      }
      return '';
    },
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
