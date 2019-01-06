<template>
  <div>
    <div class="mainport-left">
	    <ul class="categoryFirst">
	        <li v-for="(list,index) in lists" 
                :key="index" 
                @click='getdata(index+1);selectIndex(index)'  
                :class="timeIndex === index ? 'default default-active' : 'default' "
            >
                <a @click="onclick(index)">{{ list.name }}</a>
            </li>    
	    </ul>
	</div>
<section class="mainport">
    <article class="mainport-right">
        <div class="goods-list" id="goods-list1">
            <h3>{{ this.name }}</h3>
            <ul>
                <li v-for="sort in sorts">
                    <router-link :to="{name:'sortdetail',params:{sorid:1}}">
                        <figure class="mainFigure">
                            <img :src="sort.src">
                            <figcaption>
                                <div class="goods-title">
                                    <strong>{{ sort.subtitle}}</strong>
                                </div>
                            </figcaption>
                        </figure>
                    </router-link>

                </li>
            </ul>
        </div>
    </article>
</section>
<div class="clearfix"></div>
  </div>
</template>
<script>
    import bus from '../../assets/js/bus.js'
export default {
  data () {
    return {
        lists:'',// 分类类别
        sorts:'',// 分类详情
        sortid:'',// 分类id
        i:'',//li当前索引
        name:'',// 分类名
        timeIndex:0,//li下标初始为0
    }
  },
  methods:{
     getdata(index) {
    //    // 分类商品
        this.$axios.get('/SortProduct',{
            params:{
                sortid:index
            }
        })
        .then(res => {
            this.sorts = res.data;
        })
        .catch(err => {
            console.log("获取分类商品失败",err);
        }); 
     },
        selectStyle (list, index) {
　　　　　　this.$nextTick(function () {
　　　　　　　　this.lists.forEach(function (list) {
　　　　　　　　　　Vue.set(list,'active',false);
　　　　　　　　});
　　　　　　　　Vue.set(list,'active',true);
　　　　　　});
　　　　},
        // 获取li当前索引
        onclick(index){
            this.i = index;
            //保存当前下标传给详情页
            const orderData = { 'Id': this.i+1}
            sessionStorage.setItem('li下标', JSON.stringify(orderData))
            this.name = this.lists[this.i].name;  
            console.log(this.i+'-'+this.lists[this.i].name );      
        },
        // li动态添加class（—选择index）
        selectIndex(index) {
          this.timeIndex = index;
        },
  },
  created() {
    // 获取第一个li的图片（不用点击才显示）
    if(this.timeIndex === 0){
        this.$axios.get('/SortProduct',{
            params:{
                sortid:1
            }
        })
        .then(res => {
            this.sorts = res.data;
        })
        .catch(err => {
            console.log("获取分类商品失败",err);
        }); 
    }
    
    // 分类
    
    this.$axios.get('/SortServlet')
    .then(res => {
        this.lists = res.data;
    })
    .catch(err => {
        console.log("获取分类失败",err);
    });  
  },
  destroyed(){
        console.log(this.i);
        bus.$emit('send',this.i);
    }
}

</script>
<style scoped>
.mainport {
    width: 75%;
    height: 100%;
    background: #fff;
    position:absolute;
    right:0;
    margin-bottom: 0;
    border-bottom: none;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
    float: left;
}
.mainport-left {
    width: 25%;
    float: left;
    background: #ececec;
    display: inline-block;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    overflow-scrolling: touch;
}
.mainport-left ul{
	width: 100%;
}
.mainport-left li {
	width: 100%;
    height: 35px;
    border-bottom: 2px solid #ddd;
    text-align: center;
    line-height: 30px;
    font-size: 13px;
    color: #4d4d4d;
    padding:5px;
}
.categoryFirst li span {
    display: none;
}
.mainport-left .active {
    background: #fff;
    border: none;
    width: 101%;
    color:red;
}
.banner,.banner img {
    width: 100%;
    height: 50px;
}
.mainport-right h3 {
    width: 100%;
    height: 16px;
    line-height: 16px;
    color: #b4b4b4;
    margin-left: 10px;
}
.mainFigure img {
    display: inline;
    width: 90px;
    height: 90px;
    overflow: hidden;
}
.goods-list li {
    width: 45%;
    display: inline-block;
}
.goods-title strong {
	font-size: 12px;
    width: 200%;
    height: 100%;
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 20px;
    font-weight: normal;
    text-align: center;
    color:#000;
}
.goods-title span {
    display: none;
}
.default{
  color: #404040;
  background: #f8f8f8;
}

.default-active{
  color: #fff;
  background: rgba(0,0,0,0.3);
}
</style>
