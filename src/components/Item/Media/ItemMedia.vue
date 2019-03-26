<template>
  <div>
    <MainImage
      v-if="mainImage"
      :mainImage="mainImage"
    />
    <Thumbnails
      v-if="item.otherImages"
      :mainImage="item.mainImage"
      :thumbnails="item.otherImages"
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
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    MainImage,
    Thumbnails,
  },
};
</script>
