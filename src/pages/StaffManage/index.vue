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
            <dd class="info-item">性别： {{ employee.sex ? "女" : "男" }}</dd>
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
                v-model="department"
                :options="[
                  {
                    label: '普通员工',
                    value: '0'
                  },
                  {
                    label: '部门经理',
                    value: '1'
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
export default {
  data() {
    return {
      title: "员工管理",
      active: "1",
      employee: {},
      staff: [
        {
          uname: "何琳",
          realname: "lina",
          position_id:'1',
          department_id:'1',
          sex: 0,
          dname: "销售部",
          pname: "销售总监",
          tel: "15292061516"
        },
        {
          uname: "如花",
          sex: 1,
          position_id:'0',
          department_id:'0',
          realname: "Linda",
          dname: "人事部",
          pname: "人事A",
          tel: "13778310906"
        }
      ],
      options:[{
                    label: '部门一',
                    value: '11'
                  },{
                    label: '部门二',
                    value: '113'
                  },],
      realname:"",
      sex:"0",
      department:"1",
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
      console.log(ind);
      this.employee = this.staff[ind];
      this.active = "2";
      this.title = "员工信息详情";
    },
    //删除员工信息
    del() {
      let params = new URLSearchParams();
      params.append("uname", this.user.uname);
      this.$axios.post("", params).then(res => {
        if (res.data.keycode === 200) {
          Toast(res.data.message);
        }
      });
    },
    //跳转到修改页面
    goUpdate() {
      this.active = "3";
      this.title = "修改员工信息";
      this.getDepart();
      this.realname = this.employee.realname;
      this.sex = String(this.employee.sex);
      this.tel = this.employee.tel;
      this.department = String(this.employee.department_id);
      this.position = String(this.employee.position_id);
    },
    //修改员工信息
    update(){
        let params = new URLSearchParams();
        params.append("realname", this.realname);
        params.append("dname", this.department);
        params.append("pname", this.position);
        params.append("sex", this.sex);
        params.append("tel", this.tel);
        this.$axios.post("", params).then(res => {
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
            res.data.result.forEach(ele => {
                let option = {
                    label:ele.dname,
                    value:ele.department_id
                };
                this.options.push(option);
            });
          }
        });
    }
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
