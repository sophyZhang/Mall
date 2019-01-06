<template>
  <div class="registerBody">
    <h2>欢迎注册</h2>
    <form>
      <div>
        <mt-field v-model="username" placeholder="请输入账号..."></mt-field>
        <mt-field v-model="password" placeholder="请输入密码..." :type="mytype">
          <mt-switch v-model="value"></mt-switch>
        </mt-field>
      </div>
    </form>
    <div class="padlr10 button">
      <a>
        <mt-button type="primary" @click="register">注册</mt-button>
      </a>
    </div>
    
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      value: false,
      username:'',
      password:''
    }
  },
  computed: {
    //计算属性
    mytype: function() {
      return this.value ? '' : 'password'
    }
  },
  methods:{
    register() {
      this.$axios.get('/regist',{
        params: {  
          username: this.username,
          password: this.password
        }
      })
      .then(res=>{
        // this.states = res.data[0];
        console.log(res.data[0].state)
        if(res.data[0].state === 4005) {
          MessageBox.alert('注册成功，点击确定前往登录...')
          .then(action => {
            this.$router.push("/my/login")   
          });
        }   
        else if(res.data[0].state === 4004)
          MessageBox.alert('用户已存在，请重新填写用户名');
      })
      .catch(err => {
        console.log("注册失败",err)
      });
    }
  }
}

</script>
<style scoped>
.registerBody{
  margin: 0 auto;
  width: 380px;
}
.registerBody h2{
  text-align: center;
}
.button{
  margin-top: 20px;
}
.button .mint-button {
  width: 100%;
}

</style>
