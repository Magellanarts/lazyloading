/* eslint-disable func-names */
require('dotenv').config();

const stripe = require('stripe')(process.env.VUE_APP_STRIPE_SECRET_KEY);

const statusCode = 200;
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
};

exports.handler = function (event, context, callback) {
  // -- We only care to do anything if this is our POST request.
  if (event.httpMethod !== 'POST' || !event.body) {
    console.log(event.body);
    callback(null, {
      statusCode,
      headers,
      body: '',
    });
  }

  // -- Parse the body contents into an object.
  const data = JSON.parse(event.body);
  console.log(data.amount);

  // -- Make sure we have all required data. Otherwise, escape.
  if (
    !data.token
    || !data.amount
    || !data.idempotency_key
  ) {
    console.error('Required information is missing.');

    callback(null, {
      statusCode,
      headers,
      body: JSON.stringify({ status: 'missing-information' }),
    });
  }

  // everything needed is there,
  // submit payment
  console.log('about to send');
  (async () => {
    console.log(data.token);
    const charge = await stripe.charges.create({
      amount: 100,
      currency: 'usd',
      description: 'Testing a charge',
      source: data.token.id,
    }, {
      idempotency_key: data.idempotency_key,
    });

    console.log(charge);
  })();
};
