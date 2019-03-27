<template>
    <div class="register">
        <ul>
            <li><span>★</span><input type="text" placeholder="请输入用户名"></li>
            <li><span>★</span><input type="text" placeholder="请输入验证码"></li>
            <li><span>★</span><input type="text" placeholder="请输入密码"></li>
        </ul>
        <div class="btn">注册</div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
   .register{
       height: 2.47rem;
       width: 100%;
       display: flex;
       flex-direction: column;
       justify-content: space-around;
       align-items: center;
   }
   ul{
       border: 1px solid #ccc;
       border-bottom: 0;
   }
   ul li{
       width: 3rem;
       border-bottom: 1px solid #ccc;
       height: .4rem;
   }
   span{
       text-align: center;
       display: inline-block;
       height: .4rem;
       width:.4rem;
   }
   input{
       height: .4rem;
       border:0
   }
   .btn{
       width: 3rem;
       background: #ff7970;
       color: white;
       height: .35rem;
       text-align: center;
       line-height: .35rem
   }
</style>