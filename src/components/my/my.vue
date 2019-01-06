<template>
  <div>
    <mt-cell title="登录注册" :to="{name :'login'}">
      <img slot="icon" src="../../assets/imgs/denglu.png" width="24" height="24">
    </mt-cell>
    <mt-cell title="我的地址" :to="{name :'myAddress'}">
      <img slot="icon" src="../../assets/imgs/hezuo.png" width="24" height="24">
    </mt-cell>
    <mt-cell title="我的订单" :to="{name :'myOrder'}">
      <img slot="icon" src="../../assets/imgs/kefu.png" width="24" height="24">
    </mt-cell>
    <mt-cell title="联系客服">
      <img slot="icon" src="../../assets/imgs/kefu.png" width="24" height="24">
    </mt-cell>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: false
    }
  },
  computed: {
    //计算属性
    mytype: function() {
      return this.value ? '' : 'password'
    }
  },
}

</script>
<style scoped>


</style>
