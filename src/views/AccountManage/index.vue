<template>
    <div style="text-align: center; margin: 24px 40px 24px 40px;">
        <el-collapse v-model="activeNames" @change="collapseChange">
            <el-collapse-item :title="collapseTitle" name="1">
                <el-form :model="searchForm" label-width="auto" class="SearchForm">
                    <el-form-item prop="username" label="用户名" class="SearchFormItem">
                        <el-input v-model="searchForm.username" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item prop="email" label="邮箱" class="SearchFormItem">
                        <el-input v-model="searchForm.email" style="width: 200px"></el-input>
                    </el-form-item>
                </el-form>

                <el-button type="primary" @click="searchData">搜索</el-button>
            </el-collapse-item>
        </el-collapse>
        <div style="
					display: flex;
					align-items: center;
					justify-content: center;
                    margin-top: 24px;
				">
            <el-button @click="addUser" type="primary" style="margin-bottom: 24px; margin-right: 24px">增加用户</el-button>
        </div>

        <el-table :data="userTable" style="width: 100%" stripe border>
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column prop="type" label="用户类型">
                <template slot-scope="props">
                    <el-tag v-if="props.row.type === 2" type="success">管理员</el-tag>
                    <el-tag v-else>普通用户</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="email" label="邮箱"></el-table-column>
            <el-table-column prop="lastLoginTime" label="最近登录时间"></el-table-column>
        </el-table>

        <div style="margin: 24px">
            <el-pagination background layout="pager" :page-size="10" :page-count="pages" @current-change="clickPage">
            </el-pagination>
        </div>

        <el-dialog title="增加用户" :visible.sync="addUserDialogVisible" width="50%" :before-close="addUserCancel">
            <el-form :model="addUserForm" ref="addUserForm" label-width="auto" align="left" :rules="userRules">
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="addUserForm.username"></el-input>
                </el-form-item>

                <el-form-item prop="email" label="邮箱">
                    <el-input v-model="addUserForm.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addUserCancel">取 消</el-button>
                <el-button type="primary" @click="addUserConfirm">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { postForm, postFormMock } from "@/api/data";
export default {
    name: "AccountManage",
    data() {
        return {
            pages: 1,
            currentPage: 1,
            // 折叠
            activeNames: [],
            collapseTitle: "搜索栏（点击展开）",

            searchForm: {
                username: "",
                email: "",
            },

            userTable: [
                {
                    username: "admin",
                    type: 2,
                    lastLoginTime: "2021-01-01",
                    email: "aaaaa@pku.edu.cn",
                },
            ],
            addUserDialogVisible: false,

            addUserForm: {
                username: "",
                email: "",
            },

            userRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' }
                ],
            },


        };
    },
    mounted() {
        this.getData({});
    },
    methods: {
        collapseChange(activeNames) {
            if (activeNames.length === 0) {
                this.collapseTitle = "搜索栏（点击展开）";
            } else {
                this.collapseTitle = "搜索栏（点击收起）";
            }
        },

        searchData() {
            let postData = {
                username: this.searchForm.username,
                email: this.searchForm.email,
            };
            this.getData(postData);
        },

        // 获取数据
        getData(postData) {
            this.userTable = [];
            let _this = this;
            postForm("/users/getUsers", postData, _this, function (res) {
                _this.pages = res.data.pages;
                for (let item of res.data.records) {
                    _this.userTable.push({
                        uid: item.uid,
                        username: item.username,
                        type: item.type,
                        lastLoginTime: new Date(item.lastLoginTime).toLocaleDateString(),
                        email: item.email,
                    });
                }
            });
        },

        addUser() {
            this.addUserForm = {
                username: "",
                email: "",
            };
            this.addUserDialogVisible = true;
        },

        addUserCancel() {
            this.$confirm(
                "不保存而直接关闭可能会丢失本次编辑的信息，是否继续？", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            }
            ).then(() => {
                this.addUserDialogVisible = false;
            }).catch(() => {
                this.$message({
                    type: "info",
                    message: "已取消",
                });
            });
        },
        addUserConfirm() {
            // 检查是否有空值
            if (!this.addUserForm.username) {
                this.$message({
                    message: "用户名不能为空",
                    type: "warning",
                });
                return;
            }

            let _this = this;
            let postData = {
                username: this.addUserForm.username,
                email: this.addUserForm.email,
            };

            postForm("/users/addUser", postData, _this, function (res) {
                if (res.code === 200) {
                    _this.$message({
                        type: "success",
                        message: "添加成功!",
                    });
                    _this.addUserDialogVisible = false;
                    _this.getData({});
                }
            });
        },

        clickPage(page) {
            this.currentPage = page;
            this.searchForm.page = this.currentPage;
            this.getData(this.searchForm);
        },
    },
};
</script>

<style>
.TableItem {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.SearchForm {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 24px;
}

.SearchFormItem {
    margin: 0 24px 24px 24px;
    width: 280px;
}

.SearchFormTimePicker {
    margin: 0 24px 24px 24px;
    width: 460px;
}

.el-collapse-item__header {
    font-size: 16px;
    font-weight: 500;
    width: 100%;
    border: 0px;
}
</style>