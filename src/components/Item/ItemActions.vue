<template>
  <div class="item-actions">
    <div class="pricing" v-if="dates">
      <item-pricing
        :dates="dates"
        :dailyPrice="item.dailyPrice"
        :weeklyDiscount="weeklyDiscount"
        :monthlyDiscount="monthlyDiscount"
        :deposit="item.deposit"
        :subTotal="subTotal"
        :totalPrice="totalPrice"
      />
      <button @click="rentItem" class="button action" type="button">Rent me!</button>
    </div>
  </div>
</template>

<script>
import router from '@/router';
import ItemPricing from '@/components/Item/ItemPricing.vue';

import {
  CALCULATE_WEEKLY_DISCOUNT,
  CALCULATE_MONTHLY_DISCOUNT,
  CALCULATE_TOTAL_PRICE,
} from '@/actions/rentals';

export default {
  props: {
    dates: {
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    ItemPricing,
  },
  methods: {
    rentItem() {
      router.push({
        path: '/checkout/',
        query: {
          itemID: this.item.ID,
          dates: this.dates,
        },
      });
    },
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
};
</script>

<style lang="scss" scoped>
.item-actions {
  padding-top: 16px;
  padding-bottom: 16px;
  font-family: 'Nunito';
}

.pricing {
  text-align: center;
}

@media screen and (min-width: 600px){
  .pricing {
    padding-top: 16px;
    text-align: right;
  }
}
</style>
