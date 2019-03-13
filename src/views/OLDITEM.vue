<template>
    <div>
        <div class="item-header">
          <item-media 
            :mainImage="mainImage"
            :thumbnails="item.thumbnails"
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
import { mapState } from 'vuex';
import { mapActions } from 'vuex';
import { db } from '../main';
import * as types from '@/store/types';

export default {
  components: {
    ItemMedia,
    ItemDetails,
  },
  methods: {
    ...mapActions({
      getData: types.GET_ITEM_DATA,
      updateMain: types.UPDATE_MAIN_IMAGE,
    }),
  },
  computed: mapState({
    item: state => state.item.curItem,
    mainImage: state => state.item.mainImage
  }),
  created() {
    // grab data from firestore for this item
    // data gets stored in store
    // item/curItem contains all item info
    // item/mainImage contains the main image
    // - this is store separately so thumbnail 
    // - swapping can be done easily
    this.getData(db.collection('items').doc('UODujNYfnu679DtJLj1Q'))
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

    > :last-child {
      flex: 1;
      padding-left: 5%;
    }
  }
}
</style>
