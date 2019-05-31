/* eslint-disable func-names */
const SparkPost = require('sparkpost');

require('dotenv').config();

const client = new SparkPost(process.env.VUE_APP_SPARKPOST_API_KEY);


const statusCode = 200;
const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
};

exports.handler = function (event, context, callback) {
  // -- We only care to do anything if this is our POST request.
  if (event.httpMethod !== 'POST' || !event.body) {
    callback(null, {
      statusCode,
      headers,
      body: '',
    });
  }

  // -- Parse the body contents into an object.
  const data = JSON.parse(event.body);

  // -- Make sure we have all required data. Otherwise, escape.
  if (
    !data.rentalID
    || !data.name
    || !data.dates
    || !data.userEmail
  ) {
    console.error('Required information is missing.');

    callback(null, {
      statusCode,
      headers,
      body: JSON.stringify({ status: 'missing-information' }),
    });
  }
  // everything needed is there,
  // send email
  client.transmissions
    .send({
      content: {
        from: 'rentals@magellanarts.com',
        subject: 'Receipt for Rental of Item',
        html: `<html><body>You have rented ${data.name} for the following dates: ${data.dates}. Here is the transaction ID: ${data.rentalID}.</body</html>`,
      },
      recipients: [
        {
          address: 'magellanarts@gmail.com',
        },
      ],
    });
};
