<template>
  <div>
    <h1>Messages</h1>

    <div class="dashboard-panels">
      <nav class="dashboard-panels__nav">
          <router-link
            tag="li"
            :to="`/dashboard/messages/${conversation.ID}`"
            class="dashboard-panels__nav__link"
            active-class="active"
          v-for="conversation in conversations"
          :key="conversation.item"
          >
            {{ conversation.itemName }}
          </router-link>
      </nav>

      <div class="dashboard-panels__content">
        <transition name="fade" mode="out-in">
          <router-view :key="$route.fullPath"  />
        </transition>
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
