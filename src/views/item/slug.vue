<template>
  <div>
    <item-header
      v-if="item"
      :item="item"
    />

    <item-details
      v-if="item && user"
      :item="item"
      :user="user"
    />

    <item-map
      v-if="item"
      :item="item"
    />

    <item-reviews
      v-if="item && item.reviews && item.totalScore"
      :reviewIds="item.reviews"
      :score="item.totalScore / item.reviews.length"
    />
  </div>
</template>

<script>
import ItemDetails from '@/components/Item/ItemDetails.vue';
import ItemMap from '@/components/Item/ItemMap.vue';
import ItemHeader from '@/components/Item/ItemHeader.vue';
import ItemReviews from '@/components/Item/ItemReviews.vue';

import {
  GET_ITEM_DATA_BY_DOC_ID,
  GET_ITEM_DATA_BY_NAME,
} from '@/actions/item';

import { db } from '@/auth';

export default {
  data() {
    return {
      item: null,
      user: null,
      mainImage: '',
    };
  },
  components: {
    ItemHeader,
    ItemDetails,
    ItemMap,
    ItemReviews,
  },
  async created() {
    // grab data from firestore for this item
    // data gets stored in store
    // item/curItem contains all item info
    // item/mainImage contains the main image
    // - this is store separately so thumbnail
    // - swapping can be done easily
    if (this.$route.params.docID) {
      this.item = await GET_ITEM_DATA_BY_DOC_ID(this.$route.params.docID);
    } else {
      this.item = await GET_ITEM_DATA_BY_NAME(this.$route.params.slug);

      // get user info for this item
      db.collection('users').doc(this.item.user).get()
        .then((res) => {
          this.user = res.data();
        });
    }
  },
};
</script>
