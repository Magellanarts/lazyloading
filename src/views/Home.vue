<template>
  <div class="l-site-container home u-align-center">
    <h1>Rent some stuff and <br><span class="action">{{ actions[index] }}</span></h1>
    <search />
  </div>
</template>

<script>
// @ is an alias to /src
import Search from '@/components/Search.vue';
import { setInterval } from 'timers';

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
  data() {
    return {
      index: 0,
      actions: [
        'start having fun',
        'film the recital',
        'start working',
        'fix the leak',
        'go surfing',
        'start rollerblading',
        'finish the landscaping',
        'go to the lake',
        'start playing basketball',
        'learn guitar',
        'start golfing',
        'go to the beach',
      ],
    };
  },
  components: {
    Search,
  },
  mounted() {
    setInterval(() => {
      if (this.index + 1 === this.actions.length) {
        this.index = 0;
      } else { this.index = this.index + 1; }
    }, 1800);
  },
};
</script>

<style scoped>
h1 {
  color: rgb(86, 116, 247);
  font-size: 36px;
  line-height: 1.5;
  margin: 40px 0;
}
</style>
