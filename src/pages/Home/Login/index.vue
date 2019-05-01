<template>
  <div class="login">
    <ul>
      <li>
        <span>★</span>
        <input type="text" placeholder="请输入用户名" @input="getUname($event)">
      </li>
      <li>
        <span>★</span>
        <input type="text" placeholder="请输入密码" @input="getPass($event)">
      </li>
    </ul>
    <div class="btn" @click="login()">登录</div>
  </div>
</template>
<script>
import {Toast} from 'mint-ui';
export default {
  data() {
    return {
      uname: "",
      password: ""
    };
  },
  methods: {
    login() {
      let params = new URLSearchParams();
      params.append("uname", this.uname);
      params.append("password", this.password);
      this.$axios
        .post("/LogSystem/login", params)
        .then(res => {
          if (res.data.keycode === 200) {
            sessionStorage.setItem("userInfo",JSON.stringify(res.data.result));
            this.$router.push("/index");
          }else if(res.data.keycode === 201){
            //用户名或密码错误
            Toast(res.data.message);
          }else if(res.data.keycode === 203){
            //等待审核
            Toast(res.data.message);
          }
        });
    },
    getUname(e) {
      this.uname = e.target.value;
    },
    getPass(e) {
      this.password = e.target.value;
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.login {
  height: 2.47rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
ul {
  border: 1px solid #ccc;
  border-bottom: 0;
}
ul li {
  width: 3rem;
  border-bottom: 1px solid #ccc;
  height: 0.4rem;
}
span {
  text-align: center;
  display: inline-block;
  height: 0.38rem;
  width: 0.38rem;
  border: 0;
}
input {
  height: 0.38rem;
  border: 0;
}
.btn {
  width: 3rem;
  background: #ff7970;
  color: white;
  height: 0.35rem;
  text-align: center;
  line-height: 0.35rem;
}
</style>