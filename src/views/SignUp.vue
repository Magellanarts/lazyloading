// TODO:
<template>
  <div>
    <h1>Sign up</h1>
    <form
      @submit.prevent="submitForm"
      novalidate
    >
      <div class="form-field">
        <label class="text-label" for="firstName">First Name</label>
        <input
          type="text"
          v-model="user.firstName"
          name="firstName"
          id="firstName"
        >
        <span
          class="field-error-message"
          v-if="errors.firstName"
        >
          Field Required
        </span>
      </div>

      <div class="form-field">
        <label class="text-label" for="lastName">Last Name</label>
        <input
          type="text"
          v-model="user.lastName"
          name="lastName"
          id="lastName"
        >
        <span
          class="field-error-message"
          v-if="errors.lastName"
        >
          Field Required
        </span>
      </div>

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
        >
        <span
          class="field-error-message"
          v-if="errors.password && errors.matchingPasswords"
        >
          Field Required
        </span>
        <span
          class="field-error-message"
          v-if="!errors.matchingPasswords && errors.password"
        >
          Passwords must match
        </span>
      </div>

      <div class="form-field">
        <label class="text-label text-label--two-lines" for="confirmPassword">Confirm<br>Password</label>
        <input
          type="password"
          v-model="user.confirmPassword"
          name="confirmPassword"
          id="confirmPassword"
          min="6"
        >
        <span
          class="field-error-message"
          v-if="errors.confirmPassword && errors.matchingPasswords"
        >
          Field Required
        </span>
        <span
          class="field-error-message"
          v-if="!errors.matchingPasswords && errors.confirmPassword"
        >
          Passwords must match
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
import firebase from 'firebase/app';
import 'firebase/auth';

export default {
  mixins: [
    formValidation,
  ],
  data() {
    return {
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
  methods: {
    async submitForm() {
      const returnVal = await this.validateForm({ matchingPasswords: true });

      // if returnVal is false, attempt signup
      // false = no errors in validation
      if (!returnVal) {
        firebase.auth()
          .createUserWithEmailAndPassword(this.user.email, this.user.password)
          .then((user) => {
            console.log(user);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>

<style lang="scss">
</style>
