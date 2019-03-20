<template>
  <div class="card-details">
    {{ name }}
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.card-details {
  text-align: left;
  padding: 16px;
  background: rgba(250, 250, 250, 0.95);
  color: #323232;
  text-decoration: none;
  font-size: 20px;
}
</style>
