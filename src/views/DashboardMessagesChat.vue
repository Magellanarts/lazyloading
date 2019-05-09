<template>
  <div>
    {{ chat.itemName }}
    <div class="chat" v-if="chat">
      <div
        class="chat__message"
        v-for="message in chat.messages"
        :key="message.timestamp.seconds"
      >
        <div class="chat__message__text">{{ message.message }}</div>
        <div class="chat__message__date">{{ displayDate(new Date(message.timestamp.seconds * 1000)) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

import {
  GET_CONVERSATION_BY_ID,
} from '@/actions/conversations';

export default {
  data() {
    return {
      chat: [],
    };
  },
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
.chat__message {
  padding-bottom: 22px;
}

.chat__message__text {
  padding-bottom: 6px;
}

.chat__message__date {
  font-size: 11px;
  font-style: italic;
}
</style>
