<!-- -->
<template>
  <div class="main">
    <h2>用户资料</h2>

    <div class="container">
      <user-avatar></user-avatar>
      <user-information-form></user-information-form>
    </div>
  </div>
</template>

<style scoped>

</style>

<script>
// @ is an alias to /src
import UserInformationForm from "@/components/userCenter/UserInformationForm.vue";
import UserAvatar from "@/components/userCenter/UserAvatar.vue";
export default {
  components: {
    UserInformationForm,
    UserAvatar
  },

  data() {
    return {};
  },
  methods: {}
};
</script>


