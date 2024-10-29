<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <el-form :model="searchForm" label-width="auto" :rules="rules" class="SearchForm">
                <el-form-item prop="project" label="项目" class="SearchFormItem">
                    <el-select v-model="searchForm.project" placeholder="请选择项目">
                        <el-option v-for="item in ProjectsList" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="doi" label="数字对象标识" class="SearchFormItem">
                    <el-input v-model="searchForm.doi"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="数字对象名称" class="SearchFormItem">
                    <el-input v-model="searchForm.name"></el-input>
                </el-form-item>
                <el-form-item prop="type" label="数字对象类型" class="SearchFormItem">
                        <el-select placeholder="请选择" v-model="searchForm.type">
                            <el-option v-for="(item, index) in doTypeList" :label="item.name" :value="item.value" :key="index"></el-option>
                        </el-select>
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
                <el-form-item prop="institutionName" label="机构名称" class="SearchFormItem">
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

            <div style="margin-bottom: 24px; display: flex; justify-content: center;">
                <div style="display: flex; flex-direction: column; justify-content: center; width: 70vw; padding: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
                    <div v-for="(item, index) in digitalObjectList" :key="index">
                        <el-checkbox style="margin: 5px;" v-model="item.selected">{{ item.name }}</el-checkbox>
                    </div>
                </div>
            </div>

            <!-- <div style="margin: 24px">
                <el-pagination background layout="pager" :page-size="10" :page-count="pages"
                    @current-change="clickPage">
                </el-pagination>
            </div> -->

            <div style="text-align: center;">
                <el-button type="primary" @click="ferry">导出</el-button>
            </div>
        </div>

    </div>

</template>

<script>
import { postForm } from '@/api/data';
export default {
    name: "DigitalObjectExport",
    data() {
        return {
            pages: 1,
            currentPage: 1,
            ProjectsList: [],
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
                // 机构名称
                institutionName: '',
                // 创建时间范围
                createTimeRange: [],
                // 更新时间范围
                updateTimeRange: [],
            },

            rules: {
                project: [
                    { required: true, message: '请选择项目', trigger: 'blur' }
                ]
            },

            digitalObjectList: [
                {
                    name: '数字对象1',
                    selected: false,
                },
                {
                    name: '数字对象22',
                    selected: false,
                },
                {
                    name: '数字对象333',
                    selected: false,
                },
            ],

            doTypeList: [
                { name: "EDC",  value: 0 },
                { name: "SDTM",  value: 1 },
                { name: "ADAM",  value: 2 },
                { name: "代码",  value: 3 },
                { name: "结构化数据", value: 4 },
                { name: "非结构化数据", value: 5 }
            ],
        };
    },
    mounted() { 
        let _this = this;
        postForm('/projectInfos/getProjectInfo', {size: -1}, _this, function(res) {
            if(res.code === 200) {
                for (let item of res.data.records) {
                    _this.ProjectsList.push({
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
            this.digitalObjectList = [];
            postData.pageSize = -1;
            // postData.pageNo = this.currentPage;
            let _this = this;
            postForm('/registry/searchMetaData', postData, _this, function(res) {
                if(res.code === 200) {
                    _this.pages = res.data.pages;
                    for(let item of res.data.records) {
                        _this.digitalObjectList.push({
                            name: item.name,
                            selected: false,
                        })
                    }
                }
            })
        },
        
        ferry() {
            const selectedDigitalObject = this.digitalObjectList.filter(item => item.selected);
            console.log(selectedDigitalObject);
        },
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