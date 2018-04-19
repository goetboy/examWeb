
<template>
<div id="article">
  	<articleList></articleList>
    <button v-on:click="submit">11</button>
    
</div>
</template>
<script>
import Vue from "vue";
export default {
  name: 'Article',
 data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
methods: {
    submit: function () {
      
      }
  }
}
</script>