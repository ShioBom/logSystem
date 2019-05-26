<template>
  <div class="logger">
    <Header :title="title" :left="'返回'" :right="!componentStatus?'×':null" @goback="goback()"></Header>
    <div class="content">
      <mt-navbar v-model="selected" value v-if="componentStatus">
        <mt-tab-item id="1">我的日志</mt-tab-item>
        <mt-tab-item v-if="userStatus" id="2">员工日志</mt-tab-item>
        <mt-tab-item id="3">写日志</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <ul>
            <LogItem
              v-for="(log, ind) in ownlogs"
              :key="ind"
              :log="log"
              @goDetail="goDetail(ind,'ownlogs')"
            ></LogItem>
          </ul>
          
        </mt-tab-container-item>
        <mt-tab-container-item v-if="userStatus" id="2">
          <ul>
            <LogItem
              v-for="(log, ind) in logs"
              :key="ind"
              :log="log"
              @goDetail="goDetail(ind,'logs')"
            ></LogItem>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <mt-field placeholder="请输入日志" type="textarea" rows="20" v-model="logtext"></mt-field>
          <mt-button type="default" size="large" @click="addLog()">发布日志</mt-button>
        </mt-tab-container-item>
        <mt-tab-container-item id="4" class="detail">
          <dl>
            <dt>
              <p>
                <span class="user">{{logDetail.uname}}</span>
                <span class="time">{{logDetail.log_date}}</span>
              </p>
              <p>{{logDetail.log_context}}</p>
            </dt>
            <dd v-if="comment">
              <h3>
                <span class="user">{{comment.uname}}</span>
                <span class="time">{{comment.comment_date}}</span>
              </h3>
              <p>{{comment.comment_context}}</p>
            </dd>
          </dl>
          <div class="review_wrap" v-if="user.uname!==logDetail.uname&&(!comment|commentboxStatus)">
            <div class="review">
              <mt-field placeholder="请输入评论" v-model="comment_context"></mt-field>
            </div>
            <mt-button type="primary" size="small" @click="review()">评论</mt-button>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>

    </div>
    <div class="export" v-if="selected==='1'">
      <input type="date" v-model="startDate">至
      <input type="date" v-model="endDate">
      <button @click="exportLog()">导出</button>
    </div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
import Vue from "vue";
import Header from "../common/Header";
import Navbar from "mint-ui/lib/navbar";
import "mint-ui/lib/navbar/style.css";
import TabItem from "mint-ui/lib/tab-item";
import "mint-ui/lib/tab-item/style.css";
import TabContainer from "mint-ui/lib/tab-container";
import "mint-ui/lib/tab-container/style.css";
import TabContainerItem from "mint-ui/lib/tab-container-item";
import "mint-ui/lib/tab-container-item/style.css";
import Field from "mint-ui/lib/field";
import "mint-ui/lib/field/style.css";

Vue.use(Field);
Vue.component(Field.name, Field);
Vue.component(TabContainer.name, TabContainer);
Vue.component(TabContainerItem.name, TabContainerItem);
Vue.component(Navbar.name, Navbar);
Vue.component(TabItem.name, TabItem);

import LogItem from "../common/LogItem";
export default {
  data() {
    return {
      title: "工作日志",
      user: {},
      selected: "1",
      userStatus:
        JSON.parse(sessionStorage.getItem("userInfo")).position !== 0
          ? true
          : false,
      ownlogs: [],
      logs: [],
      logtext: "",
      comment: "",
      componentStatus: true,
      logDetail: "",
      comment_context: "", //评论内容
      commentboxStatus: false,
      startDate:"",//日志导出 开始日期
      endDate:"",//日志导出 结束日期
    };
  },

  components: { Header, LogItem },
  methods: {
    //导出日志
    exportLog(){
      /*let params = new URLSearchParams();
      params.append("uname", this.user.uname);
      params.append("beginDate", this.startDate);
      params.append("endDate", this.endDate);*/
      console.log("daochu");
      var uname = this.user.uname;
      var beginDate = this.startDate;
      var endDate = this.endDate;
      
      if(endDate == "" || beginDate == ""){
        Toast("日期不能为空");
      }else if(endDate <= beginDate){
        Toast("起止日期格式错误")
      }else{
         var baseUrl = Vue.prototype.$axios.defaults.baseURL;
         window.open(baseUrl+"/LogSystem/exportlog?uname="+uname+"&beginDate="+beginDate+"&endDate="+endDate);
      }
      
    },
    //添加日志
    addLog() {
      console.log("日志内容", this.logtext);
      let params = new URLSearchParams();
      params.append("uname", this.user.uname);
      params.append("log_context", this.logtext);
      this.$axios.post("LogSystem/addlog", params).then(res => {
        if (res.data.keycode === 200) {
          Toast(res.data.message);
        } else {
          Toast(res.data.message);
        }
      });
    },
    //获取自己的日志
    queryOwnLogs() {
      let params = new URLSearchParams();
      params.append("uname", this.user.uname);
      this.$axios.post("LogSystem/findlogbyname", params).then(res => {
        if (res.data.keycode === 202) {
          Toast(res.data.message);
        }
        if (res.data.keycode === 200) {
          this.ownlogs = res.data.data;
        }
      });
    },
    //获取员工的日志
    queryStaffLogs() {
      let params = new URLSearchParams();
      params.append("uname", this.user.uname);
      this.$axios.post("LogSystem/findlogbystatus", params).then(res => {
        if (res.data.keycode === 200) {
          this.logs = res.data.data;
          console.log(this.logs);
        }
      });
    },
    //跳到详情页
    goDetail(ind, str) {
      this.componentStatus = false;
      this.selected = "4";
      if (str === "ownlogs") {
        this.logDetail = this.ownlogs[ind];
      } else {
        this.logDetail = this.logs[ind];
      }
      console.log("4");
      this.getReview();
    },
    goback() {
      this.selected = "1";
      this.componentStatus = true;
      this.comment = "";
    },
    //获取评论
    getReview() {
      let params = new URLSearchParams();
      console.log(this.logDetail.log_id);
      params.append("log_id", this.logDetail.log_id);
      this.$axios.post("/LogSystem/findcommentbylogid", params).then(res => {
        if (res.data.keycode === 200) {
          this.comment = res.data.data;
          console.log(this.comment);
        }
      });
    },
    //发布评论
    review() {
      console.log(this.comment_context);
      let params = new URLSearchParams();
      params.append("uname", this.user.uname);
      params.append("comment_context", this.comment_context);
      params.append("log_id", this.logDetail.log_id);
      this.$axios.post("/LogSystem/addcomment", params).then(res => {
        if (res.data.keycode === 200) {
          this.commentboxStatus = true;
          Toast(res.data.message);
          this.getReview();
        }
      });
    }
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem("userInfo"));
    this.queryOwnLogs();
    this.queryStaffLogs(); //请求员工日志数据
    console.log(this.logtext);
  }
};
</script>
<style lang="scss" scoped>
.logger {
  left: 0;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.content {
  position: absolute;
  top: 0.6rem;
  left: 0;
  bottom: 0;
  right: 0;
  .mint-tab-container {
    height: 100%;
  }
  .mint-tab-container-item {
    max-height: 5.61rem;
    overflow-y: auto;
  }
  .detail {
    height: 100%;
    min-height: 6.07rem;
    width: 100%;
    position: relative;
    background: #e8e8e8;
    .mint-field {
      height: 0.4rem;
      border-radius: 0.2rem;
      border: 1px solid #999;
    }

    .user {
      color: #17c0eb;
      font-weight: 600;
      font-size: 16px;
    }
    .time {
      color: #17c0eb;
    }
    dt {
      p {
        min-height: 0.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.1rem;
        white-space: pre-wrap;
      }
    }
    dd {
      margin: 0.1rem;
      padding: 0.1rem;
      border: 1px solid skyblue;
      border-radius: 0.1rem;
      h3 {
        min-height: 0.3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      p {
        color: #738598;

        padding: 0.1rem 0;
        white-space: pre-wrap;
      }
    }
    .review_wrap {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.1rem;
      .review {
        width: 80%;
        height: 0.5rem;
      }
    }
  }
}
.export {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  height: .5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  input{
    width: 1.25rem;
    height: 70%;
    border: 1px solid #ccc;
  }
  button{
    font-size: 16px;
    padding: .1rem;
  }
}
</style>
<style lang="scss">
.mint-navbar .mint-tab-item.is-selected {
  border-bottom: 3px solid #49beb7;
  z-index: 1000;
}
.mint-tab-container-wrap {
  height: 100%;
}
a {
  color: #82acff;
}
</style>

