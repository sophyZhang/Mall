<template>
  <div>
  	<!-- 搜索 -->
    <mt-search
	  v-model="value"
	  cancel-text="取消"
	  placeholder="搜索要搜索的东西..."
    @keyup.enter.native="search">
	</mt-search>
	
	<!-- 轮播图 -->
    <!-- <mt-swipe :auto="3000">
	  <mt-swipe-item>
	  	<img :src="imgs.src1">
	  </mt-swipe-item>
    <mt-swipe-item>
      <img :src="imgs.src2">
    </mt-swipe-item>
    <mt-swipe-item>
      <img :src="imgs.src3">
    </mt-swipe-item>
    <mt-swipe-item>
      <img :src="imgs.src4">
    </mt-swipe-item>
    <mt-swipe-item>
      <img :src="imgs.src5">
    </mt-swipe-item>
	</mt-swipe> -->

   <mt-swipe :auto="3000">
    <mt-swipe-item v-for="(i,index) in img" :key="index">
      <img :src="i.src">
    </mt-swipe-item>
  </mt-swipe>
  
  <!-- 六宫格 -->
  <div class="grid">
    <ul>
      <li v-for="(grid,index) in grids" :key="index"> 
        <router-link :to="grid.router">
          <span :class="grid.className"></span>
          <span class="title">{{grid.title}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</div>
</template>
<script>
export default {
  data () {
    return {
    	value:'',
    	imgs:'',
      // 轮播图
    	img:[ 
        {src: 'http://c7.gg/b7Tvk'},
    		{src: 'http://c7.gg/b7TvD'},
    		{src: 'http://c7.gg/b7TvS'},
        {src: 'http://c7.gg/b7Tx7'}
        ],
    		
      grids:[ 
      {className:'cms cms1', title:'热门商品',router:{name:'goodlist',params:{productid:1}}},
      {className:'cms cms2', title:'全球比价',router:{name:'goodlist'}},
      {className:'cms cms3', title:'白菜服饰',router:{name:'goodlist'}},
      {className:'cms cms4', title:'省钱超市',router:{name:'goodlist'}},
      {className:'cms cms5', title:'生鲜超市',router:{name:'goodlist'}},
      {className:'cms cms6', title:'领劵兑劵',router:{name:'goodlist'}}
      ] 
    }
  },
  created() {
    // 请求轮播图
    // this.$axios.get('/DrawServlet')
    // .then(res => {
    //   this.imgs = res.data[0];
    //   console.log(this.imgs[0].src1);
    // })
    // .catch(err => {
    //   console.log(err)
    // });
  },
  methods:{
    search() {
      const searchData = {'value': this.value}
      sessionStorage.setItem('搜索值', JSON.stringify(searchData));
      console.log(this.value);
      this.$router.push({
          name: 'searchDetail'
      });
    }
  }
}

</script>
<style scoped>
.mint-swipe{
	margin-top: 52px;
	height: 150px;
	/*z-index: 9;*/
}
.mint-swipe img{
	width: 100%;
	height: 150px;
}
.grid ul{
  overflow: hidden;
}
.grid ul li{
  display:flex;
  justify-content: center;  
  margin-top: 10px;
  width: 33%;
  float: left;
  width: 33.3%;
  text-align: center;  
}
.grid ul li span{
  display: block;
  font-size: 12px;
}
.grid ul li span:nth-child(2){
  margin-top: 5px;
}
.cms{
  display: block;
  height: 50px;
  width: 50px;
  background-repeat: round;
}
.cms1 {
  background-image: url(../../assets/imgs/a1.png);
}
.cms2 { 
  background-image: url(../../assets/imgs/a2.png);  
}
.cms3 {
  background-image: url(../../assets/imgs/a3.png);
}
.cms4 {
  background-image: url(../../assets/imgs/a5.png);
}
.cms5 {
  background-image: url(../../assets/imgs/a6.png);
}
.cms6 {
  background-image: url(../../assets/imgs/a7.png);
}
</style>
