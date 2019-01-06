<template>
<div class="cartbody">
  
  <div class="pay_detail" v-if="orderDetail.length">
    <ul>
      <li v-for="(item,index) in orderDetail" :key="index">
        <ul>
          <li v-for="(i,index) in item.Orderpro" :key="index">
            <div class="shopdetail">
              <img :src="i.src">
              <div class="pay_calc">
                <p>{{i.subtitle}}<span>x{{i.quantity}}</span></p>
                <div class="calc">
                  <span class="c1">￥{{i.price}}</span>
                  <span class="c2">状态：已支付</span>
                </div>
              </div>
            </div> 
          </li>
        </ul>
        <div class="total">
          <p>创建时间：<span>{{item.updatetime | dataFormat('yyyy-MM-dd hh:mm:ss')}}</span></p> 
          <p>总金额：<span>￥{{item.payment}}</span></p> 
        </div>
      </li>
      <tr class="tr"></tr>
    </ul>
    
  </div>
  <div v-else>订单为空</div>
</div>
  
</template>

<script>
  import { MessageBox } from 'mint-ui';
export default {
  data() {
    return{
      orderDetail:[],//订单数据
      orderPrice:'',//订单价格
      adr:[],//默认收货地址
    }
  },
  created() {
    // const order = JSON.parse(sessionStorage.getItem('订单数据'));
    // this.orderDetail = order.order;
    // console.log(this.orderDetail);
    this.orderPrice= sessionStorage.getItem('订单价格');
    // console.log(this.orderPrice);
    const dataC = JSON.parse(sessionStorage.getItem('登录名'));
    let username = dataC.Name;
    this.$axios.get('Orders',{
      params:{
        username:username,
      }
    })
    .then(res=>{
      console.log(res.data);
      this.orderDetail = res.data;
      // console.log(this.orderDetail[0].payment)
    })
    .catch(err=>{
      console.log('渲染失败',err)
    })
    }
 }
</script>
<style scoped>
.cartbody{
  margin-bottom: 117px;
}
.address{
  background: #fff;
  height: 50px;
  margin-bottom: 5px;
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
  float: right;
  margin-right: 20px;
  margin-top: -45px;
}
.address>span{
  display: block;
  font-size: 14px;
  margin-top: 5px;
}
.pay_detail>ul>li{
  border-bottom: 30px solid rgba(0,0,0,0.1);
}
.pay_detail ul li ul li{
  width: 100%;
  height: 100px;
  background: #fff;
  border-bottom: 1px solid rgba(0,0,0,0.1);
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
  /*overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-wrap: normal;
  word-wrap: break-word;
  word-break: break-all;*/
  /*line-height: 1.8;*/
 
  /*margin-bottom: 30px;*/
  /*display: inline-block;*/
}
.pay_calc p span{
  /*display: inline-block;*/
  margin-left: 10px;
  color: red;
  font-size: 14px;
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
.total{
  height: 40px;
}
.total p{
  display: inline-block;
  font-size: 14px;
  margin: 10px;
}
.total p span{
  color: red;
}
.total>p:nth-child(2){
  float: right;
}
/*.tr{
  width: 100%;
  height: 10px;
  color: black;
}*/
</style>