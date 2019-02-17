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
            <el-button type="primary" v-if="page.selected" @click="updateState" size="small"><span
                    v-if="page.selected.state===1">禁用</span><span v-else-if="page.selected.state===0">启用</span>
            </el-button>
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

        <!--弹窗区-->
        <div id="dialog">
            <el-dialog
                    :visible.sync="page.userUpdateFormData.showDialog" close-on-click-modal title="修改用户信息":center="true"
                    v-if="page.userUpdateFormData.showDialog"
                    open="open">
                <user-update-form :user="page.selected" ref="updateFormDialog"
                                  @close-dialog="page.userUpdateFormData.showDialog=false"
                                  v-if=" page.userUpdateFormData.hackReset"
                ></user-update-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="page.userUpdateFormData.showDialog = false">取 消</el-button>
                    <el-button type="primary"
                               @click=" $refs.updateFormDialog.Submit();">确 定
                    </el-button>
                </div>
            </el-dialog>
            <el-dialog  :visible.sync="page.userRolesUpdateFormData.showDialog" close-on-click-modal title="修改用户角色" :center="true"
                        v-if="page.userRolesUpdateFormData.showDialog"
                        open="open">
                <user-roles-update-form
                        @close-dialog="page.userRolesUpdateFormData.showDialog=false"
                        :user="page.selected" ref="userRolesUpdateFormDialog"></user-roles-update-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="page.userRolesUpdateFormData.showDialog = false">取 消</el-button>
                    <el-button type="primary"
                               @click=" $refs.userRolesUpdateFormDialog.Submit();">确 定
                    </el-button>
                </div>
            </el-dialog>
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
    import userApi from "../../../../constant/api/user"
    import UserUpdateForm from "../../../../components/system/manage/user/UserUpdateForm"
    import UserRolesUpdateForm from "../../../../components/system/manage/user/UserRolesUpdateForm"

    export default {
        components: {UserUpdateForm, UserRolesUpdateForm},
        data() {
            return {
                page: {
                    selected: "",//选中行
                    total: 0,
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
                            text: "用户名"
                        },
                        {
                            value: 2,
                            text: "昵称"
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

                    current: 1,
                    size: 20


                },
                users: [],
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
                axios.get(userApi.LIST, {params: this.formData}).then(function (data) {
                    console.log(data);
                    vm.users = data.records;
                    vm.page.total = data.total;
                })
            },

            //显示权限选择框
            showUserRoleTrans() {
                if (!this.page.selected) {
                    this.$message.error("请选择一个用户");
                    return;
                }
                this.page.userRolesUpdateFormData.showDialog = true;

            },

            //显示更新页面
            showUpdateForm() {
                if (!this.page.selected) {
                    this.$message.error("请选择一个用户");
                    return;
                }
                this.page.userUpdateFormData.showDialog = true;

            },
            updateState() {
                let vm = this;
                if (!this.page.selected) {
                    this.$message.error("请选择一个用户");
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

