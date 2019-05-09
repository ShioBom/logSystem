<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
import Footer from "./pages/common/Footer";
export default {
  name: "app",
  components: { Footer }
};
</script>

<style lang="scss">
html,
body {
  height: 100%;
}
#app {
  height: 100%;
  width: 100%;
}
</style>
