<template>
    <div class="base-menu">
        <el-menu
                default-active="2"
                background-color="#333"
                text-color=" #fff"
                active-text-color="#ffd04b"
                class="el-menu"
                :router="true">

            <el-submenu index="1">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>用户管理</span>
                </template>
                <el-menu-item-group>
                    <template slot="title"></template>
                    <el-menu-item index="/user/list">查询用户</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>权限管理</span>
                </template>
                <el-menu-item-group>
                    <template slot="title"></template>
                    <el-menu-item index="/role/list">查询角色</el-menu-item>
                    <el-menu-item index="/router/list">查询权限</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="3" disabled>
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>邮件管理</span>
                </template>
                <el-menu-item-group>
                    <template slot="title"></template>
                    <el-menu-item index="1-1">邮件发送记录</el-menu-item>
                    <!-- <el-menu-item index="1-2">重置密码</el-menu-item> -->
                </el-menu-item-group>

            </el-submenu>

        </el-menu>
    </div>
</template>


<style >
    .base-menu {
        background-color: #333;
        height: 100%;
    }
    .el-menu {
        border-right:solid 0px!important;
    }
</style>

<script>
    export default {
        data() {
            return {};
        },

        methods: {}
    };
</script>
