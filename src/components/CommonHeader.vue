<template>
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex; align-items: center;">
            <img src="navigator.png" style="height: 36px; margin: 15px;" />
            <div style="font-size: 24px;">医学临床数据交换系统</div>
        </div>
        <div class="r-content" v-if="path !== '/Login'">
            <el-dropdown style="display: flex; align-items: center;">
                <div class="el-dropdown-link" style="display: flex; flex-direction: row; align-items: center;">
                    <div style="display: flex; flex-direction: column; font-weight: bold; color: black;">
                        <div>机构：{{ institutionName }}</div>
                        <div>用户：{{ username }}</div>
                    </div> 
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </div>
                <el-dropdown-menu>
                    <el-dropdown-item align="center" @click.native="logOut" style="color: black;">登出</el-dropdown-item>
                    <el-dropdown-item align="center" @click.native="modifyUserInfo" style="color: black;">修改用户信息</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>

        <el-dialog title="修改用户信息" :visible.sync="modifyPasswordDialogVisible" width="50%"
            :before-close="modifyUserInfoCancel">
            <el-form :model="userInfoForm" label-width="auto" :rules="userRules">
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="userInfoForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="newPassword" label="新密码">
                    <el-input v-model="userInfoForm.newPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item prop="confirmPassword" label="确认密码">
                    <el-input v-model="userInfoForm.confirmPassword" type="password"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="邮箱">
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
            institutionName: "",
            userInfoForm: {
                username: '',
                newPassword: '',
                confirmPassword: '',
                email: '',
            },
            userRules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                newPassword: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                confirmPassword: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' }
                ],
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
        if(this.path !== '/Login') {
            this.getInstitutionName();
        }
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
        getInstitutionName() {
            let _this = this;
            getForm('/networkGroups/getInstitutionName', _this, function(res) {
                if(res.code === 200) {
                    _this.institutionName = res.data;
                }
            })
        },
        modifyUserInfo() {
            this.userInfoForm.username = this.username
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
            if (this.userInfoForm.username === '' || this.userInfoForm.newPassword === '') {
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
            }
            if(this.userInfoForm.email !== undefined && this.userInfoForm.email !== "") {
                postData.email = this.userInfoForm.email
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

<style>
.el-dropdown-link {
    cursor: pointer;
}
.el-icon-arrow-down {
font-size: 12px;
}


/* el-form 文字 */
.el-form-item__label {
    color: black;
}

/* el-button 按钮 */
.el-button--primary, .el-button--primary:focus, .el-button--primary:hover {
    background-color: #bd4747;
    border-color: #bd4747;
}

/* .el-pagination 翻页 */
.el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: #bd4747;
    border-color: #bd4747;
}

/* el-description 文字 */
.el-descriptions-item__label.is-bordered-label, .el-descriptions-item__cell, .el-descriptions-item__content{
    color: black;
    font-size: 16px;
    background-color: white;
    border-color: black;
}
.el-descriptions__title{
    font-size: 18px;
}

/* 上传文件时的文字 */
.el-upload-dragger .el-upload__text em {
    color: #bd4747;
}

/* 多选选中文字的颜色 */
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected, .el-select-dropdown__item.selected {
    color: #bd4747;
}

</style>