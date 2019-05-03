<template>
  <div class="frontpage">
    <Header :title="title"></Header>
    <!-- 菜单栏 -->
    <div class="menu">
      <div>
        <router-link to="/WorkLog"
          ><dl>
            <dt><img src="../../assets/img/index/log.jpg" alt="" /></dt>
            <dd>工作日志</dd>
          </dl>
        </router-link>
      </div>
      <div>
       <router-link to="/Bulletin">
        <dl>
          <dt><img src="../../assets/img/index/inform.jpg" alt="" /></dt>
          <dd>公告</dd>
        </dl>
       </router-link>
      </div>
      <div>
       <router-link to="/Examine">
        <dl>
          <dt><img src="../../assets/img/index/approve.jpg" alt="" /></dt>
          <dd>在线审批</dd>
        </dl>
       </router-link>
      </div>
      <div>
       <router-link to="/StaffManage">
        <dl>
          <dt><img src="../../assets/img/index/contacts.jpg" alt="" /></dt>
          <dd>员工管理</dd>
        </dl>
       </router-link>
      </div>
    </div>
    <!-- 日历签到组件 -->
    <div class="calendar_wrap">
      <div class="cal_name">时间助手</div>
      <div class="calendar">
        <Calendar :markDate="signedDate" v-on:choseDay="clickDay"></Calendar>
      </div>
      <div class="signIn_btn" >
        <mt-button @click="sign" v-if="flag">{{
         "签到" 
        }}</mt-button>
         <mt-button @click="sign" v-else-if="!flag">{{
         "已签到" 
        }}</mt-button>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Footer from "../common/Footer/index";
import Header from "../common/Header/index";
import Calendar from "vue-calendar-component";
import {Toast} from 'mint-ui';
export default {
  data() {
    return {
      title: "首页",
      signedDate: [],
      date: "",
      user: {},
      flag:false
    };
  },
  components: { Header,Footer, Calendar },
  methods: {
    clickDay(data) {
      this.date = data; //选中某天
    },
    sign() {
      if (this.isSigned()) {
        this.addSignData();
      }
    },
    //获取该用户的签到数据
    getSignData() {
      let params = new URLSearchParams();
      params.append("uname", this.user.uname);
      this.$axios.post("/LogSystem/findsignbyname", params).then(res => {
        if (res.data.keycode === 200) {
          res.data.data.forEach(item => {
            let date = item.date.replace(/\-/g, "/");
            this.signedDate.push(date);
          });
        }
      });
    },
    //判断今天是否签到
    isSigned() {
      let params = new URLSearchParams();
      let uname = JSON.parse(sessionStorage.getItem("userInfo")).uname;
      params.append("uname",uname);
      this.$axios.post("/LogSystem/judgesign", params).then(res => {
        console.log(res.data);
        if (res.data.keycode === 201) {
          console.log(res.data.message);
          //已签到
          this.flag = false;
        } else if(res.data.keycode === 200){
          console.log(res.data.message);
          //可以签到
         this.flag = true;
        }
      });
      console.log(this.flag);
      return this.flag;
      
    },
    //添加签到数据
    addSignData() {
      let params = new URLSearchParams();
      params.append("uname", this.user.uname);
      this.$axios.post("/LogSystem/addsign", params).then(res => {
        if (res.data.keycode === 200) {
          Toast(res.data.message);
        this.flag=false;
        }
      });
    }
  },
  mounted() {
    console.log("data",this.isSigned());
    if(this.isSigned()){
      this.flag = true;
    }else{
      this.flag = false;
    };
    this.user = JSON.parse(sessionStorage.getItem("userInfo"));
    this.getSignData();
  },
};
</script>
<style lang="scss" scoped>
.menu {
  position: absolute;
  top: 0.6rem;
  left: 0;
  height: 1.2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
}
.menu > div {
  width: 0.8rem;
  height: 1rem;
}
dl {
  height: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
dl dt {
  width: 0.6rem;
  height: 0.6rem;
}
dt img {
  width: 0.6rem;
}
.calendar_wrap {
  position: absolute;
  width: 100%;
  top: 1.8rem;
  left: 0;
  bottom: 0.6rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
span {
  margin: 8px;
  display: inline-block;
  height: 0.3rem;
  width: 1rem;
  color: skyblue;
  border: 4px solid palevioletred;
  line-height: 0.3rem;
  text-align: center;
  border-radius: 10px;
}
.cal_name {
  margin: 8px;
  display: inline-block;
  height: 0.2rem;
  width: 1rem;
  color: #49beb7;
  line-height: 0.2rem;
  text-align: center;
}
.calendar {
  height: auto;
}
.signIn_btn {
  padding: 0.1rem;
  text-align: center;
}
.mint-button {
  background: #007880;
  color: white;
}
</style>
<style lang="scss">
//样式覆盖
.calendar {
  .wh_content_all[data-v-2ebcbc83] {
    background-color: #87c0cd;
  }
  .wh_content_item .wh_chose_day {
    background: green;
    border-radius: 100px;
  }
}
</style>

