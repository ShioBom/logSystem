<template>
  <div class="manage">
    <Header
      :left="this.active === '1' ? '返回' : null"
      :title="title"
      :right="this.active !== '1' ? '×' : null"
      @goback="goback()"
    ></Header>
    <div class="content">
      <mt-tab-container v-model="active">
        <mt-tab-container-item id="1">
          <ul>
            <li v-for="(item, ind) in staff" :key="ind" @click="goDetail(ind)">
              <p class="realname">{{ item.realname }}</p>
              <p class="info">
                <span>{{ item.dname }}</span>
                <span>{{ item.pname }}</span>
                <span>Tel：{{ item.tel }}</span>
              </p>
            </li>
          </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <dl>
            <dd class="info-item">用户名： {{ employee.uname }}</dd>
            <dd class="info-item">真实姓名：{{ employee.realname }}</dd>
            <dd class="info-item">部门： {{ employee.dname }}</dd>
            <dd class="info-item">职位： {{ employee.pname }}</dd>
            <dd class="info-item">性别： {{ employee.sex=='女' ? "女" : "男" }}</dd>
            <dd class="info-item">电话号码：{{ employee.tel }}</dd>
            <dd>
              <mt-button type="primary" size="large" @click="goUpdate()"
                >修改员工信息</mt-button
              >
            </dd>
            <dd>
              <mt-button type="primary" size="large" @click="del()"
                >删除该员工</mt-button
              >
            </dd>
          </dl>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <dl>
            <dd>
              <mt-field
                label="真实姓名："
                placeholder="请输入姓名"
                v-model="realname"
              ></mt-field>
            </dd>
            <dd>
              <mt-radio
                title="部门："
                v-model="department"
                :options="options"
              ></mt-radio>
              </dd>
               <dd>
              <mt-radio
                title="职位："
                v-model="position"
                :options="[
                  {
                    label: '普通职员',
                    value: '普通职员'
                  },
                  {
                    label: '部门经理',
                    value: '部门经理'
                  }
                ]"
              ></mt-radio>
              </dd>
              <dd>
              <mt-radio
                title="性别："
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
            </dd>
            <dd>
              <mt-field
                label="Tel："
                placeholder="电话号码"
                type="number"
                v-model="tel"
              ></mt-field>
            </dd>
            <dd>
              <mt-button type="primary" size="large" @click="update()"
                >保存修改</mt-button
              >
            </dd>
          </dl>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<script>
import Header from "../common/Header";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      title: "员工管理",
      active: "1",
      employee: {},
      staff: [],
      options:[],
      realname:"",
      sex:"0",
      department:"",
      position:"",
      tel:"",
    };
  },
  components: { Header },
  methods: {
    goback() {
      this.active = String(this.active - 1);
      if (this.active == "2") {
        this.title = "员工信息详情";
      } else {
        this.title = "员工管理";
      }
    },
    goDetail(ind) {
      this.employee = this.staff[ind];
      this.active = "2";
      this.title = "员工信息详情";
    },
    getStaffInfo(){
      console.log("111");
      
      let params = new URLSearchParams();
      params.append("uname", JSON.parse(sessionStorage.getItem("userInfo")).uname);
      this.$axios.post("/LogSystem/findalluser", params).then(res => {
        if (res.data.keycode === 200) {
          this.staff = res.data.data;
        }
      });
    },
    //删除员工信息
    del() {
      let params = new URLSearchParams();
      params.append("uname", this.employee.uname);
      this.$axios.post("/LogSystem/deleteuser", params).then(res => {
        if (res.data.keycode === 200) {
          Toast("员工删除成功");
        }
      });
    },
    //跳转到修改页面
    goUpdate() {
      console.log(this.employee);
      
      this.options=[];
      this.active = "3";
      this.title = "修改员工信息";
      this.getDepart();
      this.realname = this.employee.realname;
      this.sex = this.employee.sex;
      this.tel = this.employee.tel;
      this.department = this.employee.dname;
      this.position = this.employee.pname;
    },
    //修改员工信息
    update(){
        let params = new URLSearchParams();
        //params.append("uname",JSON.parse(sessionStorage.getItem("userInfo")).uname);
        params.append("uname", this.uname);
        params.append("realname", this.realname);
        params.append("dname", this.department);
        params.append("pname", this.position);
        params.append("sex", this.sex);
        params.append("tel", this.tel);
        console.log(params);
        
        this.$axios.post("/LogSystem/modifyuser", params).then(res => {
          if (res.data.keycode === 200) {
            Toast(res.data.message);
          }
        });
    },
    //获取部门信息
    getDepart(){
        let params = new URLSearchParams();
        this.$axios.get("/LogSystem/findalldepartment").then(res => {
          if (res.data.keycode === 200) {
            res.data.data.forEach(ele => {
                let option = {
                    label:ele.dname,
                    value:String(ele.dname)
                };
                this.options.push(option);
            });
          }
        });
    }
  },
  mounted(){
    this.getStaffInfo();
  }
};
</script>
<style lang="scss" scoped>
.manage {
  width: 100%;
  height: 100%;
  position: relative;
}
.content {
  position: absolute;
  //   background: #88dba3;
  top: 0.6rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-y: scroll;
  ul {
    margin: 0.08rem;
    li {
      margin-bottom: 0.05rem;
      box-shadow: #cff09e;
      padding: 0 0.1rem;
      background: #cff09e;
      border-radius: 0.1rem;
      p {
        height: 0.3rem;
        line-height: 0.3rem;
      }
      .realname {
        font-size: 18px;
        color: #3b8686;
      }
      .info {
        font-size: 14px;
        display: flex;
        color: #9baec8;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
  dl {
    margin: 0.1rem;
    dd {
      margin-bottom: 0.06rem;
    }
    .info-item {
      padding: 0 0.1rem;
      min-height: 0.5rem;
      line-height: 0.5rem;
      color: #8283a7;
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
</style>
