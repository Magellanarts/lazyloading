<template>
  <div class="item-actions">
    <div class="pricing" v-if="dates">
      <item-pricing
        :dates="dates"
        :dailyPrice="item.dailyPrice"
        :deposit="item.deposit"
      />
      <button @click="rentItem" class="button action" type="button">Rent me!</button>
    </div>
  </div>
</template>

<script>
import router from '@/router';
import ItemPricing from '@/components/Item/ItemPricing.vue';

export default {
  props: {
    dates: {
      required: true,
    },
    item: {
      type: Object,
      required: true,
    },
  },
  components: {
    ItemPricing,
  },
  methods: {
    rentItem() {
      router.push({
        path: '/checkout/',
        query: {
          itemID: this.item.ID,
          dates: this.dates,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.item-actions {
  padding-top: 16px;
  padding-bottom: 16px;
  font-family: 'Nunito';
}

.pricing {
  text-align: center;
}

@media screen and (min-width: 600px){
  .pricing {
    padding-top: 16px;
    text-align: right;
  }
}
</style>
