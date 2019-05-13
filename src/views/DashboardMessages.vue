<template>
  <div>
    <h1>Messages</h1>

    <div class="messages-container">
      <nav class="messages-list">
          <router-link
            tag="li"
            :to="`/dashboard/messages/${conversation.ID}`"
            class="message-box"
            active-class="active-chat"
          v-for="conversation in conversations"
          :key="conversation.item"
          >
            {{ conversation.itemName }}
          </router-link>

      </nav>

      <div class="messages-chat">
        <router-view :key="$route.fullPath"  />
      </div>
    </div>

  </div>
</template>

<script>
import {
  GET_USER_CONVERSATIONS,
} from '@/actions/user';

export default {
  data() {
    return {
      conversations: [],
    };
  },
  async mounted() {
    this.conversations = await GET_USER_CONVERSATIONS();
  },
};
</script>

<style lang="scss" scoped>
.messages-container {
  display: flex;
  border: 1px solid #ddd;
  min-height: 60vh;
  flex-direction: column;

   @media screen and (min-width: 760px) {
    flex-direction: row;
   }
}

.messages-list {
  border-right: 1px solid #ddd;

  @media screen and (min-width: 760px) {
    flex: 0 0 225px;
  }
}

.message-box {
  padding: 16px 24px;
  display: block;
  cursor: pointer;
  background: #eee;
  border-bottom: 1px solid #ccc;

  &.active-chat {
    color: rgb(86, 116, 247);
  }
}

.messages-chat {
  flex: 1;
}
</style>
