<template v-if="list.length">
<div class="cartbody">
  <div  v-if="list.length">
	<div class="pay_detail" >
    <ul>
      <li class="p_list" v-for="(item,index) in list" :key="index">
        <div class="shopname">
          <span>{{item.busname}}</span>
          <a href="javascript:;" @click="handleRemove(index)" class="wy-dele"></a>
        </div>

        <div class="shopdetail">
          <input type="checkbox" class="select" :value="item.id" v-model="checkBoxModel" @click.stop="pickOne(index),checkPick()">
          <!-- <mt-switch v-model="checkBoxModel" @change="pickOne(index)"></mt-switch> -->
          <img :src="item.src">
          <div class="pay_calc">
            <p>{{item.subtitle}}</p>
            <div class="calc">
              <span>￥{{item.price}}</span>
              <span @click="handleReduce(index)" :disable="item.count === 1">-</span>
              <span>{{ item.quantity }}</span>
              <span @click="handleAdd(index)">+</span>
              
            </div>
          </div>
        </div>  
      </li>
    </ul>
  </div>
  <div class="show_price">
    <div class="selectAll">
      <input class="allPick" type="checkbox" @click="allPick(),checkModel()" v-model="allp">全选
      <!-- <mt-switch @change="allPick();checkModel()" v-model="allp">全选</mt-switch> -->
    </div>
    <div class="show_1">
      <p>总计：{{totalPrice}}</p>
      <!-- <p v-else>总计：0</p> -->
    </div>
    <div class="show_2" @click="jiesuan">
      <mt-button type="danger" size="large" @change="jiesuan">去结算</mt-button>
    </div>
  </div>
  </div>
  <div v-else>购物车为空</div>
</div>
  
</template>

<script>
  import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      indexId:'',//添加购物车的商品的id
      pid:'',// 添加购物车的商品的id
      Total:this.totalPrice,
      displayMoney: false,
      list:'',
      products:'',//商品信息
      // isBuy: false,
      checkBoxModel: [],
      allp: false,
      order:[], //订单数组
      adr:'',//默认收货地址
    }
  },
  watch(){

  },
  computed: {
      totalPrice(){
            var total = 0;
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].status) {
                    this.order[i]=this.list[i];
                    console.log(this.order);
                    const order = { 'order': this.order}
                    sessionStorage.setItem('订单数据', JSON.stringify(order))
                    var item = this.list[i];
                    total += item.price * item.quantity;
                    sessionStorage.setItem('订单价格', total);

                    // let orderdata = {};
                    // [].push.apply(orderdata,this.order);
                    // console.log(orderdata);
                }else{
                    this.order.splice(i, 1);
                }
            }
            return total.toString().replace(/\B(?=(\d{3})+$)/g, ',');
        }
  },
  created() {
    
    const dataC = JSON.parse(sessionStorage.getItem('登录名'));
    let username = dataC.Name;  
    // 渲染购物车
    var list1 = [];
    $.ajax({
      async:false,
      url: "http://231cj03230.imwork.net/MyProject/Cart",
      data: {
        "username": "" + username
      },
      type: "get",
      success: function(data) {
        var JsonObjs = JSON.parse(data);
        list1 = JsonObjs;
      for(let i in list1){
        console.log(list1[i].productid)
        $.ajax({
            async:false,
            url: "http://231cj03230.imwork.net/MyProject/Product",
            data: { 
              productid: list1[i].productid
            },
            type: "get",
            success: function(data1) {
              var JsonObjs1 = JSON.parse(data1);
              console.log(JsonObjs1[0].src);
              list1[i].src = JsonObjs1[0].src;
              list1[i].subtitle = JsonObjs1[0].subtitle;
              list1[i].busname = JsonObjs1[0].busname;
              list1[i].price = JsonObjs1[0].price;
              
              }
        });
      } 
      console.log(list1);
    } 
    });
    this.list = list1;
      console.log(this.list);
  },
  methods:{
  
    // 减
    handleReduce(index) {
          if (this.list[index].quantity === 1) return;
          this.list[index].quantity--;
    },
    // 加
    handleAdd(index) {
        for (var i = 0; i < this.list.length; i++) {
                if (this.list[i].status) {
                this.list[index].quantity++;
              }
            }
    },
    // 移除
    handleRemove(index) {
      MessageBox.confirm("确定要删除？").then(action => {
        console.log(this.list[index].productid)
        
        this.$axios.get('Cart.delete',{
          params:{
            cartid:this.list[index].id
          }
        })
        .then(res=>{
          this.list.splice(index, 1);
          console.log(res.data);
        })
        .catch(err=>{
          console.log(err);
        });
    });
    },

    // 全选
    allPick() {
            var _this = this;
            if (_this.allp) {
                _this.checkBoxModel = [];
                _this.allp = false;
            } else {
                _this.checkBoxModel = [];
                _this.list.forEach(function (item) {
                    _this.checkBoxModel.push(item.id);
                });
                _this.allp = true;
            }
            //全选的实现通过checkBoxModel的状态
        },
        // 单选
    pickOne(index) {
        if (this.list[index].status) {
            this.list[index].status = false;
        } else {
            this.list[index].status = true;
        }
        //单选的实现依靠的是isBuy通过click的切换实现
    },
    // 单选都点亮，打开全选
    checkPick() {
        var _this = this;
        var sumPic = 0;
        for (var i = 0; i < _this.list.length; i++) {
            if (_this.list[i].status) {
                sumPic++;
            }
        }
        if (sumPic == _this.list.length) {
            _this.allp = true;
        } else {
            _this.allp = false;
        }
    },
    checkModel() {
            let _this = this;
            if (_this.checkBoxModel.length) {
                var newArr = _this.checkBoxModel.concat();
                // console.log(newArr);
                for (var i = 0; i < _this.checkBoxModel.length; i++) {
                    // var newone = newArr.shift().toString();
                    // console.log(newone);
                    _this.list[i].status = true;
                    //console.log(newone);
                    // console.log(_this.list[newone-1]);
                }
            } else {
                newArr = _this.checkBoxModel.concat();
                //console.log(newArr);
                for (var i = 0; i < _this.list.length; i++) {
                    _this.list[i].status = false;
                }
            }
            // 利用checkBoxModel的绑定的状态来分别给每个物品确认status的状态，避免与pickOne的冲突
        },
    jiesuan(){
        // MessageBox.alert("土豪，您共消费了"+this.totalPrice+"元，在线支付正在维修，请到前台刷卡消费...")
        // .then(action =>{
          // const dataC = JSON.parse(sessionStorage.getItem('登录名'));
          // let username = dataC.Name;
          // this.$axios.get('Order.add',{
          //   params:{
          //     uesrname: username,
          //     orderlist: JSON.stringify(this.order)
          //   }
          // })
          // .then(res=>{
          //   console.log(res.data);
          // })
          // .catch(err=>{
          //   console.log('添加失败',err);
          // })
          this.$router.push('/cart/orderDetail')
        // })
    }
  }
}

</script>
<style scoped>
input{
  border: 1px solid #000;
  border-radius: 50%;
  width: 20px;
  height: 20px;
}
.cartbody{
  background:#eaeaea;
}
.shopname{
  width: 100%;
  height: 30px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
  margin-bottom: 5px;
  position: relative;
}
.shopname>span{
  font-size: 14px;
  color: #333;  
  position: absolute;
  bottom: -20px;
  left: 20px;
}
.wy-dele{
  width:20px; 
  height:20px; 
  position: absolute;
  right: 20px;
  background:url(../../assets/imgs/delete.png) no-repeat; 
  /*background: black;*/
  display:block;
  background-size:20px;
 }
.shopdetail{
  width: 100%;
}
.pay_calc{
  /*width: 160px;*/
  display: inline-block;
  margin-bottom: 20px;
  position: relative;
}
.pay_detail{
  margin-bottom: 105px;
}
.pay_detail ul li{
	list-style: none;
	border-bottom: 1px solid rgba(0,0,0,0.2);
	padding-top: 10px;	
  background: #fff;
  margin-bottom: 10px;
}
.pay_detail ul li img{
  width: 100px;
  height: 100px;  
  display: inline-block;
}
.pay_detail ul li>:nth-child(1){
  line-height: 80px;
}
.select{
  float: left;
  margin-right: 20px;
}
.mint-switch{
	float: left;
	margin-right: 20px;
}
.pay_calc>p{
  width: 200px;
  position: relative;
  bottom: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.calc span:nth-child(1){
	color: red;
	font-size: 16px;
}
.calc span:not(:nth-child(1)) {
	border: 1px solid rgba(0,0,0,0.3);
	display: inline-block;
	text-align: center;
	width: 20px;
	height: 20px;
}
.calc a{
	margin-left: 20px;
}
.show_price{
  z-index: 999;
  position: fixed;
  width: 100%;  
  bottom: 0;
  height: 55px;
	background-color: #fdfd;

  /*position: relative;*/
}
.allPick{
  margin-top: 8px;
}
.selectAll{
  position: absolute;
  top: 10px;
}
.show_1{
	margin-left: 190px;
	display: inline-block;
  /*font-size: 14px;*/
}
.show_2{
  margin-top: 5px;
  float: right;
}
</style>
