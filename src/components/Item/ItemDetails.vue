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

    <div class="rental-checkout">
      <transition name="slide" mode="out-in">
        <item-actions
          v-if="dates.length > 1"
          :item="item"
          :dates="dates"
        />
      </transition>
    </div>
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
      dates: [],
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
  margin-bottom: 12px;
}

ul,
p {
  margin-bottom: 20px;
}

li:not(:last-child) {
  margin-bottom: 10px;
}

.description {
  font-size:  18px;
  line-height: 26px;
  margin-bottom: 40px;
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
    flex-direction: column;
    justify-content: space-between;
  }
}

.item-details__content {
  margin-bottom: 48px;
}

.slide-enter-active,
.slide-leave-active {
  transition: opacity .5s;
  animation: fade-in .6s forwards;
}

.slide-enter,
.slide-leave-to {
  opacity: 0;
}

@keyframes slide-in {
  0% {
    opacity: 0;
    transform: translateX(20%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@media screen and (min-width: 600px) {

  .slide-enter-active,
  .slide-leave-active {
    animation: slide-in .6s forwards;
  }
  .item__renting {
    display: flex;
    flex: 1;
    justify-content: space-between;
  }


  .rental-period {
    max-width: 300px;
    flex: 0 0 300px;
  }

  .rental-checkout {
     flex: 0 0 200px;
     max-width: 200px;
     width: 200px;
     padding-left: 24px;
  }
}

@media screen and (min-width: 760px) {

   .rental-checkout {
     flex: 1;
     max-width: 100%;
     width: 100%;
     padding-left: 0;
     flex: 0 0 275px;
  }
}

@media screen and (min-width: 900px) {
  .rental-period {
    max-width: 400px;
    flex: 0 0 400px;
  }

  .item-details__content {
    flex: 1;
    max-width: 100%;
  }

  .rental-checkout {
    flex: 0 0 300px;
    max-width: 300px;
    width: 300px;
  }
}


@media screen and (min-width: 1100px) {
  .item-details {
    flex-direction: row;
  }
  .item-details__content {
    flex: 0 0 400px;
  }

  .item__renting {
    display: flex;
    justify-content: flex-end;
  }

  .rental-period {
    max-width: 300px;
    flex: 0 0 300px;
  }
 .rental-checkout {
    flex: 0 0 200px;
    max-width: 200px;
    width: 200px;
    padding-left: 24px;
  }
}

@media screen and (min-width: 1300px) {
  .item-details__content {
    flex: 0 0 500px;
  }
}

@media screen and (min-width: 1500px) {
  .item-details__content {
    flex: 0 0 600px;
  }
}
</style>
