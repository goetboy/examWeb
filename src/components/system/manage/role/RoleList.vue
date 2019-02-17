<template>
    <div class="main">
        <!--控制区-->
        <!--角色列表展示-->
        <div class="container">
            <el-table :data="roles" highlight-current-row  @selection-change="selectedRow" ref="roles">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="name" label="角色名" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="remark" label="描述" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="createdTime" label="注册时间"
                                 :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="updatedTime" label="更新时间"
                                 :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="state" label="状态" :formatter="showStateValue"
                ></el-table-column>
            </el-table>
        </div>
        <!--分页-->
        <div id="page" class="page">
            <el-pagination layout="total,sizes,prev,pager,next,jumper" :background="true" :pager-count="7"
                           :page-sizes="[10,20,30,50,100]"  :total="page.total"
                           @size-change="sizeChange"
                           @current-change="currentChange">
            </el-pagination>
        </div>
    </div>
</template>
<script>

    import roleApi from "../../../../constant/api/role";
    import {dateFormat} from "@/utils/util";

    export default {
        props: {value: Array},

        data() {
            return {
                //页面相关参数
                page: {
                    //选中行
                    selected: "",
                },
                //角色列表
                roles: [],
                userRoles: [],
                formData: {
                    current: 1,
                    size: 20

                },
            };
        },
        created() {
            this.initPage();
        },
        updated() {
            this.toggleSelection();
        },
        methods: {
            //初始化页面
            initPage() {
                var vm = this;
                axios.get(roleApi.LIST,{params:this.formData}
                ).then(function (data) {
                    vm.roles = data.records;
                    vm.userRoles = vm.value;
                })

            },
            toggleSelection() {
                let vm = this;
                if (vm.roles) {
                    vm.roles.forEach((role, index) => {
                        if (vm.userRoles) {
                            vm.userRoles.forEach(userRole => {
                                if (userRole.id === role.id) {
                                    vm.$refs.roles.toggleRowSelection(role);
                                }
                            })
                        }
                    })
                }
            },

            //选中行
            selectedRow(currentRow) {
console.log(currentRow);
this.$emit("input",currentRow)
                },
            //格式化日期
            formatDate(row, col) {
                if (row.createdTime)
                    return dateFormat(new Date(row.createdTime), "yyyy-MM-dd hh:mm:ss")
            }, //状态格式化
            showStateValue(row) {
                let cellVal = '';
                if (row.state === 0) {
                    cellVal = "停用";
                }
                if (row.state === 1) {
                    cellVal = "正常";
                }
                return cellVal;
            },
            //调整分页大小
            sizeChange(val) {
                let vm = this;
                vm.formData.size = val;
                vm.initPage();
            },
            //调整当前页
            currentChange(val) {
                let vm = this;
                vm.formData.current = val;
                vm.initPage();
            },
        }
    };
</script>
<style>

</style>



