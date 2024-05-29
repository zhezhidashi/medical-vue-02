<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <div style="display: flex; align-items: center; justify-content: center; ">
                <el-upload
                action="/api/doApplication/submitPublicKey"
                :headers="{'Authorization': 'Bearer ' + $store.state.user.token}"
                :show-file-list="false"
                :on-success="ImportKey"
            >
                <el-button type="primary" style="margin: 24px;">导入公钥</el-button>
            </el-upload>
                
                <el-button @click="ExportKey" type="primary" style="margin: 24px;">导出公钥</el-button>
            </div>

            <el-form :model="networkingApplyForm" label-width="auto" style="width: 65vw;">
                <el-form-item label="第三方平台的名称">
                    <el-input v-model="networkingApplyForm.publicRootName"></el-input>
                </el-form-item>
                <el-form-item label="第三方平台的ip">
                    <el-input v-model="networkingApplyForm.publicRootAddress"></el-input>
                </el-form-item>
                <el-form-item label="第三方平台的端口">
                    <el-input v-model="networkingApplyForm.publicRootPort"></el-input>
                </el-form-item>
                <el-form-item label="机构的ip">
                    <el-input v-model="networkingApplyForm.institutionAddress"></el-input>
                </el-form-item>
                <el-form-item label="机构的端口">
                    <el-input v-model="networkingApplyForm.institutionPort"></el-input>
                </el-form-item>
                <el-form-item label="机构的名字">
                    <el-input v-model="networkingApplyForm.institutionName"></el-input>
                </el-form-item>
                <el-form-item label="组网的描述">
                    <el-input v-model="networkingApplyForm.networkingDesc"></el-input>
                </el-form-item>
                <el-form-item label="申请人名称">
                    <el-input v-model="networkingApplyForm.userName"></el-input>
                </el-form-item>
            </el-form>

            <div style="display: flex; align-items: center; justify-content: center; ">
                <el-button :loading="loading" @click="ApplyCommit" type="primary" style="margin: 24px;">提交申请</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { postForm } from '@/api/data'
export default {
    name: "NetworkingApply",
    data() {
        return {
            networkingApplyForm: {
                // 第三方平台的名称
                publicRootName: '',
                // 第三方平台的ip
                publicRootAddress: '',
                // 第三方平台的端口
                publicRootPort: '',
                // 机构的ip
                institutionAddress: '',
                // 机构的端口
                institutionPort: '',
                // 机构的名字
                institutionName: '',
                // 组网的描述
                networkingDesc: '',
                // 申请人名称
                userName: '',
            },
            loading: false,
        };
    },
    mounted() {
    },
    methods: {
        ImportKey(response, file, fileList) {
            console.log(response);
            if(response.code === 200) {
                this.$message({
                    message: '导入公钥成功',
                    type: 'success'
                });
            }
            else {
                this.$message({
                    message: response.msg,
                    type: 'error'
                });
            }
        }, 
        ExportKey() {

        },
        ApplyCommit() {
            this.loading = true;

            // 检查是否有空值
            for (let key in this.networkingApplyForm) {
                if (this.networkingApplyForm[key] === '') {
                    this.$message({
                        message: '请填写完整信息',
                        type: 'warning'
                    });
                    this.loading = false;
                    return;
                }
            }

            // 检查 publicRootPort 和 institutionPort 是否为数字
            if (isNaN(this.networkingApplyForm.publicRootPort) || isNaN(this.networkingApplyForm.institutionPort)) {
                this.$message({
                    message: '端口号必须为数字',
                    type: 'warning'
                });
                this.loading = false;
                return;
            }


            let _this = this;
            let postData = {
                "publicRootName": this.networkingApplyForm.publicRootName,
                "publicRootAddress": this.networkingApplyForm.publicRootAddress,
                "publicRootPort": parseInt(this.networkingApplyForm.publicRootPort),
                "ip": this.networkingApplyForm.institutionAddress,
                "port": parseInt(this.networkingApplyForm.institutionPort),
                "name": this.networkingApplyForm.institutionName,
                "description": this.networkingApplyForm.networkingDesc,
                "user": this.networkingApplyForm.userName,
            }
            
            postForm("/networkGroups/apply", postData, _this, function(res){
                if (res.code === 200) {
                    _this.$message({
                        message: '提交成功',
                        type: 'success'
                    });
                }
                _this.loading = false;
            })
        }
    },
}
</script>

<style scoped></style>