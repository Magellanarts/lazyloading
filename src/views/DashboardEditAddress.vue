<template>
  <div>
    <h1>Edit Your Address</h1>
    <form
        @submit.prevent="submitForm"
        novalidate
        v-if="$route.params.id && address.label || !$route.params.id"
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
          v-model="address.streetAddress2"
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

import { formValidation } from '@/mixins';

import {
  UPDATE_ADDRESS,
  CREATE_ADDRESS,
  GET_ADDRESS,
} from '@/actions/address';

export default {
  data() {
    return {
      submitSuccess: false,
      address: {
        label: '',
        city: '',
        streetAddress: '',
        streetAddress2: '',
        state: '',
        zipCode: '',
      },
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
  methods: {
    async submitForm() {
      const returnVal = await this.validateForm({
        fields: this.address,
      });
      // check for error,
      if (!returnVal) {
      // success, show saved modal
        this.showModal();
        // send to firebase
        if (this.$route.params.id) {
          // we are editing an address and not adding a new one
          UPDATE_ADDRESS(this.address);
        } else {
          this.address.user = this.$store.getters.userId;
          CREATE_ADDRESS(this.address);
        }
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
  async created() {
    if (this.$route.params.id) {
      this.address = await GET_ADDRESS(this.$route.params.id);
      this.address.id = this.$route.params.id;
    }
  },
};
</script>

<style lang="scss" scoped>

</style>
