<template>
  <div class="item-actions">
    <div class="pricing" v-if="dates">
      <div class="pricing__sub">Total Days: {{ dates.length }}</div><br />
      <div class="pricing__sub border-bottom"> x Daily Price: {{ item.dailyPrice }}</div><br />
      <div class="pricing__sub pricing__subtotal"> Subtotal: {{ dates.length * item.dailyPrice }}</div><br />
      <div class="pricing__sub border-bottom"> + Deposit: {{ item.deposit }}</div>
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
  font-family: 'Nunito';
}

.pricing {
  text-align: center;
}


.pricing__sub {
  font-size: 18px;
  line-height: 1.25;
  padding-bottom: 6px;
  display: inline-block;

  &.border-bottom {
    border-bottom: 1px solid #555;
    margin-bottom: 5px;
  }
}

.pricing__subtotal {
  font-size: 25px;
  line-height: 1.25;
  font-weight: 700;
}

.pricing__total {
  font-size: 30px;
  line-height: 38px;
  margin-bottom: 18px;
  font-weight: 700;
}

@media screen and (min-width: 600px){
  .pricing {
    padding-top: 16px;
    text-align: right;
  }
}
</style>
