<template>
<div>
  <div class="pricing__sub">Total Days: {{ dates.length }}</div><br />
  <div class="pricing__sub border-bottom"> x Daily Price: {{ dailyPrice }}</div><br />
  <div class="pricing__sub pricing__subtotal"> Subtotal: {{ subTotal }}</div><br />

  <template v-if="weeklyDiscount">
    <div class="pricing__sub">
      - Weekly Discount: {{ weeklyDiscount }}
    </div>
    <br />
  </template>
  <template v-if="monthlyDiscount">
    <div class="pricing__sub">
      - Monthly Discount: {{ monthlyDiscount }}
    </div>
    <br />
  </template>

  <div class="pricing__sub border-bottom"> + Deposit: {{ deposit }}</div>
  <div class="pricing__total">Total Price: ${{ totalPrice }}</div>
</div>
</template>

<script>
export default {
  props: {
    dates: {
      type: Array,
      required: true,
    },
    dailyPrice: {
      type: String,
      required: true,
    },
    weeklyDiscount: {
      type: String,
    },
    monthlyDiscount: {
      type: String,
    },
    deposit: {
      type: String,
      required: true,
    },
    subTotal: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
