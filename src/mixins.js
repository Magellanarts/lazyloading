/* eslint-disable import/prefer-default-export */
export const formValidation = {
  methods: {
    validateForm(options) {
      let errors = false;
      // check for valid email
      if (!this.validateEmail(this.user.email)) {
        this.errors.emailInvalid = true;
        errors = true;
      } else {
        this.errors.emailInvalid = false;
      }

      // confirm that 2 password fields match each other
      // checking if the 2 fields don't match and they aren't empty or null
      if (options.matchingPasswords) {
        if (this.user.password !== null && this.user.password !== '' && this.user.confirmPassword !== null && this.user.confirmPassword !== '') {
          if (this.user.password !== this.user.confirmPassword) {
            this.errors.matchingPasswords = false;
            errors = true;
          } else {
            this.errors.matchingPasswords = true;
          }
        }
      }

      // TODO: Fix this for-in loop
      // loop through user values checking for null or empty string
      // if null/empty, add it to the errors object
      for (const key in this.user) {
        if (this.user[key] === null || this.user[key] === '') {
          this.errors[key] = true;
          errors = true;
        } else {
          this.errors[key] = false;
        }
      }

      return errors;
    },
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
  },
};
