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

            <el-table :data="approvalTable" style="width: 95%;" stripe border>
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
                <el-table-column prop="operation" label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="conductApproval(scope.row, scope.$index)" size="mini">审批</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog title="审批" :visible.sync="approvalDialogVisible">
            <el-form :model="approvalForm" label-width="80px">
                <el-form-item label="审批状态">
                    <el-select v-model="approvalForm.approvalStatus" placeholder="请选择">
                        <el-option label="已通过" value="1"></el-option>
                        <el-option label="未通过" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审批意见">
                    <el-input v-model="approvalForm.approvalOpinion"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="approvalCancel">取 消</el-button>
                <el-button type="primary" @click="approvalConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { postForm } from '@/api/data'
export default {
    name: "DigitalObjectApproval",
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
            approvalTable: [
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

            approvalForm :{
                // 审批状态
                approvalStatus: undefined,
                // 审批意见
                approvalOpinion: undefined,
            },
            approvalDialogVisible: false,
            approvalIndex: 0,
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
            this.approvalTable = [];
            postForm('/doApplication/getApprovalList', postData, _this, function(res) {
                for(let item of res.data.records) {
                    _this.approvalTable.push({
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
        // 进行审批
        conductApproval(row, index) {
            this.approvalDialogVisible = true;
            this.approvalIndex = index;
        },
        // 取消审批
        approvalCancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.approvalDialogVisible = false;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        // 确定审批
        approvalConfirm() {
            this.approvalDialogVisible = false;
            this.approvalTable[this.approvalIndex].approvalStatus = this.approvalForm.approvalStatus === '1' ? 1 : 2;
            this.approvalTable[this.approvalIndex].approvalOpinion = this.approvalForm.approvalOpinion;
            this.$message({
                message: '审批完成',
                type: 'success'
            });
        }
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