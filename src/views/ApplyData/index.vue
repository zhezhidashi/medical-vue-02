<template>
    <div>
        <common-header :activeIndex="'2'"></common-header>

        <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" label-width="auto">

            <el-form-item label="数据条目" prop="dataItem">
                <el-input v-model="ruleForm.dataItem"></el-input>
            </el-form-item>

            <el-form-item label="信息项" prop="infoItem">
                <el-input v-model="ruleForm.infoItem"></el-input>
            </el-form-item>

            <el-form-item label="待申请DOI" prop="doi">
                <el-input v-model="ruleForm.doi"></el-input>
            </el-form-item>

            <el-form-item label="申请审批文件" prop="applyFile">
                <el-upload
                    class="upload-demo"
                    drag 
                    action="/api/posts/"
                    :on-success="handleUploadSuccess">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-form-item>

            <el-form-item label="申请类型" prop="applyType">
                <el-radio-group v-model="ruleForm.applyType">
                    <el-radio label="1">指针型</el-radio>
                    <el-radio label="2">实体型</el-radio>
                    <el-radio label="3">统计型</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item style="text-align: center">
                <el-button type="primary" :loading="loading" @click="submitApplication">提交申请</el-button>
            </el-form-item>
        </el-form>

    </div>

</template>

<script>
import CommonHeader from '@/components/CommonHeader.vue';
export default {
    name: "TemplatePage",
    components: {
        CommonHeader,
    },
    data() {
        return {
            // 表单数据
            ruleForm: {
                // 数据条目
                dataItem: undefined,
                // 信息项
                infoItem: undefined,
                // 待申请DOI
                doi: undefined,
                // 申请审批文件
                applyFile: undefined,
                // 申请类型
                applyType: undefined,
            },
            loading: false,
        };
    },
    mounted() {},
    methods: {
        // 提交申请
        submitApplication() {
            this.loading = true;

            console.log(this.ruleForm);

            // 检查 dataItem, infoItem, doi, applyFile, applyType 是否为空
            let requiredFieldsList = {
                'dataItem': '数据条目',
                'infoItem': '信息项',
                'doi': '待申请DOI',
                'applyFile': '申请审批文件',
                'applyType': '申请类型',
            };

            for (let key in requiredFieldsList) {
                if (!this.ruleForm[key]) {
                    this.$message({
                        message: requiredFieldsList[key] + '不能为空',
                        type: 'warning'
                    });
                    this.loading = false;
                    return;
                }
            }
            

            // 模拟提交
            setTimeout(() => {
                this.loading = false;
                this.$message({
                    message: '提交成功',
                    type: 'success'
                });
            }, 1000);

            
        },

        // 处理上传成功
        handleUploadSuccess(response, file, fileList) {
            console.log(response, file, fileList);
            this.ruleForm.applyFile = response.id;
        }
    },
}
</script>

<style scoped>
</style>