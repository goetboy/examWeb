<template>
  <!--highlight-current-row选中标签-->
  <el-table :data="users"
            style="width: 100%;" :border="true">
    <el-table-column prop="name" label="姓名" style="height: 20px"></el-table-column>
    <el-table-column prop="sex" label="性别"></el-table-column>
    <el-table-column prop="age" label="年龄"></el-table-column>
    <el-table-column label="查看" fixed="right">
      <template slot-scope="scope">
        <button size="small" type="text" @click="goInfo">查看</button>
        <button size="small" type="text">编辑</button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>


  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button.vue";

  export default {

    components: {

      ElButton,
    },
    data() {
      return {
        users: [{name: '张三', sex: '1', age: '18'}, {name: '小梦', sex: '2', age: '18'}, {name: '阿沁', sex: '2', age: '18'},
          {name: '忘忧', sex: '2', age: '18'},
          {name: '复礼', sex: '1', age: '23'}]
      };
    },
    methods: {
      print(obj) {
        console.log(obj);
      },
      goInfo(obj){
        this.$router.push('/admin/user/info',obj);
      }
    }
  };
</script>
