<template>
<div class="l-site-container item-details">
  <div class="item-details__content">
    <Owner
      v-if="user"
      :owner="user"
      :item="item"
    />

    <h4>Deposit: ${{ item.deposit }}</h4>

    <div class="description" v-html="item.description" />
    <item-tags
      :tags="item.tags"
    />
  </div>

  <div class="item__renting">


    <div class="rental-period">
      <h2>Availability</h2>
      <date-picker
        placeholder="Check Availability"
        mobile="mobile"
        format="MM/DD/YYYY"
        @update="handleDate"
        :disabledDates="item.rentalDates"
        :selectForward="true"
      />
    </div>


    <item-actions
      :item="item"
      :dates="dates"
    />
  </div>
</div>
</template>

<script>
import VueHotelDatepicker from '@/components/public/VueHotelDatePicker/components/VueHotelDatepicker.vue';
import ItemActions from '@/components/Item/ItemActions.vue';

import moment from 'moment';
import Owner from '@/components/Owner.vue';
import ItemTags from './ItemTags.vue';

export default {
  data() {
    return {
      dates: null,
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
    ItemActions,
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
  },
};
</script>

<style lang="scss" scoped>
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

.vhd-container {
  width: 100%;
}

.item-details {
  padding-top: 64px;
  padding-bottom: 64px;
  display: flex;
  flex-direction: column;

  @media screen and (min-width: 760px) {
    flex-direction: row;
    justify-content: space-between;
  }
}

.rental-period {
  margin-bottom: 22px;

  .vhd-input {
    padding-left: 8px;
    min-width: 10px;
  }
}

@media screen and (min-width: 760px) {
  .item-details__content {
    flex: 1;
  }
  .item__renting {
    flex: 0 0 350px;
  }
}
</style>
