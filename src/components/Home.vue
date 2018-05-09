<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import { setCookie, getCookie, delCookie } from "../assets/js/cookie.js";
export default {
  name: "Home",
  data() {
    return {
      msg: "我的第一个项目"
    };
  },
  mounted() {
    /*页面挂载获取保存的cookie值，渲染到页面上*/
    let uname = getCookie("username");
    this.name = uname;
    /*如果cookie不存在，则跳转到登录页*/
    if (uname == "") {
      this.$router.push("/");
    }
  },
  methods: {
    quit() {
      /*删除cookie*/
      delCookie("username");
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
