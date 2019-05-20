<template>
  <div class="checkout-form">

    <!-- Stripe inserts fields here -->
    <div ref="card"></div>

    <button @click="submitPayment" class="checkout-form__submit">Submit Payment</button>
  </div>
</template>

<script>
import uuid from 'uuid/v4';

require('dotenv').config();

const stripe = Stripe(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY);
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
          // result.token has token
          console.log(result.token);
          fetch('http://localhost:9000/purchase', {
            method: 'POST',
            body: JSON.stringify({
              token: result.token,
              amount: '5',
              idempotency_key: uuid(),
            }),
          })
            .then((res) => {
              console.log(res);
            });
        });
    },
  },
};


// Token is being created, and read in purchase.js.
// Next, submit the stripe.create() with relevant info
</script>

<style lang="scss" scoped>
.checkout-form {
  padding: 32px 0;

  input {
    background: #fff;
  }
}
</style>
