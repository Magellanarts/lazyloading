<template>
  <div class="thumbnails-container">
    <div
      class="thumbnail"
      :style="{backgroundImage: `url(${localMain})`}"
      @click="updateMain(localMain)"
    />
    <div
      v-for="thumbnail in thumbUrls"
      class="thumbnail"
      :data-src="thumbnail"
      :key="thumbnail"
      :style="{backgroundImage: `url(${thumbnail})`}"
      @click="updateMain(thumbnail)"
    >
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import * as types from '@/store/types';
import firebase from 'firebase/app';
import 'firebase/storage';

export default {
  data() {
    return {
      thumbUrls: [],
      localMain: '',
    };
  },
  props: {
    thumbnails: {
      type: Array,
      required: false,
    },
    mainImage: {
      type: String,
      required: false,
    },
  },
  methods: {
    ...mapActions({
      updateMain: types.UPDATE_MAIN_IMAGE,
    }),
  },
  created() {
    const storageRef = firebase.storage().ref();
    for (const thumb of this.thumbnails) {
      storageRef.child(thumb).getDownloadURL()
        .then((url) => {
          this.thumbUrls.push(url);
        });
    }

    storageRef.child(this.mainImage).getDownloadURL()
      .then((url) => {
        this.localMain = url;
      });
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
