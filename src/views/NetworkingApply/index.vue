<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <div style="margin-top: 24px;"></div>
            <el-form :model="networkingApplyForm" :rules="rules" label-width="auto" style="width: 65vw;">
                <el-form-item prop="publicRootAddress" label="管理节点地址">
                    <el-input v-model="networkingApplyForm.publicRootAddress"></el-input>
                </el-form-item>
                <el-form-item prop="institutionName" label="机构名称">
                    <el-input v-model="networkingApplyForm.institutionName"></el-input>
                </el-form-item>
                <el-form-item prop="institutionCode" label="统一社会信用代码">
                    <el-input v-model="networkingApplyForm.institutionCode"></el-input>
                </el-form-item>
                <el-form-item prop="publicKey" label="* 公钥">
                    <el-button type="primary">点击上传</el-button>
                </el-form-item>
                <el-form-item prop="networkingDesc" label="机构描述">
                    <el-input v-model="networkingApplyForm.networkingDesc"></el-input>
                </el-form-item>
            </el-form>

            <div style="display: flex; align-items: center; justify-content: center; ">
                <el-button type="primary">提交申请</el-button>
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
                // 机构的名称
                institutionName: '',
                // 第三方平台的地址
                publicRootAddress: '',
                // 机构的地址
                institutionAddress: '',
                // 组网的描述
                networkingDesc: '',
                // 申请人名称
                userName: '',
                institutionCode: "",
            },
            rules: {
                publicRootAddress: [
                    { required: true, message: '请输入第三方平台地址', trigger: 'blur' }
                ],
                institutionName: [
                    { required: true, message: '请输入机构名称', trigger: 'blur' }
                ],
            },
        };
    },
    mounted() {
    },
    methods: {
    },
}
</script>

<style scoped></style>