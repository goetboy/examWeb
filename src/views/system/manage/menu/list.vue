<template>
    <div class="main">
        <!--控制区-->
        <div id="action">
            <el-button type="primary" @click="showMenuAddForm" size="small">添加菜单</el-button>
            <el-button type="primary" @click="showMenuUpdateForm" size="small">修改信息</el-button>
            <el-button type="primary" @click="updateMenuState" size="small" v-if="page.selected">
                <span v-if="page.selected.state">禁用</span>
                <span v-else>启用</span>
            </el-button>
        </div>
        <!--菜单列表展示-->
        <div class="container">
            <el-table :data="menus" highlight-current-row @current-change="selectedRow">
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="name" label="标题" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="remark" label="描述" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="url" label="url" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="parentId" label="父菜单" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="createdTime" label="创建时间"
                                 :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="updatedTime" label="更新时间"
                                 :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="state" label="状态" :formatter="showStateValue"
                ></el-table-column>
            </el-table>
        </div>
        <div id="page">
            <!-- :pager-count="7" -->
            <el-pagination
                    layout="total,sizes,prev,pager,next,jumper"
                    :background="true"
                    :page-sizes="[10,20,30,50,100]"
                    :page-size="20"
                    :total="pages.total"
                    @size-change="sizeChange"
                    @current-change="currentChange"
            ></el-pagination>
        </div>
        <!--菜单新增-->
        <el-dialog :visible.sync="page.menuAddFormData.showDialog"
                   v-if="page.menuAddFormData.showDialog" close-on-click-modal open="open"
                   @closed="page.menuAddFormData.showDialog=false">
            <menu-add-form @close-dialog="page.menuAddFormData.showDialog=false" ref="addFormDialog"></menu-add-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="page.menuAddFormData.showDialog = false">取 消</el-button>
                <el-button type="primary"
                           @click=" $refs.addFormDialog.Submit();">确 定
                </el-button>
            </div>
        </el-dialog>
        <!--菜单修改-->
        <el-dialog :visible.sync="page.menuUpdateFormData.showDialog" close-on-click-modal open="open"
                   v-if="page.menuUpdateFormData.showDialog"
                   @closed="page.menuUpdateFormData.showDialog=false">
            <menu-update-form :menu="page.selected" ref="updateFormDialog"
                              @close-dialog="page.menuUpdateFormData.showDialog=false"></menu-update-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="page.menuUpdateFormData.showDialog = false">取 消</el-button>
                <el-button type="primary"
                           @click=" $refs.updateFormDialog.Submit();">确 定
                </el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
    import MenuUpdateForm from "../../../../components/system/manage/menu/MenuUpdateForm";
    import MenuAddForm from "../../../../components/system/manage/menu/MenuAddForm";
    import menuApi from "../../../../constant/api/menu";
    import {dateFormat} from "@/utils/util";

    export default {
        components: {
            MenuAddForm, MenuUpdateForm
        },
        data() {
            return {
                //页面相关参数
                page: {
                    //选中行
                    selected: "",

                    //菜单添加相关参数
                    menuAddFormData: {
                        showDialog: false,
                        hackReset: true,
                    },
                    //菜单更新相关参数
                    menuUpdateFormData: {
                        showDialog: false,
                        hackReset: true,
                    }
                },

                formData: {
                    searchType: "",
                    search: "",
                    searchTime: [],
                    currentPage: 1,
                    pageSize: 20,
                },
                //菜单列表
                menus: [],
                pages: {}//分页信息
            };
        },
        created() {
            this.initPage();
        },

        methods: {
            //初始化页面
            initPage() {
                var vm = this;
                axios.get(menuApi.LIST,{
                        params: {
                            current: vm.formData.currentPage,
                            size: vm.formData.pageSize
                        }
                    }
                ).then(function (data) {
                    console.log(data);
                    vm.menus = data.records;
                    vm.pages=data;
                })
            },
            //显示添加页面
            showMenuAddForm() {
                this.page.menuAddFormData.showDialog = true;
            },
            //显示更新页面
            showMenuUpdateForm() {
                if (!this.page.selected) {
                    this.$message.error("请选择一个菜单");
                    return;
                }
                this.page.menuUpdateFormData.showDialog = true;

            },
            updateMenuState() {
                let vm = this;
                if (!this.page.selected) {
                    this.$message.error("请选择一个菜单");
                    return;
                }
                let menu = this.page.selected;
                if (menu.state === 0) {
                    menu.state = 1
                } else if (menu.state === 1) {
                    menu.state = 0;
                }
                axios.post(menuApi.UPDATE_STATE, {menuId: menu.id, state: menu.state}).then(function (data) {
                    vm.page.selected = menu;
                })
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
            },sizeChange(val) {
                let vm = this;
                vm.formData.pageSize = val;
                vm.initPage();
            },
            currentChange(val) {
                let vm = this;
                vm.formData.currentPage = val;
                vm.initPage();
            },
        }
    };
</script>
<style>
    /*#main {
        height: 100%;
    }

    #action {
        height: 50px;
        line-height: 100%;
    }

    #container {
    }

    #page {
        height: 20px;
    }*/
</style>



