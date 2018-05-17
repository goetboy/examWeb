<template>
  
</template>
<script>
import {setCookie,getCookie,delCookie} from '../assets/js/cookie';
export default {
  data(){
return {
    username:''
}
  },
  mounted(){
      let uname=getCookie('username');
      this.username=uname;
      if(uname == ''){
          this.$router.push('/')
      }
  },methods:{
      quit(){
          delCookie('username');
      }
  }
}
</script>

