<template>
  <div>
  	<div class="outer-img">
		<img :src="products.src">
	</div>
	<div class="product-desc">
		<ul>
			<li><span class="producy-desc-span">{{ products.subtitle}}</span></li>
			<li class="price-li">市场价<s>￥99</s>
				销售价：<span>￥88</span></li>
			<li class="number-li">购买数量:
				<span>-</span><span>1</span><span>+</span>
			</li>
			<li>
				<mt-button type="primary">立即购买</mt-button>
				<mt-button type="danger">加入购物车</mt-button>
			</li>
		</ul>
	</div>

	<div class="product-props">
		<ul>
			<li>参数</li>
			<li>商品货号：12211</li>
			<li>库存情况：111</li>
			<li>上架时间：2018-11-1</li>
		</ul>
	</div>
	<!-- <div class="product-info">
		<ul>
			<li>
				<mt-button type="primary" size="large">图文介绍</mt-button>
				<mt-button type="danger" size="large">商品评论</mt-button>
			</li>
		</ul>
	</div> -->
  </div>
</template>

<script>
	import bus from '../../assets/js/bus.js'
export default {
	methods:{
		getid() {
			bus.$on("postData",function(data) {
            this.id = data;
            console.log(this.id);
          });
		}
	},
	mounted(){
		this.getid();
	},
	created() {	
		const dataB = JSON.parse(sessionStorage.getItem('li下标'))
		console.log(dataB.Id);
	 	//图文详情
	 	// this.$axios.get('/ProductDetail',{
  	// 	params:{  
   //        	productid: 1
   //    		}
   //    	})
	 	// .then(res =>{
	 	// 	this.photoDetails = res.data[0];
	 	// 	console.log(res.data);
	 	// })
	 	// .catch(err => {
	 	// 		console.log('获取图文详情失败',err);
	 	// }); 

	 	this.$axios.get('/Product',{
  		params:{  
          	productid: dataB.Id
      		}
      	})
	  	.then(res=>{
	  		this.products = res.data[0];
	  		console.log(res.data);
	  	})
	  	.catch(err=>{
	  		console.log("获取产品失败",err);
	  	});
	},
  	data () {
  	  return {
  	  	id:'1',//列表id
  	  	photoDetails: '',
  	  	products:'',
  	  } 
  	}
  }
</script>

<style scoped>
.outer-img{
	height: 200px;
	width: 100%;
	border-bottom: 1px solid rgba(0,0,0,0.3);
}
.outer-img img{
	height: 200px;
	width: 100%;
}
.product-desc,
.product-props,
.product-info{
	border-top: 1px solid rgba(0,0,0,0.3);
	margin-bottom: 5px;
	margin-top: 5px;
}
.product-desc ul li,
.product-props ul li,
.product-info ul li{
	list-style: none;
	font-size: 15px;
	color:rgba(0,0,0,0.5);
	margin-top: 8px;
}
.product-desc ul > :nth-child(1) span{
	color: blue;
	font-size: 22px;
	font-weight: bold;
}
.product-desc ul >:nth-child(1){
	border-bottom: 1px solid rgba(0,0,0,0.3);
}
.price-li span{
	color:red;
	font-size: 25px
}
.price-li s{
	margin-right: 16px;
}
/*加减*/
.number-li span{
	display: inline-block;
	border: 2px solid rgba(0,0,0,0.1);
	width: 25px;
}
.product-props ul>:nth-child(1){
	text-align: left;
}
.product-props ul:not(:nth-child(1)){
	margin-left: 40px;
}
.product-info ul{
	margin-bottom: 70px;
	padding:0 5;
}
.number-li span{
	text-align: center;
}
.number-li>:nth-child(2){
	width: 40px;
}

</style>
