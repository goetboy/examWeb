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
                    <span>考试管理</span>
                </template>
                <el-menu-item-group>
                    <template slot="title"></template>
                    <el-menu-item index="/exam/list">考试管理</el-menu-item>
                    <el-menu-item index="/examinee/list">考生管理</el-menu-item>
                    <el-menu-item index="/paper/list">试卷管理</el-menu-item>
                    <el-menu-item index="/question/list">考生管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>系统设置</span>
                </template>
                <el-menu-item-group>
                    <template slot="title"></template>
                    <el-menu-item index="/user/list">用户管理</el-menu-item>
                    <el-menu-item index="/role/list">角色管理</el-menu-item>
                    <el-menu-item index="/menu/list">菜单管理</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>


<style>
    .base-menu {
        background-color: #333;
        height: 100%;
    }

    .el-menu {
        border-right: solid 0px !important;
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
