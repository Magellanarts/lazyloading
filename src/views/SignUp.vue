<template>
  <div>
    <h1>Sign up</h1>
    <form
      @submit.prevent="validateForm"
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
        >
        <span
          class="field-error-message"
          v-if="errors.password"
        >
          Field Required
        </span>
      </div>

      <div class="form-field">
        <label class="text-label text-label--two-lines" for="confirmPassword">Confirm<br>Password</label>
        <input
          type="password"
          v-model="user.confirmPassword"
          name="confirmPassword"
          id="confirmPassword"
        >
        <span
          class="field-error-message"
          v-if="errors.confirmPassword"
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
import { emailValidation, formValidation } from '@/mixins';

export default {
  mixins: [
    emailValidation,
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
      },
    };
  },
};
</script>

<style lang="scss">
</style>
