<template>
  <div class="owner-block">
    <div class="owner-name">{{ owner.firstName }} {{ owner.lastName }}</div>
    <div class="message-seller">Message Owner</div>

    <div class="owner-message">
      <h5>Contact owner about this item</h5>

      <form
      @submit.prevent="submitForm"
      novalidate
      >
        <text-input
          name="message"
          v-model="message"
          label="Message Owner"
          textarea
          required
          :errors="errors"
        />

        <button class="button" type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import TextInput from '@/components/common/forms/TextInput.vue';

export default {
  data() {
    return {
      message: '',
      errors: {
        message: false,
      },
    };
  },
  components: {
    TextInput,
  },
  props: {
    owner: {
      type: Object,
      required: true,
    },
  },
  methods: {
    submitForm() {
      if (!this.message) {
        this.errors.message = true;
      } else {
        this.errors.message = false;
        // submit the message
        // create new entry in conversation table
        //  -- includes:
        //    -- id of owner
        //    -- id of renter
        //    -- array with messages:
        //      -- timestamp
        //      -- message
        //      -- who sent message
        //  add conversation ID to owner
        //  add conversation ID to renter
        //  add conversation ID to item
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.owner-block {
  margin-bottom: 18px;
  position: relative;
}

.owner-name {
  font-style: italic;
}

.message-seller {
  font-size: 14px;
  color: rgb(86, 116, 247);
  cursor: pointer;
}

.owner-message {
  position: fixed;
  top: 16%;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 16%;
  width: 70%;
  max-width: 700px;
  box-shadow: 0px 0px 6px 4px rgb(86, 116, 247);
  z-index: 50;
  background: rgb(250, 250, 250);
  border-radius: 4px;
  box-sizing: border-box;
  padding: 32px;
}

h5 {
  font-size: 18px;
}
textarea {
  padding-left: 0;
}
</style>
