<template>
  <div id="reviews">
    <div class="l-site-container">
      <h2>Reviews</h2>
      <div>{{ score }} / 5</div>
      <div>{{ reviewIds.length }} reviews</div>

      <item-review
        v-for="review in reviews" :key="`${review.rentalId}-${review.score}`"
        :review="review"
      />
    </div>
  </div>
</template>

<script>
import {
  GET_MULTIPLE_REVIEW_DETAILS,
} from '@/actions/reviews';

import ItemReview from '@/components/Item/ItemReview.vue';

export default {
  data() {
    return {
      reviews: [],
    };
  },
  props: {
    score: {
      type: Number,
      required: true,
    },
    reviewIds: {
      type: Array,
      required: true,
    },
  },
  components: {
    ItemReview,
  },
  async mounted() {
    this.reviews = await GET_MULTIPLE_REVIEW_DETAILS(this.reviewIds);
  },
};
</script>

<style lang="scss" scoped>

</style>
