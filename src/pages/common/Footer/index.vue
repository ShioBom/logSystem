<template>
    <div class="frontpage">
        <router-link to="/index">首页</router-link>
        <router-link to="/message">消息</router-link>
        <router-link to="/mine">我的</router-link>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
    .frontpage{
        background:yellowgreen;
        position: absolute;
        bottom: 0;
        left: 0;
        height: .6rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
</style>
