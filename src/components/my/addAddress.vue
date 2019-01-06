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
    <mt-button type="danger" class="add_tolist" @click="add_tolist">添加</mt-button>
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
      ueername:'',//用户
    }
  },
  created(){
    const dataC = JSON.parse(sessionStorage.getItem('登录名'));
    this.username = dataC.Name;
    console.log(this.username)
  },
  methods:{
    add_tolist(){
      if(this.value === false){
        this.value = 0;
      }
      else{
        this.value = 1;
      }
      console.log(this.value);
      this.$axios.get('Address.add',{
        params:{
          username: this.username,
          name:this.name,
          phone:this.num,
          address:this.address,
          checked:this.value
        }
      })
      .then(res=>{
        console.log(res.data)
        MessageBox.alert("添加成功")
        .then(action=>{
          this.$router.push('/my/myAddress')
        })
      })
      .catch(err=>{
        console.log('添加失败',err)
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