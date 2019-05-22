<template>
  <div>
    <h1>Log In</h1>
    <form
      @submit.prevent="submitForm"
      novalidate
    >
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
      />

      <div class="form-field">
        <button class="button" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
import { formValidation } from '@/mixins';
import { LOG_IN_USER } from '@/actions/user';
import TextInput from '@/components/common/forms/TextInput.vue';

export default {
  mixins: [
    formValidation,
  ],
  data() {
    return {
      dirtyInputs: false,
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
  components: {
    TextInput,
  },
  methods: {
    async submitForm() {
      const returnVal = await this.validateForm({
        fields: this.user,
        options: {
          matchingPasswords: false,
        },
      });

      // if returnVal is false, attempt signup
      // false = no errors in validation
      if (!returnVal) {
        LOG_IN_USER(this.user);
      }
    },
  },
};
</script>
