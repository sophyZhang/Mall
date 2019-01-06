<template>
<div>
	<ul>
		<li v-for="(p,index) in products" :key="index" @click.stop.prevent=getIndex(index)>
			<router-link :to="{name:'gooddetail',params: {productid: p.id} }">
				<img :src="p.src">
				<div class="title">{{ p.subtitle }}</div>
				<div class="desc">
					<span>￥{{ p.price }}</span>
					<s>￥{{ p.price+200 }}</s>
				</div>
				<div class="detail">
					<div class="hot">热卖中</div>
					<div class="count">剩{{ p.sales }}件</div>
				</div>
			</router-link>
		</li>
	</ul>
</div>
  
</template>
<script>
	import bus from '../../assets/js/bus.js'
export default {

  data() {
    return {
    	products:'',
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
  	
  	this.$axios.get('/Products')
	  	.then(res=>{
	  		this.products = res.data;
	  	})
	  	.catch(err=>{
	  		console.log("获取产品失败",err);
	  	});
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
