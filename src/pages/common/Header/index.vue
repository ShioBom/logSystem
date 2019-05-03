<template>
  <div class="header">
    <span @click="back(url)">返回</span>
    <span>{{ title }}</span>
    <span></span>
  </div>
</template>
<script>
export default {
  props: ["title"],
  methods: {
      back(){
          this.$router.go(-1);
      }
  },
};
</script>
<style lang="scss" scoped>
.header {
  color: white;
  background: #007880;
  position: absolute;
  top: 0;
  left: 0;
  height: 0.6rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  justify-items: center;
  span {
    display: inline-block;
    min-width: 0.8rem;
    height: 100%;
    line-height: 0.6rem;
    text-align: center;
  }
}
</style>
