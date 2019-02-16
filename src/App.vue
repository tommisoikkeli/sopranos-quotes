<template>
  <div id="app">
    <div class="header">
      <h1>Sopranos quotes</h1>
    </div>
    <div class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/people">People</router-link>
      <router-link to="/best">Best quotes</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/mixins.scss";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.header {
  width: 100%;
  background: $header-color;
}
.nav {
  display: flex;
  justify-content: center;
  padding: 20px;
  a {
    margin-right: 20px;
    font-weight: bold;
    color: $router-link;
    text-decoration: none;

    @include mobile {
      margin-right: 12px;
    }
    &:hover {
      color: $router-link-active;
    }
    &.router-link-exact-active {
      color: $router-link-active;
      text-decoration: underline;
    }
  }
}
</style>
