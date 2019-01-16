<template>

    <div class="menu-add">
        <el-form ref="menu" :model="menu" label-width="120px" :rules="menuFormRules" :label-position="'right'">
            <el-form-item label="菜单名称:" prop="name">
                <el-input type="text" v-model="menu.name" class="input" placeholder="请输入菜单名"/>
            </el-form-item>
            <el-form-item label="菜单路径:" prop="url">
                <el-input type="text" v-model="menu.url" class="input" placeholder="请输入菜单路径"/>
            </el-form-item>
            <el-form-item label="描述:">
                <el-input type="textarea" v-model="menu.remark" prop="remark" class="input" placeholder="描述信息"
                />
            </el-form-item>
        </el-form>


    </div>
</template>
<script>
    import menuApi from "../../../../constant/api/menu"
    import ElFormItem from "../../../../../node_modules/element-ui/packages/form/src/form-item.vue";

    export default {

        components: {ElFormItem},
        data() {
            return {
                //菜单
                menu: {
                    //名称
                    name: '',
                    //路径
                    url: '',
                    // 备注
                    remark: '',
                    //排序
                    sort: '',

                },
                //角色属性校验
                menuFormRules: {
                    name: [
                        {required: true, message: "请输入菜单名称", trigger: "blur"}
                    ],
                    url: [
                        {required: true, message: "菜单路径不能为空", trigger: "blur"}
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
                this.$refs.menu.validate(valid => {
                    if (valid) {
                        axios.post(menuApi.SAVE, {menu: this.menu}).then(response => {
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
    .menu-add {
        border-bottom-width: 1px;
        /* border-style:dotted solid double dashed;*/
        border-color: rgba(56, 130, 123, 0.91);
    }

    .input {
        width: 180px !important;
    }
</style>