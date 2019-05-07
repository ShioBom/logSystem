<template>
  <div class="examine">
    <Header :title="title" :left="'返回'"></Header>
    <div class="content">
      <ul>
        <li v-for="(item, ind) in data" :key="ind">
          <p>{{ item.realname }}</p>
          <div>
            <span>{{ item.dname}}</span>
            <span>{{ item.pname }}</span>
            <span
              ><mt-button type="default" @click="reject(item,ind)">拒绝</mt-button
              ><mt-button type="default" @click="agree(item,ind)">通过</mt-button></span
            >
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import Header from "../common/Header";
export default {
  data() {
    return {
      title: "在线审批",
      data: []
    };
  },
  components: { Header },
  methods: {
    reject(item,ind) {
      let params = new URLSearchParams();
      params.append("uname", item.uname);
      this.$axios.post("/LogSystem/deleteuser", params).then(res => {
          if(res.data.keycode===200){
              this.data.splice(ind,1);
          }
      });

    },
    agree(item,ind) {
      let params = new URLSearchParams();
      params.append("uname",item.uname );
      this.$axios.post("/LogSystem/modifystatus1", params).then(res => {
           if(res.data.keycode===200){
              this.data.splice(ind,1);
          }
      });
    },
    getData(){
        let params = new URLSearchParams();
      params.append("uname", JSON.parse(sessionStorage.getItem("userInfo")).uname);
      this.$axios.post("/LogSystem/finduserstatus0", params).then(res => {
           if(res.data.keycode===200){
              this.data=res.data.data;
          }
      });
    }
  },
  mounted() {
      this.getData();
  },
};
</script>
<style lang="scss" scoped>
.examine {
  width: 100%;
  height: 100%;
  position: relative;
}
.content {
  position: absolute;
  top: 0.6rem;
  left: 0;
  right: 0;
  bottom: 0;
  background: azure;
  overflow-y: scroll;
  ul {
    li {
      border-radius: 0.1rem;
      margin: 0.1rem;
      height: 0.8rem;
      margin-bottom: 0.1rem;
      background: silver;
      padding: 0 0.1rem;
      font-size: 16px;
      p {
        height: 0.3rem;
        line-height: 0.3rem;
        color: aqua;
      }
      div {
        height: 0.5rem;
        line-height: 0.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
