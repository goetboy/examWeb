<!-- 重置密码 email和mobile公用组件 -->
<template>
  <div >
    <div v-if="checkingSwitch">
      <div class="mobileLabel">
        <div >
          <router-link :to="{ name: 'resetPasswordForMobile', params: {category: 'MOBILE'} }"  @click.native="checkingSwitch=false">手机号验证</router-link>
        </div>

      </div>
      <div class="emailLabel">
        <div >
          <router-link :to="{ name: 'resetPasswordForEmail', params: {category: 'EMAIL'} }" @click.native="checkingSwitch=false">邮箱验证</router-link>
        </div>

      </div>

    </div>
    <div v-else>
      <router-view></router-view>
    </div>

    
  </div>
</template>

<style scoped>

.mobileLabel {
  margin: 30px 0px 20px 0px;
  color: blue;
}

.emailLabel {
  margin: 0px 0px 0px 0px;
  color: blue;
}

</style>

<script>
import ResetPasswordForm from '@/components/userCenter/ResetPasswordForm.vue'

const MOBILE_TYPE = "MOBILE";
const EMAIL_TYPE = "EMAIL";

export default {
  components: {
    ResetPasswordForm
  },
  data() {
    return {
      mobileCheckingSwitch: true,
      emailCheckingSwitch: true,
      checkingSwitch: true,
      MOBILE_TYPE: MOBILE_TYPE,
      EMAIL_TYPE: EMAIL_TYPE
    }
  },

  methods: {

  }
}
</script>
