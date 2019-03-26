<template>
  <div class="site-header">
    <nav>
        <router-link
          active-class="active"
          class="nav-link"
          to="/"
          exact
        >
          Home
        </router-link>
        <router-link
          v-if="!userId"
          active-class="active"
          class="nav-link"
          to="/sign-up"
        >
          Sign Up
        </router-link>
        <router-link
          v-if="!userId"
          active-class="active"
          class="nav-link"
          to="/log-in"
        >
          Log In
        </router-link>
        <router-link
          v-if="userId"
          active-class="active"
          class="nav-link"
          to="/dashboard"
        >
          Dashboard
        </router-link>
        <span
          v-if="userId"
          @click="logout"
          class="nav-link"
        >
          Log Out
        </span>
    </nav>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import * as types from '@/store/types';

export default {
  computed: mapState({
    userId: state => state.auth.userId,
  }),
  methods: {
    ...mapActions({
      logoutUser: types.LOG_OUT_USER,
    }),
    logout() {
      this.logoutUser();
    },
  },
};
</script>

<style lang="scss" scoped>
.site-header {
  padding-top: 25px;
  padding-bottom: 25px;
  text-align: right;
}

.nav-link {
  text-decoration: none;
  margin: 0 12px;
  color: rgb(50, 50, 50);
  border: none;
  display: inline-block;
  cursor: pointer;
  font-family: 'Nunito';

  &.active {
    color: rgb(86, 116, 247);

    &:hover {
      color: rgb(116, 146, 255);
    }
  }

  &:hover {
    color: rgb(125, 125, 125);
  }
}
</style>
