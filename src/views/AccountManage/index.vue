<template>
    <div style="text-align: center; margin: 24px 40px 24px 40px;">
        <el-collapse v-model="activeNames" @change="collapseChange">
            <el-collapse-item :title="collapseTitle" name="1">
            <el-form :model="searchForm" label-width="auto" class="SearchForm">
                <el-form-item prop="username" label="用户名" class="SearchFormItem">
                    <el-input v-model="searchForm.username" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item prop="status" label="账号状态" class="SearchFormItem">
                    <el-select v-model="searchForm.status" placeholder="请选择" style="width: 200px">
                        <el-option label="已激活" value="1"></el-option>
                        <el-option label="未激活" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="email" label="用户联系邮箱" class="SearchFormItem">
                    <el-input v-model="searchForm.email" style="width: 200px"></el-input>
                </el-form-item>
                <el-form-item label="注册时间" class="SearchFormTimePicker">
                    <el-date-picker value-format="timestamp" v-model="searchForm.registerTimeRange" type="daterange"
                        range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="最近登录时间" class="SearchFormTimePicker">
                    <el-date-picker value-format="timestamp" v-model="searchForm.lastLoginTimeRange" type="daterange"
                        range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="最近修改密码时间" class="SearchFormTimePicker">
                    <el-date-picker value-format="timestamp" v-model="searchForm.lastModifyPasswordTimeRange"
                        type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
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
                <el-button @click="addUser" type="primary"
                    style="margin-bottom: 24px; margin-right: 24px">增加用户</el-button>
                <el-upload action="/api/users/importUser" :headers="{
                    Authorization: 'Bearer ' + $store.state.user.token,
                }" :show-file-list="false" :on-success="importUser">
                    <el-button type="primary" style="margin-bottom: 24px">导入用户</el-button>
                </el-upload>
            </div>

            <el-table :data="userTable" style="width: 95%" stripe border>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="userType" label="用户类型">
                    <template slot-scope="props">
                        <el-tag v-if="props.row.userType === 2" type="success">管理员</el-tag>
                        <el-tag v-else>普通用户</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="projects" label="已授权项目">
                    <template slot-scope="props">
                        <div v-for="(item, index) in props.row.projects" :key="index" style="margin-right: 10px">
                            {{ projectsMap[item] }}
                        </div>
                    </template>
                </el-table-column>

                <el-table-column prop="registerTime" label="注册时间"></el-table-column>
                <el-table-column prop="lastLoginTime" label="最近登录时间"></el-table-column>
                <el-table-column prop="lastModifyPasswordTime" label="最近修改密码时间"></el-table-column>
                <el-table-column prop="status" label="是否激活">
                    <template slot-scope="props">
                        <el-tag v-if="props.row.status === 1" type="success">已激活</el-tag>
                        <el-tag v-else type="danger">未激活</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="email" label="用户联系邮箱"></el-table-column>

                <el-table-column label="操作" width="150" align="center">
                    <template slot-scope="props">
                        <el-button @click="changeUser(props.row, props.$index)" type="primary"
                            size="small">修改</el-button>
                        <el-button @click.native.prevent="
                            deleteUser(props.$index, userTable)
                            " type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div style="margin: 24px">
                <el-pagination background layout="pager" :page-size="10" :page-count="pages"
                    @current-change="clickPage">
                </el-pagination>
            </div>

            <el-dialog title="增加用户" :visible.sync="addUserDialogVisible" width="90%" :before-close="addUserCancel">
                <el-form :model="addUserForm" ref="addUserForm" label-width="auto" align="left">
                    <el-form-item prop="username" label="用户名">
                        <el-input v-model="addUserForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password" label="密码">
                        <el-input v-model="addUserForm.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item prop="confirmPassword" label="确认密码">
                        <el-input v-model="addUserForm.confirmPassword" type="password"></el-input>
                    </el-form-item>
                    <el-form-item prop="projects" label="已授权项目">
                        <div v-for="item in addUserForm.projects" :key="item" style="margin-right: 10px">
                            {{ projectsMap[item] }}
                        </div>
                    </el-form-item>
                    <el-form-item label="项目权限">
                        <el-button type="primary" @click="changeProjectPermission(addUserForm, 0)">修改项目权限</el-button>
                    </el-form-item>

                    <el-form-item prop="email" label="用户联系邮箱">
                        <el-input v-model="addUserForm.email"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addUserCancel">取 消</el-button>
                    <el-button type="primary" @click="addUserConfirm">确 定</el-button>
                </span>
            </el-dialog>

            <el-dialog title="修改项目权限" :visible.sync="modifyPermissionDialogVisible" width="80%"
                :before-close="modifyPermissionCancel">
                <div style="display: flex; justify-content: center">
                    <el-transfer v-model="modifyPermissionDialogList" :titles="['无权限项目', '有权限项目']"
                        :data="projectsList"></el-transfer>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="modifyPermissionCancel">取 消</el-button>
                    <el-button type="primary" @click="modifyPermissionConfirm">确 定</el-button>
                </span>
            </el-dialog>

            <el-dialog title="修改用户" :visible.sync="modifyUserDialogVisible" width="90%"
                :before-close="modifyUserCancel">
                <el-form :model="modifyUserForm" ref="modifyUserForm" label-width="auto" align="left">
                    <el-form-item prop="username" label="用户名">
                        <el-input v-model="modifyUserForm.username"></el-input>
                        <!-- {{ modifyUserForm.username }} -->
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-button type="primary" @click="modifyPassword">修改密码</el-button>
                    </el-form-item>
                    <el-form-item prop="projects" label="已授权项目">
                        <div v-for="item in modifyUserForm.projects" :key="item" style="margin-right: 10px">
                            {{ projectsMap[item] }}
                        </div>
                    </el-form-item>
                    <el-form-item label="项目权限">
                        <el-button type="primary" @click="changeProjectPermission(modifyUserForm, 1)">修改项目权限</el-button>
                    </el-form-item>

                    <el-form-item prop="email" label="用户联系邮箱">
                        <el-input v-model="modifyUserForm.email"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="modifyUserCancel">取 消</el-button>
                    <el-button type="primary" @click="modifyUserConfirm">确 定</el-button>
                </span>
            </el-dialog>

        <el-dialog title="修改密码" :visible.sync="modifyUserPasswordDialogVisible"
            :before-close="modifyUserPasswordCancel">
            <el-form :model="passwordForm" label-width="auto">
                <el-form-item prop="newPassword" label="新密码">
                    <el-input v-model="passwordForm.newPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword" label="确认密码">
                    <el-input v-model="passwordForm.confirmPassword" type="password"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modifyUserPasswordCancel">取 消</el-button>
                <el-button type="primary" @click="modifyUserPasswordConfirm">确 定</el-button>
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
                    // 用户名
                    username: "admin-1",
                    // 用户类型
                    userType: "管理员",
                    // 已授权项目
                    projects: [0, 1, 2],
                    // 注册时间
                    registerTime: "2021-01-01",
                    // 最近登录时间
                    lastLoginTime: "2021-01-01",
                    // 最近修改密码时间
                    lastModifyPasswordTime: "2021-01-01",
                    // 是否激活
                    status: 1,
                    // 用户联系邮箱
                    email: "aaaaa@pku.edu.cn",
                },
            ],
            // 项目列表
            projectsMap: {},
            projectsList: [],
            addUserDialogVisible: false,

            addUserForm: {
                username: "",
                password: "",
                confirmPassword: "",
                userType: "普通用户",
                projects: [],
                email: "",
                status: 1,
            },
            modifyPermissionDialogVisible: false,
            modifyPermissionDialogList: [],
            // 0: 添加用户 1: 修改用户
            modifyPermissionType: 0,

            // 修改用户
            modifyUserDialogVisible: false,
            modifyUserForm: {
                username: "",
                password: "",
                confirmPassword: "",
                projects: [],
                email: "",
                status: 1,
            },
            modifyUserIndex: 0,

            // 修改密码
            passwordForm: {
                newPassword: "",
                confirmPassword: "",
            },
            modifyUserPasswordDialogVisible: false,

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
            let postData = {
                username: this.searchForm.username,
                status: this.searchForm.status,
                email: this.searchForm.email,
            };
            // 注册时间范围
            if (this.searchForm.registerTimeRange && this.searchForm.registerTimeRange.length > 1) {
                postData.createTimeBegin =
                    this.searchForm.registerTimeRange[0];
                postData.createTimeEnd = this.searchForm.registerTimeRange[1] + 86399999;
            }
            // 最近登录时间范围
            if (this.searchForm.lastLoginTimeRange && this.searchForm.lastLoginTimeRange.length > 1) {
                postData.lastLoginTimeBegin =
                    this.searchForm.lastLoginTimeRange[0];
                postData.lastLoginTimeEnd =
                    this.searchForm.lastLoginTimeRange[1] + 86399999;
            }
            // 最近修改密码时间范围
            if (this.searchForm.lastModifyPasswordTimeRange && this.searchForm.lastModifyPasswordTimeRange.length > 1) {
                postData.updateTimeBegin =
                    this.searchForm.lastModifyPasswordTimeRange[0];
                postData.updateTimeEnd =
                    this.searchForm.lastModifyPasswordTimeRange[1] + 86399999;
            }
            this.getData(postData);
        },

        // 获取数据
        getData(postData) {
            let _this = this;
            _this.projectsList = [];
            _this.projectsMap = {};
            _this.userTable = [];

            postForm("/projectInfos/getProjectInfo", { size: -1 }, _this, function (res) {
                for (let item of res.data.records) {
                    _this.projectsMap[item.pid] = item.name;
                    _this.projectsList.push({
                        key: item.pid,
                        label: item.name,
                    });
                }

                postForm("/users/getUsers", postData, _this, function (res) {
                    _this.pages = res.data.pages;
                    for (let item of res.data.records) {
                        _this.userTable.push({
                            uid: item.uid,
                            username: item.username,
                            userType: item.type,
                            projects: item.pids.slice(0),
                            registerTime: new Date(
                                item.createTime
                            ).toLocaleDateString(),
                            lastLoginTime: new Date(
                                item.lastLoginTime
                            ).toLocaleDateString(),
                            lastModifyPasswordTime: new Date(
                                item.updateTime
                            ).toLocaleDateString(),
                            status: item.status === undefined ? 1 : item.status,
                            email: item.email,
                        });
                    }
                });
            });
        },

        changeProjectPermission(row, type) {
            this.modifyPermissionDialogList = row.projects;
            this.modifyPermissionIndex = type;
            this.modifyPermissionDialogVisible = true;
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
        modifyPermissionCancel() {
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
                    this.modifyPermissionDialogVisible = false;
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