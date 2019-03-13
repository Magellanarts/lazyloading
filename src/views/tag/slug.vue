<template>
  <div>
    <h1>Results for '{{ this.$route.params.slug }}'</h1>

    <ul>
      <router-link
        tag="li"
        v-for="item in items"
        :key="item.slug"
        :to="{name: 'item/slug', params: { slug: item.slug, docID: item.id}}"
      >
        {{ item.name }}
      </router-link>
    </ul>

    <button @click="$router.go(-1)">Go Back</button>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import * as types from '@/store/types';

export default {
  methods: {
    ...mapActions({
      getItems: types.GET_TAG_ITEMS,
    }),
  },
  computed: mapState({
    items: state => state.tags.items,
  }),
  created() {
    // grab list of items with this tag
    this.getItems(this.$route.params.slug);
  },
};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 32px;
  margin-bottom: 32px;
}

ul {
  margin-bottom: 40px;
}

li {
  cursor: pointer;
  display: block;
  box-shadow: 1px 3px 5px #666666;
  border-radius: 4px;
  padding: 12px 16px;

  &:hover {
    background: #666;
    color: #fff;
  }

  &:not(:last-child) {
    margin-bottom: 18px;
  }
}
</style>
