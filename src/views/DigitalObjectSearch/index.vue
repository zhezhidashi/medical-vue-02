<template>
    <div style="text-align: center; margin: 24px 40px 24px 40px;">
        <el-collapse v-model="activeNames" @change="collapseChange">
            <el-collapse-item :title="collapseTitle" name="1">
                <el-form :model="searchForm" label-width="auto" class="SearchForm">
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
                        <el-select placeholder="请选择" v-model="searchForm.type">
                            <el-option v-for="(item, index) in doTypeList" :label="item.name" :value="item.value" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="institutionDoi" label="* 所属项目" class="SearchFormItem">
                        <el-input v-model="searchForm.institutionDoi"></el-input>
                    </el-form-item>
                    <el-form-item prop="institutionName" label="* 所属机构" class="SearchFormItem">
                        <el-input v-model="searchForm.institutionName"></el-input>
                    </el-form-item>
                </el-form>

                <el-button type="primary" @click="searchData">搜索</el-button>
            </el-collapse-item>
        </el-collapse>
        <el-divider></el-divider>

        <el-table :data="resultTable" stripe border style="width: 100%;">
            <el-table-column prop="doi" label="数字对象标识"></el-table-column>
            <el-table-column prop="doiName" label="数字对象名称"></el-table-column>
            <el-table-column prop="doiDesc" label="数字对象描述"></el-table-column>
            <el-table-column prop="type" label="数字对象类型"></el-table-column>
            <el-table-column prop="project" label="所属项目"></el-table-column>
            <el-table-column prop="projectDoi" label="所属机构"></el-table-column>
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

        <el-dialog title="数字对象申请" :visible.sync="applyVisible" width="80%" :before-close="applyCancel" style="text-align: left;">
            <el-form :model="applyForm" label-width="auto">
                <el-form-item label="* 申请文件" prop="applyFile">
                    <el-button type="primary">点击上传</el-button>
                </el-form-item>
                <el-form-item label="申请人邮箱">
                    <el-input v-model="apply.applyEmail"></el-input>
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
                // 机构DOI
                institutionDoi: '',
                // 机构名称
                institutionName: '',
                // 页码
                pageNo: 1,
            },

            resultTable: [
                {
                    doi: 'doi1',
                    doiName: '加密',
                    doiDesc: '加密',
                    type: "EDC",
                    project: '项目1',
                    projectDoi: '456789',
                },
                {
                    doi: 'doi2',
                    doiName: '加密',
                    doiDesc: '加密',
                    type: "ADAM",
                    project: '项目1',
                    projectDoi: '123456',
                }
            ],

            applyVisible: false,
            applyForm: {
                applyFile: "",
                applyEmail: "",
            },

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