<template>
  <div class="item-actions">
    <div class="pricing" v-if="dates">
      <div class="pricing__sub">Total Days: {{ dates.length }}</div>
      <div class="pricing__sub"> + Deposit: {{ item.deposit }}</div>
      <div class="pricing__total">Total Price: ${{
        parseInt((dates.length * item.dailyPrice), 10) + parseInt(item.deposit, 10)
        }}</div>
      <button @click="rentItem" class="button action" type="button">Rent me!</button>
    </div>
  </div>
</template>

<script>
import {
  RENT_ITEM,
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
  methods: {
    rentItem() {
      RENT_ITEM(
        this.item.ID,
        this.dates,
        this.item.user,
        this.dates.length,
        parseInt((this.dates.length * this.item.dailyPrice), 10) + parseInt(this.item.deposit, 10),
        this.item.deposit,
        this.item.name,
      );
    },
  },
};
</script>

<style lang="scss" scoped>
.item-actions {
  padding-top: 16px;
  padding-bottom: 16px;
}

.pricing {
  text-align: right;
}

.pricing__sub {
  font-size: 14px;
}

.pricing__total {
  font-size: 18px;
  margin-bottom: 18px;
}
</style>
