<template>
  <div>
    <div v-if="user">
      <h1>Welcome {{ user.firstName }}!</h1>

      <div class="dashboard-section">
        <h4>Your Addresses</h4>
        <ul v-if="userAddresses">
          <li class="dashboard-item"  v-for="address in userAddresses" :key="address.ID">
            <div class="dashboard-item__name">{{ address.label }}</div>
            <div class="dashboard-item__buttons">
              <router-link
              :to="`/dashboard/edit-address/${address.ID}`"
              >Edit</router-link>
            </div>
          </li>
        </ul>

        <router-link class="button" to="/dashboard/edit-address">Add Address</router-link>
      </div>

      <h4>Your active items:</h4>
      <ul v-if="userItems">
        <li class="dashboard-item" v-for="item in userItems" :key="item.slug">
          <div class="dashboard-item__name">{{ item.name }}</div>
          <div class="dashboard-item__buttons">
            <router-link
              @click.native="setItem(item)"
              :to="`/dashboard/list-item/${item.ID}`"
            >Edit</router-link>
            <router-link :to="`item/${item.slug}`">View</router-link>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import {
  SET_ITEM_DETAILS, GET_USER_DETAILS, GET_USER_ITEMS, GET_USER_ADDRESSES,
} from '@/store/types';

export default {
  computed: mapState({
    user: state => state.auth.user,
    userId: state => state.auth.userId,
    userItems: state => state.auth.userItems,
    userAddresses: state => state.auth.userAddresses,
  }),
  methods: {
    ...mapActions({
      setItem: SET_ITEM_DETAILS,
      getUserDetails: GET_USER_DETAILS,
      getUserItems: GET_USER_ITEMS,
      getUserAddresses: GET_USER_ADDRESSES,
    }),
  },
  async mounted() {
    if (!this.user) {
      await this.getUserDetails();
      this.getUserItems();
      this.getUserAddresses();
    }
  },
};
</script>

<style lang="scss" scoped>
h1 {
  margin-bottom: 16px;
}
.dashboard-section {
  margin-bottom: 48px;
}

.dashboard-item {
  margin-bottom: 16px;
}

.dashboard-item__name {
  margin-bottom: 8px;
  font-size: 16px;
}

.dashboard-item__buttons {
  a {
    display: inline-block;
    color: rgb(86, 116, 247);
    font-size: 13px;

    &:not(:last-child) {
      margin-right: 8px;
    }
  }
}
.dashboard-nav {
  margin-bottom: 32px;
  padding-top: 16px;
  padding-bottom: 16px;
  background: #eee;

  a {
    font-size: 15px;
    font-family: 'Nunito';
    color: rgb(86, 116, 247);

    &:not(:first-child) {
      margin-left: 16px;
    }

    &.active {
      color: darken(rgb(86, 116, 247),45%);

      &:hover {
        color: darken(rgb(86, 116, 247),20%);
      }
    }

    &:hover {
      color: darken(rgb(86, 116, 247),20%);
    }
  }
}
</style>
