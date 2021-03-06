<template>
  <div class="owner-block">
    <div class="owner-name">{{ owner.firstName }} {{ owner.lastName }}</div>
    <div class="message-seller" @click="messageOwner">Message Owner</div>

    <div
      class="owner-message"
      :class="{ 'is-open' : showOwner}"
    >

      <div class="close-owner" @click="showOwner = false" />
      <h5>Contact {{ owner.firstName }} about {{ item.name }}</h5>

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

    <transition name="fade" mode="out-in">
      <alert-modal
        v-if="showNotLoggedInModal"
        type="fail"
        heading="Must be logged in."
        ref="log-in-modal"
        showClose
        @closeModal="showNotLoggedInModal = false"
      >
        <div>
          <router-link to="/sign-up/">Sign up</router-link>
          or
          <router-link to="/log-in/">Log In</router-link>
        </div>
        to message owner
      </alert-modal>
    </transition>
  </div>
</template>

<script>
import TextInput from '@/components/common/forms/TextInput.vue';
import AlertModal from '@/components/common/AlertModal.vue';

import {
  MESSAGE_OWNER,
} from '@/actions/conversations';

export default {
  data() {
    return {
      message: '',
      showOwner: false,
      showNotLoggedInModal: false,
      errors: {
        message: false,
      },
    };
  },
  components: {
    TextInput,
    AlertModal,
  },
  props: {
    owner: {
      type: Object,
      required: true,
    },
    item: {
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
        MESSAGE_OWNER(this.item.ID, this.item.user, this.message, this.item.name);

        this.showOwner = false;
        this.message = '';
      }
    },
    messageOwner() {
      if (this.$store.getters.userId) {
        this.showOwner = true;
      } else {
        this.showNotLoggedInModal = true;
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
  font-size: 18px;
  line-height: 24px;
  padding-bottom: 4px;
}

.message-seller {
  font-size: 14px;
  color: rgb(86, 116, 247);
  cursor: pointer;
}

.owner-message {
  position: fixed;
  top: 0;
  margin: auto;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  background: rgb(250, 250, 250);
  border-radius: 4px;
  box-sizing: border-box;
  padding: 40px 32px 32px;
  opacity: 0;
  visibility: hidden;
  transition: .3s linear;

  &.is-open {
    opacity: 1;
    visibility: visible;
  }

  @media screen and (min-width: 600px) {
    top: 20%;
    bottom: auto;
    width: 60%;
    max-width: 700px;
    box-shadow: 0px 0px 6px 4px rgb(86, 116, 247);
  }
}

.close-owner {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 25px;
  height: 25px;
  cursor: pointer;

  &:before,
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    margin: auto;
    left: 0;
    width: 2px;
    height: 25px;
    background: rgb(86, 116, 247);
  }

  &:before {
    transform: rotate(45deg);
  }
  &:after {
    transform: rotate(-45deg);
  }
}

h5 {
  font-size: 18px;
}
</style>
