<template>
  <div class="home u-align-center">
    <h1>Share some sports equipment</h1>

    <search />
  </div>
</template>

<script>
// @ is an alias to /src
import Search from '@/components/Search.vue';

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
