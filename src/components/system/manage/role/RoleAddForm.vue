<template>

    <div class="role-add">
        <el-form ref="role" :model="role" label-width="80px" :rules="roleFormRules" :label-position="'right'">
            <el-form-item label="角色名:" prop="name">
                <el-input type="text" v-model="role.name" class="input" placeholder="请输入角色名"/>
            </el-form-item>
            <el-form-item label="描述:">
                <el-input type="textarea" v-model="role.remark" prop="remark" class="input" placeholder="描述信息"
                />
            </el-form-item>
        </el-form>




    </div>
</template>
<script>
    import roleApi from "../../../../constant/api/role"
    import { Base64 } from 'js-base64';
    import ElFormItem from "../../../../../node_modules/element-ui/packages/form/src/form-item.vue";

    export default {

        components: {ElFormItem},
        data() {
            return {
                //角色
                role: {
                    name: '',
                    remark: ''
                },
                //角色属性校验
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
        methods: {
            //角色添加提交
            Submit: function () {
                let self = this;
                this.$refs.role.validate(valid => {
                    if (valid) {
                        axios.post(roleApi.SAVE,{role:this.role}).then(response => {
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
<style>
    .role-add{
        border-bottom-width:1px;
       /* border-style:dotted solid double dashed;*/
        border-color: rgba(56, 130, 123, 0.91);
    }
    .input {
        width: 180px!important;
    }
</style>