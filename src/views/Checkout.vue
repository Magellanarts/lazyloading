<template>
  <div>
      <div class="l-site-container"  v-if="item">
        <h1>Review Rental Details</h1>
        <div class="checkout-container">
          <div class="checkout-container__item">
            <MainImage
              autoHeight
              :mainImage="item.mainImage"
            />
            <h2>{{ item.name }}</h2>
          </div>
          <div class="checkout-container__payment">
            <h3>Booked for the following dates:</h3>
              <ul class="booked-dates">
                <li v-for="date in dates" :key="date">
                  {{ date }}
                </li>
              </ul>

            <div class="pricing" v-if="dates">
              <h3>Pricing</h3>
              <item-pricing
                :dates="dates"
                :dailyPrice="item.dailyPrice"
                :deposit="item.deposit"
              />
            </div>

            <h3>Payment</h3>
            <checkout-form
              :item="item"
              :dates="dates"
              :amount="amount"
            />

          </div>
        </div>


      </div>
  </div>
</template>

<script>
import Vue from 'vue';
import MainImage from '@/components/Item/Media/MainImage.vue';
import CheckoutForm from '@/components/common/CheckoutForm.vue';
import ItemPricing from '@/components/Item/ItemPricing.vue';

import {
  GET_ITEM_DATA_BY_DOC_ID,
} from '@/actions/item';

export const itemBus = new Vue();

export default {
  data() {
    return {
      item: null,
      dates: this.$route.query.dates,
    };
  },
  components: {
    CheckoutForm,
    MainImage,
    ItemPricing,
  },
  mounted() {
    itemBus.$on('updateMain', (value) => {
      this.setMain(value);
    });
  },
  async created() {
    if (this.$route.query.itemID) {
      this.item = await GET_ITEM_DATA_BY_DOC_ID(this.$route.query.itemID);
    }
  },
  computed: {
    amount() {
      return (
        (parseInt(this.$route.query.dates.length * this.item.dailyPrice, 10)
        + parseInt(this.item.deposit, 10)) * 100);
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 24px;
}

h2 {
  padding-top: 16px;
}

h3 {
  margin-bottom: 12px;
}
.l-site-container {
  padding-top: 32px;
  padding-bottom: 32px;
}

.pricing,
.booked-dates {
  margin-bottom: 32px;
}

.booked-dates {
  columns: 2;
  li {
    padding-left: 16px;

    &:not(:last-child) {
      margin-bottom: 12px;
    }
  }
}

.checkout-container {
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 760px) {
    flex-direction: row;
    justify-content: space-between;
  }
}

.checkout-container__payment {
  @media screen and (min-width: 760px) {
    width: 44%;
  }
}

.checkout-container__item {
  margin-bottom: 48px;
  @media screen and (min-width: 760px) {
    margin-bottom: 0;
    width: 38%;
  }
}
</style>
