<template>
    <el-form>
      <el-form-item label="姓名:">
      <el-input placeholder="请输入姓名" v-model="user.name" style="width: 80px"/>
      </el-form-item>
      <el-form-item label="性别:">
        <el-input placeholder="请输入性别" v-model="user.sex" style="width: 80px"/>
      </el-form-item>
      <el-form-item label="年龄:">
        <el-input placeholder="请输入年龄" v-model="user.age" style="width: 80px"/>
      </el-form-item>
<el-form-item>
  <el-button >取消</el-button>  <el-button type="parimary">提交</el-button>
</el-form-item>
  </el-form>
</template>
<script>


  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button.vue";
  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input.vue";
  import ElForm from "../../../../node_modules/element-ui/packages/form/src/form.vue";
  import ElFormItem from "../../../../node_modules/element-ui/packages/form/src/form-item.vue";

  export default {

    components: {

      ElFormItem,
      ElForm,
      ElInput,
      ElButton,
    },

    data() {
      return {
        user: {
          name: '南飞燕',
          sex: 2,
          age: 22
        }

      };
    },
    methods: {}
  };
</script>
