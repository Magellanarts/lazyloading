<template>
  <div>
    <MainImage
      :mainImage="mainImage"
    />
    <Thumbnails
      v-if="thumbnails"
      :thumbnails="thumbnails"
    />
  </div>
</template>

<script>
import MainImage from './MainImage.vue';
import Thumbnails from './Thumbnails.vue';

export default {
  props: {
    mainImage: {
      type: String,
      required: true,
    },
    thumbnails: {
      type: Array,
      required: false,
    },
  },
  components: {
    MainImage,
    Thumbnails,
  },
};
</script>
