<template>
    <div class="main">
        <!--角色权限列表展示-->
        <div class="container">
        <el-table :data="routers" >
            <el-table-column prop="id" label="ID" width="100px"></el-table-column>
            <el-table-column prop="methodName" label="功能名" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="serviceName" label="组件名" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="controllerName" label="Controller" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="routerUrl" label="URL" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column prop="requestMethod" label="请求方式" :show-overflow-tooltip="true"
                             width="80px"></el-table-column>
        </el-table>
        </div>
        <div class="page">
        <el-pagination layout="total,sizes,prev,pager,next,jumper" :background="true" :pager-count="7"
                       :page-sizes="[10,20,30,50,100]" :page-size="20" :total="50">
        </el-pagination>
        </div>
    </div>
</template>
<script>
    import routerApi from "@/constant/api/router"

    export default {
        data() {
            return {
                //页面参数
                page: {
                    //选中行
                    selected: "",
                },
                //角色权限列表
                routers: []
            };
        },
        created() {
            this.initPage();
        },
        methods: {
            //初始化页面
            initPage() {
                var vm = this;
                axios.get(routerApi.userManagerPermissionGetAllRouters).then(function (data) {
                    vm.routers = data;
                })
            },
            //选中行
            selectedRow(currentRow) {
                let vm = this;
                vm.page.selected = currentRow;
            },
        }
    };
</script>
<style>
    /*#main {
        height: 100%;
    }

    #action {
        height: 50px;
        line-height: 100%;
    }

    #container {
    }

    #page {
        height: 20px;
    }*/
</style>



