<template>
  <div>
   <form>
      <div class='padtop40'>
        <mt-field v-model="username" placeholder="账号"></mt-field>
        <mt-field v-model="password" placeholder="密码" :type="mytype">
          <mt-switch v-model="value"></mt-switch>
        </mt-field>
      </div>
    </form>
    <!-- <div class="padlr10 fs0-8 colred">
        <p>温馨提示:   未注册过的账号，登录时自动注册</p>
    </div> -->
    <div class="button">
      <mt-button @click="login" type="primary" :to="{name :'my'}">修改</mt-button>
      <!-- <mt-button type="primary">注册</mt-button> -->
    </div>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      value: false,
      username: '',
      password: ''
    }
  },
  computed: {
    //计算属性
    mytype: function() {
      return this.value ? '' : 'password'
    }
  },
  methods:{
    login() {
      this.$axios.get('/modify',{
        params: {  
          oldusername: this.username,
          oldpassword: this.password
        }
      })
      .then(res=>{
        // this.states = res.data[0];
        console.log(res.data[0].state)
        if(res.data[0].state === 4008)
          MessageBox.alert("修改成功");
        else if(res.data[0].state === 4009)
          MessageBox.alert("原密码错误");
      })
      .catch(err => {
        console.log("接口错误",err)
      });
    }
  }
}

</script>
<style scoped>
.button .mint-button {
  width: 100%;
}

</style>
