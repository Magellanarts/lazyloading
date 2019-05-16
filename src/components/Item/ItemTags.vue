<template>
  <div>
    <h3>Tags</h3>
    <div>
      <router-link
        class="button"
        v-for="(value, key) in tags" :key="key" :to="`/tag/${key}`"
      >
        {{ key }}
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Object,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
h3 {
  font-weight: 700;
  font-size: 16px;
  margin-bottom: 10px;
}
</style>
