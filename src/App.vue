<template>
  <div>
    <mt-header :title="$route.meta.title" fixed  v-if="hdType">
    <router-link to="" slot="left">
      <mt-button icon="back" @click="$router.back(-1)"></mt-button>
    </router-link>
    
  </mt-header>
    <router-view></router-view>

   <!--  <mt-tabbar v-model="selected">
      <mt-tab-item id="home" class="active" @click.native="goToHome" >
        <img slot="icon" src="./assets/imgs/shouye.png" v-show="isshowa">
        <img slot="icon" src="./assets/imgs/shouyeSel.png" v-show="!isshowa">
        首页
      </mt-tab-item>
      <mt-tab-item id="classify" class="active" @click.native="goToClassify">
        <img slot="icon" src="./assets/imgs/fenlei.png" v-show="isshowb">
        <img slot="icon" src="./assets/imgs/fenleiSel.png" v-show="!isshowb">
        分类
      </mt-tab-item>
      <mt-tab-item id="cart" class="active" @click.native="goToCart">
        <img slot="icon" src="./assets/imgs/gouwuche.png" v-show="isshowc">
        <img slot="icon" src="./assets/imgs/gouwucheSel.png" v-show="!isshowc">
        购物车
      </mt-tab-item>
      <mt-tab-item id="my" class="active" @click.native="goToMy">
        <img slot="icon" src="./assets/imgs/wode.png" v-show="isshowd">
        <img slot="icon" src="./assets/imgs/wodeSel.png" v-show="!isshowd">
        我的
      </mt-tab-item>
    </mt-tabbar> -->
     <mt-tabbar v-model="selected" v-if="tabType">
      <mt-tab-item id="home">
        首页
        <img slot="icon" src="./assets/imgs/shouyeSel.png">
      </mt-tab-item>
      <mt-tab-item id="classify">
        <img slot="icon" src="./assets/imgs/fenleiSel.png">
        分类
      </mt-tab-item>
      <mt-tab-item id="cart">
        <img slot="icon" src="./assets/imgs/gouwucheSel.png">
        购物车
      </mt-tab-item>
      <mt-tab-item id="my">
        <img slot="icon" src="./assets/imgs/wodeSel.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
  </div>
  
</template>

<script>
export default {
  data () {
    return {
      hdType:true,
      tabType:true,//底部导航栏是否显示
      currentRouter:'/',
      selected:'',
      // isshowa:false,  
      // isshowb:true,  
      // isshowc:true, 
      // isshowd:true,
    }
  },
  // 刷新不改变当前选择导航栏样式
  created (){
    let localData = window.localStorage.getItem('navTabIndex')
    this.selected = localData
  },
  watch:{
    selected(newV,oldV) {
      this.$router.push({
          name: newV
      });
      window.localStorage.setItem('navTabIndex',newV);
    },
    $route(e){
      if(e.name === 'home' || e.name === 'login' || e.name === 'register'){
        this.hdType = false;
      }else{
        this.hdType = true;
      }

      if(e.name === 'cart' || e.name === 'orderDetail' || e.name ==='myAddress' || e.name ==='addAddress' ||
        e.name ==='editAddress'){
        this.tabType = false;
      }else{
        this.tabType = true;
      }
    }
  },
  methods:{
    // changeHash(){
    //   // vue 完成渲染任务以后的行为
    //   this.$nextTick(function(){
    //     this.$router.push({
    //       name: this.selected
    //     });
    //   })
    // },
    // goback(){
    //   this.$router.go(-1);
    // },
    // goToHome(){
    //     this.Unshow();
    //      if(this.isshowa)
    //       this.isshowa=false;
    //      else 
    //       this.isshowa=true;
    // },
    // goToClassify(){
    //   this.Unshow();
    //    if(this.isshowb)
    //     this.isshowb=false;
    //    else 
    //     this.isshowb=true;
    // },
    // goToCart(){
    //   this.Unshow();
    //    if(this.isshowc)
    //     this.isshowc=false;
    //    else
    //     this.isshowc=true;
    // },
    // goToMy(){
    //   this.Unshow();
    //    if(this.isshowd)
    //     this.isshowd=false;
    //    else 
    //     this.isshowd=true;
    // },
    // Unshow(){
    //     this.isshowa=true;
    //     this.isshowb=true;
    //     this.isshowc=true;
    //     this.isshowd=true;
    // }
  },
}
</script>

<style>
.mint-tabbar{
  background-color:  #26a2ff;
  position: fixed; 
}
.mint-tab-item-label{
  color: #000030;
  font-size: 12px;
}
</style>
