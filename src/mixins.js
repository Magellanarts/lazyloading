/* eslint-disable import/prefer-default-export */
export const formValidation = {
  methods: {
    validateForm({ fields, options }) {
      console.log(fields);
      let errors = false;
      // check for valid email
      if (fields.email) {
        if (!this.validateEmail(fields.email)) {
          this.errors.emailInvalid = true;
          errors = true;
        } else {
          this.errors.emailInvalid = false;
        }
      }

      // confirm that 2 password fields match each other
      // checking if the 2 fields don't match and they aren't empty or null
      if (options) {
        if (options.matchingPasswords) {
          if (fields.password !== null && fields.password !== '' && fields.confirmPassword !== null && fields.confirmPassword !== '') {
            if (fields.password !== fields.confirmPassword) {
              this.errors.matchingPasswords = false;
              errors = true;
            } else {
              this.errors.matchingPasswords = true;
            }
          }
        }
      }


      // TODO: Fix this for-in loop
      // loop through user values checking for null or empty string
      // if null/empty, add it to the errors object
      for (const key in fields) {
        if (fields[key] === null || fields[key] === '') {
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

export const slugify = {
  sanitizeTitle(title) {
    let slug = '';
    // Change to lower case
    const titleLower = title.toLowerCase();
    // Letter "e"
    slug = titleLower.replace(/e|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ễ|ể|ệ/gi, 'e');
    // Letter "a"
    slug = slug.replace(/a|á|à|ã|ả|ạ|ă|ắ|ằ|ẵ|ẳ|ặ|â|ấ|ầ|ẫ|ẩ|ậ/gi, 'a');
    // Letter "o"
    slug = slug.replace(/o|ó|ò|õ|ỏ|ọ|ô|ố|ồ|ỗ|ổ|ộ|ơ|ớ|ờ|ỡ|ở|ợ/gi, 'o');
    // Letter "u"
    slug = slug.replace(/u|ú|ù|ũ|ủ|ụ|ư|ứ|ừ|ữ|ử|ự/gi, 'u');
    // Letter "d"
    slug = slug.replace(/đ/gi, 'd');
    // Trim the last whitespace
    slug = slug.replace(/\s*$/g, '');
    // Change whitespace to "-"
    slug = slug.replace(/\s+/g, '-');

    return slug;
  },
};

export const convertToBlob = {
  methods: {
    dataURItoBlob(dataURI) {
      // convert base64 to raw binary data held in a string
      // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
      const byteString = atob(dataURI.split(',')[1]);

      // separate out the mime component
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

      // write the bytes of the string to an ArrayBuffer
      const ab = new ArrayBuffer(byteString.length);

      // create a view into the buffer
      const ia = new Uint8Array(ab);

      // set the bytes of the buffer to the correct values
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }

      // write the ArrayBuffer to a blob, and you're done
      const blob = new Blob([ab], { type: mimeString });
      return blob;
    },
  },
};
