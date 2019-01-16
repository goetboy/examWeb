<template>

    <div>
        <el-form ref="menu" :model="menuForm" label-width="120px" :rules="menuFormRules" :label-position="'right'">
            <el-form-item label="菜单名称:" prop="name">
                <el-input type="text" v-model="menuForm.name" placeholder="请输入角色名" style="width: 160px"/>
            </el-form-item>
            <el-form-item label="菜单路径:" prop="name">
                <el-input type="text" v-model="menuForm.url" placeholder="请输入菜单路径" style="width: 160px"/>
            </el-form-item>
            <el-form-item label="描述:" >
                <el-input type="text" v-model="menuForm.remark" prop="remark" placeholder="描述信息"
                          style="width: 200px"/>
            </el-form-item>

        </el-form>

    </div>
</template>
<script>
    import menuApi from "../../../../constant/api/menu"

    export default {

        props: {
            menu: Object
        },

        data() {
            return {
                //menu对象
                menuForm: {
                    id: this.menu.id,
                    name: this.menu.name,
                    url: this.menu.url,
                    sort: this.menu.sort,
                    remark: this.menu.remark
                },
                //输入检测
                menuFormRules: {
                    name: [
                        {required: true, message: "请输入角色名", trigger: "blur"}
                    ], url: [
                        {required: true, message: "菜单路径不能为空", trigger: "blur"}
                    ],
                    remark: [
                        {max: 200, message: "描述不能太长", trigger: "blur"}
                    ]
                }
            }
        },
        watch: {
            //监听menu变化
            menu: function (val) {
                this.menuForm = val;

            }
        },
        methods: {
            //提交数据
            Submit: function () {
                let self = this;
                this.$refs.menu.validate(valid => {
                    if (valid) {
                        axios.post(menuApi.UPDATE, {menu: self.menuForm}).then(response => {
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