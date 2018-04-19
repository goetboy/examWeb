<template>
  <section class="menus">
    <p class="user" title="">{{userName}}</p>
  
      <ul class="aside" >
        <li><router-link to="/helloWorld">首页</router-link></li>
      <li><router-link to="/article">学习资料</router-link></li>
      </ul> 
  </section>
</template>

<style lang="stylus">
.aside{
position: relative;
width: 800px;
height: 113px;
list-style-type: none;
margin: 0;
padding: 0
}
.aside li{
background:contrast;

width: 80px;
height: 40px;
bottom: 0;
text-decoration: none;
float:left;
}

</style>
