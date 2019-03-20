<template>
  <router-link class="item-card" :to="`/item/${item.slug}`">
    <item-card-thumbnail
      :mainImage="item.mainImage"
    />
    <item-card-details
      :name="item.name"
    />
  </router-link>
</template>

<script>
import ItemCardThumbnail from './ItemCardThumbnail.vue';
import ItemCardDetails from './ItemCardDetails.vue';


export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    ItemCardThumbnail,
    ItemCardDetails,
  },
};
</script>

<style lang="scss" scoped>
.item-card {
  display: block;
  box-shadow: 1px 1px 3px #ccc;
  margin-bottom: 32px;
}
</style>
