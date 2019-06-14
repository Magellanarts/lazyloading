<template>
  <div class="rental-container" v-if="rental">
    <div class="rental-header">
      <h2>{{ rental.name }}</h2>
      <div class="rental-dates">
        {{ rental.dates[0] }} - {{ rental.dates[rental.dates.length - 1] }}
      </div>
    </div>
    <div class="leave-review" v-if="checkReviewDates && !rental.reviewed">
      <h3>Leave a review</h3>
      <create-review-stars
        @scored="handleScoring"
      />
      <text-input
        textarea
        v-model="review"
        name="review"
        label="Review"
        :errors="errors"
        :placeholder="`Let others know about your experience with the ${rental.name}`"
      />
      <button
        type="button"
        class="button"
        @click="handleReviewSubmission"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script>
import {
  GET_RENTAL_BY_ID,
} from '@/actions/rentals';

import {
  CREATE_REVIEW,
} from '@/actions/reviews';

import CreateReviewStars from '@/components/CreateReviewStars.vue';
import TextInput from '@/components/common/forms/TextInput.vue';

export default {
  data() {
    return {
      rental: '',
      review: '',
      errors: {},
      score: 0,
    };
  },
  components: {
    TextInput,
    CreateReviewStars,
  },
  async created() {
    this.rental = await GET_RENTAL_BY_ID(this.$route.params.id);
  },
  computed: {
    checkReviewDates() {
      if (new Date() > new Date(this.rental.dates[this.rental.dates.length - 1])) {
        return true;
      }

      return false;
    },
  },
  methods: {
    handleReviewSubmission() {
      CREATE_REVIEW(
        this.score,
        this.review,
        this.$route.params.itemId, this.$route.params.ownerId,
        this.$route.params.id,
        this.$route.params.rentalDate,
      );
    },
    handleScoring(score) {
      this.score = score;
    },
  },
};
</script>

<style lang="scss" scoped>
.rental-container {
  padding: 16px;
}
.rental-header {
  margin-bottom: 24px;
}
.rental-dates {
  padding: 8px 0;
  font-size: 14px;
}
</style>
