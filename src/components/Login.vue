<template>

<form>
    <div id="login-warp"  v-show="showLogin">
        <h3>登陆</h3>
        <p v-show="showTishi">{{tishi}}</p>
        <input type="text" placeholder="请输入用户名" v-model="username"/>
        <input type="password" placeholder="请输入密码" v-model="password" />
        <button v-on:click="login">登陆</button>
        <span v-on:click="ToRegister">没有账号？马上注册</span>
    </div>
    <div class="register-wrap" v-show="showRegister">
<h3>注册</h3>
<p v-show="showTishi">{{tishi}} </p>
 <input type="text" placeholder="请输入用户名" v-model="newUsername"/>
        <input type="password" placeholder="请输入密码" v-model="newPassword" />
                <button v-on:click="register">注册</button>
        <span v-on:click="ToLogin">已有账号？马上登陆</span>

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
  let data={'username':this.username,'password':this.password}
 /*  this.$ajax({
     method: 'post',
      url: 'http://localhost/user/login',
      data: {
        'username': this.username,
        'password': this.password
      }
  }) */
  this.axios.get('http://localhost/user/login',data).then((result) => {
    alert(result);
     if(res.data == -1){
                  this.tishi = "该用户不存在"
                  this.showTishi = true
              }else if(res.data == 0){
                  this.tishi = "密码输入错误"
                  this.showTishi = true
              }else if(res.data == 'admin'){
              /*路由跳转this.$router.push*/
                  this.$router.push('/home')
              }else{
                  this.tishi = "登录成功"
                  this.showTishi = true
                  setCookie('username',this.username,1000*60)
                  setTimeout(function(){
                      this.$router.push('/home')
                  }.bind(this),1000)
              }
  }).catch((err) => {
    alert(err);
  });
}

    },
    ToRegister(){
    this.showRegister = true
    this.showLogin = false
},
ToLogin(){
    this.showRegister = false
    this.showLogin = true
},register(){
    if(this.newUsername == "" || this.newPassword == ""){
        alert("请输入用户名或密码")
    }else{
        let data = {'username':this.newUsername,'password':this.newPassword}
        this.$http.post('http://localhost/vueapi/index.php/Home/user/register',data).then((res)=>{
            console.log(res)
            if(res.data == "ok"){
                this.tishi = "注册成功"
                this.showTishi = true
                this.username = ''
                this.password = ''
                 /*注册成功之后再跳回登录页*/
                setTimeout(function(){
                    this.showRegister = false
                    this.showLogin = true
                    this.showTishi = false
                }.bind(this),1000)
            }
        })
    }
}
  }
};
</script>
