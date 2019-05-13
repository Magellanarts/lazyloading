<template>
    <div class="chat" v-if="chat">
      <div class="chat__header">
        {{ chat.itemName }}
      </div>
      <div class="chat__messages" ref="chat__messages">
        <div
          class="chat__message"
          v-for="message in chat.messages"
          :key="message.timestamp.seconds"
          :class="{
            'sender':
              message.sender == userId,
            'receiver':
              (message.sender !== userId && message.sender !== 'SYSTEM'),
            'system':
              message.sender === 'SYSTEM'
          }"
        >
          <div class="chat__message__text">{{ message.message }}</div>
          <div class="chat__message__date">
            {{ displayDate(new Date(message.timestamp.seconds * 1000)) }}
          </div>
        </div>

      </div>

      <div class="chat__input">
        <textarea v-model="message">

        </textarea>
        <button @click="addMessage">Send</button>
      </div>
    </div>
</template>

<script>
import moment from 'moment';

import { mapState, mapActions } from 'vuex';

import {
  STORE_BIND_CONVO,
} from '@/store/types';

import {
  ADD_MESSAGE,
} from '@/actions/conversations';

export default {
  data() {
    return {
      // chat: [],
      message: '',
    };
  },
  computed: mapState({
    userId: state => state.auth.userId,
    chat: state => state.conversations.chats,
  }),
  methods: {
    ...mapActions({
      bindConvo: STORE_BIND_CONVO,
    }),
    displayDate(theDate) {
      return moment(theDate).format('MMMM Do YYYY, h:mm a');
    },
    async addMessage() {
      await ADD_MESSAGE({
        message: this.message,
        sender: this.userId,
        timestamp: {
          seconds: new Date().getTime() / 1000,
        },
      }, this.$route.params.id);

      this.message = '';
    },
  },
  created() {
    this.bindConvo(this.$route.params.id);
  },
  updated() {
    const el = this.$refs.chat__messages;
    el.scrollTop = el.scrollHeight;
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

  &.system {
    align-items: center;
    color: #555;
    font-size: 86%;

    .chat__message__date {
      font-size: 10px;
    }
  }
}

.chat__messages {
  flex: 1;
  overflow: scroll;
}

.chat__input {
  flex: 0 0 50px;
  border-top: 1px solid #ddd;
  box-sizing: border-box;
  position: relative;
  display: flex;
}

.chat__message__text {
  padding-bottom: 6px;
}

.chat__message__date {
  font-size: 11px;
  font-style: italic;
}

textarea {
  padding-left: 0;
  min-height: 0;
  border-bottom: 0;
  -webkit-appearance: none;
  resize: none;
  height: 50px;
  flex: 1;
  padding: 8px 16px 0;
}

button {
  background: rgb(86, 116, 247);
  color: #fff;
  border-radius: 0;
  border: none;
  -webkit-appearance: none;

  height: 100%;
  box-sizing: border-box;
  padding: 4px 24px;
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  cursor: pointer;
}
</style>
