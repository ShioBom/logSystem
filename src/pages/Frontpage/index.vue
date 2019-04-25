<template>
    <div class="frontpage">
       <Header :title="title"></Header>
       <!-- 菜单栏 -->
       <div class="menu">
           <div>
               <dl>
                   <dt><img src="../../assets/img/index/log.jpg" alt=""></dt>
                   <dd>工作日志</dd>
               </dl>
           </div>
           <div>
               <dl>
                   <dt><img src="../../assets/img/index/inform.jpg" alt=""></dt>
                   <dd>公告</dd>
               </dl>
           </div>
           <div>
               <dl>
                   <dt><img src="../../assets/img/index/approve.jpg" alt=""></dt>
                   <dd>在线审批</dd>
               </dl>
           </div>
           <div>
               <dl>
                   <dt><img src="../../assets/img/index/contacts.jpg" alt=""></dt>                  
                   <dd>联系人</dd>
               </dl>
           </div>
       </div>
       <!-- 日历签到组件 -->
       <div class = "calendar_wrap">
           <div class="cal_name">时间助手</div>
           <div class="calendar">
               <Calendar
                :markDate="arr"
               ></Calendar>
           </div>
           <div class="signIn_btn">
               <span @click="signIn">打卡签到按钮</span>
           </div>
       </div>
       <Footer></Footer>
    </div>
</template>
<script>
import Footer from '../common/Footer/index'
import Header from '../common/Header/index'
import Calendar from 'vue-calendar-component'
export default {
    data(){
        return{
            title:"首页",
            arr:['2019/3/22','2019/3/13']
        }
    },
    components:{Footer,Header,Calendar},
    methods: {
        signIn(){
            //这里存储签到的日期到数据库。
            this.arr.push('2019/3/27');
        }
    },
}
</script>
<style lang="scss" scoped>
    .frontpage{
        height: 100%;
        width: 100%;
        
    }
    .menu{
        position: absolute;
        top:.6rem;
        left: 0;
        height: 1.2rem;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .menu>div{
        width: .8rem;
        height: 1rem;
        
    }
    dl{
        height: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
    }
    dl dt{
        width: .6rem;
        height: .6rem;
    }
    dt img{
        width: .6rem;
    }
    .calendar_wrap{
        position: absolute;
        width: 100%;
        top: 1.8rem;
        left: 0;
        bottom: .6rem;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
    }
    span{
        margin: 8px;
        display: inline-block;
        height: .3rem;
        width: 1rem;
        color: brown;
        border: 4px solid palevioletred;
        line-height: .3rem;
        text-align: center;
        border-radius: 10px;
    }
    .cal_name{
         margin: 8px;
        display: inline-block;
        height: .2rem;
        width: 1rem;
        color: brown;
        line-height: .2rem;
        text-align: center;
    }
    .calendar{
        height: 3.35rem;
        background: pink;
    }
    .signIn_btn{
        text-align: center;
    }
</style>
