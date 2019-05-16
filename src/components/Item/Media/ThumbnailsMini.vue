<template>
  <div class="thumbnails-container">
    <div
      class="thumbnail"
      @click="updateMain(localMain, 0)"
      :class="{active: activeIndex === 0}"
    />
    <div
      v-for="(thumbnail, index) in thumbUrls"
      class="thumbnail"
      :class="{active: activeIndex === (index + 1)}"
      :data-index="index"
      :data-src="thumbnail"
      :key="thumbnail"
      @click="updateMain(thumbnail, (index + 1))"
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
      activeIndex: 0,
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
    updateMain(url, index) {
      this.activeIndex = index;
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
  text-align: center;
  margin: 16px 0;
}

.thumbnail {
  background: #ddd;
  border-radius: 50%;
  height: 15px;
  width: 15px;
  display: inline-block;
  cursor: pointer;
  margin: 0 5px;
  transition: .15s linear;

  &:hover {
    background: darken(#ddd, 20%);
  }

  &.active {
    background: #666;
  }
}
</style>
