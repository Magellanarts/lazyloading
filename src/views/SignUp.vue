<template>
  <div>
    <h1>Sign up</h1>
    <form
      @submit.prevent="submitForm"
      novalidate
    >
      <text-input
        name="firstName"
        label="First Name"
        v-model="user.firstName"
        :errors="errors"
        type="text"
        required
      />

      <text-input
        name="lastName"
        label="Last Name"
        v-model="user.lastName"
        :errors="errors"
        type="text"
        required
      />

      <text-input
        name="email"
        label="Email"
        v-model="user.email"
        :errors="errors"
        required
        requiredField="emailInvalid"
        requiredLabel="Invalid Email"
      />

      <text-input
        name="password"
        label="Password"
        v-model="user.password"
        :errors="errors"
        type="password"
        required
        :min="6"
        @inputBlur="dirtyInputs = true"
        :secondaryRule="!errors.matchingPasswords && dirtyInputs"
        secondaryRuleLabel="Passwords must match"
      />

      <text-input
        name="confirmPassword"
        label="Confirm Password"
        v-model="user.confirmPassword"
        :errors="errors"
        type="password"
        required
        :min="6"
        @inputBlur="dirtyInputs = true"
        :secondaryRule="!errors.matchingPasswords && dirtyInputs"
        secondaryRuleLabel="Passwords must match"
        labelClass="text-label--two-lines"
      />

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
import TextInput from '@/components/common/forms/TextInput.vue';

export default {
  mixins: [
    formValidation,
  ],
  data() {
    return {
      dirtyInputs: false,
      user: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        confirmPassword: null,
      },
      errors: {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false,
        emailInvalid: false,
        matchingPasswords: false,
      },
    };
  },
  components: {
    TextInput,
  },
  methods: {
    ...mapActions({
      signUpUser: types.SIGN_UP_USER,
    }),
    async submitForm() {
      const returnVal = await this.validateForm({
        fields: this.user,
        options: {
          matchingPasswords: true,
        },
      });

      // if returnVal is false, attempt signup
      // false = no errors in validation
      if (!returnVal) {
        this.signUpUser(this.user);
      }
    },
  },
};
</script>
