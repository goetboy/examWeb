<template>
    <div class="main">
        <!--控制区-->
        <div id="action">
            <el-button type="primary" @click="showRoleAddForm" size="small">添加角色</el-button>
            <el-button type="primary" @click="showRoleUpdateForm" size="small">修改信息</el-button>
            <el-button type="primary" @click="showRoleRoutersTrans" size="small">修改权限</el-button>
            <el-button type="primary" @click="deleteRole" size="small">删除角色</el-button>
            <el-button type="primary" @click="updateRoleState" size="small" v-if="page.selected">
                <span v-if="page.selected.state">禁用</span>
                <span v-else>启用</span>
            </el-button>
        </div>
        <!--角色列表展示-->
        <div class="container">
            <el-table :data="roles" highlight-current-row @current-change="selectedRow">
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
        <div class="page">
            <el-pagination layout="total,sizes,prev,pager,next,jumper" background :page-sizes="[10,20,30,50,100]"
                           :total="page.total"
                           @size-change="sizeChange"
                           @current-change="currentChange">
            </el-pagination>
        </div>
        <!--角色权限修改-->
        <el-dialog :visible.sync="page.roleRoutersFormData.showDialog" close-on-click-modal open="open"
                   v-if="page.roleRoutersFormData.showDialog"
                   @closed="page.roleRoutersFormData.showDialog=false">
            <role-rotuers-trans :role="page.selected" ref="roleRotuersFormDialog"
                                @close-dialog="page.roleRoutersFormData.showDialog=false"
                                v-if=" page.roleRoutersFormData.hackReset"
            ></role-rotuers-trans>
            <div slot="footer" class="dialog-footer">
                <el-button @click="page.roleRoutersFormData.showDialog = false">取 消</el-button>
                <el-button type="primary"
                           @click=" $refs.roleRotuersFormDialog.Submit();">确 定
                </el-button>
            </div>
        </el-dialog>
        <!--角色新增-->
        <el-dialog :visible.sync="page.roleAddFormData.showDialog"
                   v-if="page.roleAddFormData.showDialog" close-on-click-modal open="open"

                   @closed="page.roleAddFormData.showDialog=false">
            <role-add-form @close-dialog="page.roleAddFormData.showDialog=false" ref="addFormDialog"
                           v-if=" page.roleAddFormData.hackReset"></role-add-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="page.roleAddFormData.showDialog = false">取 消</el-button>
                <el-button type="primary"
                           @click=" $refs.addFormDialog.Submit();">确 定
                </el-button>
            </div>
        </el-dialog>
        <!--角色修改-->
        <el-dialog :visible.sync="page.roleUpdateFormData.showDialog"
                   v-if="page.roleUpdateFormData.showDialog" close-on-click-modal open="open"

                   @closed="page.roleUpdateFormData.showDialog=false">
            <role-update-form :role="page.selected" ref="updateFormDialog"
                              @close-dialog="page.roleUpdateFormData.showDialog=false"
                              v-if=" page.roleUpdateFormData.hackReset"></role-update-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="page.roleUpdateFormData.showDialog = false">取 消</el-button>
                <el-button type="primary"
                           @click=" $refs.updateFormDialog.Submit();">确 定
                </el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
    import RoleRotuersTrans from "../../../../components/system/manage/role/RoleRouterTrans.vue";
    import RoleUpdateForm from "../../../../components/system/manage/role/RoleUpdateForm.vue";
    import RoleAddForm from "../../../../components/system/manage/role/RoleAddForm.vue";
    import roleApi from "../../../../constant/api/role";
    import {dateFormat} from "@/utils/util";

    export default {
        components: {
            /*RoleRotuersTrans,*/
            RoleAddForm, RoleUpdateForm
        },
        data() {
            return {
                //页面相关参数
                page: {
                    //选中行
                    selected: "",
                    //角色权限相关参数
                    roleRoutersFormData: {
                        showDialog: false,
                        hackReset: true,
                    },
                    //角色添加相关参数
                    roleAddFormData: {
                        showDialog: false,
                        hackReset: true,
                    },
                    //角色更新相关参数
                    roleUpdateFormData: {
                        showDialog: false,
                        hackReset: true,
                    },
                    total: 0
                }, formData: {
                    current: 1,
                    size: 20

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
                axios.get(roleApi.LIST, {params: this.formData}
                ).then(function (data) {
                    console.log(data)
                    vm.roles = data.records;
                    vm.page.total = data.total;
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

            deleteRole() {
                let vm = this;
                if (!this.page.selected) {
                    this.$message.error("请选择一个角色")
                    return;
                }
                this.$confirm('确认删除该角色?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let role=vm.page.selected;
                    axios.post(roleApi.DELETE, {roleId: role.id}).then(function (data) {
                        vm.$message.info('删除成功!');
                        vm.initPage()
                    })

                }).catch(() => {
                    //不必操作
                })

            },
            updateRoleState() {
                let vm = this;
                if (!this.page.selected) {
                    this.$message.error("请选择一个角色")
                    return;
                }
                let role = this.page.selected;
                if (role.state === 0) {
                    role.state = 1
                } else if (role.state === 1) {
                    role.state = 0;
                }
                axios.post(roleApi.UPDATE_STATE, {roleId: role.id, state: role.state}).then(function (data) {
                    vm.page.selected = role;
                })
            },
            //选中行
            selectedRow(currentRow) {
                let vm = this;
                vm.page.selected = currentRow;
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
            //销毁对话框内组件，隐藏对话框
            closeDialog(obj) {
                obj.hackReset = false;
                obj.showDialog = false;
                this.$nextTick(() => {
                    obj.hackReset = true
                })
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



