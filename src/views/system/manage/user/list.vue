<template>
    <div class="main">
        <div id="action">
            <el-form :model="formData" size="medium">
                <el-form-item label="具体查询">
                    <el-input type="seach" v-model="formData.search" placeholder="请输入" style="width:400px">
                        <el-select slot="prepend" v-model="formData.searchType" placeholder="请选择" style="width:100px">
                            <el-option v-for="item in page.searchType" :key="item.value" :label="item.text"
                                       :value="item.value"></el-option>
                        </el-select>
                        <el-button icon="el-icon-search" slot="append" @click="search(1)"></el-button>
                    </el-input>
                </el-form-item>
            </el-form>
            <el-button type="primary" @click="showUpdateForm" size="small">修改用户</el-button>
            <el-button type="primary" @click="showUserRoleTrans" size="small">调整角色</el-button>
            <el-button type="primary" @click="updateState" size="small">禁用用户</el-button>
        </div>

        <div class="container">
            <el-table :data="users" stripe border highlight-current-row @current-change="selectedRow">
                <el-table-column type="expand">
                    <template slot-scope="props">
                        <el-form class="table-expand" label-position="left" inline>
                            <el-form-item label="ID">
                                <span>{{props.row.id}}</span>
                            </el-form-item>
                            <el-form-item label="用户名">
                                <span>{{props.row.username}}</span>
                            </el-form-item>
                            <el-form-item label="角色">
                                <ol>
                                    <li v-for="(role,index) in props.row.roles">{{role.name}}</li>
                                </ol>
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="roles" :formatter="getRoleName" label="角色"></el-table-column>
                <el-table-column prop="createdTime" label="注册时间"></el-table-column>
                <el-table-column prop="state" :formatter="showStateValue" label="状态"></el-table-column>

            </el-table>
        </div>
        <div class="page">
            <el-pagination layout="total,sizes,prev,pager,next,jumper" :background="true" :pager-count="7"
                           :page-sizes="[10,20,30,50,100]" :page-size="20" :total="50">
            </el-pagination>
        </div>
        <!--弹窗区-->
        <el-dialog :visible.sync="page.userUpdateFormData.showDialog" close-on-click-modal title="修改用户信息"
                   @closed="closeDialog(page.userUpdateFormData)"
                   open="open">
            <user-update-form :user="page.selected" ref="updateFormDialog"
                              @close-dialog="closeDialog(page.userUpdateFormData)"
                              v-if=" page.userUpdateFormData.hackReset"
            ></user-update-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="page.userUpdateFormData.showDialog = false">取 消</el-button>
                <el-button type="primary"
                           @click=" $refs.updateFormDialog.Submit();">确 定
                </el-button>
            </div>
        </el-dialog>
        <el-dialog :visible.sync="page.userRolesUpdateFormData.showDialog" close-on-click-modal title="修改用户信息"
                   @closed="closeDialog(page.userRolesUpdateFormData)"
                   open="open">
            <role-list
                    @close-dialog="closeDialog(page.userUpdateFormData)"
                    v-model="page.selected.roles" ref="updateFormDialog"></role-list>
            <div slot="footer" class="dialog-footer">
                <el-button @click="page.userRolesUpdateFormData.showDialog = false">取 消</el-button>
                <el-button type="primary"
                           @click=" $refs.updateFormDialog.Submit();">确 定
                </el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
    import userApi from "../../../../constant/api/user"
    import UserUpdateForm from "../../../../components/system/manage/user/UserUpdateForm"
    import RoleList from "../../../../components/system/manage/role/RoleList"

    export default {
        components: {UserUpdateForm, RoleList},
        data() {
            return {
                page: {
                    selected: "",//选中行
                    //修改用户
                    userUpdateFormData: {
                        showDialog: false,
                        hackReset: true
                    },//修改用户
                    userRolesUpdateFormData: {
                        showDialog: false,
                        hackReset: true
                    },
                    searchType: [
                        {
                            value: 1,
                            text: "ID"
                        },
                        {
                            value: 2,
                            text: "用户名"
                        },
                        {
                            value: 3,
                            text: "手机号"
                        },
                        {
                            value: 4,
                            text: "邮箱"
                        }
                    ]
                },
                formData: {
                    searchType: "",
                    search: "",
                    searchTime: []
                },
                users: []
            };
        },
        created() {

        },
        mounted() {
            this.initPage()
        },
        methods: {
            initPage() {
                let vm = this;
                axios.get(userApi.LIST).then(function (data) {
                    console.log(data)
                    vm.users = data;
                })
            },
            //直接查询
            search(type) {
                if (type == 1) {

                } else if (type == 2) {
                    this.$message(JSON.stringify(this.formData.searchTime));
                }
            },
            //显示权限选择框
            showUserRoleTrans() {
                if (!this.page.selected) {
                    this.$message.error("请选择一个用户")
                    return;
                }
                this.page.userRolesUpdateFormData.showDialog = true;

            },

            //显示更新页面
            showUpdateForm() {
                if (!this.page.selected) {
                    this.$message.error("请选择一个用户")
                    return;
                }
                this.page.userUpdateFormData.showDialog = true;

            },
            updateState() {
                let vm = this;
                if (!this.page.selected) {
                    this.$message.error("请选择一个用户")
                    return;
                }
                let user = this.page.selected;
                if (user.state === 0) {
                    user.state = 1
                } else if (user.state === 1) {
                    user.state = 0;
                }
                axios.post(userApi.UPDATE_STATE, {userId: user.id, state: user.state}).then(function (data) {
                    vm.page.selected = user;
                })
            },
            //角色信息处理
            getRoleName(row) {
                let cellVal = '';
                if (row.roles) {
                    row.roles.forEach(role => {
                        cellVal = cellVal + role.name + ',';
                    })
                }
                if (cellVal.length > 0) {
                    return cellVal.substr(0, cellVal.length - 1);
                }
                return cellVal;
            },
            //状态格式化
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

            //销毁对话框内组件，隐藏对话框
            closeDialog(obj) {
                obj.hackReset = false;
                obj.showDialog = false;
                this.$nextTick(() => {
                    obj.hackReset = true
                })
            },
            //选中行
            selectedRow(currentRow) {
                let vm = this;
                vm.page.selected = currentRow;
            }
        }
    };
</script>
<style>
    .table-expand {
        font-size: 0;
    }

    .table-expand label {
        width: 90px;
        color: #99a9bf;
    }

    .table-expand .el-form-item {
        margin: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>

