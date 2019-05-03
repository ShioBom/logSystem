<template>
  <div class="logger">
    <Header :title="title"></Header>
    <div class="content">
      <mt-navbar v-model="selected" value>
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
            ></LogItem>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item v-if="userStatus" id="2">
          <ul>
            <LogItem v-for="(log, ind) in logs" :key="ind" :log="log"></LogItem>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <mt-field
            placeholder="请输入日志"
            type="textarea"
            rows="20"
            v-model="logtext"
          ></mt-field>
          <mt-button type="default" size="large" @click="addLog()"
            >发布日志</mt-button
          >
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<script>
import {Toast} from 'mint-ui';
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
import {Toast} from 'mint-ui';

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
      user:{},
      selected: "1",
      userStatus: JSON.parse(sessionStorage.getItem("userInfo")).position!==0?true:false,
      ownlogs: [
      ],
      logs: [],
      logtext: ""
    };
  },
  components: { Header, LogItem },
  methods: {
    //添加日志
    addLog() {
      console.log("日志内容", this.logtext);
      let params = new URLSearchParams();
      params.append("uname", this.user.uname);
      params.append("log_context", this.logtext);
      this.$axios.post("LogSystem/addlog", params).then(res => {
        if (res.data.keycode === 200) {
          Toast(res.data.message);
        }
      });
    },
    //获取自己的日志
    queryOwnLogs() {
      let params = new URLSearchParams();
      params.append("uname", this.user.uname);
      this.$axios.post("LogSystem/findlogbyname", params).then(res => {
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
        }
      });
    }
  },
  mounted() {
    this.user = JSON.parse(sessionStorage.getItem("userInfo"));
    this.queryOwnLogs();
    this.queryStaffLogs();//请求员工日志数据
    console.log(this.logtext);
    //初始化滚动条
    setTimeout(() => {}, 1000);
  },
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
    height: 5.61rem;
  }
  .mint-tab-container-item {
    max-height: 5.61rem;
    overflow-y: auto;
  }
}
</style>
<style lang="scss">
.mint-navbar .mint-tab-item.is-selected {
  border-bottom: 3px solid #49beb7;
  z-index: 1000;
}
a {
  color: #82acff;
}
</style>

