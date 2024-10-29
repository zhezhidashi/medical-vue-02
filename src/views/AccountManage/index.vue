<template>
    <div style="text-align: center; margin: 24px 40px 24px 40px;">
        <el-collapse v-model="activeNames" @change="collapseChange">
            <el-collapse-item :title="collapseTitle" name="1">
                <el-form :model="searchForm" label-width="auto" class="SearchForm">
                    <el-form-item prop="username" label="用户名" class="SearchFormItem">
                        <el-input v-model="searchForm.username" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item prop="username" label="用户标识" class="SearchFormItem">
                        <el-input v-model="searchForm.username" style="width: 200px"></el-input>
                    </el-form-item>
                    <el-form-item prop="email" label="用户联系邮箱" class="SearchFormItem">
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
            <el-table-column prop="username" label="用户标识"></el-table-column>
            <el-table-column prop="userType" label="用户类型">
                <template slot-scope="props">
                    <el-tag v-if="props.row.userType === 2" type="success">管理员</el-tag>
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
            <el-form :model="addUserForm" ref="addUserForm" label-width="auto" align="left">
                <el-form-item prop="username" label="* 用户名">
                    <el-input v-model="addUserForm.username"></el-input>
                </el-form-item>

                <el-form-item prop="email" label="* 邮箱">
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
            // 页数
            pages: 1,
            // 当前页数
            currentPage: 1,
            // 折叠
            activeNames: [],
            collapseTitle: "搜索栏（点击展开）",
            // 用户列表
            userTable: [
                {
                    username: "admin",
                    userType: 2,
                    lastLoginTime: "2021-01-01",
                    status: 1,
                    email: "aaaaa@pku.edu.cn",
                },
                {
                    username: "user001",
                    userType: 1,
                    lastLoginTime: "2021-01-01",
                    status: 1,
                    email: "aaaaa@pku.edu.cn",
                },
                {
                    username: "user002",
                    userType: 1,
                    lastLoginTime: "2021-01-01",
                    status: 0,
                    email: "aaaaa@pku.edu.cn",
                },
            ],
            // 项目列表
            projectsMap: {},
            projectsList: [],
            addUserDialogVisible: false,

            addUserForm: {
                username: "",
                email: "",
            },

            searchForm: {
                // 用户名
                username: "",
                // 账号状态
                status: "",
                // 用户联系邮箱
                email: "",
                // 注册时间范围
                registerTimeRange: "",
                // 最近登录时间范围
                lastLoginTimeRange: "",
                // 最近修改密码时间范围
                lastModifyPasswordTimeRange: "",
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
        },

        // 获取数据
        getData(postData) {
        },

        addUser() {
            this.addUserForm = {
                username: "",
                password: "",
                confirmPassword: "",
                projects: [],
                email: "",
            };
            this.addUserDialogVisible = true;
        },

        addUserCancel() {
            this.$confirm(
                "不保存而直接关闭可能会丢失本次编辑的信息，是否继续?",
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }
            )
                .then(() => {
                    this.addUserDialogVisible = false;
                })
                .catch(() => {
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
            if (!this.addUserForm.password) {
                this.$message({
                    message: "密码不能为空",
                    type: "warning",
                });
                return;
            }

            // 检查密码是否一致
            if (
                this.addUserForm.password !== this.addUserForm.confirmPassword
            ) {
                this.$message({
                    message: "两次输入的密码不一致",
                    type: "warning",
                });
                return;
            }

            let _this = this;
            let postData = {
                username: this.addUserForm.username,
                password: this.addUserForm.password,
                userType: this.addUserForm.userType,
                projectIds: this.addUserForm.projects,
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
        importUser(response, file, fileList) {
            console.log(response);
            if (response.code === 200) {
                this.$message({
                    message: "导入用户成功",
                    type: "success",
                });
                this.getData({});
            } else {
                this.$message({
                    message: response.message,
                    type: "error",
                });
            }
        },
        modifyPermissionConfirm() {
            if (this.modifyPermissionIndex === 0) {
                this.addUserForm.projects = [];
                for (let item of this.modifyPermissionDialogList) {
                    this.addUserForm.projects.push(item);
                }
            } else {
                this.modifyUserForm.projects = [];
                for (let item of this.modifyPermissionDialogList) {
                    this.modifyUserForm.projects.push(item);
                }
            }
            this.modifyPermissionDialogVisible = false;
        },
        changeUser(row, index) {
            this.modifyUserForm = JSON.parse(JSON.stringify(row));
            this.modifyUserIndex = index;
            this.modifyUserDialogVisible = true;
        },
        modifyUserCancel() {
            this.$confirm(
                "不保存而直接关闭可能会丢失本次编辑的信息，是否继续?",
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }
            )
                .then(() => {
                    this.modifyUserDialogVisible = false;
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消",
                    });
                });
        },
        modifyUserConfirm() {
            // 检查是否有空值
            if (!this.modifyUserForm.username) {
                this.$message({
                    message: "用户名不能为空",
                    type: "warning",
                });
                return;
            }

            let postData = {
                uid: this.userTable[this.modifyUserIndex].uid,
                username: this.modifyUserForm.username,
                password: this.modifyUserForm.password,
                pids: this.modifyUserForm.projects.slice(0),
                email: this.modifyUserForm.email,
            };

            let _this = this;
            postForm("/users/update", postData, _this, function (res) {
                if (res.code === 200) {
                    _this.$message({
                        type: "success",
                        message: "修改成功!",
                    });
                    _this.modifyUserDialogVisible = false;
                    _this.getData({});
                }
            });
        },
        modifyPassword() {
            this.modifyUserPasswordDialogVisible = true;
        },
        modifyUserPasswordCancel() {
            this.$confirm(
                "不保存而直接关闭可能会丢失本次编辑的信息，是否继续?",
                "提示",
                {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }
            )
                .then(() => {
                    this.modifyUserPasswordDialogVisible = false;
                    this.passwordForm.newPassword = "";
                    this.passwordForm.confirmPassword = "";
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消",
                    });
                });
        },
        modifyUserPasswordConfirm() {
            if (this.passwordForm.newPassword === "") {
                this.$message.error("密码不能为空");
                return;
            }
            if (
                this.passwordForm.newPassword !==
                this.passwordForm.confirmPassword
            ) {
                this.$message.error("两次密码不一致");
                return;
            }
            this.$message({
                type: "info",
                message: "修改密码在“修改用户”弹窗中再次点击“确定”才能生效",
                duration: 6666,
            });
            this.modifyUserPasswordDialogVisible = false;
            this.modifyUserForm.password = this.passwordForm.newPassword;
            this.passwordForm.newPassword = "";
            this.passwordForm.confirmPassword = "";
        },

        deleteUser(index, rows) {
            let _this = this;
            if (rows[index].userType === 2) {
                this.$message({
                    type: "warning",
                    message: "不能删除管理员账号!",
                });
                return;
            }
            this.$confirm("此操作将永久删除, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
            })
                .then(() => {
                    postForm(
                        `/users/deleteById?uid=${rows[index].uid}`,
                        {},
                        _this,
                        function (res) {
                            if (res.code === 200) {
                                _this.$message({
                                    type: "success",
                                    message: "删除成功!",
                                });
                                _this.getData({});
                            }
                        }
                    );
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消删除",
                    });
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