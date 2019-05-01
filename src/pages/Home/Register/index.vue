<template>
  <div class="register">
    <ul>
      <li>
        <span>★</span>
        <input
          type="text"
          placeholder="请输入用户名"
          @blur="isUserExist()"
          @input="getUname($event)"
        />
      </li>
      <li>
        <span>★</span>
        <input type="text" placeholder="请输入密码" />
      </li>
      <li>
        <span>★</span>
        <input
          type="text"
          placeholder="请再次输入密码"
          @input="getPass($event)"
        />
      </li>
      <li>
        <span>★</span>
        <input
          type="text"
          placeholder="请输入真实姓名"
          @input="getRealName($event)"
        />
      </li>
      <!-- <li><span>★</span><input type="radio" name = "人事部" placeholder="请选择部门" @input="getDepartment($event)"></li> -->
      <li class="radio">
        <label for>请选择部门</label>
        <div>
          <label v-for="(item,ind) in departments" :key="ind">
            <input
              @click="getDepartValue($event)"
              type="radio"
              name="department_id"
              value="item.id"
            />{{item.dname}}
          </label>
        </div>
      </li>
      <li class="radio">
        <label for>请选择职位</label>
        <div>
          <label>
            <input
              type="radio"
              @click="getJobValue($event)"
              name="position"
              value="0"
            />普通
          </label>
          <label>
            <input
              type="radio"
              @click="getJobValue($event)"
              name="position"
              value="1"
            />部门经理
          </label>
        </div>
      </li>
    </ul>
    <div class="btn" @click="register">注册</div>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      user: {
        uname: "",
        password: "",
        department_id: "",
        position: "",
        realname: ""
      },
      departments:[],
      uname_msg: "用户名合法"
    };
  },
  methods: {
    getJobValue(e) {
      this.user.position = e.target.value;
      this.isUserExist();
    },
    getUname(e) {
      console.log("object");
      this.user.uname = e.target.value;
    },
    getPass(e) {
      this.user.password = e.target.value;
    },
    getRealName(e) {
      this.user.realname = e.target.value;
    },
    getDepartValue(e) {
      this.user.department_id = e.target.value;
    },
    //判断用户是否存在
    isUserExist() {
      let params = new URLSearchParams();
      params.append("uname", this.user.uname);
      this.$axios
        .post("/LogSystem/finduserbyname", params)
        .then(res => {
          if (res.data.keycode === 200) {
            this.uname_msg = "该用户名已经存在";
          }
        })
        .then(() => {
          Toast(this.uname_msg);
        });
    },
    requestDepart(){
      this.$axios.get("/LogSystem/findalldepartment").then(res=>{
        if(res.data.keycode===200){
          this.departments = res.data.data;
        }
      })
    },
    register() {
      let params = new URLSearchParams();
      params.append("uname", this.user.uname);
      params.append("password", this.user.password);
      params.append("realname", this.user.realname);
      params.append("department_id", this.user.department_id);
      params.append("position", this.user.position);
      //用户注册
      this.$axios.post("/LogSystem/adduser", params).then(res => {
        if(res.data.keycode===200){
          this.$router.push("/login");
        }else{
          Toast(res.data.message);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.register {
  padding-top: 0.1rem;
  z-index: 1000;
  height: 250px;
  overflow: hidden;
  overflow-y: scroll;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
ul li {
  width: 3rem;
  border: 1px solid #ccc;
  height: auto;
}
span {
  text-align: center;
  display: inline-block;
  height: 0.4rem;
  width: 0.4rem;
}
input {
  height: 0.4rem;
  border: 0;
}
.radio {
  div {
    display: flex;
    flex-wrap: wrap;
  }
  border: 0;
  padding: 0.1rem;
  label {
    display: block;
  }
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