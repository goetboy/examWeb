<template>
  <div>
    <div>
      <div>用户名:<span>{{user.name}}</span></div>
    </div>
    <div>
      <div>性别:<span>{{user.sex}}</span></div>
    </div>
    <div>
      <div>年龄:<span>{{user.age}}</span></div>
    </div>

    <div></div>
  </div>
</template>
<script>


  import ElButton from "../../../../node_modules/element-ui/packages/button/src/button.vue";

  export default {

    components: {

      ElButton,
    },

    data() {
      return {
        user:{
          name:'南飞燕',
          sex:2,
          age:22
        }

      };
    },
    methods:{

    }
  };
</script>
