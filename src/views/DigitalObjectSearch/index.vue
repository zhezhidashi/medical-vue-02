<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <el-form :model="searchForm" label-width="auto" class="SearchForm">
                <el-form-item prop="project" label="项目名称" class="SearchFormItem">
                    <el-select v-model="searchForm.project" placeholder="请选择" style="width: 200px;">
                        <el-option v-for="item in projectOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="digitalObjectName" label="数字对象名称" class="SearchFormItem">
                    <el-input v-model="searchForm.digitalObjectName" style="width: 200px;"></el-input>
                </el-form-item>
            </el-form>

            <el-button type="primary">搜索</el-button>
            <el-divider></el-divider>

            <el-table :data="resultTable" stripe border style="width: 95%;">
                <el-table-column prop="project" label="项目名称"></el-table-column>
                <el-table-column prop="digitalObjectName" label="数字对象名称"></el-table-column>
                <el-table-column prop="digitalObjectDescription" label="数字对象描述"></el-table-column>
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
                project: '',
                digitalObjectName: '',
            },
            projectOptions: [
                { label: '项目1', value: '0' },
                { label: '项目2', value: '1' },
            ],

            resultTable: [
                { project: '项目1', digitalObjectName: '数字对象1', digitalObjectDescription: '描述1' },
                { project: '项目2', digitalObjectName: '数字对象2', digitalObjectDescription: '描述2' },
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