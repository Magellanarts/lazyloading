<template>
  <div class="rental-container" v-if="rental">
    <div class="rental-header">
      <h2>{{ rental.name }}</h2>
      <div class="rental-dates">
        {{ rental.dates[0] }} - {{ rental.dates[rental.dates.length - 1] }}
      </div>
    </div>
    <div class="leave-review" v-if="checkReviewDates">
      <h3>Leave a review</h3>
      <div class="review-rating">
        <div
          class="review-rating__score fa-star"
          @mouseover="handleStarMouseOver(0)"
          @mouseleave="handleStarMouseLeave(0)"
          @click="resetScore(); handleStarMouseOver(0); score = 1; ignoreHovers = 0;"
          :class="hovers[0] ? 'fas' : 'far'"
        >
          1
        </div>
        <div
          class="review-rating__score fa-star"
          @mouseover="handleStarMouseOver([0,1])"
          @mouseleave="handleStarMouseLeave([0,1])"
          @click="resetScore(); handleStarMouseOver([0,1]); score = 2; ignoreHovers = 1;"
          :class="hovers[1] ? 'fas' : 'far'"
        >
          2
        </div>
        <div
          class="review-rating__score fa-star"
          @mouseover="handleStarMouseOver([0,1,2])"
          @mouseleave="handleStarMouseLeave([0,1,2])"
          @click="resetScore(); handleStarMouseOver([0,1,2]); score = 3; ignoreHovers = 2;"
          :class="hovers[2] ? 'fas' : 'far'"
        >
          3
        </div>
        <div
          class="review-rating__score fa-star"
          @mouseover="handleStarMouseOver([0,1,2,3])"
          @mouseleave="handleStarMouseLeave([0,1,2,3])"
          @click="resetScore(); handleStarMouseOver([0,1,2,3]); score = 4; ignoreHovers = 3;"
          :class="hovers[3] ? 'fas' : 'far'"
        >
          4
        </div>
        <div
          class="review-rating__score fa-star"
          @mouseover="handleStarMouseOver([0,1,2,3,4])"
          @mouseleave="handleStarMouseLeave([0,1,2,3,4])"
          @click="resetScore(); handleStarMouseOver([0,1,2,3,4]); score = 5; ignoreHovers = 4;"
          :class="hovers[4] ? 'fas' : 'far'"
        >
          5
        </div>
      </div>
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

import TextInput from '@/components/common/forms/TextInput.vue';

export default {
  data() {
    return {
      rental: '',
      review: '',
      errors: {},
      score: 0,
      hovers: [
        false,
        false,
        false,
        false,
        false,
      ],
      ignoreHovers: -1,
    };
  },
  components: {
    TextInput,
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
    handleStarMouseOver(score) {
      if (Array.isArray(score)) {
        score.forEach((scoreValue) => {
          this.$set(this.hovers, scoreValue, true);
        });
      } else {
        this.$set(this.hovers, score, true);
      }
    },
    resetScore() {
      this.hovers.forEach((value, index) => {
        this.$set(this.hovers, index, false);
      });
    },
    handleStarMouseLeave(score) {
      if (Array.isArray(score)) {
        score.forEach((scoreValue) => {
          if (scoreValue > this.ignoreHovers || (scoreValue === 0 && this.ignoreHovers === 0)) {
            this.$set(this.hovers, scoreValue, false);
          }
        });
      } else if (this.ignoreHovers < 0) {
        this.$set(this.hovers, score, false);
      }
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

.review-rating {
  font-size: 0;
  margin-bottom: 16px;

  &__score {
    display: inline-block;
    color: #5673F7;
    font-size: 0;
    position: relative;
    width: 25px;
    cursor: pointer;
    transition: .15s linear;

    &:before {
      font-size: 22px;
    }

    &:not(:last-child) {
      margin-right: 7px;
    }
  }
}
</style>
