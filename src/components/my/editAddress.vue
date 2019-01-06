<template>
<div>
  <!-- 地址列表 -->
  <div class="addressedit">
    <form>
      <div class='napsd'>
        <mt-field v-model="name" placeholder="收货人"></mt-field>
        <mt-field v-model="num" placeholder="手机号码"></mt-field>
        <mt-field v-model="address" placeholder="收货地址"></mt-field>
        <mt-switch class="switch" v-model="value">设为默认地址</mt-switch>
        </mt-field>
      </div>
    </form>
    <mt-button type="danger" class="add_tolist" @click="edit_tolist">修改</mt-button>
  </div>
</div>
  
</template>

<script>
  import { MessageBox } from 'mint-ui';
export default {
  data() {
    return{
      value:false,
      name:'',//收货人
      num:'',//号码
      address:'',//收货地址
      addressdata:'',//收货地址列表
      ueername:'',//用户
      adr:'',//默认地址
    }
  },
  created(){
    const dataC = JSON.parse(sessionStorage.getItem('登录名'));
    this.username = dataC.Name;
    console.log(this.username);

    const dataA = JSON.parse(sessionStorage.getItem('地址'));
    this.addressdata = dataA.address;
    console.log(this.addressdata);
    // 输入框显示地址信息
    for(let i =0;i<this.addressdata.length;i++){
       this.name = this.addressdata[i].name;
    this.num = this.addressdata[i].phone;
    this.address = this.addressdata[i].address;
    this.value = this.addressdata[i].checked;
    }
   
  },
  methods:{
    edit_tolist(){
      if(this.value === false){
        this.value = 0;
      }
      else{
        this.value = 1;
      }
      //修改地址
    var addresslistjson = new Array();
    var editlist = new Object();
    editlist.name = this.name;
    editlist.phone = this.num;
    editlist.address = this.address;
    editlist.checked = this.value;
    addresslistjson.push(editlist);
    console.log(addresslistjson);
      this.$axios.get('Address.update',{
        params:{
          username: this.username,
          addresslist: JSON.stringify(addresslistjson)
        }
      })
      .then(res=>{
        MessageBox.alert("修改成功").then(action=>{
          console.log(res.data);
          // console.log("地址列表"+this.addressdata);
          this.$router.push('/my/myAddress')
        })
        // MessageBox.alert("成功")
        // .then(action=>{
        //   this.$router.push('/my/myAddress')
        // })
      })
      .catch(err=>{
        console.log('修改失败',err)
      })
    }
  }
 }
</script>
<style scoped>
.switch{
  float: right;
  margin-top: 10px;
}
.add_tolist{
  width: 100%;
  height: 55px;
  position: fixed;
  bottom: 0;
}
</style>