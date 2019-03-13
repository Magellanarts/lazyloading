<template>
  <div class="thumbnails-container">
    <div
      v-for="thumbnail in thumbnails"
      class="thumbnail"
      :data-src="thumbnail.name"
      :key="thumbnail.src"
      :style="{backgroundImage: `url(${imgSrc(thumbnail.name)})`}"
      @click="updateMain(thumbnail.name)"
    >
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import * as types from '@/store/types';

export default {
  props: {
    thumbnails: {
      type: Array,
      required: false,
    },
  },
  methods: {
    ...mapActions({
      updateMain: types.UPDATE_MAIN_IMAGE,
    }),
    imgSrc(name) {
      return require(`@/assets/img/placeholder/${name}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.thumbnail-container {
  font-size: 0;
}

.thumbnail {
    background-size: cover;
    height: 50px;
    width: 50px;
    display: inline-block;
    cursor: pointer;
}
</style>
