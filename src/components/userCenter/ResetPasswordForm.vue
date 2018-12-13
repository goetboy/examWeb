<template>
  <div class="form">
    <el-form>
      <el-form-item label="验证码" class="form-item">
        <el-input placeholder="请输入验证码" class="verificationCodeInput"></el-input>
      </el-form-item>
      <div v-if='category==="MOBILE"'>
        <p class="verificationCodeSendTips">验证码已发送到您166****6666的手机号</p>
        
      </div>
      <div v-else-if='category==="EMAIL"'>
        <p class="verificationCodeSendTips">验证码已发送到您example@email.com的邮箱</p>
        
      </div>
      <el-form-item label="密码" class="form-item">
        <el-input placeholder="请输入新密码" class="passwordInput"></el-input>
      </el-form-item>
      <el-form-item label="密码" class="form-item">
        <el-input placeholder="请再输入一次密码" class="passwordInput"></el-input>
      </el-form-item>

      <div>
        <el-button type="primary" class="submitButton">提交</el-button>
        <el-button class="cancelButton">取消</el-button>
      </div>
    </el-form>
  </div>
</template>

<style scoped>

.form {
  margin-top: 50px;
}

.form-item {
  margin-top: 25px;
}

.verificationCodeSendTips {
  /* font-size: 7px; */
  font-size: 0.8em;
}

.submitButton {
  margin-top: 25px;
  margin-left: 50px;
  margin-right: 40px;
}

.cancelButton {
  margin-left: 50px;
}
.verificationCodeInput {
  width: 150px;
  margin-left: 6px;
}

.passwordInput {
  width: 250px;
  margin-left: 20px;
}
</style>

<script>
export default {
  props: {
    /**
     * 类型
     * MOBILE EMAIL 
     * 根据传入的类型，判断是根据哪种方式去修改密码
     */
    category: String
  },

  // props: ['type'],
  data() {
    return {
    }
  },

  methods: {

  },

  mounted() {
  }
}
</script>


