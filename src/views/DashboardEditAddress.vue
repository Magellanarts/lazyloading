<template>
  <div>

    <h1>Edit Your Address</h1>
    <form
        @submit.prevent="submitForm"
        novalidate
      >
        <text-input
          name="label"
          label="Label"
          v-model="address.label"
          :errors="errors"
          required
        />

        <text-input
          name="streetAddress"
          label="Street Address"
          v-model="address.streetAddress"
          :errors="errors"
          required
          labelClass="text-label--two-lines"
        />

        <text-input
          name="streetAddress2"
          label="Street Address 2"
          v-model="address.streetAddress"
          :errors="errors"
          labelClass="text-label--two-lines"
        />

        <text-input
          name="city"
          label="City"
          v-model="address.city"
          :errors="errors"
          required
        />

        <text-input
          name="state"
          label="State"
          v-model="address.state"
          :errors="errors"
          required
        />

        <text-input
          name="zipCode"
          label="Zip Code"
          v-model="address.zipCode"
          :errors="errors"
          required
        />

        <div class="form-field">
        <button class="button" type="submit">Submit</button>
      </div>
    </form>

    <transition name="fade" mode="out-in">
      <alert-modal
        v-show="submitSuccess"
        ref="success-modal"
        heading="Saved"
        type="success"
      />
    </transition>
  </div>
</template>

<script>
import AlertModal from '@/components/common/AlertModal.vue';
import TextInput from '@/components/common/forms/TextInput.vue';

import { mapActions, mapState } from 'vuex';
import { formValidation } from '@/mixins';

export default {
  data() {
    return {
      submitSuccess: false,
      errors: {
        label: false,
        city: false,
        streetAddress: false,
        streetAddress2: false,
        state: false,
        zipCode: false,
      },
    };
  },
  computed: mapState({
    address: state => state.address.curAddress,
  }),
  methods: {
    async submitForm() {
      const returnVal = await this.validateForm({
        fields: this.address,
      });

      // check for error,
      if (!returnVal) {
      // success, show saved modal
        this.showModal();
        /* if (this.item.ID) {
          this.updateItem(this.item);
        } else {
          this.createItem(this.item);
        } */
      }
    },
    showModal() {
      this.submitSuccess = true;
      setTimeout(() => {
        this.submitSuccess = false;
      }, 2500);
    },
  },
  components: {
    TextInput,
    AlertModal,
  },
  mixins: [
    formValidation,
  ],
};
</script>

<style lang="scss" scoped>

</style>
