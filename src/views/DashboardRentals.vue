<template>
  <div>
    <h1>Your current Rentals</h1>

    <ul v-if="rentals">
      <li
        v-for="rental in rentals"
        :key="`${rental.item}-${rental.totalDays}-${rental.owner}-${rental.totalPrice}`"
      >
      {{ rental.item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rentals: [],
    };
  },
  async mounted() {

  },
};
</script>

<style lang="scss" scoped>

</style>
