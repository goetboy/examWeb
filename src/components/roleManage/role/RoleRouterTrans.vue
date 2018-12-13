<template>
    <div>
        <el-transfer v-model="roleRouters" :data="routers" :props="{
      key: 'id',
      label: 'serviceName'
    }"></el-transfer>
        <el-button type="pirmary" @click="submit">确认</el-button>
    </div>
</template>
<script>
    import router_url from "../../../constant/api/router"

    export default {
        data() {
            return {
                roleRouters: [],
                routers: []
            }
        },
        props: {
            role: {
                type: Object,
                default: {}
            },
        },



        mounted() {
            this.init();
        },
        methods: {
            init() {
                let vm = this
                if (vm.role) {
                    axios.get(router_url.userManagerPermissionGetAllRouters).then(function (data) {
                        vm.routers = data

                    })
                    let param = "roleId:" + Base64.encode(vm.role.id);
                    axios.get(router_url.userManagerPermissionGetRoutersByRoleId + "&parameters=" + param).then(function (data) {
                        if (data) {
                            data.forEach(function (router) {
                                vm.roleRouters.push(router.id);
                            })
                        }

                    })

                }

            },
            //提交数据
            submit() {
                this.$message.info("暂未实现")
            /*    let self = this;
                let param = "id:" + Base64.encode(self.roleForm.id) + ";name:" + Base64.encode(self.roleForm.name) + ";description:" + Base64.encode(self.roleForm.description);
                axios.post(roleApi.userManagerPermissionManagerUpdateRole + "&parameters=" + param).then(response => {
                    self.$emit('close-dialog');
                }).catch(function () {
                    self.$emit('close-dialog');
                })*/

            }
        }
    }
</script>
<style>

</style>