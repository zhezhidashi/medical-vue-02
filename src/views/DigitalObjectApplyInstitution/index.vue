<template>
    <div style="text-align: center; margin: 24px 40px 24px 40px;">

        <el-collapse v-model="activeNames" @change="collapseChange">
            <el-collapse-item :title="collapseTitle" name="1">
                <el-form :model="searchForm" label-width="auto" class="SearchForm">
                    <el-form-item class="SearchFormItem" label="申请机构标识">
                        <el-input v-model="searchForm.applicantInstitutionDoi"></el-input>
                    </el-form-item>
                    <el-form-item class="SearchFormItem" label="接受机构标识">
                        <el-input v-model="searchForm.recipientInstitutionDoi"></el-input>
                    </el-form-item>
                    <el-form-item class="SearchFormItem" label="数字对象标识">
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
                        <el-date-picker v-model="searchForm.createTimeRange" value-format="timestamp"
                            type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                            align="right">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item class="SearchFormTimePicker" label="更新时间范围">
                        <el-date-picker v-model="searchForm.updateTimeRange" value-format="timestamp"
                            type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
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
            </el-collapse-item>
        </el-collapse>
        <div style="margin-top: 24px;"></div>
        <el-table :data="applyTable" style="width: 95%;" stripe border>
            <el-table-column prop="applicantInstitutionDoi" label="申请机构标识"></el-table-column>
            <el-table-column prop="recipientInstitutionDoi" label="接受机构标识"></el-table-column>
            <el-table-column prop="doi" label="数字对象标识"></el-table-column>
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
        </el-table>
        <div style="margin: 24px">
            <el-pagination background layout="pager" :page-size="10" :page-count="pages" @current-change="clickPage">
            </el-pagination>
        </div>

    </div>

</template>

<script>
import { postForm } from '@/api/data'
export default {
    name: "DigitalObjectApplyInstitution",
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
                    doi: '数字对象标识',
                    appType: '申请类型',
                    appName: '申请名称',
                    appContent: '申请内容',
                    applyFile: '申请文件',
                    createTime: '创建时间',
                    updateTime: '更新时间',
                    appStatus: 1,
                }
            ],

        };
    },
    mounted() {
        this.getData({});
    },
    methods: {
        clickPage(page) {
            this.currentPage = page;
            this.searchForm.page = this.currentPage;
            this.getData(this.searchForm);
        },
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
            if (this.searchForm.createTimeRange && this.searchForm.createTimeRange.length > 1) {
                postData.createTimeBegin = this.searchForm.createTimeRange[0];
                postData.createTimeEnd = this.searchForm.createTimeRange[1] + 86399999;
            }
            if (this.searchForm.updateTimeRange && this.searchForm.updateTimeRange.length > 1) {
                postData.updateTimeBegin = this.searchForm.updateTimeRange[0];
                postData.updateTimeEnd = this.searchForm.updateTimeRange[1] + 86399999;
            }
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
            let _this = this;
            this.applyTable = [];
            postForm('/doApplication/getInstApplication', postData, _this, function (res) {
                _this.pages = res.data.pages;
                for (let item of res.data.records) {
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
                        createTime: new Date(item.createTime).toLocaleDateString(),
                        updateTime: new Date(item.updateTime).toLocaleDateString(),
                        appStatus: item.appStatus,
                    })
                }
            })
        },
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