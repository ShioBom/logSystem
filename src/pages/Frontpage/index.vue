<template>
    <div class="frontpage">
       <Header :title="title"></Header>
       <Footer></Footer>
    </div>
</template>
<script>
import Footer from '../common/Footer/index'
import Header from '../common/Header/index'

export default {
    data(){
        return{
            title:"首页"
        }
    },
    components:{Footer,Header}
}
</script>
<style lang="scss" scoped>
    .frontpage{
        background: pink;
        height: 100%;
        width: 100%;
    }
</style>
