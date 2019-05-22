<template>

  <div ref="gmap" class="gmap" />

</template>

<script>
import GoogleMapsLoader from 'google-maps';

export default {
  props: {
    lat: {
      type: Number,
      required: true,
    },
    lng: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    if (this.lat) {
      /*  GoogleMapsLoader.KEY = 'AIzaSyAs2RUHr98KDYRCjGvJ3XuNZC5ae3ilQAg';
      GoogleMapsLoader.VERSION = '3.34';
      GoogleMapsLoader.load((google) => {
        new google.maps.Map(this.$refs.gmap, {
          center: { lat: this.lat, lng: this.lng },
          zoom: 8,
        });
      }); */
    }
  },
  destroyed() {
    GoogleMapsLoader.release(() => {
      console.log('No google maps api around');
    });
  },
};
</script>

<style lang="scss" scoped>

</style>
