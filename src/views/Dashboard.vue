<template>
  <div>
    <nav class="l-site-container dashboard-nav">
      <router-link
        to="/dashboard/user"
        active-class="active"
      >
        Main
      </router-link>
      <router-link
        to="/dashboard/list-item"
        active-class="active"
      >
        List an Item
      </router-link>
      <router-link
        to="/dashboard/edit-address"
        active-class="active"
      >
        Add address
      </router-link>
      <router-link
      to="/dashboard/messages"
      active-class="active"
      >
        Messages
      </router-link>
    </nav>

    <transition name="fade" mode="out-in">
      <div class="l-site-container">
        <router-view />
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
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
