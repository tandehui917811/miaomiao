<template>
    <div class="wapper" ref='wapper'>
        <slot></slot>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
    name : "BScroll",
    props : {
        handlerScroll : {
            type : Function,
            default : function () {}
        },
        handlerTouch : {
            type : Function,
            default : function () {}
        }
    },
    mounted(){
        var scroll = new BScroll(this.$refs.wapper,{
            bounce : true,
            probeType : 1,
            tap : true
        });
        this.scroll = scroll;
        scroll.on('scroll',(pos) => {
            this.handlerScroll(pos)
        });
        scroll.on('touchEnd',(pos) => {
            this.handlerTouch(pos)
        })
    },
    methods : {
        handlerToTop(y){
            this.scroll.scrollTo(0,y)
        }
    }
}
</script>

<style scoped>
.wapper{height:100%}
</style>