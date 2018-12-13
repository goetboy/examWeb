<!-- 查看用户信息表单，支持修改 -->
<template>
  <div class="form">
    <el-form>
      <el-form-item label="用户名：">

        {{ userForm.userName }}
      </el-form-item>

      <el-form-item label="昵称：">
        <div v-if="nickNameSwitch">
          <a @click="nickNameSwitch=false" class="modifiedLabel">{{ userForm.nickName }}</a>
          
        </div>

        <div v-else>
          <el-input v-model="userForm.nickName" class="input nickNameInput" placeholder="昵称"></el-input>
          <el-button type="primary" size="medium">修改</el-button>
          <el-button size="medium" @click="nickNameSwitch=true">取消</el-button>
        </div>
        
      </el-form-item>

      <el-form-item label="性别：">
        {{ userForm.sex }}
      </el-form-item>

      <el-form-item label="生日：">
        <div v-if="birthdaySwitch">
          <a @click="birthdaySwitch=false" class="modifiedLabel">
            {{ userForm.birthday }}
          </a>
        </div>

        <div v-else>
          <el-date-picker
            v-model="userForm.birthday"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
            class="datePicker">
          </el-date-picker>
          <el-button type="primary" size="medium">修改</el-button>
          <el-button size="medium" @click="birthdaySwitch=true">取消</el-button>
        </div>

      
      </el-form-item>

      <el-form-item label="手机号：">
        <div v-if="mobileSwitch">
          <a @click="mobileSwitch=false" class="modifiedLabel">{{ userForm.mobile }}</a>

        </div>
        <div v-else>
          <el-input v-model="userForm.mobile" class="input mobileInput" placeholder="昵称"></el-input>
          <el-button type="primary" size="medium">修改</el-button>
          <el-button size="medium" @click="mobileSwitch=true">取消</el-button>
        </div>
        
      </el-form-item>

      <el-form-item label="邮箱：">
        <div v-if="emailSwitch">
          <a @click="emailSwitch=false" class="modifiedLabel">{{ userForm.email }}</a>
          
        </div>

        <div v-else>
          <el-input v-model="userForm.email" class="input emailInput" placeholder="昵称"></el-input>
          <el-button type="primary" size="medium">修改</el-button>
          <el-button size="medium" @click="emailSwitch=true">取消</el-button>
        </div>
        
      </el-form-item>

      <el-form-item label="注册时间:">
        {{ userForm.registerDate }}
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.modifiedLabel {
  color: blue;
}

.form {
  margin: 20px 20px 20px 0px;
}
.nickNameInput {
  width: 200px;
  margin-right: 15px;
}

.mobileInput {
  width: 150px;
  margin-right: 15px;
}

.emailInput {
  width: 300px;
  margin-right: 15px;
}

.datePicker {
  width: 130px;
  margin-right: 15px;
}
.input {
  /* width: 200px; */
  /* margin-right: 15px; */
}
</style>

<script>
export default {
  data: function() {
    return {
      userForm: {
        userName: "mamian",
        nickName: "mamian",
        sex: "男",
        birthday: "1994-10-26",
        mobile: "176666666",
        email: "demo@demo.com",
        registerDate: "2018-10-26"
      },
      nickNameSwitch: true,
      mobileSwitch: true,
      emailSwitch: true,
      birthdaySwitch: true
    };
  },

  methods: {
    clicktest: function() {}
  }
};
</script>
