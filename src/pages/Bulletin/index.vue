<template>
  <div class="bulletin">
    <Header :title="title"></Header>
    <div class="content">
      <mt-navbar v-model="active" value>
        <mt-tab-item id="1">公告列表</mt-tab-item>
        <mt-tab-item v-if="componentStatus" id="2">发布公告</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="active">
        <mt-tab-container-item id="1">
          <ul>
            <li
              v-for="(item, ind) in bulletins"
              :key="ind"
              @click="getNewsID(ind)"
            >
              <h3>{{ item.title }}</h3>
              <p>{{ item.news_date }} <mt-button size="small" type="primary" @click.stop="deleteNews()">删除</mt-button></p>
            </li>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div class="addNews">
              <mt-field label="标题" placeholder="请输入公告标题" type="text" v-model="newsTitle"></mt-field>
            <mt-field
              placeholder="请输入公告"
              type="textarea"
              rows="18"
              v-model="text"
            ></mt-field>
            <mt-button type="default" size="large" @click="addNews()"
              >发布公告</mt-button
            >
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class="detail">
            <h3>{{ detail.title }}</h3>
            <p>{{ detail.news_date }}</p>
            <div class="news_content">
              {{ detail.news_context }}
            </div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<script>
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
export default {
  data() {
    return {
      title: "公告",
      newsTitle:"",//发布公告的标题
      active: "1",
      text: "",//所发布公告的内容
      detail: {},
      bulletins: [
        {
          news_context: "今日没公告",
          news_date: "2019-07-02 20:30:30.0",
          news_id: 2,
          title: "公告2"
        },
        {
          news_context: "闲来无事，发条公告玩玩",
          news_date: "2019-06-09 21:11:11.0",
          news_id: 3,
          title: "无事"
        },
        {
          news_context:
            "2019年5月1日至4日放假调休，共4天。4月28日(星期日)、5月5日(星期日)上班。",
          news_date: "2019-04-30 15:22:47.0",
          news_id: 7,
          title: "关于2019年“五一”放假安排的通知"
        },
        {
          news_context:
            "各部门注意，各部门注意，这是一场接口的测试演习，请做好准备！",
          news_date: "2019-04-23 21:43:15.0",
          news_id: 6,
          title: "接口测试2"
        },
        {
          news_context: "注意，这就是一场演戏",
          news_date: "2019-04-23 21:41:14.0",
          news_id: 5,
          title: "接口测试"
        },
        {
          news_context: "浮生偷得半日闲",
          news_date: "2019-04-23 20:47:56.0",
          news_id: 4,
          title: "闲"
        }
      ],
      componentStatus:true
    };
  },
  components: { Header },
  methods: {
      //获取选中详情页的信息
    getNewsID(num) {
      this.active = "3";
      this.detail = this.bulletins[num];
    },
    //作品发布
    addNews() {
      console.log(this.text,this.newsTitle);
      let params = new URLSearchParams();
      params.append("title",this.newsTitle);
      params.append("news_context",this.text);
      this.$axios.get("/LogSystem/addnews",params).then(res => {
        if (res.data.status === 200) {
          Toast(res.data.message);
        }
      });
    },
    //查询该条公告数据
    queryAllNews() {
      this.$axios.get("/LogSystem/findallnews").then(res => {
        if (res.data.status === 200) {
          this.bulletins = res.data.data;
        }
      });
    },
    //删除该公告
    deleteNews(){
      console.log(this.detail.news_id);
      let params = new URLSearchParams();
      params.append("title",this.detail.news_id);
      this.$axios.get("/LogSystem//LogSystem/deletenewsbyid",params).then(res => {
        if (res.data.status === 200) {
          Toast(res.data.message);
        }
      });
    }
   
  },
  mounted() {
    this.queryAllNews();
  }
};
</script>

<style lang="scss" scoped>
.bulletin {
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
  overflow: hidden;

  .mint-tab-container {
    background: #aceacf;
    width: 100%;
    height: 100%;
    h3 {
      font-size: 20px;
      line-height: .2rem;
      color: #75cac3;
      margin: 0.1rem 0;
    }
    p {
      color: #aceacf;
      line-height: .33rem;
      margin-bottom: 0.1rem;
      button{
          float: right;
      }
    }
    .mint-tab-container-item {
      max-height: 6.07rem;
      min-height: 6.07rem;
      overflow-y: auto;
    }
    ul {
      padding: 0.1rem;
      li {
        box-sizing: border-box;
        background: white;
        padding: 0.15rem;
        height: 0.8rem;
        margin: 0.1rem 0;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border-radius: 0.1rem;
      }
    }
    .detail {
      border-radius: 0.2rem;
      background: white;
      padding: 0.1rem;
      min-height: 5rem;
      margin: 0.2rem;
      h3 {
        color: #085f63;
      }
      p {
        border-bottom: 1px solid #f1f1f1;
        color: #099a97;
      }
      .news_content {
        background:white;
        padding: 0.1rem;
        line-height: 32px;
      }
    }
    .addNews {
      width: 100%;
      height: 100%;
      background: white;
    }
  }
}
</style>
