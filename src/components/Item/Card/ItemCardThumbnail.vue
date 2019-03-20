<template>
  <div class="image-wrap">
    <main-image
      :mainImage="mainImage"
      noBG
    />
  </div>
</template>

<script>
import MainImage from '@/components/Item/Media/MainImage.vue';

export default {
  props: {
    mainImage: {
      type: String,
      required: true,
    },
  },
  components: {
    MainImage,
  },
};
</script>

<style lang="scss" scoped>
.image-wrap {
  background: #fff;
}
</style>
