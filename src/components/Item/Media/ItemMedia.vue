<template>
  <div>
    <MainImage
      v-if="mainImage"
      :mainImage="mainImage"
    />

  </div>
</template>

<script>
import MainImage from './MainImage.vue';

export default {
  props: {
    mainImage: {
      type: String,
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    MainImage,
  },
};
</script>
