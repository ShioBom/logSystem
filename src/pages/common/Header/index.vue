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
        background: yellowgreen;
        position: absolute;
        top: 0;
        left: 0;
        height: .6rem;
        width: 100%;
        text-align: center;
        line-height: .5rem
    }
</style>
