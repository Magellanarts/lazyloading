<template>
  <div class="l-site-container site-header">
    <router-link
          active-class="active"
          class="site-logo"
          to="/"
          exact
        >
          <img src="@/assets/img/ll-logo.svg" />
        </router-link>
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
          to="/dashboard/user"
          :class="{'active': subIsActive('/dashboard')}"
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
import { STORE_LOG_OUT_USER } from '@/store/types';

export default {
  computed: mapState({
    userId: state => state.auth.userId,
  }),
  methods: {
    ...mapActions({
      logoutUser: STORE_LOG_OUT_USER,
    }),
    logout() {
      this.logoutUser();
    },
    subIsActive(input) {
      const paths = Array.isArray(input) ? input : [input];
      return paths.some(path => this.$route.path.indexOf(path) === 0);
    },
  },
};
</script>

<style lang="scss" scoped>
.site-header {
  padding-top: 25px;
  padding-bottom: 25px;
  text-align: right;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: linear-gradient(to left, rgb(86, 116, 247), rgba(86, 116, 247, .92));
}

.site-logo {
  width: 120px;
  display: block;
}

.nav-link {
  text-decoration: none;
  margin: 0 12px;
  color: #fff;
  border: none;
  display: inline-block;
  cursor: pointer;
  font-family: 'Nunito';
  transition: .1s linear;

  &.active {
    color: darken(rgb(86, 116, 247),45%);

    &:hover {
      color: darken(rgb(86, 116, 247),20%);
    }
  }

  &:hover {
    color: rgba(255,255,255,.6);
  }
}
</style>
