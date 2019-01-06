export default{
    getUrlKey:function(name){
         return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)')
         	.exec(location.href)||[,""])[1].replace(/\+/g,'%20'))||null;
     },
    add() {
      this.count ++;
    },
    jian() {
      if(this.count >0)
        this.count --;
    },
 }