<template>
  <div class="header">
    <span @click="back(url)">{{left}}</span>
    <span>{{ title }}</span>
    <span @click="goback()">{{right}}</span>
  </div>
</template>
<script>
export default {
  props: ["title","right","left"],
  methods: {
      back(){
          this.$router.go(-1);
      },
      goback(){
        this.$emit("goback");
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
