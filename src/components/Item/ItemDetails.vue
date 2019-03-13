<template>
<div>
  <h1>{{ item. name }}</h1>

  <ul>
      <li v-for="detail in item.details" :key="detail.label">
        {{ detail.label}}: {{ detail.value }}
      </li>
  </ul>

  <div class="description" v-html="item.description" />

  <item-tags
    :tags="item.tags"
  />
</div>
</template>

<script>
import ItemTags from './ItemTags.vue';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    ItemTags,
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 28px;
  margin-bottom: 40px;
}

ul,
p {
  margin-bottom: 20px;
}

li:not(:last-child) {
  margin-bottom: 10px;
}

.description {
  margin-bottom: 40px;
}
</style>
