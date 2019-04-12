<template>
  <div>

    {{ owner.firstName }} {{ owner.lastName }}
  </div>
</template>

<script>
export default {
  props: {
    owner: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
