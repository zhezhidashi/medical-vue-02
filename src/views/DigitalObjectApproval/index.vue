<template>
    <div style="display: flex;">
        <!-- <common-aside :activeIndex="'6'"></common-aside> -->
        
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">

            <el-form :model="searchForm" label-width="auto" class="SearchForm">
                <el-form-item prop="projectType" label="项目类型" class="SearchFormItem">
                    <el-select v-model="searchForm.projectType" placeholder="请选择" style="width: 200px;">
                        <el-option label="本机构牵头项目" value="0"></el-option>
                        <el-option label="本机构参与项目" value="1"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item prop="projectName" label="项目名称" class="SearchFormItem">
                    <el-input v-model="searchForm.projectName" style="width: 200px;"></el-input>
                </el-form-item>

                <el-form-item prop="approvalStatus" label="审批状态" class="SearchFormItem">
                    <el-select v-model="searchForm.approvalStatus" placeholder="请选择" style="width: 200px;">
                        <el-option label="已通过" value="0"></el-option>
                        <el-option label="不通过" value="1"></el-option>
                        <el-option label="待审批" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <el-button type="primary">搜索</el-button>
            <el-divider></el-divider>

            <el-table :data="approvalTable" style="width: 95%;" stripe border>
                <el-table-column prop="dataItem" label="数据条目"></el-table-column>
                <el-table-column prop="infoItem" label="信息项"></el-table-column>
                <el-table-column prop="doi" label="待审批DOI"></el-table-column>
                <el-table-column prop="applyFile" label="申请审批文件"></el-table-column>
                <el-table-column prop="applyType" label="申请类型"></el-table-column>
                <el-table-column prop="operation" label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" @click="passApply(scope.row, scope.$index)"
                            size="mini">通过</el-button>
                        <el-button type="danger" @click="rejectApply(scope.row, scope.$index)"
                            size="mini">拒绝</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue';
export default {
    name: "DigitalObjectApproval",
    components: {
        CommonAside,
    },
    data() {
        return {
            // 审批表格数据
            approvalTable: [
                { dataItem: '数据条目1', infoItem: '信息项1', doi: 'doi1', applyFile: 'file1', applyType: '指针型' },
                { dataItem: '数据条目2', infoItem: '信息项2', doi: 'doi2', applyFile: 'file2', applyType: '实体型' },
                { dataItem: '数据条目3', infoItem: '信息项3', doi: 'doi3', applyFile: 'file3', applyType: '统计型' },
            ],
            
            searchForm: {
                projectType: '',
                projectName: '',
                approvalStatus: '',
            },
        };
    },
    mounted() { },
    methods: {
        // 通过审批
        passApply(row, index) {
            console.log('passApply', row, index);
        },
        // 拒绝审批
        rejectApply(row, index) {
            console.log('rejectApply', row, index);
        },
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
}
</style>