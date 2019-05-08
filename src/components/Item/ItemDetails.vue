<template>
<div>
  <Owner
    v-if="user"
    :owner="user"
    :item="item"
  />

  <h1>{{ item.name }}</h1>

  <h2>${{ item.dailyPrice }}</h2>
  <h5>Deposit: {{ item.deposit }}</h5>


  <div class="rental-period">
    <h5>Rental Period:</h5>
    <date-picker
      placeholder="Check Availability"
      mobile="mobile"
      format="MM/DD/YYYY"
      @update="handleDate"
      :disabledDates="item.rentalDates"
      :selectForward="true"
    />
  </div>


  <div class="item-actions">
    <div v-if="dates">
      <div>Total Days: {{ dates.length }}</div>
      <div> + Deposit: {{ item.deposit }}</div>
      <div>Total Price: ${{ parseInt((dates.length * item.dailyPrice)) + parseInt(item.deposit) }}</div>
    </div>
    <button @click="rentItem" class="button action" type="button">Rent me!</button>
  </div>

  <ul>
      <li v-for="detail in item.details" :key="detail.label">
        {{ detail.label}}: {{ detail.value }}
      </li>
  </ul>

  <div class="description" v-html="item.description" />

  <item-tags
    :tags="item.tags"
  />

</div>
</template>

<script>
import VueHotelDatepicker from '@northwalker/vue-hotel-datepicker';


import {
  RENT_ITEM,
} from '@/actions/rentals';

import moment from 'moment';
import Owner from '@/components/Owner.vue';
import ItemTags from './ItemTags.vue';

export default {
  data() {
    return {
      dates: '',
    };
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  components: {
    ItemTags,
    DatePicker: VueHotelDatepicker,
    Owner,
  },
  computed: {
    bookedFutureDates() {
      const futureDates = [];
      if (this.item.rentalDates) {
        this.item.rentalDates.forEach((bookedDate) => {
          if (new Date(bookedDate) >= new Date()) {
            futureDates.push(bookedDate);
          }
        });
        return futureDates;
      }
      return [];
    },
  },
  methods: {
    handleDate(date) {
      // reset dates
      this.dates = [];

      const startDate = new Date(date.start);
      const endDate = new Date(date.end);


      if (date.start && date.end) {
        // create array containing each day that is selected
        // convert dates to MM/DD/YYYY format
        for (let d = startDate; d < endDate; d.setDate(d.getDate() + 1)) {
          const aDay = moment(new Date(d)).format('MM/DD/YYYY');
          if (this.bookedFutureDates.indexOf(aDay) < 0) {
            this.dates.push(aDay);
          }
        }
      }
    },
    rentItem() {
      RENT_ITEM(this.item.ID, this.dates, this.item.user, this.dates.length, this.dates.length * this.item.dailyPrice, this.item.name);
    },
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 26px;
}

h2 {
  margin-bottom: 6px;
}

ul,
p {
  margin-bottom: 20px;
}

li:not(:last-child) {
  margin-bottom: 10px;
}

.description {
  margin-bottom: 40px;
}

.item-actions {
  padding-top: 16px;
  padding-bottom: 16px;
}

.rental-period .vhd-input {
  padding-left: 8px;
  min-width: 10px;
}
</style>
