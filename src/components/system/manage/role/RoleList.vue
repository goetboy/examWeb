<template>
    <div class="main">
        <!--控制区-->
        <!--角色列表展示-->
        <div class="container">
            <el-table :data="roles" highlight-current-row @current-change="selectedRow" ref="roles">
                <el-table-column type="selection" width="55"></el-table-column>
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
                           :page-size="20" :total="50">
            </el-pagination>
        </div>
    </div>
</template>
<script>

    import roleApi from "../../../../constant/api/role";
    import {dateFormat} from "@/utils/util";

    export default {
        props: {value: Array},

        data() {
            return {
                //页面相关参数
                page: {
                    //选中行
                    selected: "",
                },
                //角色列表
                roles: [],
                userRoles: [],
            };
        },
        created() {
            this.initPage();
        },
        watch: {
            value: function (val, old) {
                if (!this.value) {
                    return
                }
                this.userRoles = val;
                this.selected();
            }
        },
        methods: {
            //初始化页面
            initPage() {
                var vm = this;
                axios.get(roleApi.LIST,
                ).then(function (data) {
                    vm.roles = data;
                })
                vm.userRoles = vm.value;
                vm.selected();
                console.log(vm.value)
            },
            selected(){
               // console.log(this.$refs.roles);
            },
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

        }
    };
</script>
<style>

</style>



