<template>
  <div class="hello">
      <div>
        <h3>欢迎:{{username}}</h3>
        <a href="#" @click="quit">注销登陆</a>
      </div>
    <router-view/>
 

  </div>
</template>

<script>
import { setCookie, getCookie, delCookie } from "../assets/js/cookie.js";
import Head from "../components/Head";
export default {
  name: "Home",
  data() {
    return {
     
    };
  },
  comments:{
     
  },
  mounted() {
    /*页面挂载获取保存的cookie值，渲染到页面上*/
    let user = getCookie("username");
    console.log(user);
    this.username = user;
    /*如果cookie不存在，则跳转到登录页*/
    if (user== "") {
      console.log('/')
      this.$router.push("/login");
    }else{
      this.$router.push("/admin/index");
    }
  },
  methods: {
    quit() {
      /*删除cookie*/
      delCookie("user");
      
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
