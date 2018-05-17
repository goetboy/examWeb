<template>

<Form>
    <div id="login-warp"  v-show="showLogin">
        <h3>登陆</h3>
        <p v-show="showTishi">{{tishi}}</p>
        <FormItem prop="user">
          <Input v-model="username" placeholder="请输入用户名" style="width: 300px"></Input>
          </FormItem>
          <FormItem prop="password">
          <Input type="password" v-model="password" placeholder="请输入密码" style="width: 300px"></Input>
        </FormItem>
        <FormItem>
        <Button type="primary" v-on:click="login" >登陆</Button>        <span v-on:click="ToRegister">没有账号？<a href="#">马上注册</a></span>

        </FormItem>
    </div>
    <div class="register-wrap" v-show="showRegister">
<h3>注册</h3>
<p v-show="showTishi">{{tishi}} </p>
<FormItem prop="user">
 <Input type="text" placeholder="请输入用户名" v-model="newUsername" style="width: 300px"/>
   </FormItem>
 <FormItem prop="password">
 <Input type="password" placeholder="请输入密码" v-model="newPassword"  style="width: 300px"/>
   </FormItem>
    <FormItem>
                <Button type="primary" v-on:click="register">注册</Button>
        <span v-on:click="ToLogin">已有账号？<a href="#">马上登陆</a></span>
 </FormItem>
    </div>
</Form>
</template>
<script>
import "../assets/js/cookie";
import axios from "../assets/js/util/http";
import bus from "../assets/js/util/bus";
import { getCookie, setCookie } from "../assets/js/cookie";
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
  mounted() {
    if (getCookie("username")) {
      router.push("/home");
    }
  },
  methods: {
    login() {
      if (this.username == "" || this.password == "") {
        alert("请输入用户名/密码");
      } else {
        console.log("进入登陆");
        let data = { username: this.username, password: this.password };
        axios
          .post(
            "http://127.0.0.1/login",

            {
              username: this.username,
              password: this.password
            },
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              transformRequest: [
                function(data) {
                  // Do whatever you want to transform the data
                  let ret = "";
                  for (let it in data) {
                    ret +=
                      encodeURIComponent(it) +
                      "=" +
                      encodeURIComponent(data[it]) +
                      "&";
                  }
                  return ret;
                }
              ]
            }
          )
          .then(res => {
            console.log(res.data);
let token = res.headers.authorization;
console.log(res);
    if(token){
                bus.state.token=token;
                let redirect = '?redirect=';
                let index = this.$route.fullPath.indexOf(redirect);
                if(index>0){
                  this.$router.push(this.$route.fullPath.substr(index+redirect.length).replace(/%2F/g,'/'))
                }else{
                  this.$router.push('/')
                }
              };
            if (res.data.status == "success") {
              this.tishi = "登陆成功";
              this.showTishi = true;
              console.log("跳转页面");
              setCookie("user", res.data.data);
              setTimeout(
                function() {
                  console.log(res.data.data.role.name);
                  if (res.data.data.role.name == "admin") {
                    this.$router.push("/admin/index");
                  } else {
                    this.$router.push("/home");
                  }
                }.bind(this),
                1000
              );
              this.$router.push("/main");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    ToRegister() {
      this.showRegister = true;
      this.showLogin = false;
    },
    ToLogin() {
      this.showRegister = false;
      this.showLogin = true;
    },
    register() {
      if (this.newUsername == "" || this.newPassword == "") {
        alert("请输入用户名或密码");
      } else {
        let data = { username: this.newUsername, password: this.newPassword };
        this.$http
          .post("http://localhost/vueapi/index.php/Home/user/register", data)
          .then(res => {
            console.log(res);
            if (res.data == "ok") {
              this.tishi = "注册成功";
              this.showTishi = true;
              this.username = "";
              this.password = "";
              /*注册成功之后再跳回登录页*/
              setTimeout(
                function() {
                  this.showRegister = false;
                  this.showLogin = true;
                  this.showTishi = false;
                }.bind(this),
                1000
              );
            }
          });
      }
    }
  }
};
</script>
