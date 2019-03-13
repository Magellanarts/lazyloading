<template>
  <div
    class="image"
    :style="{backgroundImage: `url(${bgImage})`}"
    alt="Volleyball"></div>
</template>

<script>
export default {
  props: {
    mainImage: {
      type: String,
      required: true,
    },
  },
  computed: {
    bgImage() {
      if(this.mainImage) {
        return require(`@/assets/img/placeholder/${this.mainImage}`);
      } else {
        return '';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.image {
  width: 300px;
  height: 300px;
  background-size: cover;
  margin-bottom: 8px;
}
</style>
