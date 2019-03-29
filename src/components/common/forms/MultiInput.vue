<template>
  <div class="form-field">
    <label
      class="text-label"
      for="multiInput"
    >
        {{ label }}
    </label>
    <div class="multi-input-container styled-input">
      <span
        class="button"
        v-for="(value, index) in localValues"
        :key="`value-${index}`"
        @click="handleClick"
        :data-val="value"
      >
        {{ value }}
      </span>
      <input
        id="multiInput"
        name="multiInput"
        v-model="newValue"
        type="text"
        class="no-style"  @keydown.enter.prevent="handleEnter"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newValue: '',
      localValues: this.values,
    };
  },
  props: {
    values: {
      type: Array,
      required: false,
    },
    label: {
      type: String,
      required: true,
    },
  },
  methods: {
    handleEnter() {
      if (this.newValue) {
        this.localValues.push(this.newValue);
        this.newValue = '';
        this.$emit('tagChange', this.localValues);
      }
    },
    handleClick(e) {
      const valToRemove = e.srcElement.getAttribute('data-val');
      this.localValues = this.localValues.filter(item => item !== valToRemove);
      this.$emit('tagChange', this.localValues);
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  margin-bottom: 6px;
  &:hover {
    background-color: #ff0015;
  }
}
</style>
