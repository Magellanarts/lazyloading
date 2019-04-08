<template>
  <div>
    <div class="item-header">
      <item-media
        v-if="mainImage"
        :mainImage="mainImage"
        :item="item"
      />
      <item-details
        :item="item"
      />
    </div>
    <!-- GMap
      v-if="item._geoloc"
      :lat="item._geoloc.lat"
      :lng="item._geoloc.lng"
    / -->
    <GmapMap
      v-if="item._geoloc"
      :center="{lat:item._geoloc.lat, lng:item._geoloc.lng}"
      :zoom="13"

      style="width: 100%; height: 400px"
    >
      <!-- GmapMarker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="center=m.position"
      / -->
    </GmapMap>

    <!-- Owner / -->
  </div>
</template>

<script>
import ItemMedia from '@/components/Item/Media/ItemMedia.vue';
import ItemDetails from '@/components/Item/ItemDetails.vue';
import GMap from '@/components/common/GMap.vue';
import { mapState, mapActions } from 'vuex';
import * as types from '@/store/types';

export default {
  components: {
    ItemMedia,
    ItemDetails,
    GMap,
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

.gmap {
  height: 400px;
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
