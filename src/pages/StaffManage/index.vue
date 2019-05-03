<template>
    <div class="manage">
        <Header :title="title"></Header>
 <div class="content">
           staffManage
     </div>
      
    </div>
</template>
<script>
import Header from '../common/Header'
export default {
     data(){
        return{
            title:"员工管理"
        }
    },
    components:{Header}
}
</script>
<style lang="scss" scoped>
.manage{
    width: 100%;
    height: 100%;
    position: relative;
}
.content{
position: absolute;
top: .6rem;
left: 0;
right: 0;
bottom: 0;
background: green;
}
</style>
