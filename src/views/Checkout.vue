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
                :weeklyDiscount="weeklyDiscount"
                :monthlyDiscount="monthlyDiscount"
                :deposit="item.deposit"
                :subTotal="subTotal"
                :totalPrice="totalPrice"
              />
            </div>

            <h3>Payment</h3>
            <checkout-form
              :item="item"
              :dates="dates"
              :amount="totalPrice * 100"
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

import {
  CALCULATE_WEEKLY_DISCOUNT,
  CALCULATE_MONTHLY_DISCOUNT,
  CALCULATE_TOTAL_PRICE,
} from '@/actions/rentals';

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
  computed: {
    subTotal() {
      return this.dates.length * this.item.dailyPrice;
    },
    weeklyDiscount() {
      return CALCULATE_WEEKLY_DISCOUNT(this.dates.length, this.item.weeklyPrice, this.item.dailyPrice);
    },
    monthlyDiscount() {
      return CALCULATE_MONTHLY_DISCOUNT(this.dates.length, this.item.monthlyPrice, this.item.dailyPrice);
    },
    totalPrice() {
      return CALCULATE_TOTAL_PRICE(this.dates.length, this.item.deposit, this.item.dailyPrice, this.item.monthlyPrice, this.item.weeklyPrice);
    },
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
