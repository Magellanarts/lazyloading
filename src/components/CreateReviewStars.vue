<template>
  <div class="review-rating">
    <div
      class="review-rating__score fa-star"
      @mouseover="handleStarMouseOver(0)"
      @mouseleave="handleStarMouseLeave(0)"
      @click="resetScore(); handleStarMouseOver(0); ignoreHovers = 0; $emit('scored', 1)"
      :class="hovers[0] ? 'fas' : 'far'"
    >
      1
    </div>
    <div
      class="review-rating__score fa-star"
      @mouseover="handleStarMouseOver([0,1])"
      @mouseleave="handleStarMouseLeave([0,1])"
      @click="resetScore(); handleStarMouseOver([0,1]); ignoreHovers = 1; $emit('scored', 2)"
      :class="hovers[1] ? 'fas' : 'far'"
    >
      2
    </div>
    <div
      class="review-rating__score fa-star"
      @mouseover="handleStarMouseOver([0,1,2])"
      @mouseleave="handleStarMouseLeave([0,1,2])"
      @click="resetScore(); handleStarMouseOver([0,1,2]); ignoreHovers = 2; $emit('scored', 3)"
      :class="hovers[2] ? 'fas' : 'far'"
    >
      3
    </div>
    <div
      class="review-rating__score fa-star"
      @mouseover="handleStarMouseOver([0,1,2,3])"
      @mouseleave="handleStarMouseLeave([0,1,2,3])"
      @click="resetScore(); handleStarMouseOver([0,1,2,3]); ignoreHovers = 3;  $emit('scored', 4)"
      :class="hovers[3] ? 'fas' : 'far'"
    >
      4
    </div>
    <div
      class="review-rating__score fa-star"
      @mouseover="handleStarMouseOver([0,1,2,3,4])"
      @mouseleave="handleStarMouseLeave([0,1,2,3,4])"
      @click="resetScore(); handleStarMouseOver([0,1,2,3,4]); ignoreHovers = 4; $emit('scored', 5)"
      :class="hovers[4] ? 'fas' : 'far'"
    >
      5
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  methods: {
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
