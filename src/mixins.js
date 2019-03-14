export const emailValidation = {
  methods: {
    validateEmail(email) {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
  },
};

export const formValidation = {
  methods: {
    validateForm() {
      // check for valid email
      if (!this.validateEmail(this.user.email)) {
        this.errors.emailInvalid = true;
      } else {
        this.errors.emailInvalid = false;
      }
      // TODO: Fix this for-in loop
      // loop through user values checking for null or empty string
      // if null/empty, add it to the errors object
      for (const key in this.user) {
        if (this.user[key] === null || this.user[key] === '') {
          this.errors[key] = true;
        } else {
          this.errors[key] = false;
        }
      }
    },
  },
};
