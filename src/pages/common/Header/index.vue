<template>
    <div class="frontpage">
        <span>{{title}}</span>
    </div>
</template>
<script>
export default {
    props:["title"],
}
</script>
<style lang="scss" scoped>
    .frontpage{
        color: white;
        background:#007880;
        position: absolute;
        top: 0;
        left: 0;
        height: .6rem;
        width: 100%;
        text-align: center;
        line-height: .6rem
    }
</style>
