<template>
    <div class="home">
        <div class="logo">
            <div class="logo_img">logo</div>
            <nav>
                <span :class="logStatus" @click="login">登录</span>
                <span :class="regiStatus" @click="register">注册</span>
            </nav>
        </div>
        <Login v-if="logStatus==='active'"></Login>
        <Register v-if="regiStatus==='active'"></Register>
        <div class="footer"></div>
    </div>
</template>
<script>
import Login from './Login/index'
import Register from './Register/index'
export default {
    name:"Home",
    data() {
        return {
            logStatus:"active",
            regiStatus:"",
        }
    },
    methods: {
        login(){
            this.logStatus="active";
            this.regiStatus="";
            console.log("123");
        },
        register(){
            this.regiStatus="active";
            this.logStatus="";
        }
    },
    components:{Login,Register}
}
</script>
<style lang="scss" scoped>
 .home{
    position: relative;
    height: 100%;
  }
  .logo{
      position: absolute;
      top: 0;
      left: 0;
      height: 2.2rem;
      width: 100%;
      background: -moz-linear-gradient(left, #ffb574 0%, #ff7970 100%);
      background: -webkit-gradient(linear, left top, right top, color-stop(0%,#ffb574), color-stop(100%,#ff7970));
      background: -webkit-linear-gradient(left, #ffb574 0%,#ff7970 100%);
      background: -o-linear-gradient(left, #ffb574 0%,#ff7970 100%);
      background: -ms-linear-gradient(left, #ffb574 0%,#ff7970 100%);
      background: linear-gradient(to right, #ffb574 0%,#ff7970 100%);
      position: relative;
  }
  .logo .logo_img{
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      height: 1rem;
      width: 1.5rem;
      line-height: 1rem;
      text-align: center;
      font-size: 48px;
      font-family: "wildwords";
      color: white;
  }
//   .logo .back{
//       display: inline-block;
//       position: absolute;
//       top: .3rem;
//       right: .3rem;
//       width: .24rem;
//       height: .24rem;
//       background: white;
//       color: #ff7970;
//       text-align: center;
//       line-height: .24rem;
//       border-radius: .12rem;
//   }
  .logo nav{
      width:100%;
      height: .36rem;
      position: absolute;
      bottom: 0;
      left: 0;
      display: flex;
      justify-content: space-around;
      color:white;
      font-size: 16px;
      line-height: .36rem;
  }
  .logo nav span{
      position: relative;
  }
  .logo nav .active::after{
      content: "";
      border:10px solid transparent;
      border-top-color: #ff7970;
      position: absolute;
      bottom: -20px;
      left:5px;
  }
  .footer{
      position: absolute;
      bottom: 0;
      left: 0;
      height: 2rem;
      width: 100%;
      background-image: url(../../assets/img/home/E2AA953F05139E525C7A0371C344BDFD.jpg);
      background-position: bottom left;
      background-size: 100% 100%;
      background-repeat: no-repeat;
  }
</style>
