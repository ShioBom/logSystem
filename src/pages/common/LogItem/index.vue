<template>
  <li class="logItem" @click="fn()">
    <p>
      <span class="username">{{ log.uname }}</span
      ><span class="date">{{ log.log_date }}</span>
    </p>
    <div class="content">
      {{ log.log_context }}
    </div>
  </li>
</template>
<script>
export default {
  props: ["log"],
  methods:{
    fn(){
      this.$emit("goDetail");
    }
  }
};
</script>
<style lang="scss" scoped>
.logItem {
  margin-bottom: 0.1rem;
  width: 100%;
  height: 1.5rem;
  p {
    height: 0.5rem;
    display: flex;
    background: #ebefd0;
    justify-content: space-between;
    align-items: center;
    span {
      box-sizing: border-box;
      line-height: 0.5rem;
      padding: 0 0.1rem;
      color: #099a97;
    }
    .username {
      font-size: 18px;
    }
  }
  .content {
    box-sizing: border-box;
    height: 1rem;
    background: #e8e8e8;
    font-size: 16px;
    line-height: 18px;
    padding: 0.1rem;
    white-space:pre-wrap

  }
}
</style>
