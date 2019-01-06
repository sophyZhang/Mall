<template>
  <div class="loginBody">
    <h2>欢迎登录商城</h2>
    <form>
      <div class='napsd'>
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
      <mt-button @click="login" type="primary" :to="{name :'my'}">登录</mt-button>
      <!-- <mt-button type="primary">注册</mt-button> -->
    </div>
    <div class="lf">
      <!-- <router-link :to="{name :'forgive'}"> -->
        <span class='forget'>忘记密码？</span>
      <!-- </router-link> -->
    </div>
    <div class="rt">
      <router-link :to="{name :'register'}">
        <span class='no'>没有账号？去注册</span>
      </router-link>
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
  created(){
    console.log(this.value);
  },
  computed: {
    //计算属性
    mytype: function() {
      return this.value ? '' : 'password'
    }
  },
  methods:{
    login() {
      this.$axios.get('/login',{
        params: {  
          username: this.username,
          password: this.password
        }
      })
      .then(res=>{
        const nameData = { 'Name': this.username}
        sessionStorage.setItem('登录名', JSON.stringify(nameData))
        // this.states = res.data[0];
        console.log(res.data[0].state)
        if(res.data[0].state === 4001) {
            MessageBox.alert('登录成功')
            .then(action => {
              this.$router.push("/my")   
            });
        }
        else if(res.data[0].state === 4002)
          MessageBox.alert("密码错误，请重新填写");
        else if(res.data[0].state === 4003)
          MessageBox.alert("用户不存在");
      })
      .catch(err => {
        console.log("登录失败",err)
      });
    }
  }
}

</script>
<style scoped>
.loginBody{
  margin: 0 auto;
  width: 380px;
}
.loginBody h2{
  text-align: center;
}
.button{
  margin-top: 20px;
}
.button .mint-button {
  width: 100%;
}
.forget,.no{
  opacity: 0.5;
  font-size: 14px;
  color: #323542;
}
</style>
