<template>
  <el-table :data="users" style="width: 100%;" border="true">
    <el-table-column prop="name" label="姓名"></el-table-column>
    <el-table-column prop="sex" label="性别"></el-table-column>
    <el-table-column prop="age" label="年龄"></el-table-column>
  </el-table>
</template>
<script>


  export default {

    data() {
      return {
        users: [{name: '张三', sex: '1', age: '18'}, {name: '小梦', sex: '2', age: '18'}, {name: '阿沁', sex: '2', age: '18'},
          {name: '忘忧', sex: '2', age: '18'},
          {name: '复礼', sex: '1', age: '23'}]
      };
    }
  };
</script>
