<template>
    <div style="display: flex;">

        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">

            <el-form :model="searchForm" label-width="auto" class="SearchForm">
                <el-form-item label="DOI" class="SearchFormItem">
                    <el-input v-model="searchForm.doi"></el-input>
                </el-form-item>
                <el-form-item label="数字对象名字" class="SearchFormItem">
                    <el-input v-model="searchForm.doiName"></el-input>
                </el-form-item>
                <el-form-item label="数字对象来源" class="SearchFormItem">
                    <el-input v-model="searchForm.doiSource"></el-input>
                </el-form-item>
                <el-form-item label="数字对象描述" class="SearchFormItem">
                    <el-input v-model="searchForm.doiDesc"></el-input>
                </el-form-item>
                <el-form-item label="申请类型" class="SearchFormItem">
                    <el-select v-model="searchForm.applyType" placeholder="请选择">
                        <el-option label="指针型" value="1"></el-option>
                        <el-option label="实体型" value="2"></el-option>
                        <el-option label="统计型" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请人邮箱" class="SearchFormItem">
                    <el-input v-model="searchForm.applyUserEmail"></el-input>
                </el-form-item>
                <el-form-item label="审批状态" class="SearchFormItem">
                    <el-select v-model="searchForm.approvalStatus" placeholder="请选择">
                        <el-option label="待审批" value="0"></el-option>
                        <el-option label="已通过" value="1"></el-option>
                        <el-option label="未通过" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审批意见" class="SearchFormItem">
                    <el-input v-model="searchForm.approvalOpinion"></el-input>
                </el-form-item>

                <el-form-item label="申请时间" class="SearchFormTimePicker">
                    <el-date-picker
                        v-model="searchForm.applyTimeRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="审批时间" class="SearchFormTimePicker">
                    <el-date-picker
                        v-model="searchForm.approvalTimeRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>

            <el-button type="primary">搜索</el-button>
            <el-divider></el-divider>

            <el-table :data="approvalTable" style="width: 95%;" stripe border>
                <el-table-column prop="doi" label="DOI"></el-table-column>
                <el-table-column prop="doiName" label="数字对象名称"></el-table-column>
                <el-table-column prop="doiSource" label="数字对象来源"></el-table-column>
                <el-table-column prop="doiDesc" label="数字对象描述"></el-table-column>
                <el-table-column prop="applyFile" label="申请审批文件"></el-table-column>
                <el-table-column prop="applyType" label="申请类型"></el-table-column>
                <el-table-column prop="applyTime" label="申请时间"></el-table-column>
                <el-table-column prop="applyUserEmail" label="申请人邮箱"></el-table-column>
                <el-table-column prop="approvalStatus" label="审批状态">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.approvalStatus === 0">待审批</el-tag>
                        <el-tag v-if="scope.row.approvalStatus === 1" type="success">已通过</el-tag>
                        <el-tag v-if="scope.row.approvalStatus === 2" type="danger">未通过</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="approvalOpinion" label="审批意见"></el-table-column>
                <el-table-column prop="approvalTime" label="审批时间"></el-table-column>
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
export default {
    name: "DigitalObjectApproval",
    data() {
        return {
            // 审批表格数据
            approvalTable: [
                {
                    // DOI
                    doi: 'doi1', 
                    // 数字对象名称
                    doiName: '数字对象1',
                    // 数字对象来源
                    doiSource: '来源1',
                    // 数字对象描述
                    doiDesc: '描述1',
                    // 申请审批文件
                    applyFile: 'file1', 
                    // 申请类型
                    applyType: '指针型',
                    // 申请时间
                    applyTime: '2021-01-01',
                    // 申请人邮箱
                    applyUserEmail: 'email1',
                    // 审批状态
                    approvalStatus: 0,
                    // 审批意见
                    approvalOpinion: '无',
                    // 审批时间
                    approvalTime: '2021-01-02',
                },
            ],

            searchForm: {
                doi: '',
                doiName: '',
                doiSource: '',
                doiDesc: '',
                applyType: '',
                applyUserEmail: '',
                approvalStatus: '',
                approvalOpinion: '',
                applyTimeRange: '',
                approvalTimeRange: '',
            },

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
    mounted() { },
    methods: {
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