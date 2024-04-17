<template>
    <div style="display: flex;">
        <common-aside :activeIndex="'5'"></common-aside>

        <div style="display: flex; flex-direction: column; align-items: center; background-color: aqua; width: 100%;">
            <div style="display: flex; align-items: center; justify-content: center;">
                <el-button @click="addApply" type="primary" style="margin: 10px;">增加申请</el-button>
            </div>

            <el-table :data="applyTable" style="width: 95%;" stripe border>
                <el-table-column prop="dataItem" label="数据条目"></el-table-column>
                <el-table-column prop="infoItem" label="信息项"></el-table-column>
                <el-table-column prop="doi" label="待申请DOI"></el-table-column>
                <el-table-column prop="applyFile" label="申请审批文件"></el-table-column>
                <el-table-column prop="applyType" label="申请类型"></el-table-column>
            </el-table>

            <el-dialog title="增加申请" :visible.sync="addApplyDialogVisible" width="80%"
                :before-close="addApplyCancel">
                <el-form :model="applyForm" ref="applyForm" class="demo-ruleForm" label-width="auto">

                    <el-form-item label="数据条目" prop="dataItem">
                        <el-input v-model="applyForm.dataItem"></el-input>
                    </el-form-item>

                    <el-form-item label="信息项" prop="infoItem">
                        <el-input v-model="applyForm.infoItem"></el-input>
                    </el-form-item>

                    <el-form-item label="待申请DOI" prop="doi">
                        <el-input v-model="applyForm.doi"></el-input>
                    </el-form-item>

                    <el-form-item label="申请审批文件" prop="applyFile">
                        <el-upload class="upload-demo" drag action="/api/posts/" :on-success="handleUploadSuccess">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="申请类型" prop="applyType">
                        <el-radio-group v-model="applyForm.applyType">
                            <el-radio label="1">指针型</el-radio>
                            <el-radio label="2">实体型</el-radio>
                            <el-radio label="3">统计型</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="addApplyCancel">取 消</el-button>
                    <el-button type="primary" @click="addApplyConfirm">确 定</el-button>
                </span>
            </el-dialog>
        </div>

    </div>

</template>

<script>
import CommonAside from '@/components/CommonAside.vue';
export default {
    name: "DigitalObjectApply",
    components: {
        CommonAside,
    },
    data() {
        return {
            // 表格数据
            applyTable: [
                { dataItem: '数据条目1', infoItem: '信息项1', doi: 'doi1', applyFile: 'file1', applyType: '指针型' },
                { dataItem: '数据条目2', infoItem: '信息项2', doi: 'doi2', applyFile: 'file2', applyType: '实体型' },
                { dataItem: '数据条目3', infoItem: '信息项3', doi: 'doi3', applyFile: 'file3', applyType: '统计型' },
            ],

            // 表单数据
            applyForm: {
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
            addApplyDialogVisible: false,

        };
    },
    mounted() { },
    methods: {
        // 处理上传成功
        handleUploadSuccess(response, file, fileList) {
            console.log(response, file, fileList);
            this.applyForm.applyFile = response.id;
        },

        // 增加申请
        addApply() {
            this.addApplyDialogVisible = true;
        },

        // 取消增加申请
        addApplyCancel() {
            this.addApplyDialogVisible = false;
        },

        // 确定增加申请
        addApplyConfirm() {
            console.log(this.applyForm);
            this.addApplyDialogVisible = false;
            this.applyTable.push({
                dataItem: this.applyForm.dataItem,
                infoItem: this.applyForm.infoItem,
                doi: this.applyForm.doi,
                applyFile: this.applyForm.applyFile,
                applyType: this.applyForm.applyType,
            })
        },
    },
}
</script>

<style scoped></style>