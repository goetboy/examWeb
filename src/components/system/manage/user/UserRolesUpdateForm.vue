<template>

    <div>
        <role-list v-model="userForm.roles"></role-list>
    </div>
</template>
<script>
    import userApi from "../../../../constant/api/user"
    import RoleList from "../../../../components/system/manage/role/RoleList"

    export default {
        components:{RoleList},
        props: {
            user: Object
        },
        data() {
            return {
                //role对象
                userForm: {
                    userId: this.user.id,
                    roles:this.user.roles,
                },

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
                console.log(this.userForm)
               axios.post(userApi.UPDATE_ROLE, {userId:this.userForm.userId,roles:this.userForm.roles}).then(response => {
                    this.$message({
                        type: "info",
                        message: "修改成功",
                        showClose: true
                    })
                    self.$emit('close-dialog');
                })
            },
        }
    }

</script>