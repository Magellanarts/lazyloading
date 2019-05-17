<template>
  <div class="checkout-form">

    <!-- Stripe inserts fields here -->
    <div ref="card"></div>

    <button @click="submitPayment" class="checkout-form__submit">Submit Payment</button>
  </div>
</template>

<script>
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
  mounted() {
    card = elements.create('card', { style });
    card.mount(this.$refs.card);
  },
  methods: {
    submitPayment() {
      stripe.createToken(card)
        .then((result) => {
          console.log(result);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.checkout-form {
  padding: 32px 0;

  input {
    background: #fff;
  }
}
</style>
