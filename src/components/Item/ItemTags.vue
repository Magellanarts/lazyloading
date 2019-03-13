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
  font-size: 20px;
  margin-bottom: 8px;
}

.button {
  border: none;
  background: none;
  box-shadow: 1px 1px 3px #555;
  border-radius: 4px;
  color: #555;
  padding: 4px 8px;
  cursor: pointer;
  outline: none;
  transition: all .15s linear;
  font-size: 13px;
  text-decoration: none;

  &:not(:last-child) {
    margin-right: 8px;
  }

  &:hover {
    background-color: #555;
    color: #fff;
  }
}
</style>
