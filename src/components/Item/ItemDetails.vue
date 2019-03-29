<template>
<div>
  <h1>{{ item.name }}</h1>

  <h2>${{ item.dailyPrice }}</h2>
  <h5>Deposit: {{ item.deposit }}</h5>

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
  margin-bottom: 26px;
}

h2 {
  margin-bottom: 6px;
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
