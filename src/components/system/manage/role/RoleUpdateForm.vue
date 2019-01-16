<template>

    <div>
        <el-form ref="role" :model="roleForm" label-width="80px" :rules="roleFormRules" :label-position="'right'">
            <el-form-item label="角色名:" prop="name">
                <el-input type="text" v-model="roleForm.name" placeholder="请输入角色名" style="width: 160px"/>
            </el-form-item>
            <el-form-item label="描述:">
                <el-input type="text" v-model="roleForm.remark" prop="remark" placeholder="描述信息"
                          style="width: 200px"/>
            </el-form-item>

        </el-form>

    </div>
</template>
<script>
    import roleApi from "../../../../constant/api/role"

    export default {

        props: {
            role: Object
        },

        data() {
            return {
                //role对象
                roleForm: {
                    id: this.role.id,
                    name: this.role.name,
                    remark: this.role.remark
                },
                //输入检测
                roleFormRules: {
                    name: [
                        {required: true, message: "请输入角色名", trigger: "blur"}
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
                this.roleForm = val;

            }
        },
        methods: {
            //提交数据
            Submit: function () {
                let self = this;
                this.$refs.role.validate(valid => {
                    if (valid) {
                        axios.post(roleApi.UPDATE, {role: self.roleForm}).then(response => {
                            self.$emit('close-dialog');
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