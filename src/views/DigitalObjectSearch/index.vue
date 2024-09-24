<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <el-form :model="searchForm" label-width="auto" :rules="rules" class="SearchForm">
                <el-form-item prop="project" label="项目" class="SearchFormItem">
                    <el-select v-model="searchForm.project" placeholder="请选择项目">
                        <el-option v-for="item in projectList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                    <!-- <el-input v-model="searchForm.project" placeholder="请输入项目DOI"></el-input> -->
                </el-form-item>
                <el-form-item prop="doi" label="数字对象标识" class="SearchFormItem">
                    <el-input v-model="searchForm.doi"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="数字对象名称" class="SearchFormItem">
                    <el-input v-model="searchForm.name"></el-input>
                </el-form-item>
                <el-form-item prop="type" label="数字对象类型" class="SearchFormItem">
                    <el-input v-model="searchForm.type"></el-input>
                </el-form-item>
                <el-form-item prop="status" label="数字对象状态" class="SearchFormItem">
                    <el-input v-model="searchForm.status"></el-input>
                </el-form-item>
                <el-form-item prop="description" label="数字对象描述" class="SearchFormItem">
                    <el-input v-model="searchForm.description"></el-input>
                </el-form-item>
                <el-form-item prop="source" label="数字对象来源" class="SearchFormItem">
                    <el-input v-model="searchForm.source"></el-input>
                </el-form-item>
                <el-form-item prop="institutionDoi" label="机构DOI" class="SearchFormItem">
                    <el-input v-model="searchForm.institutionDoi"></el-input>
                </el-form-item>
                <el-form-item prop="institutionName" label="机构名字" class="SearchFormItem">
                    <el-input v-model="searchForm.institutionName"></el-input>
                </el-form-item>
                <el-form-item prop="createTimeRange" label="创建时间范围" class="SearchFormTimePicker">
                    <el-date-picker value-format="timestamp" type="daterange" v-model="searchForm.createTimeRange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="updateTimeRange" label="更新时间范围" class="SearchFormTimePicker">
                    <el-date-picker value-format="timestamp" type="daterange" v-model="searchForm.updateTimeRange" range-separator="至"
                        start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>

                
            </el-form>

            <el-button type="primary" @click="searchData">搜索</el-button>
            <el-divider></el-divider>

            <el-table :data="resultTable" stripe border style="width: 95%;">
                <el-table-column prop="doi" label="数字对象标识"></el-table-column>
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
            projectList: [],
            searchForm: {
                // 项目
                project: '',
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
                project: [
                    { required: true, message: '请选择项目', trigger: 'blur' }
                ]
            },

            resultTable: [
                // {
                //     doi: 'doi1',
                //     doiName: '数字对象1',
                //     doiSource: '来源1',
                //     doiDesc: '描述1',
                //     project: '项目1',
                //     institution: '机构1',
                // }
            ],
        };
    },
    mounted() {
        let _this = this;
        postForm('/projectInfos/getProjectInfo', {}, _this, function(res) {
            if(res.code === 200) {
                for (let item of res.data.records) {
                    _this.projectList.push({
                        label: item.name,
                        value: item.projectDoi,
                    })
                }
            }
        })
    },
    methods: {
        clickPage(page) {
            this.currentPage = page;
            this.searchForm.pageNo = this.currentPage;
            this.getData(this.searchForm);
        },
        searchData() {
            if (this.searchForm.project === "") {
                this.$message.warning('请选择项目');
                return;
            }
            let postData = {
                projectDoi: this.searchForm.project,
                doi: this.searchForm.doi,
                name: this.searchForm.name,
                type: this.searchForm.type,
                status: this.searchForm.status,
                description: this.searchForm.description,
                source: this.searchForm.source,
                institutionDoi: this.searchForm.institutionDoi,
                institutionName: this.searchForm.institutionName,
            };
            if (this.searchForm.createTimeRange && this.searchForm.createTimeRange.length > 1) {
                postData.createTimeStart = this.searchForm.createTimeRange[0];
                postData.createTimeEnd = this.searchForm.createTimeRange[1] + 86399999;
            }
            if (this.searchForm.updateTimeRange && this.searchForm.updateTimeRange.length > 1) {
                postData.updateTimeStart = this.searchForm.updateTimeRange[0];
                postData.updateTimeEnd = this.searchForm.updateTimeRange[1] + 86399999;
            }
            this.getData(postData);
        },
        
        getData(postData) {
            this.resultTable = [];
            postData.pageSize = 10;
            postData.pageNo = this.currentPage;
            let _this = this;
            postForm('/registry/searchMetaData', postData, _this, function(res){
                if(res.code === 200) {
                    _this.pages = res.data.pages;
                    for(let item of res.data.list) {
                        _this.resultTable.push({
                            doi: item.doi,
                            doiName: item.name,
                            doiSource: item.source,
                            doiDesc: item.description,
                            project: item.project,
                            institution: item.institution,
                        })
                    }
                }
            })
        }
    },
}
</script>

<style scoped>
.TableItem {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

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