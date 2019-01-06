<template>
<div>
	<div v-if="search.length">
	<ul>
		<li v-for="(p,index) in search" :key="index">
			<a>
				<img :src="p.src">
				<div class="title">{{ p.subtitle }}</div>
				<div class="desc">
					<span>￥{{ p.price }}</span>
					<s>￥{{ p.price+200 }}</s>
				</div>
				<div class="detail">
					<div class="hot">{{p.busname}}</div>
					<div class="count">剩{{ p.sales }}件</div>
				</div>
			</a>
		</li>
	</ul>
	</div>
	<div v-else>搜索不到当前搜索的商品</div>
</div>
  
</template>
<script>
	import bus from '../../assets/js/bus.js'
export default {

  data() {
    return {
    	search:'',
    	i:'',//li下标
    }
  },
  methods:{
  	getIndex(index) {
  		this.i = index +1;
  		const orderData = { 'Id': this.i}
 		sessionStorage.setItem('li下标', JSON.stringify(orderData))
  		// bus.$emit('send',this.i);
  		// console.log(this.i);
  	}
  },
  created() {
  	
  	const searchdata1 = JSON.parse(sessionStorage.getItem('搜索值'));
    let value = searchdata1.value;
    console.log(value);
    this.$axios.get('SelectProduct',{
        params:{
          description: value
        }
      })
      .then(res=>{
         this.search =res.data;
      })
      .catch(err=>{
        console.log(err);
      }) 
  },
  destroyed(){
  		console.log(this.i);
        bus.$emit('send',this.i);
    }
}
</script>
<style scoped>
ul{
	overflow: hidden;
}
li{
	float: left;
	width: 49%;
	margin:5px 0 1px 3px;
	padding: 10px;
	box-sizing: border-box;
	border: 1px solid #aaa;
}
.desc span{
	color:red;
}
.desc s{
	text-decoration: line-through;
}
.detail{
	overflow: hidden;
}
.detail .hot{
	float: left;
	text-align: left;
	font-size: 12px;
}
.detail .count{
	float: right;
	text-align: right;
	font-size: 12px;
}
.desc{
	color: rgba(92,92,92,0.8);
	background-color: rgba(0,0,0,0.2);
}
.title{
	font-size: 14px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
img{
	height: 150px;
	width: 100%;
}
/*图片懒加载*/
image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>
