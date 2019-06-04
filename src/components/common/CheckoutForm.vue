<template>
  <div class="checkout-form">

    <!-- Stripe inserts fields here -->
    <div ref="card"></div>
    <button
      @click="submitPayment" class="checkout-form__submit button action"
    >
      Submit Payment
    </button>
  </div>
</template>

<script>
import uuid from 'uuid/v4';

import {
  RENT_ITEM,
} from '@/actions/rentals';

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
  data() {
    return {
      purchase: '',
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    dates: {
      type: Array,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    card = elements.create('card', { style });
    card.mount(this.$refs.card);
  },
  methods: {
    async submitPayment() {
      stripe.createToken(card)
        .then((result) => {
          // result.token has token
          fetch(`${process.env.VUE_APP_LAMBDA_ENDPOINT}purchase`, {
            method: 'POST',
            body: JSON.stringify({
              token: result.token,
              amount: this.amount,
              description: this.item.name,
              idempotency_key: uuid(),
            }),
          })
            .then((res) => {
              res.json()
                .then((chargeDetails) => {
                  // contains and ID and paid status
                  // if paid is true,
                  // create payment in firebase
                  if (chargeDetails.paid === true) {
                    RENT_ITEM(
                      this.item.ID,
                      this.dates,
                      this.item.user,
                      parseInt((
                        this.dates.length * this.item.dailyPrice
                      ), 10)
                      + parseInt(this.item.deposit, 10),
                      this.item.deposit,
                      this.item.name,
                      chargeDetails.id,
                    );
                  }
                });
            });
        });
    },
  },
};

</script>

<style lang="scss" scoped>
.StripeElement {
  box-sizing: border-box;
  margin-bottom: 18px;

  height: 40px;

  padding: 10px 12px;

  border: 1px solid transparent;
  border-radius: 4px;
  background-color: white;

  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

.StripeElement--focus {
  box-shadow: 0 1px 3px 0 #cfd7df;
}

.StripeElement--invalid {
  border-color: #fa755a;
}

.StripeElement--webkit-autofill {
  background-color: #fefde5 !important;
}
</style>
