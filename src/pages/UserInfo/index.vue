<template>
  <div class="mine">
    <Header :title="title" :right="active!=='1'?'×':null" @goback="toMyInfo"></Header>

    <mt-tab-container v-model="active">
      <mt-tab-container-item id="1">
        <ul>
          <li class="extra">
            <span class="left">姓名：</span>
            <span>{{this.user.realname}}</span>
          </li>
          <li class="extra">
            <span class="left">用户名：</span>
            <span>{{this.user.uname}}</span>
          </li>
          <li>
            <span class="left">编辑个人信息</span>
            <span class="right" @click="toggle(2)">〉</span>
          </li>
          <li>
            <span class="left">修改密码</span>
            <span class="right" @click="toggle(3)">〉</span>
          </li>
        </ul>
        <mt-button type="default" size="large" @click="exit()">退出</mt-button>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-field label="姓名" placeholder="请输入姓名" v-model="realname"></mt-field>
        <mt-radio
          title="性别"
          v-model="sex"
          :options="[
            {
              label: '男',
              value: '0'
            },
            {
              label: '女',
              value: '1'
            }
          ]"
        ></mt-radio>
        <mt-field label="年龄" placeholder="请输入年龄" type="number" v-model="age"></mt-field>
        <mt-field label="联系方式" placeholder="请输入手机号" type="tel" v-model="tel"></mt-field>
        <mt-button type="default" size="large" @click="updateUserInfo()">保存修改</mt-button>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <dl>
          <dd>
            <h3>请输入原密码：</h3>
            <mt-field placeholder="原密码" v-model="prepass"></mt-field>
          </dd>
          <dd>
            <h3>请输入新密码：</h3>
            <mt-field placeholder="新密码" v-model="newpass"></mt-field>
          </dd>
          <dd>
            <h3>确认密码：</h3>
            <mt-field placeholder="确认密码" v-model="newpass2"></mt-field>
          </dd>
        </dl>
        <mt-button type="default" size="large" @click="updatePass()">保存修改</mt-button>
      </mt-tab-container-item>
    </mt-tab-container>
    <Footer></Footer>
  </div>
</template>
<script>
import Vue from "vue";
import Footer from "../common/Footer";
import Header from "../common/Header";
import Radio from "mint-ui/lib/radio";
import "mint-ui/lib/radio/style.css";
Vue.component(Radio.name, Radio);
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      active: "1",
      user: JSON.parse(sessionStorage.getItem("userInfo")),
      title: "我的",
      realname: "",
      sex:"", //性别
      age:"",
      tel: "",
      prepass: "", //以前的密码
      newpass: "", //新密码
      newpass2: "", //确认密码,
      flag: false
    };
  },
  components: { Footer, Header },
  methods: {
    toggle(id) {
      this.active = String(id);
    },
    //退出登录
    exit() {
      sessionStorage.removeItem("userInfo");
      this.$router.push("/");
    },
    toMyInfo() {
      this.active = "1";
    },
    updateUserInfo() {
      console.log("修改个人信息");
      let params = new URLSearchParams();
      params.append("uname", this.user.uname);
      params.append("realname", this.realname);
      params.append("sex", Number(this.sex));
      params.append("age", this.age);
      params.append("tel", this.tel);
      console.log(this.realname, this.sex, this.age, this.tel);
      this.$axios.post("/LogSystem/modifyuser", params).then(res => {
        if (res.data.keycode === 200) {
          Toast(res.data.message);
          this.queryUser()
        }
      });
    },
    updatePass() {
      let params = new URLSearchParams();
      params.append("uname", this.user.uname);
      params.append("password", this.prepass);
      this.$axios.post("/LogSystem/login", params).then(res => {
        if (res.data.keycode === 200) {
          this.flag = true;
          if (this.newpass !== this.newpass2) {
            Toast("两次输入的新密码不一致");
          } else if (!this.flag) {
            Toast("原密码输入错误！");
          } else {
            let params = new URLSearchParams();
            params.append("uname", this.user.uname);
            params.append("password", this.newpass2);
            this.$axios
              .post("http://localhost:30001/LogSystem/modifyuser", params)
              .then(res => {
                if (res.data.keycode === 200) {
                  Toast(res.data.message);
                }
              });
          }
        }
        else{
          Toast("原密码输入错误！");
        }
      });
    },
    queryUser(){
      let params = new URLSearchParams();
            params.append("uname", this.user.uname);
            this.$axios
              .post("/LogSystem/finduserbyname", params)
              .then(res => {
                if (res.data.keycode === 200) {
                  this.realname = res.data.data.realname;
                  this.sex = String(res.data.data.sex);
                  console.log(res.data.data);
                  
                  this.age = res.data.data.age;
                  this.tel = res.data.data.tel;
                }
              });
    }
  },
  mounted() {
    this.queryUser();
    if (this.active === "2") {
      this.updateUserInfo();
    } else if (this.active === "3") {
      this.updatePass();
    }

  }
  
};
</script>
<style lang="scss" scoped>
.mine {
  width: 100%;
  height: 100%;
  position: relative;
  .mint-tab-container {
    position: absolute;
    top: 0.6rem;
    left: 0;
    right: 0;
    bottom: 0.6rem;
    h3 {
      height: 0.3rem;
      font-size: 16px;
      margin: 0.1rem;
      //   margin-bottom: 0.1rem;
      line-height: 0.3rem;
    }
    // background: #f0eec8;
    ul {
      li {
        font-size: 18px;
        font-weight: 600;
        height: 0.5rem;
        padding: 0 0.1rem;
        line-height: 0.5rem;
        background: #76b39d;
        border-bottom: 0.1rem solid #9fd3c7;
        //   margin-bottom: .1rem;
        span.left {
          float: left;
        }
        span.right {
          float: right;
        }
      }
      li.extra {
        color: gainsboro;
      }
    }
  }
}
</style>
<style lang="scss">
.mint-radiolist-title {
  font-size: 16px;
  color: #000;
}
.mint-cell:last-child,
.mint-cell-wrapper {
  background-image: none;
}
dl .mint-cell {
  border: 1px solid #ccc;
}
</style>

