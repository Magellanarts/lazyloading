<template>
  <div>
    <nav class="dashboard-nav">
      <router-link to="/dashboard/list-item">List an Item</router-link>
      <router-link to="/dashboard/edit-address">Add address</router-link>
    </nav>

    <template v-if="user">
      <h1>Welcome {{ user.firstName }}!</h1>

      <div class="dashboard-section">
        <h4>Your Addresses</h4>

        <router-link class="button" to="/dashboard/edit-address">Add Address</router-link>
      </div>

      <h4>Your active items:</h4>
      <ul>
        <li class="dashboard-item" v-for="item in userItems" :key="item.slug">
          <div class="dashboard-item__name">{{ item.name }}</div>
          <div class="dashboard-item__buttons">
            <router-link
              @click.native="setItem(item)"
              :to="{
                name: 'dashboard-list-item',
                params: {
                  itemName: item.name,
                  itemPrice: item.dailyPrice,
                  itemStreetAddress: item.streetAddress,
                  itemDescription: item.description,
                  itemCity: item.city,
                  itemState: item.state
                },
              }"
            >Edit</router-link>
            <router-link :to="`item/${item.slug}`">View</router-link>
          </div>
        </li>
      </ul>
    </template>


    <router-view/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { SET_ITEM_DETAILS, GET_USER_DETAILS, GET_USER_ITEMS } from '@/store/types';

export default {
  computed: mapState({
    user: state => state.auth.user,
    userId: state => state.auth.userId,
    userItems: state => state.auth.userItems,
  }),
  methods: {
    ...mapActions({
      setItem: SET_ITEM_DETAILS,
      getUserDetails: GET_USER_DETAILS,
      getUserItems: GET_USER_ITEMS,
    }),
  },
  async mounted() {
    if (!this.user) {
      await this.getUserDetails();
      this.getUserItems();
    }
  },
};
</script>

<style lang="scss" scoped>
.dashboard-section {
  margin-bottom: 48px;
}

.dashboard-item {
  margin-bottom: 16px;
}

.dashboard-item__name {
  margin-bottom: 8px;
}

.dashboard-item__buttons {
  a {
    display: inline-block;
    color: rgb(86, 116, 247);
    font-size: 14px;

    &:not(:last-child) {
      margin-right: 8px;
    }
  }
}
.dashboard-nav {
  margin-bottom: 32px;
  padding-bottom: 8px;
  border-bottom: 1px solid #aaa;

  a {
    font-size: 15px;
    font-family: 'Nunito';
    color: rgb(86, 116, 247);

    &:not(:first-child) {
      margin-left: 16px;
    }
  }
}
</style>
