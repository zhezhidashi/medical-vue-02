<template>
    <div style="display: flex;">

        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">

            <el-form :model="searchForm" label-width="auto" class="SearchForm">
                <el-form-item class="SearchFormItem" label="申请机构DOI">
                    <el-input v-model="searchForm.applicantInstitutionDoi"></el-input>
                </el-form-item>
                <el-form-item class="SearchFormItem" label="接受机构DOI">
                    <el-input v-model="searchForm.recipientInstitutionDoi"></el-input>
                </el-form-item>
                <el-form-item class="SearchFormItem" label="DOI">
                    <el-input v-model="searchForm.doi"></el-input>
                </el-form-item>
                <el-form-item class="SearchFormItem" label="申请类型">
                    <el-select v-model="searchForm.appType" placeholder="请选择" clearable>
                        <el-option label="实体型" value="1"></el-option>
                        <el-option label="指针型" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="SearchFormItem" label="申请名称">
                    <el-input v-model="searchForm.appName"></el-input>
                </el-form-item>
                <el-form-item class="SearchFormItem" label="申请内容">
                    <el-input v-model="searchForm.appContent"></el-input>
                </el-form-item>
                <el-form-item class="SearchFormItem" label="申请文件">
                    <el-input v-model="searchForm.applyFile"></el-input>
                </el-form-item>
                <el-form-item class="SearchFormTimePicker" label="创建时间范围">
                    <el-date-picker
                        v-model="searchForm.createTimeRange"
                        value-format="timestamp"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="SearchFormTimePicker" label="更新时间范围">
                    <el-date-picker
                        v-model="searchForm.updateTimeRange"
                        value-format="timestamp"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="SearchFormItem" label="申请状态">
                    <el-select v-model="searchForm.appStatus" placeholder="请选择" clearable>
                        <el-option label="已批准" value="1"></el-option>
                        <el-option label="已拒绝" value="2"></el-option>
                        <el-option label="待审核" value="3"></el-option>
                        <el-option label="无效记录" value="4"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <el-button type="primary" @click="searchData">搜索</el-button>

            <el-divider></el-divider>

            <div style="display: flex; align-items: center; justify-content: center;">
                <el-button @click="addApply" type="primary" style="margin-bottom: 24px;">增加申请</el-button>
            </div>

            <el-table :data="applyTable" style="width: 95%;" stripe border >
                <el-table-column prop="applicantInstitutionDoi" label="申请机构DOI"></el-table-column>
                <el-table-column prop="recipientInstitutionDoi" label="接受机构DOI"></el-table-column>
                <el-table-column prop="doi" label="DOI"></el-table-column>
                <el-table-column prop="appType" label="申请类型">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.appType === 1">实体型</el-tag>
                        <el-tag v-else-if="scope.row.appType === 2">指针型</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="appName" label="申请名称"></el-table-column>
                <el-table-column prop="appContent" label="申请内容"></el-table-column>
                <el-table-column prop="applyFile" label="申请文件"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="updateTime" label="更新时间"></el-table-column>
                <el-table-column prop="appStatus" label="申请状态">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.appStatus === 1" type="success">已批准</el-tag>
                        <el-tag v-else-if="scope.row.appStatus === 2" type="error">已拒绝</el-tag>
                        <el-tag v-else-if="scope.row.appStatus === 3">待审核</el-tag>
                        <el-tag v-else-if="scope.row.appStatus === 4" type="warning">无效记录</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="changeApply(scope.row, scope.$index)" type="text" size="small">修改</el-button>
                        <el-button @click="deleteApply(scope.$index)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="增加申请" :visible.sync="addApplyDialogVisible" width="80%"
                :before-close="addApplyCancel">
                <el-form :model="applyForm" ref="applyForm" label-width="auto">

                    <el-form-item label="DOI" prop="doi">
                        <el-input v-model="applyForm.doi"></el-input>
                    </el-form-item>

                    <el-form-item label="数字对象名字" prop="doiName">
                        <el-input v-model="applyForm.doiName"></el-input>
                    </el-form-item>

                    <el-form-item label="申请人邮箱" prop="applyUserEmail">
                        <el-input v-model="applyForm.applyUserEmail"></el-input>
                    </el-form-item>

                    <el-form-item label="申请审批文件" prop="applyFile">
                        <el-upload class="upload-demo" drag action="/api/file/upload" :on-success="handleUploadSuccess">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="申请类型" prop="applyType">
                        <el-radio-group v-model="applyForm.applyType">
                            <el-radio label="1">实体型</el-radio>
                            <el-radio label="2">指针型</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="addApplyCancel">取 消</el-button>
                    <el-button type="primary" @click="addApplyConfirm">确 定</el-button>
                </span>
            </el-dialog>

            <el-dialog title="修改申请" :visible.sync="modifyDialogVisible" width="80%"
                :before-close="modifyCancel">
                <el-form :model="modifyForm" ref="modifyForm" label-width="auto">

                    <el-form-item label="DOI" prop="doi">
                        <el-input v-model="modifyForm.doi"></el-input>
                    </el-form-item>

                    <el-form-item label="数字对象名字" prop="doiName">
                        <el-input v-model="modifyForm.doiName"></el-input>
                    </el-form-item>

                    <el-form-item label="申请人邮箱" prop="applyUserEmail">
                        <el-input v-model="modifyForm.applyUserEmail"></el-input>
                    </el-form-item>

                    <el-form-item label="申请审批文件" prop="applyFile">
                        <el-upload class="upload-demo" drag action="/api/file/upload" :on-success="handleUploadSuccess">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="申请类型" prop="applyType">
                        <el-radio-group v-model="modifyForm.applyType">
                            <el-radio label="1">实体型</el-radio>
                            <el-radio label="2">指针型</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="modifyCancel">取 消</el-button>
                    <el-button type="primary" @click="modifyConfirm">确 定</el-button>
                </span>
            </el-dialog>
        </div>

    </div>

</template>

<script>
import { postForm } from '@/api/data'
export default {
    name: "DigitalObjectApplyUser",
    data() {
        return {
            searchForm : {
                // 申请机构DOI
                applicantInstitutionDoi: undefined,
                // 申请人ID
                applicantUserId: undefined,
                // 接受机构DOI
                recipientInstitutionDoi: undefined,
                // DOI
                doi: undefined,
                // 申请类型
                appType: undefined,
                // 申请名称
                appName: undefined,
                // 申请内容
                appContent: undefined,
                // 申请文件
                applyFile: undefined,
                // 创建时间范围
                createTimeRange: undefined,
                // 更新时间范围
                updateTimeRange: undefined,
                // 申请状态
                appStatus: undefined,
            },

            // 表格数据
            applyTable: [
                {
                    appId: 1,
                    applicantInstitutionDoi: '申请机构DOI',
                    applicantUserId: '申请人ID',
                    recipientInstitutionDoi: '接受机构DOI',
                    doi: 'DOI',
                    appType: '申请类型',
                    appName: '申请名称',
                    appContent: '申请内容',
                    applyFile: '申请文件',
                    createTime: '创建时间',
                    updateTime: '更新时间',
                    appStatus: 1,
                }
            ],

            // 表单数据
            applyForm: {
                // 待申请DOI
                doi: undefined,
                // 数字对象名字
                doiName: undefined,
                // 申请审批文件
                applyFile: undefined,
                // 申请类型
                applyType: undefined,
                // 申请人邮箱
                applyUserEmail: undefined,
            },
            addApplyDialogVisible: false,

            modifyIndex: 0,
            modifyDialogVisible: false,
            modifyForm: {
                // DOI
                doi: '',
                // 数字对象名称
                doiName: '',
                // 申请审批文件
                applyFile: '',
                // 申请类型
                applyType: '',
                // 申请人邮箱
                applyUserEmail: '',
            },
        };
    },
    mounted() {
        this.getData({});
     },
    methods: {
        searchData() {
            let postData = {
                applicantInstitutionDoi: this.searchForm.applicantInstitutionDoi,
                recipientInstitutionDoi: this.searchForm.recipientInstitutionDoi,
                doi: this.searchForm.doi,
                appType: this.searchForm.appType,
                appName: this.searchForm.appName,
                appContent: this.searchForm.appContent,
                applyFile: this.searchForm.applyFile,
                appStatus: this.searchForm.appStatus,
            }
            if(this.searchForm.createTimeRange) {
                postData.createTimeBegin = this.searchForm.createTimeRange[0];
                postData.createTimeEnd = this.searchForm.createTimeRange[1];
            }
            if(this.searchForm.updateTimeRange) {
                postData.updateTimeBegin = this.searchForm.updateTimeRange[0];
                postData.updateTimeEnd = this.searchForm.updateTimeRange[1];
            }
            this.getData(postData);
        },
        getData(postData) {
            let _this = this;
            this.applyTable = [];
            postForm('/doApplication/getUserApplication', postData, _this, function(res) {
                for(let item of res.data.records) {
                    _this.applyTable.push({
                        appId: item.appId,
                        applicantInstitutionDoi: item.applicantInstitutionDoi,
                        applicantUserId: item.applicantUserId,
                        recipientInstitutionDoi: item.recipientInstitutionDoi,
                        doi: item.doi,
                        appType: item.appType,
                        appName: item.appName,
                        appContent: item.appContent,
                        applyFile: item.applyFile,
                        createTime: new Date(item.createTime).toLocaleString(),
                        updateTime: new Date(item.updateTime).toLocaleString(),
                        appStatus: item.appStatus,
                    })
                }
            })
        },
        // 处理上传成功
        handleUploadSuccess(response, file, fileList) {
            console.log(response, file, fileList);
            this.applyForm.applyFile = response.id;
        },

        // 增加申请
        addApply() {
            this.addApplyDialogVisible = true;
            this.applyForm = {
                doi: '',
                doiName: '',
                applyFile: '',
                applyType: '',
                applyUserEmail: '',
            }
        },

        // 取消增加申请
        addApplyCancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.addApplyDialogVisible = false;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },

        // 确定增加申请
        addApplyConfirm() {
            console.log(this.applyForm);
            this.addApplyDialogVisible = false;
            this.applyTable.push({
                doi: this.applyForm.doi,
                doiName: this.applyForm.doiName,
                applyFile: this.applyForm.applyFile,
                applyType: this.applyForm.applyType,
                applyUserEmail: this.applyForm.applyUserEmail,
            })
            this.$message({
                message: '增加申请成功',
                type: 'success'
            });
        },

        // 修改申请
        changeApply(row, index) {
            this.modifyDialogVisible = true;
            this.modifyIndex = index;
            this.modifyForm = {
                doi: row.doi,
                doiName: row.doiName,
                applyFile: row.applyFile,
                applyType: row.applyType,
                applyUserEmail: row.applyUserEmail,
            }
        },
        
        // 取消修改申请
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

        // 确定修改申请
        modifyConfirm() {
            console.log(this.modifyForm);
            this.applyTable[this.modifyIndex].doi = this.modifyForm.doi;
            this.applyTable[this.modifyIndex].doiName = this.modifyForm.doiName;
            this.applyTable[this.modifyIndex].applyFile = this.modifyForm.applyFile;
            this.applyTable[this.modifyIndex].applyType = this.modifyForm.applyType;
            this.applyTable[this.modifyIndex].applyUserEmail = this.modifyForm.applyUserEmail;
            this.modifyDialogVisible = false;
            this.$message({
                message: '修改申请成功',
                type: 'success'
            });
        },

        // 删除申请
        deleteApply(index) {
            this.$confirm('此操作将永久删除该申请, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.applyTable.splice(index, 1);
                this.$message({
                    message: '删除申请成功',
                    type: 'success'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
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
    width: 280px;
}
.SearchFormTimePicker {
    margin: 0 24px 24px 24px;
    width: 460px;
}
</style>