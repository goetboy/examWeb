
<template>
    <div class="layout">
        <Layout :style="{minHeight: '100vh'}">
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                    <Submenu name="1">
                                    <template slot="title">
                                        <Icon type="ios-navigate"></Icon>
                                     用户管理
                                    </template>
                                    <!-- <MenuItem name="1-1"></MenuItem>
                                    <MenuItem name="1-2">Option 2</MenuItem>
                                    <MenuItem name="1-3">Option 3</MenuItem> -->
                                </Submenu>
                                <Submenu name="2">
                                    <template slot="title">
                                        <Icon type="ios-keypad"></Icon>
                                        考试管理
                                    </template>
                                    <!-- <MenuItem name="2-1">Option 1</MenuItem>
                                    <MenuItem name="2-2">Option 2</MenuItem> -->
                                </Submenu>
                                <Submenu name="3">
                                    <template slot="title">
                                        <Icon type="ios-analytics"></Icon>
                                       系统管理
                                    </template>
                                    <MenuItem name="1-1"  ><button href="#"  v-on:click="print">菜单管理</button></MenuItem>
                                </Submenu>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
                <Content :style="{padding: '0 16px 16px'}">
                    <Breadcrumb :style="{margin: '16px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
                    </Breadcrumb>
                    <Card>
                        <div style="height: 600px">
                            <router-view/>
                        </div>
                    </Card>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import axios from "../../assets/js/util/http";
    export default {
        data () {
            return {
                isCollapsed: false
            };
        },
        computed: {
            menuitemClasses: function () {
                 axios.get(
  
           "http://127.0.0.1/menu/list"
           
        // headers: {
        //     "Content-Type": "application/x-www-form-urlencoded"
        //   },
        //   transformRequest: [
        //     function(data) {
        //       // Do whatever you want to transform the data
        //       let ret = "";
        //       for (let it in data) {
        //         ret +=
        //           encodeURIComponent(it) +
        //           "=" +
        //           encodeURIComponent(data[it]) +
        //           "&";
        //       }
        //       return ret;
        //     }
        //   ],
        
)
          .then(res => {
              console.log(res.data);
              
          })
          .catch(err => {
            console.log(err);
          });
                // return [
                //     'menu-item',
                //     this.isCollapsed ? 'collapsed-menu' : ''
                // ]
            }
        },methods:{
            
            getMenu(url){
                console.log(url);
                this.$router.push(url);
            },print(){
                console.log('1');
            }
        }
    }
</script>
<style scoped>
    .layout-con{
        height: 100%;
        width: 100%;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>