<template>
  <div class="site-header">
    <nav>
        <router-link active-class="active" class="nav-link" to="/" exact>Home</router-link>
        <router-link active-class="active" class="nav-link" to="/sign-up">Sign Up</router-link>
        <router-link active-class="active" class="nav-link" to="/sign-in">Log In</router-link>
    </nav>
  </div>
</template>

<script>
export default {

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
  margin: 0 10px;
  color: rgb(50, 50, 50);

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
