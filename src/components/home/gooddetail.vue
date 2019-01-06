<template>
  <div>
  	<div class="outer-img">
		<img :src="products.src">
	</div>
	<div class="product-desc">
		<ul>
			<li><span class="producy-desc-span">{{ products.subtitle}}</span></li>
			<li class="price-li">市场价<s>￥{{ products.price+200}}</s>
				销售价：<span>￥{{ products.price}}</span></li>
			<li class="number-li">购买数量:
				<span @click="jian">-</span>
				<span>{{count}}</span>
				<span @click="add">+</span>
			</li>
			<li>
				<mt-button type="primary">立即购买</mt-button>
				<mt-button type="danger" @click="addCart">加入购物车</mt-button>
			</li>
		</ul>
	</div>

	<div class="product-props">
		<ul>
			<li>店铺：{{products.busname}}</li>
			<li>发货地：{{products.proplace}}</li>
			<li>库存情况：{{ products.sales }}</li>
			<li>上架时间：{{products.updatetime}}</li>
		</ul>
	</div>
	<!-- <div class="product-info">
		<ul>
			<li>
				<mt-button type="primary" size="large">图文介绍</mt-button>
			</li>
		</ul>
	</div> -->

	<!-- <div class="imgJs">
		<ul>
			<li><img :src="photoDetail.src1" alt=""></li>
			<li><img :src="photoDetail.src2" alt=""></li>
			<li><img :src="photoDetail.src3" alt=""></li>
			<li><img :src="photoDetail.src4" alt=""></li>
		</ul>
	</div> -->
  </div>
</template>

<script>
	import utils from '../../assets/js/utils.js'
	import bus from '../../assets/js/bus.js'
	import { MessageBox } from 'mint-ui';
export default {
	methods:{
		addCart(){
			//获取登录名
		    const dataC = JSON.parse(sessionStorage.getItem('登录名'));
		    let username = dataC.Name;
		    console.log(username);

			// MessageBox.alert('添加成功');
			this.$axios.get('Cart.add',{
				params:{
					username: username,
					productid: this.id,
					quantity:this.count
				}
			})
			.then(res=>{
				MessageBox.alert('添加成功')
				console.log(res.data);
			})
			.catch(err=>{
				console.log("添加购物车失败",err);
			})
		},
		add() {
	      this.count ++;
	    },
	    jian() {
	      if(this.count >0)
	        this.count --;
	    }
		// getid() {
		// 	bus.$on("postData",function(data) {
  //           this.id = data;
  //           console.log(this.id);
  //         });
		// }
	},
	// mounted(){
	// 	this.getid();
	// },
	created() {	
		const dataB = JSON.parse(sessionStorage.getItem('li下标'));
		this.id = dataB.Id;
		console.log(this.id);

		// console.log(dataB.Id);
	 	//图文详情
	 	// this.$axios.get('/ProductDetail',{
  	// 	params:{  
   //        	productid: dataB.Id
   //    		}
   //    	})
	 	// .then(res =>{
	 	// 	this.photoDetails = res.data[0];
	 	// 	console.log(this.photoDetails);
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
	  		// console.log(res.data);
	  	})
	  	.catch(err=>{
	  		console.log("获取产品失败",err);
	  	});
	},
  	data () {
  	  return {
  	  	count:1,//商品数量
  	  	id:'',//列表id
  	  	photoDetails: '',
  	  	products:'',
  	  } 
  	}
  }
</script>

<style scoped>
.imgJs ul li{
	margin-bottom: 10px;
}
.imgJs ul li img{
	height: 200px;
	width: 100%;
}
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
