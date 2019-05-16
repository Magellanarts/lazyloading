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
    <!-- div ref="card"></div -->
  </div>
</template>

<script>
import ItemDetails from '@/components/Item/ItemDetails.vue';
import ItemMap from '@/components/Item/ItemMap.vue';
import ItemHeader from '@/components/Item/ItemHeader.vue';

import Vue from 'vue';

import {
  GET_ITEM_DATA_BY_DOC_ID,
  GET_ITEM_DATA_BY_NAME,
} from '@/actions/item';

import { db } from '@/auth';

export const itemBus = new Vue();

const stripe = Stripe('pk_test_tiPyFmOrxJ1hulX0WdvY1X2E00JOK6AKFA');
const elements = stripe.elements();
let card;

const style = {
  base: {
    color: '#32325d',
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: 'antialiased',
    fontSize: '16px',
    '::placeholder': {
      color: '#aab7c4',
    },
  },
  invalid: {
    color: '#fa755a',
    iconColor: '#fa755a',
  },
};


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
  },
  methods: {
    setMain(val) {
      this.item.mainImage = val;
    },
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
      // await this.getDataByDocID(this.$route.params.docID);
    } else {
      this.item = await GET_ITEM_DATA_BY_NAME(this.$route.params.slug);

      // get user info for this item
      db.collection('users').doc(this.item.user).get()
        .then((res) => {
          this.user = res.data();
        });
    }
  },
  mounted() {
  //  card = elements.create('card', { style });
  //  card.mount(this.$refs.card);
    itemBus.$on('updateMain', (value) => {
      this.setMain(value);
    });
  },
};
</script>
