<template>
  <div>
    <div class="item-header">
      <item-media
        :mainImage="mainImage"
        :item="item"
      />
      <item-details
        :item="item"
      />
    </div>
    <!-- Owner / -->
  </div>
</template>

<script>
import ItemMedia from '@/components/Item/Media/ItemMedia.vue';
import ItemDetails from '@/components/Item/ItemDetails.vue';
import { mapState, mapActions } from 'vuex';
import * as types from '@/store/types';

export default {
  components: {
    ItemMedia,
    ItemDetails,
  },
  methods: {
    ...mapActions({
      getDataByDocID: types.GET_ITEM_DATA_BY_DOC_ID,
      getDataByName: types.GET_ITEM_DATA_BY_NAME,
      updateMain: types.UPDATE_MAIN_IMAGE,
    }),
  },
  computed: mapState({
    item: state => state.item.curItem,
    mainImage: state => state.item.mainImage,
  }),
  created() {
    // grab data from firestore for this item
    // data gets stored in store
    // item/curItem contains all item info
    // item/mainImage contains the main image
    // - this is store separately so thumbnail
    // - swapping can be done easily
    if (this.$route.params.docID) {
      this.getDataByDocID(this.$route.params.docID);
    } else {
      this.getDataByName(this.$route.params.slug);
    }
  },
  destroyed() {
    this.updateMain(null);
  },
};
</script>

<style lang="scss" scoped>
.item-header {
  margin: 20px 0;
  line-height: 1.5;
}

@media screen and (min-width: 760px) {
  .item-header {
    display: flex;
    justify-content: space-between;

    > :first-child {
      flex: 1;
      max-width: 300px;
    }

    > :last-child {
      flex: 1;
      padding-left: 5%;
    }
  }
}
</style>
