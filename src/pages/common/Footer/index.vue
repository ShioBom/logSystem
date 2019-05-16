<template>
    <div class="footer">
        <router-link to="/index">首页</router-link>
        <router-link to="/UserInfo">我的</router-link>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    .footer{
        background:#007880;
        position: absolute;
        bottom: 0;
        left: 0;
        height: .6rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        a{
            color: white;
        }
        .router-link-exact-active{
            color:#8bffff
        }
    }
</style>
