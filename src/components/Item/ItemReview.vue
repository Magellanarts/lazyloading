<template>
  <div class="review">
    <div class="review__header">
      <div class="review__header__user">
        {{ review.reviewerName.first }}
      </div>
       <div class="review__header__date">
         {{ reviewDate }}
       </div>
    </div>

    <div class="review__body">
      {{ review.text }}
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    review: {
      type: Object,
      required: true,
    },
  },
  computed: {
    reviewDate() {
      return moment(this.review.date).format('MMMM YYYY');
    },
  },
};
</script>

<style lang="scss" scoped>
.review {
  padding: 32px 0;
  border-bottom: 1px solid #ddd;

  &__header {
    margin-bottom: 16px;

    &__user {
      font-size: 18px;
      margin-bottom: 6px;
    }

    &__date {
      color: #444;
      font-size: 13px;
    }
  }

  &__body {
    font-size:  15px;
  }
}
</style>
