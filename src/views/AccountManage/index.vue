<template>
    <div style="display: flex;">
        <!-- <common-aside :activeIndex="'3'"></common-aside> -->

        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">

            <el-form :model="searchForm" label-width="auto" class="SearchForm">
                <el-form-item prop="username" label="用户名" class="SearchFormItem">
                    <el-input v-model="searchForm.username" style="width: 200px;"></el-input>
                </el-form-item>
            </el-form>

            <el-button type="primary">搜索</el-button>

            <el-divider></el-divider>

            <div style="display: flex; align-items: center; justify-content: center;">
                <el-button @click="addUser" type="primary" style="margin-bottom: 24px;">增加用户</el-button>
            </div>

            <el-table :data="userTable" style="width: 95%;" stripe border>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="userType" label="用户类型"></el-table-column>
                <el-table-column prop="projects" label="已授权项目">
                    <template slot-scope="props">
                        <div v-for="(item, index) in props.row.projects" :key="index"
                            style="margin-right: 10px;">{{ projectsList[item].label }}</div>
                    </template>
                </el-table-column>

                <el-table-column label="操作" min-width="120" align="center">
                    <template slot-scope="props">
                        <el-button @click="changeUser(props.row, props.$index)" type="primary"
                            size="small">修改</el-button>
                        <el-button @click.native.prevent="deleteUser(props.$index, userTable)" type="danger"
                            size="small">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="增加用户" :visible.sync="addUserDialogVisible" width="90%"
                :before-close="addUserCancel">
                <el-form :model="addUserForm" ref="addUserForm" label-width="auto" >
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
                        <div v-for="item in addUserForm.projects" :key="item" style="margin-right: 10px;">{{
                            projectsList[item].label }}</div>
                    </el-form-item>
                    <el-form-item label="项目权限">
                        <el-button type="primary"
                            @click="changeProjectPermission(addUserForm, 0)">修改项目权限</el-button>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addUserCancel">取 消</el-button>
                    <el-button type="primary" @click="addUserConfirm">确 定</el-button>
                </span>
            </el-dialog>

            <el-dialog title="修改项目权限" :visible.sync="modifyPermissionDialogVisible" width="80%"
                :before-close="modifyPermissionCancel">
                <div style="display: flex; justify-content: center;">
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
                <el-form :model="modifyUserForm" ref="modifyUserForm" label-width="auto">
                    <el-form-item prop="username" label="用户名">
                        <el-input v-model="modifyUserForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码">
                        <el-button type="primary" @click="modifyPassword">修改密码</el-button>
                    </el-form-item>
                    <el-form-item prop="projects" label="已授权项目">
                        <div v-for="item in modifyUserForm.projects" :key="item" style="margin-right: 10px;">{{
                            projectsList[item].label }}</div>
                    </el-form-item>
                    <el-form-item label="项目权限">
                        <el-button type="primary"
                            @click="changeProjectPermission(modifyUserForm, 1)">修改项目权限</el-button>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="modifyUserCancel">取 消</el-button>
                    <el-button type="primary" @click="modifyUserConfirm">确 定</el-button>
                </span>
            </el-dialog>
        </div>

        <el-dialog title="修改密码" :visible.sync="modifyUserPasswordDialogVisible"
            :before-close="modifyUserPasswordCancel">
            <el-form :model="passwordForm" label-width="auto" >
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
import CommonAside from '@/components/CommonAside.vue';
export default {
    name: "AccountManage",
    components: {
        CommonAside,
    },
    data() {
        return {
            // 用户列表
            userTable: [
                {
                    username: 'admin-1',
                    password: 'admin-1',
                    userType: '管理员',
                    projects: [0, 1, 2],
                },
                {
                    username: 'user-1',
                    password: 'user-1',
                    userType: '普通用户',
                    projects: [0, 1],
                },
                {
                    username: 'user-2',
                    password: 'user-2',
                    userType: '普通用户',
                    projects: [1, 2],
                },
            ],
            // 项目列表
            projectsList: [
                { key: 0, label: "项目1" },
                { key: 1, label: "项目2" },
                { key: 2, label: "项目3" },
            ],
            addUserDialogVisible: false,

            addUserForm: {
                username: '',
                password: '',
                confirmPassword: '',
                userType: '普通用户',
                projects: [],
            },
            modifyPermissionDialogVisible: false,
            modifyPermissionDialogList: [],
            // 0: 添加用户 1: 修改用户
            modifyPermissionType: 0,

            // 修改用户
            modifyUserDialogVisible: false,
            modifyUserForm: {
                username: '',
                password: '',
                confirmPassword: '',
                projects: [],
            },
            modifyUserIndex: 0,

            // 修改密码
            passwordForm: {
                newPassword: '',
                confirmPassword: ''
            },
            modifyUserPasswordDialogVisible: false,

            searchForm: {
                username: '',
            }
        };
    },
    mounted() { },
    methods: {
        changeProjectPermission(row, type) {
            this.modifyPermissionDialogList = row.projects
            this.modifyPermissionIndex = type
            this.modifyPermissionDialogVisible = true;
        },
        addUser() {
            this.addUserForm = {
                username: '',
                password: '',
                confirmPassword: '',
                userType: '普通用户',
                projects: [],
            };
            this.addUserDialogVisible = true;
        },
        deleteUser(index, rows) {
            let _this = this;
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                rows.splice(index, 1);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        addUserCancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.addUserDialogVisible = false;
            }).catch(() => { });
        },
        modifyPermissionCancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.modifyPermissionDialogVisible = false;
            }).catch(() => { });
        },
        addUserConfirm() {
            // 检查是否有空值
            if (!this.addUserForm.username) {
                this.$message({
                    message: '用户名不能为空',
                    type: 'warning'
                });
                return;
            }
            if (!this.addUserForm.password) {
                this.$message({
                    message: '密码不能为空',
                    type: 'warning'
                });
                return;
            }

            // 检查密码是否一致
            if (this.addUserForm.password !== this.addUserForm.confirmPassword) {
                this.$message({
                    message: '两次输入的密码不一致',
                    type: 'warning'
                });
                return;
            }

            this.addUserDialogVisible = false;
            let _this = this;
            _this.userTable.push({
                username: this.addUserForm.username,
                password: this.addUserForm.password,
                userType: this.addUserForm.userType,
                projects: this.addUserForm.projects,
            });

            _this.$message({
                type: 'success',
                message: '已添加至表格最下方!'
            });
        },
        modifyPermissionConfirm() {
            if (this.modifyPermissionIndex === 0) {
                this.addUserForm.projects = []
                for (let item of this.modifyPermissionDialogList) {
                    this.addUserForm.projects.push(item);
                }
            }
            else {
                this.modifyUserForm.projects = []
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
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.modifyUserDialogVisible = false;
            }).catch(() => { });
        },
        modifyUserConfirm() {
            // 检查是否有空值
            if (!this.modifyUserForm.username) {
                this.$message({
                    message: '用户名不能为空',
                    type: 'warning'
                });
                return;
            }

            this.userTable[this.modifyUserIndex].username = this.modifyUserForm.username;
            this.userTable[this.modifyUserIndex].password = this.modifyUserForm.password;
            this.userTable[this.modifyUserIndex].projects = this.modifyUserForm.projects;

            this.$message.success('修改成功');

            this.modifyUserDialogVisible = false;
        },
        modifyPassword() {
            this.modifyUserPasswordDialogVisible = true;
        },
        modifyUserPasswordCancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.modifyUserPasswordDialogVisible = false;
                this.passwordForm.newPassword = '';
                this.passwordForm.confirmPassword = '';
            }).catch(() => { });
        },
        modifyUserPasswordConfirm() {
            if (this.passwordForm.newPassword === '') {
                this.$message.error('密码不能为空');
                return;
            }
            if (this.passwordForm.newPassword !== this.passwordForm.confirmPassword) {
                this.$message.error('两次密码不一致');
                return;
            }
            this.$message({
                type: 'info',
                message: '修改密码在“修改用户”弹窗中再次点击“确定”才能生效',
                duration: 6666
            });
            this.modifyUserPasswordDialogVisible = false;
            this.modifyUserForm.password = this.passwordForm.newPassword;
            this.passwordForm.newPassword = '';
            this.passwordForm.confirmPassword = '';
        },
    },
}
</script>

<style scoped>
.SearchForm {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 24px;
}
.SearchFormItem {
    margin: 0 24px 24px 24px;
}
</style>