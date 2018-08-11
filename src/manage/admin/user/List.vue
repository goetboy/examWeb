<template>
  <!--border 显示边框 stripe固定表头
  highlight-current-row 实现单选
  -->
  <div>
    <el-form style="text-align: left">

      <el-input v-model="seach" placeholder="请输入姓名" style="width: 120px"></el-input>
      <el-button>搜索</el-button>
    </el-form>
    <el-table :data="users" :header-cell-style="tableHeadStyle"
              style="width: 100%;" :border="true" stripe size="mini" :height="500">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
      <!--fixed属性固定列-->
      <el-table-column label="查看" fixed="right">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="goInfo">查看</el-button>
          <el-button size="small" type="text" @click="goUpdate" >编辑</el-button>
          <el-button size="small" type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination data-content-width="100%"
                     layout="prev, pager, next"
                     :total="page.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button.vue";
  import ElForm from "../../../../node_modules/element-ui/packages/form/src/form.vue";
  import ElInput from "../../../../node_modules/element-ui/packages/input/src/input.vue";

  export default {

    components: {

      ElInput,
      ElForm,
      ElButton,
    },
    data() {
      return {
        page: {total: 1},
        users: [{name: '张三', sex: '1', age: '18'}, {name: '小梦', sex: '2', age: '18'}, {name: '阿沁', sex: '2', age: '18'},
          {name: '忘忧', sex: '2', age: '18'},
          {name: '复礼', sex: '1', age: '23'}],
        /*表头样式调整*/
        tableHeadStyle: {},
        /*查询条件*/
        seach: null,
      };
    },
    methods: {

      goInfo(obj) {
        this.$router.push('/admin/user/info', obj);
      },
      goUpdate(obj) {
        this.$router.push('/admin/user/update', obj);
      }
    }
  };
</script>
