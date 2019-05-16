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
import firebase from 'firebase/app';
import 'firebase/storage';
import { itemBus } from '@/views/item/slug.vue';

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
    updateMain(url) {
      itemBus.$emit('updateMain', url);
    },
  },
  created() {
    const storageRef = firebase.storage().ref();

    this.thumbnails.forEach((thumb) => {
      storageRef.child(thumb).getDownloadURL()
        .then((url) => {
          this.thumbUrls.push(url);
        });
    });

    storageRef.child(this.mainImage).getDownloadURL()
      .then((url) => {
        this.localMain = url;
      });
  },
};
</script>

<style lang="scss" scoped>
.thumbnails-container {
  font-size: 0;
  background: #eee;
}

.thumbnail {
    background-size: cover;
    height: 150px;
    width: 150px;
    display: inline-block;
    cursor: pointer;
}
</style>
