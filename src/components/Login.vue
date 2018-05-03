<template>

<form>
    <div id="login-warp"  v-show="showLogin">
        <h3>登陆</h3>
        <p v-show="showTishi">{{tishi}}</p>
        <input type="text" placeholder="请输入用户名" v-model="username"/>
        <input type="password" placeholder="请输入密码" v-model="password" />
        <button v-on:click="login">登陆</button>
        <span v-on="ToRegister">没有账号？马上注册</span>
    </div>
    <div class="register-wrap" v-show="showRegister">
<h3>注册</h3>
<p v-show="showTishi">{{tishi}} </p>
 <input type="text" placeholder="请输入用户名" v-model="newUsername"/>
        <input type="password" placeholder="请输入密码" v-model="newPassword" />
                <button v-on:click="register">注册</button>
        <span v-on="ToLogin">已有账号？马上登陆</span>

    </div>
</form>
</template>
<script>
import "../assets/js/cookie"
import { getCookie } from '../assets/js/cookie';
export default {
  data() {
    return {
      showLogin: true,
      showRegister: false,
      showTishi: false,
      tishi: "",
      username: "",
      password: "",
      newUsername: "",
      newPassword: ""
    };
  },
  mounted(){
    if(getCookie('username'))
    {
      router.push("/home");
    }
  },methods:{
    login(){
if(this.username == "" || this.password == "")
{
  alert('请输入用户名/密码');
}else{
  //let data={'username':this.username,'password':this.password}
  this.$ajax({
     method: 'post',
      url: 'http://localhost/user/login',
      data: {
        'username': this.username,
        'password': this.password
      }
  })
}

    }
  }
};
</script>
