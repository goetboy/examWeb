<template>
<!-- 登陆/注册页面，可以实现用户的登陆和注册 -->
<el-form :rules="userRoules" ref="login"  :model="login" class="from">
  <div>
        <h3>登陆</h3>
        <el-form-item label="用户名"  prop="username" >
          <el-input  v-model="login.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item  label="密码" prop="password">
          <el-input  type="password" v-model="login.password" placeholder="请输入密码" />
        </el-form-item>
  </div>
        <el-form-item>
          <!-- 按钮 类型  单击事件 键盘事件 -->
          <el-button type="primary" v-on:click="loSubmit('login')"  @keydown.enter="loSubmit('login')"  >登陆</el-button><span >没有账号？
        <router-link to="/regedit">马上注册</router-link>
        </span>
        </el-form-item>
    </el-form>

</template>
<script>
import "../assets/js/cookie";
import axios from "../assets/js/util/http";
import bus from "../assets/js/util/bus";
import { getCookie, setCookie } from "../assets/js/cookie";
export default {
  data() {
    //数据绑定
    return {
      labelPosition: "left",

      //登陆数据
      login: {
        username: "",
        password: ""
      },

      //登陆校验
      userRoules: {
        //  属性校验
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
          { min: 5, max: 18, message: "长度在 5 到 18 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  mounted() {
    if (getCookie("username")) {
      router.push("/home");
    }
  },
  methods: {
    //登陆
    loSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$router.push("/admin/index");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
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
              this.username = "";
              this.password = "";
              /*注册成功之后再跳回登录页*/
              setTimeout(
                function() {
                  this.showRegister = false;
                  this.showLogin = true;
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
