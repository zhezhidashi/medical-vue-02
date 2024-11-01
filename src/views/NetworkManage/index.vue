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
                <el-form-item prop="publicKey" label="公钥">
                    <el-button type="primary">点击上传</el-button>
                </el-form-item>
                <el-form-item prop="description" label="机构描述">
                    <el-input v-model="applyNetworkForm.description"></el-input>
                </el-form-item>
            </el-form>

            <div v-if="hasNetwork === 1" style="display: flex; align-items: center; justify-content: center; ">
                <el-button type="primary">提交申请</el-button>
            </div>

            <el-descriptions v-if="hasNetwork === 2" title="组网详情" :column="1" border style="width: 65vw;" size="medium">
                <el-descriptions-item label="管理平台地址">{{ networkDescription.publicRootAddress }}</el-descriptions-item>
                <el-descriptions-item label="机构名称">{{ networkDescription.name }}</el-descriptions-item>
                <el-descriptions-item label="机构标识">{{ networkDescription.institutionDoi }}</el-descriptions-item>
                <el-descriptions-item label="统一社会信用代码">{{ networkDescription.institutionCode }}</el-descriptions-item>
                <el-descriptions-item label="机构描述">{{ networkDescription.description }}</el-descriptions-item>
                <el-descriptions-item label="组网状态">已组网</el-descriptions-item>
                <el-descriptions-item label="修改组网">
                    <el-button type="primary" size="mini" @click="modifyNetwork">修改</el-button>
                </el-descriptions-item>
            </el-descriptions>


            <el-dialog title="修改组网" :visible.sync="modifyNetworkDialogVisible" width="80%"
                :before-close="modifyNetworkCancel">
                <el-form :model="modifyNetworkForm" label-width="auto" align="left" :rules="modifyNetworkRules" >
                    <el-form-item prop="publicRootAddress" label="管理平台地址">
                        <el-input v-model="modifyNetworkForm.publicRootAddress"></el-input>
                    </el-form-item>
                    <el-form-item prop="name" label="机构名称">
                        <el-input v-model="modifyNetworkForm.name"></el-input>
                    </el-form-item>
                    <el-form-item prop="institutionCode" label="统一社会信用代码">
                        <el-input v-model="modifyNetworkForm.institutionCode"></el-input>
                    </el-form-item>
                    <el-form-item prop="publicKey" label="公钥">
                        <el-button type="primary">点击上传</el-button>
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
import { postForm } from '@/api/data'
export default {
    name: "NetworkManage",
    data() {
        return {
            // 是否组网，0是查询中，1是未组网，2是已组网
            hasNetwork: 0,

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
                publicKey: [
                    { required: true, message: '请上传公钥', trigger: 'blur' }
                ]
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
                name: "",
                user: "",
                contactInfo: "",
                contactEmail: "",
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
        this.hasNetwork = 2;
    },
    methods: {
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

<style scoped></style>