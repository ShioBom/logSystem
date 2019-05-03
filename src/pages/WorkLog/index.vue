<template>
    <div class="logger">
    <Header :title="title"></Header>
    <div class="content">
            worklog
     </div>
       
    </div>
</template>
<script>
import Header from '../common/Header'
export default {
     data(){
        return{
            title:"工作日志"
        }
    },
    components:{Header}
}
</script>
<style lang="scss" scoped>
.logger{
    left: 0;
    width: 100%;
    height: 100%;
    position: relative;

}
.content{
position: absolute;
top: .6rem;
left: 0;
bottom: 0;
right: 0;
background: green;
}
</style>
