<template>
    <div style="text-align: center; margin: 24px 40px 24px 40px;">
        <el-form :model="searchForm" label-width="auto" class="SearchForm" :rules="doSearchRules">
            <el-form-item prop="doi" label="数字对象标识" class="SearchFormItem">
                <el-input v-model="searchForm.doi"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="数字对象名称" class="SearchFormItem">
                <el-input v-model="searchForm.name"></el-input>
            </el-form-item>
            <el-form-item prop="description" label="数字对象描述" class="SearchFormItem">
                <el-input v-model="searchForm.description"></el-input>
            </el-form-item>
            <el-form-item prop="type" label="数字对象类型" class="SearchFormItem">
                <el-select placeholder="请选择" filterable v-model="searchForm.type">
                    <el-option v-for="(item, index) in doTypeList" :label="item.name" :value="item.value"
                        :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="projectDoi" label="所属项目" class="SearchFormItem">
                <el-select placeholder="请选择" filterable v-model="searchForm.projectDoi">
                    <el-option v-for="(item, index) in projectList" :label="item.projectName" :value="item.projectDoi"
                        :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="institutionDoi" label="所属机构" class="SearchFormItem">
                <el-select placeholder="请选择" filterable v-model="searchForm.institutionDoi">
                    <el-option v-for="(item, index) in institutionList" :label="item.institutionName"
                        :value="item.institutionDoi" :key="index"></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <el-button type="primary" @click="searchData">搜索</el-button>
        <el-divider></el-divider>

        <el-table :data="resultTable" stripe border style="width: 100%;">
            <el-table-column prop="doi" label="数字对象标识"></el-table-column>
            <el-table-column prop="name" label="数字对象名称"></el-table-column>
            <el-table-column prop="description" label="数字对象描述"></el-table-column>
            <el-table-column prop="type" label="数字对象类型"></el-table-column>
            <el-table-column prop="projectName" label="所属项目"></el-table-column>
            <el-table-column prop="institutionName" label="所属机构"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="props">
                    <el-button type="primary" size="small" @click="apply">申请</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="margin: 24px">
            <el-pagination background layout="pager" :page-size="10" :page-count="pages" @current-change="clickPage">
            </el-pagination>
        </div>

        <el-dialog title="数字对象申请" :visible.sync="applyVisible" width="80%" :before-close="applyCancel"
            style="text-align: left;">
            <el-form :model="applyForm" label-width="auto" :rules="applyRules">
                <el-form-item label="申请文件" prop="appFile">
                    <el-button type="primary">点击上传</el-button>
                </el-form-item>
                <el-form-item label="申请人邮箱">
                    <el-input v-model="applyForm.email"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="applyCancel">取 消</el-button>
                <el-button type="primary" @click="applyConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { postForm } from '@/api/data'
export default {
    name: "DigitalObjectList",
    data() {
        return {
            pages: 1,
            currentPage: 1,
            // 折叠
            activeNames: [],
            collapseTitle: "搜索栏（点击展开）",
            searchForm: {
                doi: '',
                name: '',
                type: '',
                description: '',
                projectDoi: '',
                institutionDoi: '',
                pageNo: 1,
            },

            doSearchRules: {
                projectDoi: [
                    { required: true, message: '请选择数字对象所属项目', trigger: 'change' }
                ],
                institutionDoi: [
                    { required: true, message: '请选择数字对象所属机构', trigger: 'change' }
                ],
            },

            resultTable: [
                {
                    doi: 'doi1',
                    name: '加密',
                    description: '加密',
                    type: "EDC",
                    projectName: '项目1',
                    institutionName: '456789',
                },
            ],

            applyVisible: false,
            applyForm: {
                appFile: "",
                email: "",
            },

            applyRules: {
                appFile: [
                    { required: true, message: '请选择数字对象所属项目', trigger: 'change' }
                ],
            },

            doTypeList: [
                { name: "EDC", value: "EDC" },
                { name: "SDTM", value: "SDTM" },
                { name: "ADAM", value: "ADAM" },
                { name: "代码", value: "代码" },
                { name: "结构化数据", value: "结构化数据" },
                { name: "非结构化数据", value: "非结构化数据" }
            ],

            projectList: [
                { projectName: "项目1", projectDoi: "123" },
                { projectName: "项目2", projectDoi: "124" }
            ],

            institutionList: [
                { institutionName: "机构1", institutionDoi: "123" },
                { institutionName: "机构2", institutionDoi: "124" }
            ],
        };
    },
    mounted() {
    },
    methods: {
        clickPage(page) {
            this.currentPage = page;
            this.searchForm.pageNo = this.currentPage;
            this.getData(this.searchForm);
        },
        searchData() {
        },

        getData(postData) {
        },

        apply() {
            this.applyVisible = true;
        },

        applyCancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.applyVisible = false;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },

        applyConfirm() {
            this.applyVisible = false;
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