<template>
    <div class="chat" v-if="chat">
      <div class="chat__header">
        {{ chat.itemName }}
      </div>
      <div class="chat__messages">
        <div
          class="chat__message"
          v-for="message in chat.messages"
          :key="message.timestamp.seconds"
          :class="{'sender' : message.sender == userId, 'receiver': message.sender !== userId}"
        >
          <div class="chat__message__text">{{ message.message }}</div>
          <div class="chat__message__date">
            {{ displayDate(new Date(message.timestamp.seconds * 1000)) }}
          </div>
        </div>
        <div
          class="chat__message"
          v-for="message in chat.messages"
          :key="message.timestamp.seconds"
          :class="{'sender' : message.sender == userId, 'receiver': message.sender !== userId}"
        >
          <div class="chat__message__text">{{ message.message }}</div>
          <div class="chat__message__date">
            {{ displayDate(new Date(message.timestamp.seconds * 1000)) }}
          </div>
        </div>
        <div
          class="chat__message"
          v-for="message in chat.messages"
          :key="message.timestamp.seconds"
          :class="{'sender' : message.sender == userId, 'receiver': message.sender !== userId}"
        >
          <div class="chat__message__text">{{ message.message }}</div>
          <div class="chat__message__date">
            {{ displayDate(new Date(message.timestamp.seconds * 1000)) }}
          </div>
        </div>
      </div>

      <div class="chat__input">
        type here
      </div>
    </div>
</template>

<script>
import moment from 'moment';

import { mapState } from 'vuex';
import {
  GET_CONVERSATION_BY_ID,
} from '@/actions/conversations';

export default {
  data() {
    return {
      chat: [],
    };
  },
  computed: mapState({
    userId: state => state.auth.userId,
  }),
  methods: {
    displayDate(theDate) {
      return moment(theDate).format('MMMM Do YYYY, h:mm:ss a');
    },
  },
  async mounted() {
    this.chat = await GET_CONVERSATION_BY_ID(this.$route.params.id);
  },
  destroyed() {
    this.chat = '';
  },
};
</script>

<style lang="scss" scoped>
.chat {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  max-height: 60vh;
}

.chat__header {
  flex: 0 0 60px;
  font-size: 26px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ddd;
  padding: 8px 16px;
  box-sizing: border-box;
}

.chat__message {
  padding: 16px;
  display: flex;
  flex-direction: column;

  &.sender {
    align-items: flex-end;
  }
}

.chat__messages {
  flex: 1;
  overflow: scroll;
}

.chat__input {
  flex: 0 0 40px;
  border-top: 1px solid #ddd;
  padding: 8px 16px;
  box-sizing: border-box;
}

.chat__message__text {
  padding-bottom: 6px;
}

.chat__message__date {
  font-size: 11px;
  font-style: italic;
}
</style>
