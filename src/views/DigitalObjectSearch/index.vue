<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <el-form :model="searchForm" label-width="auto" :rules="rules" class="SearchForm">
                <el-form-item class="SearchFormItem">
                    <el-input v-model="searchForm.projectDoi" placeholder="项目DOI"></el-input>
                </el-form-item>
                <el-form-item class="SearchFormItem">
                    <el-input v-model="searchForm.doi" placeholder="DOI"></el-input>
                </el-form-item>
                <el-form-item class="SearchFormItem">
                    <el-input v-model="searchForm.name" placeholder="数字对象名称"></el-input>
                </el-form-item>
                <el-form-item class="SearchFormItem">
                    <el-input v-model="searchForm.type" placeholder="数字对象类型"></el-input>
                </el-form-item>
                <el-form-item class="SearchFormItem">
                    <el-input v-model="searchForm.status" placeholder="数字对象状态"></el-input>
                </el-form-item>
                <el-form-item class="SearchFormItem">
                    <el-input v-model="searchForm.description" placeholder="数字对象描述"></el-input>
                </el-form-item>
                <el-form-item class="SearchFormItem">
                    <el-input v-model="searchForm.source" placeholder="数字对象来源"></el-input>
                </el-form-item>
                <el-form-item class="SearchFormItem">
                    <el-input v-model="searchForm.institutionDoi" placeholder="机构DOI"></el-input>
                </el-form-item>
                <el-form-item class="SearchFormItem">
                    <el-input v-model="searchForm.institutionName" placeholder="机构名字"></el-input>
                </el-form-item>
                <el-form-item class="SearchFormItem">
                    <el-date-picker
                        v-model="searchForm.createTimeRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="SearchFormItem">
                    <el-date-picker
                        v-model="searchForm.updateTimeRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-form>

            <el-button type="primary" @click="searchData">搜索</el-button>
            <el-divider></el-divider>

            <el-table :data="resultTable" stripe border style="width: 95%;">
                <el-table-column prop="doi" label="DOI"></el-table-column>
                <el-table-column prop="doiName" label="数字对象名称"></el-table-column>
                <el-table-column prop="doiSource" label="数字对象来源"></el-table-column>
                <el-table-column prop="doiDesc" label="数字对象描述"></el-table-column>
                <el-table-column prop="project" label="数字对象所属项目"></el-table-column>
                <el-table-column prop="institution" label="数字对象所属机构"></el-table-column>
            </el-table>

            <div style="margin: 24px">
                <el-pagination background layout="pager" :page-size="10" :page-count="pages"
                    @current-change="clickPage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { postForm } from '@/api/data'
export default {
    name: "DigitalObjectSearch",
    data() {
        return {
            pages: 1,
            currentPage: 1,
            searchForm: {
                // 项目DOI
                projectDoi: '',
                // DOI
                doi: '',
                // 数字对象名称
                name: '',
                // 数字对象类型
                type: '',
                // 数字对象状态
                status: '',
                // 数字对象描述
                description: '',
                // 数字对象来源
                source: '',
                // 机构DOI
                institutionDoi: '',
                // 机构名字
                institutionName: '',
                // 创建时间范围
                createTimeRange: [],
                // 更新时间范围
                updateTimeRange: [],
                // 页码
                pageNo: 1,
            },

            rules: {
                projectDoi: [
                    { required: false, message: '请输入项目DOI', trigger: 'blur' }
                ]
            },

            resultTable: [
                {
                    doi: 'doi1',
                    doiName: '数字对象1',
                    doiSource: '来源1',
                    doiDesc: '描述1',
                    project: '项目1',
                    institution: '机构1',
                }
            ],
        };
    },
    mounted() {
        this.getData({})
    },
    methods: {
        clickPage(page) {
            this.currentPage = page;
            this.searchForm.pageNo = this.currentPage;
            this.getData(this.searchForm);
        },
        searchData() {
            if (this.searchData.projectDoi === '') {
                this.$message.warn('请输入项目DOI');
                return;
            }

            let postData = {
                projectDoi: this.searchForm.projectDoi,
                doi: this.searchForm.doi,
                name: this.searchForm.name,
                type: this.searchForm.type,
                status: this.searchForm.status,
                description: this.searchForm.description,
                source: this.searchForm.source,
                institutionDoi: this.searchForm.institutionDoi,
                institutionName: this.searchForm.institutionName,
            };
            if (this.searchForm.createTimeRange.length > 0) {
                postData.createTimeStart = this.searchForm.createTimeRange[0];
                postData.createTimeEnd = this.searchForm.createTimeRange[1];
            }
            if (this.searchForm.updateTimeRange.length > 0) {
                postData.updateTimeStart = this.searchForm.updateTimeRange[0];
                postData.updateTimeEnd = this.searchForm.updateTimeRange[1];
            }
        },
        
        getData(postData) {
            _this.resultTable = [];
            postData.pageSize = 10;
            postData.pageNo = this.currentPage;
            let _this = this;
            postForm('/registry/searchMetaData', postData, _this, function(res){
                _this.pages = res.data.pages;
                for(let item of res.data.records) {
                    _this.resultTable.push({
                        doi: item.doi,
                        doiName: item.name,
                        doiSource: item.source,
                        doiDesc: item.description,
                        project: item.project,
                        institution: item.institution,
                    })
                }
            })
        }
    },
}
</script>

<style scoped>
.SearchForm {
    display: flex;
    flex-wrap: wrap;
    margin-top: 24px;
}
.SearchFormItem {
    margin: 0 24px 24px 24px;
}

</style>