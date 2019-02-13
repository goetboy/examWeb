<template>
    <div class="main">
        <!--控制区-->
        <div id="action">
            <el-button type="primary" @click="showRoleAddForm" size="small">添加角色</el-button>
            <el-button type="primary" @click="showRoleUpdateForm" size="small">修改信息</el-button>
            <el-button type="primary" @click="showRoleRoutersTrans" size="small">修改权限</el-button>
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
                <el-table-column prop="remark" label="描述" :show-overflow-tooltip="true" ></el-table-column>
                <el-table-column prop="createdTime" label="注册时间" :show-overflow-tooltip="true"
                                 ></el-table-column>
                <el-table-column prop="updatedTime" label="更新时间" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="state" label="状态" :formatter="showStateValue"
                ></el-table-column>
            </el-table>
        </div>
        <div id="page">
            <!-- :pager-count="7" -->
            <el-pagination
                    layout="total,sizes,prev,pager,next,jumper"
                    :background="true"
                    :page-sizes="[10,20,30,50,100]"
                    :page-size="20"
                    :total="pages.total"
                    @size-change="sizeChange"
                    @current-change="currentChange"
            ></el-pagination>
        </div>
        <!--角色权限修改-->
        <el-dialog :visible.sync="page.roleRoutersFormData.showDialog"
                   v-if="page.roleRoutersFormData.showDialog" close-on-click-modal open="open"
                   @closed="page.roleRoutersFormData.showDialog=false">
            <role-router-trans :role="page.selected" ref="roleRotuersFormDialog"
                                @close-dialog="page.roleRoutersFormData.showDialog=false"
            ></role-router-trans>
            <div slot="footer" class="dialog-footer">
                <el-button @click="page.roleRoutersFormData.showDialog = false">取 消</el-button>
                <el-button type="primary"
                           @click=" $refs.roleRotuersFormDialog.Submit();">确 定
                </el-button>
            </div>
        </el-dialog>
        <!--角色新增-->
        <el-dialog :visible.sync="page.roleAddFormData.showDialog"
                   v-if="page.roleAddFormData.showDialog"
                   close-on-click-modal open="open"
                   @closed="page.roleAddFormData.showDialog=false">
            <role-add-form @close-dialog="page.roleAddFormData.showDialog=false" ref="addFormDialog"></role-add-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="page.roleAddFormData.showDialog = false">取 消</el-button>
                <el-button type="primary"
                           @click=" $refs.addFormDialog.Submit();">确 定
                </el-button>
            </div>
        </el-dialog>
        <!--角色修改-->
        <el-dialog :visible.sync="page.roleUpdateFormData.showDialog"
                   v-if="page.roleUpdateFormData.showDialog"
                   close-on-click-modal open="open"

                   @closed="page.roleUpdateFormData.showDialog=false">
            <role-update-form :role="page.selected" ref="updateFormDialog"
                              @close-dialog="page.roleUpdateFormData.showDialog=false"></role-update-form>

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
    import RoleUpdateForm from "../../../../components/system/manage/role/RoleUpdateForm.vue";
    import RoleRouterTrans from "../../../../components/system/manage/role/RoleRouterTrans.vue";
    import RoleAddForm from "../../../../components/system/manage/role/RoleAddForm.vue";
    import roleApi from "../../../../constant/api/role";
    import {dateFormat} from "@/utils/util";

    export default {
        components: {
            RoleRouterTrans,
            RoleAddForm, RoleUpdateForm,
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

                formData: {
                    searchType: "",
                    search: "",
                    searchTime: [],
                    currentPage: 1,
                    pageSize: 20,
                },
                //角色列表
                roles: [],
                pages: {}//分页信息
            };
        },
        created() {
            this.initPage();
        },

        methods: {
            //初始化页面
            initPage() {
                var vm = this;
                axios.get(roleApi.LIST, {
                        params: {
                            current: vm.formData.currentPage,
                            size: vm.formData.pageSize
                        }
                    }
                ).then(function (data) {
                    console.log(data);
                    vm.roles = data.records;
                    vm.pages=data;
                })
            },
            //显示权限选择框
            showRoleRoutersTrans() {
                if (!this.page.selected) {
                    this.$message.error("请选择一个角色");
                    return;
                }
                this.page.roleRoutersFormData.showDialog = true;

            },
            //显示添加页面
            showRoleAddForm() {
                this.page.roleAddFormData.showDialog = true;
            },
            //显示更新页面
            showRoleUpdateForm() {
                if (!this.page.selected) {
                    this.$message.error("请选择一个角色");
                    return;
                }
                this.page.roleUpdateFormData.showDialog = true;

            },
            updateRoleState() {
                let vm = this;
                if (!this.page.selected) {
                    this.$message.error("请选择一个角色");
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
            },sizeChange(val) {
                let vm = this;
                vm.formData.pageSize = val;
                vm.initPage();
            },
            currentChange(val) {
                let vm = this;
                vm.formData.currentPage = val;
                vm.initPage();
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



