<template>

    <div>
        <el-form ref="user" :model="userForm" label-width="80px" :rules="userFormRules" :label-position="'right'">
            <el-form-item label="用户名:">
                {{userForm.name}}
            </el-form-item>
            <el-form-item label="昵称:" prop="nickName">
                <el-input type="text" v-model="userForm.nickName" placeholder="昵称"
                          style="width: 200px"/>
            </el-form-item>
            <el-form-item label="邮箱:" prop="email">
                <el-input type="text" v-model="userForm.email" placeholder="邮箱"
                          style="width: 200px"/>
            </el-form-item>
            <el-form-item label="地址:">
                <el-input type="text" v-model="userForm.address " prop="address" placeholder="地址"
                          style="width: 200px"/>
            </el-form-item>
            <el-form-item label="备注:">
                <el-input type="textarea" v-model="userForm.remark " prop="remark" placeholder="备注"
                          style="width: 200px"/>
            </el-form-item>
            <el-form-item label="状态:">
                <template>
                    <el-radio v-model="userForm.state"  :label="1">正常</el-radio>
                    <el-radio v-model="userForm.state" :label="0">禁用</el-radio>
                </template>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import userApi from "../../../../constant/api/user"

    export default {

        props: {
            user: Object
        },

        data() {
            return {
                //role对象
                userForm: {
                    address: this.user.address,
                    email: this.user.email,
                    name: this.user.name,
                    nickName: this.user.nickName,
                    password: this.user.password,
                    phone: this.user.phone,
                    id: this.user.id,
                    remark: this.user.remark,
                    state: this.user.state,
                },
                //输入检测
                userFormRules: {
                    name: [
                        {required: true, message: "请输入角色名", trigger: "blur"}
                    ],
                    email: [],
                    phone: [{max: 11, message: "最大长度11位", trigger: "blur"},
                    ],
                    remark: [
                        {max: 200, message: "描述不能太长", trigger: "blur"}
                    ]
                }
            }
        },
        watch: {
            //监听role变化
            role: function (val) {
                this.userForm = val;
            }
        },
        methods: {
            //提交数据
            Submit: function () {
                let self = this;
                this.$refs.user.validate(valid => {
                    if (valid) {
                    //    let param = "";
                        axios.post(userApi.UPDATE, {user:this.userForm}).then(response => {
                            this.$message({
                                type: "info",
                                message: "修改成功",
                                showClose: true
                            })
                            self.$emit('close-dialog');
                        }).catch(function () {
                           // self.$emit('close-dialog');
                        })
                    } else {
                        self.$message({
                            showClose: true,
                            message: "输入信息不完整",
                            type: "warning"
                        });
                        return false;
                    }
                });
            },
        }
    }

</script>