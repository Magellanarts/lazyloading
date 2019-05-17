<template>
  <div class="thumbnails-container">
    <div
      class="thumbnail js-thumbnail"
      @click="updateMain(localMain, 0)"
      :class="{active: activeIndex === 0}"
      data-index="0"
    />
    <div
      v-for="(thumbnail, index) in thumbUrls"
      class="thumbnail js-thumbnail"
      :class="{active: activeIndex === (index + 1)}"
      :data-index="(index + 1)"
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
import { itemBus } from '@/components/Item/ItemHeader.vue';

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
    parentSwipe(direction) {
      if (direction === 'left') {
        const nextThumb = this.activeIndex + 1;
        // check to make sure we can still swipe to left
        if (nextThumb <= this.thumbUrls.length) {
          document.querySelector(`.js-thumbnail[data-index="${this.activeIndex + 1}"]`).click();
        } else {
        // if not: switch to first
          document.querySelector('.js-thumbnail[data-index="0"]').click();
        }
        return false;
      }

      if (direction === 'right') {
        const prevThumb = this.activeIndex - 1;
        if (prevThumb >= 0) {
          document.querySelector(`.js-thumbnail[data-index="${this.activeIndex - 1}"]`).click();
        } else {
          document.querySelector(`.js-thumbnail[data-index="${this.thumbUrls.length}"]`).click();
        }
        return false;
      }
      return false;
    },
    updateMain(url, index) {
      console.log(url);
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
