<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <div style="margin-top: 24px;"></div>
            <el-form v-if="hasNetwork === 1" :model="applyNetworkForm" :rules="applyNetworkRules" label-width="auto"
                style="width: 65vw;" align="left">
                <el-form-item prop="publicRootAddress" label="管理节点地址">
                    <el-input v-model="applyNetworkForm.publicRootAddress"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="机构名称">
                    <el-input v-model="applyNetworkForm.name"></el-input>
                </el-form-item>
                <el-form-item prop="institutionCode" label="统一社会信用代码">
                    <el-input v-model="applyNetworkForm.institutionCode"></el-input>
                </el-form-item>
                <!-- <el-form-item prop="publicKey" label="公钥">
                    <el-upload action="/backendOutdoApplication/submitPublicKey"
                        :headers="{ 'Authorization': 'Bearer ' + $store.state.user.token }" :show-file-list="false"
                        :on-success="importKey">
                        <el-button type="primary" style="margin: 24px;">导入公钥</el-button>
                    </el-upload>
                </el-form-item> -->
                <el-form-item prop="description" label="机构描述">
                    <el-input v-model="applyNetworkForm.description"></el-input>
                </el-form-item>
            </el-form>

            <div v-if="hasNetwork === 1" style="display: flex; align-items: center; justify-content: center; ">
                <el-button type="primary" @click="networkApply">提交申请</el-button>
            </div>

            <el-descriptions v-if="hasNetwork === 2" title="组网详情" :column="1" border style="width: 65vw;" size="medium">
                <el-descriptions-item label="管理平台地址">{{ networkDescription.publicRootAddress }}</el-descriptions-item>
                <el-descriptions-item label="机构名称">{{ networkDescription.name }}</el-descriptions-item>
                <el-descriptions-item label="机构标识">{{ networkDescription.institutionDoi }}</el-descriptions-item>
                <el-descriptions-item label="统一社会信用代码">{{ networkDescription.institutionCode }}</el-descriptions-item>
                <el-descriptions-item label="机构描述">{{ networkDescription.description }}</el-descriptions-item>
                <el-descriptions-item label="组网状态">
                    <el-tag v-if="hasNetwork === 1" type="primary">申请中</el-tag>
                    <el-tag v-if="hasNetwork === 2" type="success">已通过</el-tag>
                </el-descriptions-item>
                <!-- <el-descriptions-item label="修改组网">
                    <el-button type="primary" size="mini" @click="modifyNetwork">修改</el-button>
                </el-descriptions-item> -->
            </el-descriptions>


            <el-dialog title="修改组网" :visible.sync="modifyNetworkDialogVisible" width="80%"
                :before-close="modifyNetworkCancel">
                <el-form :model="modifyNetworkForm" label-width="auto" align="left" :rules="modifyNetworkRules">
                    <el-form-item prop="publicRootAddress" label="管理平台地址">
                        <el-input v-model="modifyNetworkForm.publicRootAddress"></el-input>
                    </el-form-item>
                    <el-form-item prop="name" label="机构名称">
                        <el-input v-model="modifyNetworkForm.name"></el-input>
                    </el-form-item>
                    <el-form-item prop="institutionCode" label="统一社会信用代码">
                        <el-input v-model="modifyNetworkForm.institutionCode"></el-input>
                    </el-form-item>
                    <el-form-item prop="description" label="机构描述">
                        <el-input v-model="modifyNetworkForm.description"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="modifyNetworkCancel">取 消</el-button>
                    <el-button type="primary" @click="modifyNetworkConfirm">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import { postForm, getForm, backend_out_ip, backend_out_port } from '@/api/data'
export default {
    name: "NetworkManage",
    data() {
        return {
            // 是否组网，0是查询中，1是未组网，2是已组网
            hasNetwork: 0,
            loading: false,

            // 未组网
            applyNetworkForm: {
                publicRootAddress: "",
                name: "",
                institutionCode: "",
                description: "",
            },
            applyNetworkRules: {
                publicRootAddress: [
                    { required: true, message: '请输入管理节点地址', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入机构名称', trigger: 'blur' }
                ],
            },

            // 已组网
            networkDescription: {
                publicRootAddress: "",
                name: "",
                institutionDoi: "",
                institutionCode: "",
                description: "",
            },

            modifyNetworkDialogVisible: false,
            modifyNetworkForm: {
                publicRootAddress: "",
                name: "",
                institutionCode: "",
                description: "",
            },

            modifyNetworkRules: {
                publicRootAddress: [
                    { required: true, message: '请输入管理节点地址', trigger: 'blur' }
                ],
                name: [
                    { required: true, message: '请输入机构名称', trigger: 'blur' }
                ],
            },
        };
    },
    mounted() {
        let _this = this;
        // 获取机构组网信息
        postForm('/networkGroups/get', {}, _this, function (res) {
            if (res.data !== null) {
                _this.hasNetwork = 2;
                let network = res.data;
                _this.networkDescription.publicRootAddress = network.publicRootAddress + ":" + network.publicRootPort;
                _this.networkDescription.name = network.institutionName
                _this.networkDescription.institutionDoi = network.institutionDoi
                _this.networkDescription.institutionCode = network.institution_code
                _this.networkDescription.description = network.description
            }
            else { 
                _this.hasNetwork = 1;
            }
        })
    },
    methods: {
        importKey(response, file, fileList) {
            console.log(response);
            if (response.code === 200) {
                this.$message({
                    message: '导入公钥成功',
                    type: 'success'
                });
            }
            else {
                this.$message({
                    message: response.message,
                    type: 'error'
                });
            }
        },

        networkApply() {
            this.loading = true;

            let _this = this;
            let postData = {
                "publicRootName": "123",
                "publicRootAddress": this.applyNetworkForm.publicRootAddress,
                "ip": backend_out_ip,
                "port": backend_out_port,
                "name": this.applyNetworkForm.name,
                "description": this.applyNetworkForm.description,
                "institutionCode": this.applyNetworkForm.institutionCode
            }

            postForm("/networkGroups/apply", postData, _this, function (res) {
                if (res.code === 200) {
                    _this.$message({
                        message: '提交成功',
                        type: 'success'
                    });
                }
                _this.loading = false;
            })
        },

        modifyNetwork() {
            this.modifyNetworkDialogVisible = true;
        },
        modifyNetworkCancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.modifyNetworkDialogVisible = false;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        modifyNetworkConfirm() {
            this.modifyNetworkDialogVisible = false;
        },
    },
}
</script>

<style>

</style>