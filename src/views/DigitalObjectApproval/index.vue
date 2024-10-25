<template>
    <div style="text-align: center; margin: 24px 40px 24px 40px;">

        <el-collapse v-model="activeNames" @change="collapseChange">
            <el-collapse-item :title="collapseTitle" name="1">

                <el-form :model="searchForm" label-width="auto" class="SearchForm">
                    <el-form-item class="SearchFormItem" label="数字对象标识">
                        <el-input v-model="searchForm.doi"></el-input>
                    </el-form-item>
                    <el-form-item class="SearchFormItem" label="数字对象名字">
                        <el-input v-model="searchForm.name"></el-input>
                    </el-form-item>
                    <el-form-item prop="description" label="数字对象描述" class="SearchFormItem">
                        <el-input v-model="searchForm.description"></el-input>
                    </el-form-item>
                    <el-form-item prop="type" label="数字对象类型" class="SearchFormItem">
                        <el-input v-model="searchForm.type"></el-input>
                    </el-form-item>
                    <el-form-item class="SearchFormItem" label="申请人邮箱">
                        <el-input v-model="searchForm.applyEmail"></el-input>
                    </el-form-item>
                    <el-form-item prop="institutionName" label="所属项目名称" class="SearchFormItem">
                        <el-input v-model="searchForm.institutionName"></el-input>
                    </el-form-item>
                    <el-form-item prop="institutionDoi" label="所属项目标识" class="SearchFormItem">
                        <el-input v-model="searchForm.institutionDoi"></el-input>
                    </el-form-item>
                    <el-form-item class="SearchFormTimePicker" label="申请时间">
                        <el-date-picker v-model="searchForm.createTimeRange" value-format="timestamp"
                            type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                            align="right">
                        </el-date-picker>
                    </el-form-item>
                </el-form>

                <el-button type="primary" @click="searchData">搜索</el-button>
            </el-collapse-item>
        </el-collapse>

        <div style="margin-top: 24px;"></div>
        
        <el-table :data="approvalTable" style="width: 100%;" stripe border>
            <el-table-column prop="doi" label="数字对象标识"></el-table-column>
            <el-table-column prop="doName" label="数字对象名称"></el-table-column>
            <el-table-column prop="doDesc" label="数字对象描述"></el-table-column>
            <el-table-column prop="doType" label="数字对象类型"></el-table-column>
            <el-table-column prop="projectName" label="所属项目名称"></el-table-column>
            <el-table-column prop="projectDoi" label="所属项目标识"></el-table-column>
            <el-table-column prop="applyFile" label="申请文件" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini">下载</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="applyEmail" label="申请人邮箱"></el-table-column>
            <el-table-column prop="createTime" label="申请时间"></el-table-column>
            <el-table-column prop="operation" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button type="primary" @click="conductApproval(scope.row, scope.$index)"
                        size="mini">审批</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="margin: 24px">
            <el-pagination background layout="pager" :page-size="10" :page-count="pages" @current-change="clickPage">
            </el-pagination>
        </div>


        <el-dialog title="审批" :visible.sync="approvalDialogVisible">
            <el-form :model="approvalForm" label-width="80px">
                <el-form-item label="审批状态">
                    <el-select v-model="approvalForm.approvalStatus" placeholder="请选择">
                        <el-option label="通过" :value="1"></el-option>
                        <el-option label="拒绝" :value="2"></el-option>
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
            // 页数
            pages: 1,
            // 当前页数
            currentPage: 1,

            // 折叠
            activeNames: [],
            collapseTitle: "搜索栏（点击展开）",

            searchForm: {
            },

            // 表格数据
            approvalTable: [
                {
                    doi: 'DOI1',
                    doName: "名字1",
                    doDesc: "加密",
                    doType: 'EDC',
                    applyEmail: "12345@pku.edu.cn",
                    applyFile: '申请文件',
                    createTime: '2024',
                    updateTime: '更新时间',
                    appStatus: 1,
                },
                {
                    doi: 'DOI2',
                    doName: "名字2",
                    doDesc: "描述",
                    doType: 'SDTM',
                    applyEmail: "12345@pku.edu.cn",
                    applyFile: '申请文件',
                    createTime: '2024',
                    updateTime: '更新时间',
                    appStatus: 1,
                }
            ],

            approvalForm: {
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
    },
    methods: {
        clickPage(page) {
            this.currentPage = page;
            this.searchForm.page = this.currentPage;
            this.getData(this.searchForm);
        },
        searchData() {
            this.getData(postData);
        },
        collapseChange(activeNames) {
            if (activeNames.length === 0) {
                this.collapseTitle = "搜索栏（点击展开）";
            } else {
                this.collapseTitle = "搜索栏（点击收起）";
            }
        },
        getData(postData) {
        },
        // 进行审批
        conductApproval(row, index) {
            console.log(row, index);
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
        }
    },
}
</script>

<style>
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

.el-collapse-item__header {
    font-size: 16px;
    font-weight: 500;
    width: 100%;
    border: 0px;
}
</style>