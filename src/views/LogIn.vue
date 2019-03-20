<template>
  <div>
    <h1>Log In</h1>
    <form
      @submit.prevent="submitForm"
      novalidate
    >

      <div class="form-field">
        <label class="text-label" for="email">Email</label>
        <input
          type="email"
          v-model="user.email"
          name="email"
          id="email"
        >
        <span
          class="field-error-message"
          v-if="errors.email && !errors.emailInvalid"
        >
          Field Required
        </span>
        <span
          class="field-error-message"
          v-if="errors.emailInvalid"
        >
          Invalid Email
        </span>
      </div>

      <div class="form-field">
        <label class="text-label" for="password">Password</label>
        <input
          type="password"
          v-model="user.password"
          name="password"
          id="password"
          min="6"
          @blur="dirtyInputs = true"
        >
        <span
          class="field-error-message"
          v-if="errors.password"
        >
          Field Required
        </span>
      </div>

      <div class="form-field">
        <button class="button" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { formValidation } from '@/mixins';
import { mapActions } from 'vuex';
import * as types from '@/store/types';

export default {
  mixins: [
    formValidation,
  ],
  data() {
    return {
      user: {
        email: null,
        password: null,
      },
      errors: {
        email: false,
        password: false,
        emailInvalid: false,
      },
    };
  },
  methods: {
    ...mapActions({
      logInUser: types.LOG_IN_USER,
    }),
    async submitForm() {
      const returnVal = await this.validateForm({ matchingPasswords: false });

      // if returnVal is false, attempt signup
      // false = no errors in validation
      if (!returnVal) {
        this.logInUser(this.user);
      }
    },
  },
};
</script>

<style lang="scss">
</style>
