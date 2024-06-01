<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/"
                :onSuccess="handleSuccess"
                :before-upload="beforeUpload"
                style="margin-top: 24px;"
            >
                <el-button type="primary">点击上传</el-button>
            </el-upload>
            
            <el-divider></el-divider>

            <el-table :data="tableData" stripe border style="width: 95%;">
                <el-table-column prop="doi" label="DOI"></el-table-column>
                <el-table-column prop="doiName" label="数字对象名称"></el-table-column>
                <el-table-column prop="doiSource" label="数字对象来源"></el-table-column>
                <el-table-column prop="doiDesc" label="数字对象描述"></el-table-column>
                <el-table-column prop="project" label="数字对象所属项目"></el-table-column>
                <el-table-column prop="institution" label="数字对象所属机构"></el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="modifyDo(scope.row, scope.$index)">修改</el-button>
                        <el-button type="danger" size="small" @click="deleteDo(scope.row, scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div style="text-align: center; margin: 24px;">
                <el-button type="primary" @click="ferry">导入</el-button>
            </div>
        </div>

        <el-dialog title="数字对象修改" :visible.sync="modifyDialogVisible" :before-close="modifyCancel">
            <el-form :model="modifyForm" label-width="auto" class="ModifyForm">
                <el-form-item label="DOI" class="ModifyFormItem">
                    <el-input v-model="modifyForm.doi"></el-input>
                </el-form-item>
                <el-form-item label="数字对象名字" class="ModifyFormItem">
                    <el-input v-model="modifyForm.doiName"></el-input>
                </el-form-item>
                <el-form-item label="数字对象来源" class="ModifyFormItem">
                    <el-input v-model="modifyForm.doiSource"></el-input>
                </el-form-item>
                <el-form-item label="数字对象描述" class="ModifyFormItem">
                    <el-input v-model="modifyForm.doiDesc"></el-input>
                </el-form-item>
                <el-form-item label="数字对象所属项目" class="ModifyFormItem">
                    <el-input v-model="modifyForm.project"></el-input>
                </el-form-item>
                <el-form-item label="数字对象所属机构" class="ModifyFormItem">
                    <el-input v-model="modifyForm.institution"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modifyCancel">取 消</el-button>
                <el-button type="primary" @click="modifyConfirm">确 定</el-button>
            </span>
        </el-dialog>

    </div>

</template>

<script>

export default {
    name: "DigitalObjectImport",
    data() {
        return {
            uploadFile: "",
            uploadLoading: false,
            tableData: [
                {
                    // DOI
                    doi: '10.1000/182',
                    // 数字对象名称
                    doiName: '数字对象1',
                    // 数字对象来源
                    doiSource: '来源1',
                    // 数字对象描述
                    doiDesc: '描述1',
                    // doi所属项目
                    project: '项目1',
                    // doi所属机构
                    institution: '机构1',   
                }
            ],

            modifyForm: {
                // DOI
                doi: '',
                // 数字对象名称
                doiName: '',
                // 数字对象来源
                doiSource: '',
                // 数字对象描述
                doiDesc: '',
                // doi所属项目
                project: '',
                // doi所属机构
                institution: '',
            },
            modifyIndex: 0,
            modifyDialogVisible: false,
        };
    },
    mounted() { },
    methods: {
        beforeUpload(file) {
            console.log(file);
            this.uploadFile = file;
            this.uploadLoading = true;
            return false;
        },
        handleSuccess(response, file, fileList) {
            setTimeout(() => {
                this.uploadLoading = false;
            }, 1000);
            console.log(response, file, fileList);
        },
        ferry() {
            console.log(this.tableData);
        },
        modifyCancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.modifyDialogVisible = false;
            }).catch(() => { 
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        modifyDo(row, index) {
            this.modifyForm = {
                doi: row.doi,
                doiName: row.doiName,
                doiSource: row.doiSource,
                doiDesc: row.doiDesc,
                project: row.project,
                institution: row.institution,
            };
            this.modifyIndex = index;
            this.modifyDialogVisible = true;
        },
        modifyConfirm() {
            console.log(this.modifyForm);
            this.tableData[this.modifyIndex].doi = this.modifyForm.doi;
            this.tableData[this.modifyIndex].doiName = this.modifyForm.doiName;
            this.tableData[this.modifyIndex].doiSource = this.modifyForm.doiSource;
            this.tableData[this.modifyIndex].doiDesc = this.modifyForm.doiDesc;
            this.tableData[this.modifyIndex].project = this.modifyForm.project;
            this.tableData[this.modifyIndex].institution = this.modifyForm.institution;
            this.modifyDialogVisible = false;
        },
        deleteDo(row, index) {
            this.$confirm('此操作将永久删除该数字对象, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tableData.splice(index, 1);
            }).catch(() => { 
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
       
    },
}
</script>

<style scoped></style>