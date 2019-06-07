<template>
  <div>
    <h1>Your current Rentals</h1>

    <div class="dashboard-panels">
      <nav class="dashboard-panels__nav">
          <router-link
            tag="li"
            :to="{
              name: 'dashboard-rentals-item',
              params: {
                id: rental.ID,
                itemId: rental.itemId,
                ownerId: rental.ownerId,
                rentalDate: new Date(rental.dates[rental.dates.length - 1]),
              }
            }"
            class="dashboard-panels__nav__link"
            active-class="active"
            v-for="rental in userRentals"
            :key="`${rental.itemId}-${Math.random(0,1)}`"
          >
            <div class="rentals-list-item__name">
              {{ rental.name }}
            </div>
            <div class="rentals-list-item__dates">
              {{ rental.dates[0] }} - {{ rental.dates[rental.dates.length - 1] }}
            </div>
          </router-link>
      </nav>

      <div class="dashboard-panels__content">
        <transition name="fade" mode="out-in">
          <router-view :key="$route.fullPath"  />
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import {
  GET_USER_RENTALS,
} from '@/actions/user';

export default {
  data() {
    return {
      rentals: [],
    };
  },
  computed: {
    userRentals() {
      return this.rentals.filter(rental => rental.userId === this.$store.getters.userId);
    },
  },
  async mounted() {
    this.rentals = await GET_USER_RENTALS();
  },
};
</script>

<style lang="scss" scoped>
.rentals-list-item {
  &__name {
    font-size: 16px;
    line-height: 1.3;
    margin-bottom: 4px;
  }

  &__dates {
    font-size: 12px;
    line-height: 1.3;
  }
}
</style>
