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
                    <el-form-item class="SearchFormTimePicker" label="审批时间">
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
            <el-table-column prop="selected" width="50" align="center">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.selected"></el-checkbox>
                </template>
                
            </el-table-column>
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
            <el-table-column prop="createTime" label="审批时间"></el-table-column>
        </el-table>

        <div style="margin: 24px">
            <el-pagination background layout="pager" :page-size="10" :page-count="pages" @current-change="clickPage">
            </el-pagination>
        </div>

        <div div style="text-align: center">
            <el-button type="primary" @click="exportApproval">导出</el-button>
        </div>
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
                    doi: '123456',
                    doName: "名称1",
                    doDesc: "加密",
                    doType: 'EDC',
                    applyEmail: "12345@pku.edu.cn",
                    applyFile: '申请文件',
                    createTime: '2024',
                    updateTime: '更新时间',
                    selected: false,
                },
                {
                    doi: '123457',
                    doName: "名称2",
                    doDesc: "加密",
                    doType: 'SDTM',
                    applyEmail: "12345@pku.edu.cn",
                    applyFile: '申请文件',
                    createTime: '2024',
                    updateTime: '更新时间',
                    selected: false,
                }
            ],

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
        exportApproval() {
            this.$message({
                type: "success",
                message: "已导出审批通过的数字对象标识及其对应的动态公钥"
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