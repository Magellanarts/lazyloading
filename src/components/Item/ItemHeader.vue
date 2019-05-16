<template>
  <div class="l-site-container item-header">
    <MainImage
      v-if="item"
      :mainImage="item.mainImage"
    />

    <div class="item_title">
      <h2><span>Daily Price</span>${{ item.dailyPrice }}</h2>
      <h1>{{ item.name }}</h1>
    </div>
  </div>
</template>

<script>
import MainImage from '@/components/Item/Media/MainImage.vue';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    MainImage,
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

  h2 {
    color: #3153F2;

    span {
      color: #666;
      font-size: 35%;
    }
  }

  h3 {
    color: #3153F2;

    span {
      color: #666;
      font-size: 35%;
    }
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
    top: -20%;
    h1 {
      font-size: 40px;
      line-height: 44px;
      margin-bottom: 0;
    }

    h2,
    h3 {
      text-align: right;
      font-size: 30px;
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

    h2 {
      font-size: 34px;
    }
  }
}
</style>
