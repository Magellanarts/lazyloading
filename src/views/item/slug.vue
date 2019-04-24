<template>
  <div>
    <div class="item-header">
      <item-media
        v-if="item"
        :mainImage="item.mainImage"
        :item="item"
      />
      <item-details
        v-if="item"
        :item="item"
      />
    </div>

    <div class="map-container">
      <GmapMap
        v-if="item"
        :center="{lat:item._geoloc.lat, lng:item._geoloc.lng}"
        :zoom="13"

        style="width: 100%; height: 400px"
      >
        <GmapCircle
          :center="{lat:item._geoloc.lat, lng:item._geoloc.lng}"
          :radius="1000"
          :options="{strokeColor: 'rgb(86, 116, 247)',fillColor:'rgb(86, 116, 247)',fillOpacity:.4
            }"
        />
      </GmapMap>
    </div>

    <Owner
      v-if="user"
      :owner="user"
    />
  </div>
</template>

<script>
import ItemMedia from '@/components/Item/Media/ItemMedia.vue';
import ItemDetails from '@/components/Item/ItemDetails.vue';
import Owner from '@/components/Owner.vue';
import Vue from 'vue';

import { mapState } from 'vuex';

import {
  GET_ITEM_DATA_BY_DOC_ID,
  GET_ITEM_DATA_BY_NAME,
} from '@/actions/item';

import { db } from '@/auth';

export const itemBus = new Vue();


export default {
  data() {
    return {
      item: null,
      user: null,
      mainImage: '',
    };
  },
  components: {
    ItemMedia,
    ItemDetails,
    Owner,
  },
  /* methods: {
    ...mapActions({
      getDataByDocID: types.GET_ITEM_DATA_BY_DOC_ID,
      getDataByName: types.GET_ITEM_DATA_BY_NAME,
      updateMain: types.UPDATE_MAIN_IMAGE,
    }),
  }, */
  methods: {
    setMain(val) {
      this.item.mainImage = val;
    },
  },
  computed: mapState({
    // item: state => state.item.curItem,
    // mainImage: state => state.item.mainImage,
  }),
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
    itemBus.$on('updateMain', (value) => {
      this.setMain(value);
    });
  },
};
</script>

<style lang="scss" scoped>
.item-header {
  margin: 20px 0;
  line-height: 1.5;
}

.map-container {
  margin-bottom: 32px;
}

.gmap {
  height: 400px;
}

@media screen and (min-width: 760px) {
  .item-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;

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
