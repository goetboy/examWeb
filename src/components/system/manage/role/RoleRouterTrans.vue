<template>
    <div>
        <el-transfer v-model="roleRouters" :data="menus" :props="{
      key: 'id',
      label: 'serviceName'
    }"></el-transfer>
    </div>
</template>
<script>
    import menuApi from "../../../../constant/api/menu"

    export default {
        data() {
            return {
                roleRouters: [],
                menus: []
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
                    axios.get(menuApi.LIST).then(function (data) {
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
            Submit() {
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