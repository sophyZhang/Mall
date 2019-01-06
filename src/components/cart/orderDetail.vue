<template>
<div class="cartbody">
  <!-- 地址 -->
  <div>
    <div class="address">
      <div v-if="adr.checked"><img src="../../assets/imgs/icon_nav_city.png">
      <div class="nanum">
        <span class="name">{{adr.name}}</span>
        <span class="num">{{adr.phone}}</span>
      </div>
      <span>{{adr.address}}</span></div>
      <div class="dnone" v-else><span>收货地址为空，请点击右边按钮添加</span></div>
      <router-link :to="{name:'myAddress'}">
        <span class="back"> ></span>
      </router-link>
    </div>
    <!-- <div v-else>
      <p>收货地址为空</p>
      <router-link :to="{name:'myAddress'}">点击添加地址</router-link>
    </div> -->
  </div>
  
  <div class="pay_detail" >
    <ul>
      <li v-for="(item,index) in orderDetail" :key=index>
        <div class="shopdetail">
          <img :src="item.src">
          <div class="pay_calc">
            <p>{{item.subtitle}}</p>
            <div class="calc">
              <span class="c1">￥{{item.price}}</span>
              <span class="c2">数量:{{item.quantity}}</span>
            </div>
          </div>
        </div>  
      </li>
    </ul>
    <div class="totalPay">
      <p>总金额：<span>￥{{orderPrice}}</span></p>
      <mt-button class="btn" type="primary" @click="zhifu(),pay()">提交订单并支付</mt-button>
    </div>
  </div>
</div>
  
</template>

<script>
  import { MessageBox } from 'mint-ui';
  import { Indicator } from 'mint-ui';
export default {
  data() {
    return{
      orderDetail:[],//订单数据
      orderPrice:'',//订单价格
      adr:[],//默认收货地址
      username:'',//登录名
    }
  },
  created() {
    const order = JSON.parse(sessionStorage.getItem('订单数据'));
    this.orderDetail = order.order;
    let orderdata = [];
    orderdata = orderdata.push(this.orderDetail);
    // console.log(orderdata);
    this.orderPrice= sessionStorage.getItem('订单价格');
    // console.log(this.orderPrice);

    const dataC = JSON.parse(sessionStorage.getItem('登录名'));
    this.username = dataC.Name;

    //获取默认地址

    this.$axios.get('Address',{
        params:{
          username: this.username
        }
      })
      .then(res=>{
        for(let i = 0;i<res.data.length;i++){
          if(res.data[i].checked ===1)
            this.adr = res.data[i];
        }
        console.log(this.adr);
      })
      .catch(err=>{
        console.log('获取默认地址失败',err)
      });
  },
  methods:{
    pay(){
      MessageBox.alert("付款成功，你一共消费了"+this.orderPrice+"元,点击确定返回首页")
      .then(action=>{ 
        this.$router.push('/home');
      })
    },
      //提交订单
    zhifu() {
    
    var ls = window.localStorage;
    var username = this.username; //用户名
    var shoplist = this.orderDetail; //购物车数据
    console.log(shoplist);
    console.log(shoplist.length);//输出长度
    var myname = this.adr.name;
    var myaddress = this.adr.address;
    var myphone = this.adr.phone;
    var postfee = 0.00;
    var payment = this.orderPrice;
    //console.log(name+"\n"+address+"\n"+phone+"\n"+postfee);
    var dataList = new Array();
    var object = new Object();
    object.id = 1;
    object.userid = 4;
    object.postfee = postfee;
    object.payment = this.orderPrice;
    object.status = 0;
    object.createtime = "";
    object.updatetime = "";
    object.address = {};
    object.address.orderid = 1;
    object.address.address = myaddress;
    object.address.phone = myphone;
    object.address.name = myname;
    object.Orderpro = [];
    for(var i = 0; i < shoplist.length; i++) {
      var obj = new Object();
      object.Orderpro.obj = {};
      obj.id = 1;
      obj.productid = shoplist[i].productid;
      obj.orderid = 1;
      obj.subtitle = shoplist[i].subtitle;
      obj.src = shoplist[i].src;
      obj.price = shoplist[i].price;
      obj.totalprice = shoplist[i].price * shoplist[i].quantity;
      obj.quantity = shoplist[i].quantity;
      object.Orderpro.push(obj);  
    }
    dataList.push(object);
    console.log(dataList);
    this.$axios.get('Order.add',{
      params:{
        username:username,
        orderlist:JSON.stringify(dataList)
      }
    })
    .then(res=>{
      console.log(this.orderDetail.length);
      //提交订单清空选中的商品
      for(let i = 0;i<this.orderDetail.length;i++){
        this.$axios.get('Cart.delete',{
          params:{
            cartid:this.orderDetail[i].id
          }
        })
        .then(res1=>{
          console.log(res1.data);
        })
        .catch(err=>{
          console.log(err);
        });
      }
    })
    .catch(err=>{
      console.log('添加失败',err)
    })    
},
    to_myAddress(){
      this.$router.push('/my/myAddress');
    }
  }
 }
</script>
<style scoped>
.cartbody{
  background:#eaeaea;
  margin-bottom: 117px;
}
.address{
  background: #fff;
  height: 50px;
  margin-bottom: 5px;
  position: relative;
}
.address img{
  width: 20px;
  height: 20px;
  float: left;
  margin-right: 20px;
  margin-left: 20px;
  margin-top: 15px;
}
.nanum{
  display: block;
}
.name{
  font-size: 14px;
  margin-right: 10px;
}
.num{
  font-size: 14px;
}
.address a .back{
  font-size: 30px;
  position: absolute;
  right: 20px;
  bottom: 5px;
}
.address>span{
  display: block;
  font-size: 14px;
  margin-top: 5px;
}
.pay_detail ul li{
  width: 100%;
  height: 100px;
  background: #fff;
  border-bottom: 1px solid rgba(0,0,0,0.2);
  margin-bottom: 5px;
}
.shopdetail img{
  width: 100px;
  height: 100px;
  float: left;
}
.shopdetail .pay_calc{
  float: left;
  margin-left: 10px;
  width: 300px;
}
.pay_calc p{
  font-size: 14px;
  font-weight: normal;
  color: #232323;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  word-wrap: break-word;
  word-break: break-all;
  line-height: 1.8;
  display: block;
  margin-bottom: 30px;
}
.calc .c1{
  float: left;
  color: red;
  line-height: 20px;
  font-size: 20px;
}
.calc .c2{
  float: right;
  font-size: 14px;
  font-weight: normal;
  color: #232323;
}
.totalPay{
  background-color: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid rgba(0,0,0,0.2);
}
.totalPay p{
  text-align: center;
  font-size: 16px;
  font-weight:normal;
  padding-top: 8px;
}
.totalPay p span{
  color: red;
  font-size: 20px;
}
.totalPay .btn{
  height: 50px;
  width: 100%;
}
.dnone>span{
  display: inline-block;
  margin-top: 15px;
  margin-left: 30px;
}
</style>