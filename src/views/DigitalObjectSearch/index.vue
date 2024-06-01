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
                <el-form-item label="数字对象所属项目" class="SearchFormItem">
                    <el-input v-model="searchForm.project"></el-input>
                </el-form-item>
                <el-form-item label="数字对象所属机构" class="SearchFormItem">
                    <el-input v-model="searchForm.institution"></el-input>
                </el-form-item>
            </el-form>

            <el-button type="primary">搜索</el-button>
            <el-divider></el-divider>

            <el-table :data="resultTable" stripe border style="width: 95%;">
                <el-table-column prop="doi" label="DOI"></el-table-column>
                <el-table-column prop="doiName" label="数字对象名称"></el-table-column>
                <el-table-column prop="doiSource" label="数字对象来源"></el-table-column>
                <el-table-column prop="doiDesc" label="数字对象描述"></el-table-column>
                <el-table-column prop="project" label="数字对象所属项目"></el-table-column>
                <el-table-column prop="institution" label="数字对象所属机构"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
export default {
    name: "DigitalObjectSearch",
    data() {
        return {
            searchForm: {
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
    mounted() {},
    methods: {},
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