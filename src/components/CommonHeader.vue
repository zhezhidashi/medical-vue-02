<template>
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex;">
            <img src="favicon.png" style="height: 50px; margin-right: 10px;" />
            <div style="font-size: 25px; line-height: 200%;">医学临床数据交换公网系统</div>
        </div>
        <div class="r-content" v-if="path !== '/Login'">
            <el-dropdown style="display: flex; align-items: center;">
                <div class="el-dropdown-link" style="display: flex; flex-direction: row; align-items: center;">
                    <div style="display: flex; flex-direction: column; font-weight: bold;">
                        <div>机构：正大天晴</div>
                        <div>用户：{{ username }}</div>
                    </div> 
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu>
                    <el-dropdown-item align="center" @click.native="logOut">登出</el-dropdown-item>
                    <el-dropdown-item align="center" @click.native="modifyUserInfo">修改用户信息</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <el-dialog title="修改用户信息" :visible.sync="modifyPasswordDialogVisible" width="50%"
            :before-close="modifyUserInfoCancel">
            <el-form :model="userInfoForm" label-width="auto" >
                <el-form-item prop="username" label="* 用户名">
                    <el-input v-model="userInfoForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="newPassword" label="* 新密码">
                    <el-input v-model="userInfoForm.newPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword" label="* 确认密码">
                    <el-input v-model="userInfoForm.confirmPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="* 邮箱">
                    <el-input v-model="userInfoForm.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modifyUserInfoCancel">取 消</el-button>
                <el-button type="primary" @click="modifyUserInfoConfirm">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { getForm, postForm } from '@/api/data';
export default {
    name: "CommonHeader",
    data() {
        return {
            path: '',
            userInfoForm: {
                username: '',
                newPassword: '',
                confirmPassword: '',
                email: '',
            },
            modifyPasswordDialogVisible: false,
            userType: '',
            username: '',
        }  
    },
    mounted() {
        this.path = this.$router.currentRoute.path;
        this.userType = this.$store.state.user.userType;
        this.username = this.$store.state.user.username;
    },
    watch: {
        $route(to, from) {
            this.path = to.path;
        }
    },
    methods: {
        logOut() {
            this.$store.commit('clearToken');
            this.$store.commit('clearUsername');
            this.$store.commit('clearUserType');
            this.$store.commit('clearInstitutionName')
            getForm('/logout', this, function(res) {})
            window.location.reload();
        },
        modifyUserInfo() {
            this.modifyPasswordDialogVisible = true;
        },
        modifyUserInfoCancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.modifyPasswordDialogVisible = false;
                this.userInfoForm.newPassword = '';
                this.userInfoForm.confirmPassword = '';
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
             });
        },
        modifyUserInfoConfirm() {
            if (this.userInfoForm.username === '' || this.userInfoForm.newPassword === '' || this.userInfoForm.email === '') {
                this.$message.error('请填写完整信息');
                return;
            }

            if (this.userInfoForm.newPassword !== this.userInfoForm.confirmPassword) {
                this.$message.error('两次密码不一致');
                return;
            }


            let _this = this;
           
            let postData = {
                username: this.userInfoForm.username,
                password: this.userInfoForm.newPassword,
                email: this.userInfoForm.email,
            }
            postForm('/users/update', postData, _this, function(res){
                if (res.code === 200) {
                    _this.$message.success('修改成功');
                    _this.modifyPasswordDialogVisible = false;
                    _this.userInfoForm.newPassword = '';
                    _this.userInfoForm.confirmPassword = '';
                    _this.logOut();
                }
                else {
                    _this.$message.error(res.message);
                }
            })
        },
    },
}
</script>

<style scoped>
.el-dropdown-link {
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>