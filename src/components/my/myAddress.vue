<template>
<div>
  <!-- 地址列表 -->
  <div class="addresslist">
    <ul>
      <li class="p_list" v-for="(item,index) in address" :key="index">
        <div class="address">
          <img src="../../assets/imgs/icon_nav_city.png">
          <div class="nanum">
            <span class="moren" v-if="item.checked">默认</span>
            <span class="name">{{item.name}}</span>
            <span class="num">{{item.phone}}</span>
          </div>
          <span>{{item.address}}</span>
            <div class="back">
              <router-link :to="{name:'editAddress'}">
                <span class="edit" >编辑 |</span>
              </router-link>
              <span class="remove" @click="remove(index)">删除</span>
            </div>
        </div>
      </li>
    </ul>
  </div>
  <mt-button type="danger" class="addbtn" @click="add">添加收货地址</mt-button>
</div>
  
</template>

<script>
  import { MessageBox } from 'mint-ui';
export default {
  data() {
    return{
      address:'',//请求回来的地址列表
    }
  },
  methods:{
    add(){
      this.$router.push('/my/addAddress');
    },
    remove(index){
      MessageBox.alert("确认删除？").then(action=>{
        this.$axios.get('Address.delete',{
          params:{
            addressid: this.address[index].id
          }
        })
        .then(res=>{
          // console.log(res.data)
          // console.log(this.address)
          this.address.splice(index, 1);
        })
        .catch(err=>{
          console.log("删除失败",err)
        })
      });
    }
  },
  created() {
    const dataC = JSON.parse(sessionStorage.getItem('登录名'));
    let username = dataC.Name;
    this.$axios.get('Address',{
        params:{
          username: username
        }
      })
      .then(res=>{
        this.address=res.data;
        const addressData = { 'address': this.address}
        sessionStorage.setItem('地址', JSON.stringify(addressData))
        // if(this.address.check)
        // console.log(this.address);
      })
      .catch(err=>{
        console.log('添加失败',err)
      });
  }
 }
</script>
<style scoped>
.addresslist li{
  margin-bottom: 5px;
  border-bottom: 1px solid rgba(0,0,0,0.1);
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
.address .back{
  font-size: 14px;
  float: right;
  margin-right: 20px;
  margin-top: -5px;
  color:#5f9ea0;
}
.nanum{
  display: block;
}
.moren{
  font-size: 14px;
  color: red;
  border: 1px solid rgba(0,0,0,0.1);
}
.name{
  font-size: 14px;
  margin-right: 10px;
}
.num{
  font-size: 14px;
}
.addbtn{
  width: 100%;
  position: fixed;
  bottom: 0;
  height: 55px;
}
</style>