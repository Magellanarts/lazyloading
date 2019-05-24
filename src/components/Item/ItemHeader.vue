<template>
  <div class="l-site-container item-header">
    <div>
      <MainImage
        v-if="item"
        :mainImage="item.mainImage"
      />

      <ThumbnailsMini
        ref="thumbs"
        v-if="item"
        :mainImage="item.mainImage"
        :thumbnails="item.otherImages"
      />
    </div>

    <div class="item_title">
      <h1>{{ item.name }}</h1>

      <div class="item-prices">
        <div class="item-price">
          <div class="item-price__value">${{ item.dailyPrice }}</div>
          <div class="item-price__label">Daily Price</div>
        </div>

        <div class="item-price" v-if="item.weeklyPrice">
          <div class="item-price__value">${{ item.weeklyPrice }}</div>
          <div class="item-price__label">Weekly Price</div>
        </div>

        <div class="item-price"  v-if="item.monthlyPrice">
          <div class="item-price__value">${{ item.monthlyPrice }}</div>
          <div class="item-price__label">Monthly Price</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import MainImage from '@/components/Item/Media/MainImage.vue';
import ThumbnailsMini from '@/components/Item/Media/ThumbnailsMini.vue';

export const itemBus = new Vue();

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    setMain(val) {
      this.item.mainImage = val;
    },
  },
  components: {
    MainImage,
    ThumbnailsMini,
  },
  mounted() {
    itemBus.$on('updateMain', (value) => {
      this.setMain(value);
    });

    // handle main image swipe
    itemBus.$on('handleSwipe', (direction) => {
      this.$refs.thumbs.parentSwipe(direction);
    });
  },
};
</script>

<style lang="scss" scoped>
.item-header {
  padding-top: 24px;
  padding-bottom: 24px;
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  background: #fff;
  position: relative;
}

.item_title {
  max-width: 600px;
  margin: 0 auto;

  h1 {
    font-size: 32px;
    line-height: 36px;
    text-align: center;
    margin-bottom: 16px;
  }
}

.item-prices {
  display: flex;
  max-width: 300px;
  margin: 16px auto 0;
  text-align: center;
}

.item-price {
  flex: 1;
  font-family: 'Nunito';

  &__value {
    font-size: 20px;
  }

  &__label {
    font-size: 10px;
    text-transform: uppercase;
    font-weight: 700;
  }
}


@media screen and (min-width: 760px) {
  .item-header {
    justify-content: space-between;
    align-items: center;
    height: 450px;
    flex-direction: row;

    > :first-child {
      flex: 1;
      max-width: 400px;
      flex: 0 0 400px;
    }

    > :last-child {
      flex: 1;
      padding-left: 5%;
      text-align: center;
    }
  }

  .item_title {
    position: relative;
    top: -10%;
    h1 {
      font-size: 40px;
      line-height: 44px;
      margin-bottom: 0;
    }
  }
}

@media screen and (min-width: 1100px) {
  .item-header {
    height: 600px;

    > :first-child {
      max-width: 675px;
      flex: 0 0 675px;
    }
  }

  .item_title {
    h1 {
      font-size: 52px;
      line-height: 56px;
    }
  }
}


@media screen and (min-width: 1250px) {

  .item-prices {
    max-width: 350px;
  }
  .item-price {
    &__value {
      font-size: 36px;
    }

    &__label {
      font-size: 12px;
    }
  }
}
</style>
