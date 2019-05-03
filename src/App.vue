<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
