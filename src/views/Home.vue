<template>
  <div class="l-site-container home u-align-center">
    <h1>Share some sports equipment</h1>

    <search />
  </div>
</template>

<script>
// @ is an alias to /src
import Search from '@/components/Search.vue';

if ('geolocation' in navigator) {
  /* geolocation is available */
  navigator.geolocation.getCurrentPosition((position) => {
  // do_something(position.coords.latitude, position.coords.longitude);
    localStorage.setItem('lat', position.coords.latitude);
    localStorage.setItem('lon', position.coords.longitude);
  });
} else {
  /* geolocation IS NOT available */
}


export default {
  name: 'home',
  components: {
    Search,
  },
};
</script>

<style scoped>
h1 {
  color: rgb(86, 116, 247);
  font-size: 20px;
  margin: 40px 0;
}
</style>
