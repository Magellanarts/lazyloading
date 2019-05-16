<template>
  <div class="map-container">
    <GmapMap
      v-if="item"
      :center="{lat:item._geoloc.lat, lng:item._geoloc.lng}"
      :zoom="13"
      class="item-map"
    >
      <GmapCircle
        :center="{lat:item._geoloc.lat, lng:item._geoloc.lng}"
        :radius="1000"
        :options="{strokeColor: 'rgb(86, 116, 247)',fillColor:'rgb(86, 116, 247)',fillOpacity:.4
          }"
      />
    </GmapMap>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.item-map {
  width: 100%; height: 400px
}
.map-container {
  margin-bottom: 32px;
}

.gmap {
  height: 400px;
}
</style>
