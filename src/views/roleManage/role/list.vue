<template>
    <div class="main">
        <!--控制区-->
        <div id="action">
            <el-button type="primary" @click="showRoleAddForm" size="small">添加角色</el-button>
            <el-button type="primary" @click="showRoleUpdateForm" size="small">修改信息</el-button>
            <el-button type="primary" @click="showRoleRoutersTrans" size="small">修改权限</el-button>
        </div>
        <!--角色列表展示-->
        <div class="container">
            <el-table :data="roles" highlight-current-row @current-change="selectedRow">
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="name" label="角色名" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="description" label="描述" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="createTime" label="注册时间" :formatter="formatDate"
                                 :show-overflow-tooltip="true"></el-table-column>
                <el-table-column label="操作" fixed="right">
                    <template slot-scope="scope">
                        <el-button @click="showRoleUpdateForm(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="showRoleRoutersTrans(scope.row)" type="text" size="small">修改权限</el-button>

                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="page">
            <el-pagination layout="total,sizes,prev,pager,next,jumper" background :page-sizes="[10,20,30,50,100]"
                           :page-size="20" :total="50">
            </el-pagination>
        </div>
        <!--角色权限修改-->
        <el-dialog :visible.sync="page.roleRoutersData.showDialog" close-on-click-modal open="open">
            <role-rotuers-trans :role="page.selected"
                                @close-dialog="page.roleRoutersData.showDialog=false"
            ></role-rotuers-trans>
        </el-dialog>
        <!--角色新增-->
        <el-dialog :visible.sync="page.roleAddFormData.showDialog" close-on-click-modal open="open">
            <role-add-form @close-dialog="page.roleAddFormData.showDialog=false"></role-add-form>
        </el-dialog>
        <!--角色修改-->
        <el-dialog :visible.sync="page.roleUpdateFormData.showDialog" close-on-click-modal open="open">
            <role-update-form :role="page.selected"
                              @close-dialog="page.roleUpdateFormData.showDialog=false"></role-update-form>
        </el-dialog>

    </div>
</template>
<script>
    import RoleRotuersTrans from "@/components/roleManage/role/RoleRouterTrans.vue";
    import RoleUpdateForm from "@/components/roleManage/role/RoleUpdateForm.vue";
    import RoleAddForm from "@/components/roleManage/role/RoleAddForm.vue";
    import roleApi from "@/constant/api/role";
    import {dateFormat} from "@/utils/util";

    export default {
        components: {
            RoleRotuersTrans, RoleAddForm, RoleUpdateForm
        },
        data() {
            return {
                //页面相关参数
                page: {
                    //选中行
                    selected: "",
                    //角色权限相关参数
                    roleRoutersData: {
                        showDialog: false,
                    },
                    //角色添加相关参数
                    roleAddFormData: {
                        showDialog: false,

                    },
                    //角色更新相关参数
                    roleUpdateFormData: {
                        showDialog: false,

                    }
                },
                //角色列表
                roles: []
            };
        },
        created() {
            this.initPage();
        },

        methods: {
            //初始化页面
            initPage() {
                var vm = this;
                axios.get(roleApi.userManagerPermissionGetAllRoles,
                ).then(function (data) {
                    vm.roles = data;
                })
            },
            //显示权限选择框
            showRoleRoutersTrans() {
                if (!this.page.selected) {
                    this.$message.error("请选择一个角色")
                    return;
                }
                this.page.roleRoutersData.showDialog = true;

            },
            //显示添加页面
            showRoleAddForm() {
                this.page.roleAddFormData.showDialog = true;
            },
            //显示更新页面
            showRoleUpdateForm() {
                if (!this.page.selected) {
                    this.$message.error("请选择一个角色")
                    return;
                }
                this.page.roleUpdateFormData.showDialog = true;

            },
            //选中行
            selectedRow(currentRow) {
                let vm = this;
                vm.page.selected = currentRow;
            },
            //格式化日期
            formatDate(row, col) {
                return dateFormat(new Date(row.createTime), "yyyy-MM-dd hh:mm:ss")
            }
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



