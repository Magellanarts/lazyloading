<template>
  <div class="form-field">
    <label
      class="text-label"
      :for="name"
      :class="labelClass"
    >
        {{ label }}
      </label>

    <template v-if="textarea">
      <textarea
        @input="handleInput"
        :name="name"
        :id="name"
        v-model="content"
        @blur="handleBlur"
      />
    </template>
    <template v-else>
      <input
        else
        :type="type"
        @input="handleInput"
        :name="name"
        :id="name"
        v-model="content"
        :min="min"
        @blur="handleBlur"
      />
    </template>

    <template v-if="!secondaryRule">
      <template v-if="requiredField">
        <span
          class="field-error-message"
          v-if="errors[requiredField]"
        >
          {{ requiredLabel }}
        </span>
      </template>
      <template v-else>
        <span
          class="field-error-message"
          v-if="errors[name]"
        >
          {{ requiredLabel }}
        </span>
      </template>
    </template>

    <span
      class="field-error-message"
      v-if="secondaryRule"
    >
      {{ secondaryRuleLabel }}
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      content: this.value,
    };
  },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {

    },
    errors: {

    },
    required: {
      type: Boolean,
      required: false,
      default: false,
    },
    requiredField: {
      required: false,
    },
    requiredLabel: {
      type: String,
      required: false,
      default: 'Field Required',
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    min: {
      type: Number,
      required: false,
      default: 1,
    },
    secondaryRule: {
      type: Boolean,
      required: false,
    },
    secondaryRuleLabel: {
      type: String,
      required: false,
    },
    labelClass: {
      type: String,
      required: false,
    },
    textarea: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    handleInput() {
      this.$emit('input', this.content);
    },
    handleBlur() {
      this.$emit('inputBlur');
    },
  },
};
</script>
