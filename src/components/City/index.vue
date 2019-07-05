<template>
    <div class="city_body">
        <div class="city_list">
            <BScroll ref="city_list">
                <div>
                    <div class="city_hot">
                        <h2>热门城市</h2>
                        <ul class="clearfix">
                            <li v-for='item in HotList' :key='item.id' @tap='handlerCity(item.nm,item.id)'>{{ item.nm }}</li>
                        </ul>
                    </div>
                    <div class="city_sort" ref='city_sort'>
                        <div v-for='(item,index) in citiesList' :key='index'>
                            <h2>{{ item.key }}</h2>
                            <ul>
                                <li v-for='itemList in item.list' :key='itemList.id' @tap='handlerCity(itemList.nm,itemList.id)'>{{ itemList.nm }}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </BScroll>
        </div> 
        <div class="city_index">
            <ul>
                <li v-for='(item,index) in citiesList' :key='index' @touchstart='handlerTop(index)'>{{ item.key }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import BScroll from '@/components/BScroll'
export default {
    name : 'NowPlaying',
    data(){
        return {
            HotList : [],
            citiesList : []
        }
    },
    mounted(){
        this.axios.get('/api/cityList').then((res) => {
            let msg = res.data.msg;
            var cities = res.data.data.cities;
            if(msg == 'ok'){
                for(let i=0;i<cities.length ;i++){
                    if(cities[i].isHot){
                        this.HotList.push(cities[i])
                    }
                    var py = cities[i].py.substring(0,1).toUpperCase();
                    if(this.isCiti(py)){
                        this.citiesList.push({key:py,list:[{ nm : cities[i].nm , id : cities[i].id }]})
                    }else{
                        for(let j=0;j<this.citiesList.length;j++){
                            if(this.citiesList[j].key === py){
                                this.citiesList[j].list.push({ nm : cities[i].nm , id : cities[i].id })
                            }
                        }
                    }
                };
                this.citiesList.sort(function(a,b){
                    if(a.key>b.key){
                        return 1
                    }else if(a.key<b.key){
                        return -1
                    }else{
                        return 0
                    }
                })
            }
        })
    },
    methods : {
        isCiti(d){
            var citi = this.citiesList;
            for(let i=0;i<citi.length;i++){
                if(citi[i].key === d){
                    return false
                }
            }
            return true
        },
        handlerTop(index){
            var h2 = this.$refs.city_sort.getElementsByTagName('h2');
            this.$refs.city_list.handlerToTop(-h2[index].offsetTop);
        },
        handlerCity(nm,id){
            window.localStorage.setItem('nm',nm)
            window.localStorage.setItem('id',id)
            this.$store.commit('city/CITY_INFO',{nm:nm,id:id})
            this.$router.push('/movie/nowplaying')
        }
    },
    components : {
        BScroll
    }
}
</script>

<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
    background-color:transparent;
    width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
/* .city_body .city_hot ul{} */
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
/* .city_body .city_sort{} */
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>