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
                        <el-select placeholder="请选择" filterable v-model="searchForm.type">
                            <el-option v-for="(item, index) in doTypeList" :label="item.name" :value="item.value" :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

                <el-button type="primary" @click="searchData">搜索</el-button>
            </el-collapse-item>
        </el-collapse>
        <el-divider></el-divider>

        <el-table :data="resultTable" stripe border style="width: 100%;">
            <el-table-column prop="doi" label="数字对象标识" align="center"></el-table-column>
            <el-table-column prop="name" label="数字对象名称" align="center"></el-table-column>
            <el-table-column prop="description" label="数字对象描述" align="center"></el-table-column>
            <el-table-column prop="type" label="数字对象类型" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="props">
                    <el-button @click="allocate(props.row, props.$index)" type="primary"
                        size="small">分配项目</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="margin: 24px">
            <el-pagination background layout="pager" :page-size="10" :page-count="pages" @current-change="clickPage">
            </el-pagination>
        </div>

        <el-dialog title="分配项目" :visible.sync="allocateVisible" width="80%" :before-close="allocateCancel" style="text-align: left;">
            <el-form :model="allocateForm" label-width="auto" :rules="allocateRules">
                <el-form-item label="已分配项目">
                    <span>正大天晴、中国生物、中日友好医院</span>
                </el-form-item>
                <el-form-item label="添加分配项目" prop="projectDoiList">
                    <el-select v-model="allocateForm.projectDoiList" multiple filterable placeholder="请选择">
                        <el-option v-for="(item, index) in projectsList" :label="item.name" :value="item.projectDoi" :key="index">
                            {{ item.name }}
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="allocateCancel">取 消</el-button>
                <el-button type="primary" @click="allocateConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "DigitalObjectAllocate",
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
                // 数字对象描述
                description: '',
                // 页码
                pageNo: 1,
            },

            resultTable: [
                {
                    doi: '123456',
                    name: '加密',
                    description: '加密',
                    type: "EDC",
                },
            ],

            projectsList: [
                {
                    name: "项目1",
                    projectDoi: "doi1",
                },
                {
                    name: "项目2",
                    projectDoi: "doi2",
                }
            ],

            allocateVisible: false,
            allocateForm: {
                projectDoiList: []
            },

            allocateRules: {
                projectDoiList: [
                    { required: true, message: '请选择要关联的项目', trigger: 'change' }
                ],
            },

            doTypeList: [
                { name: "EDC",  value: "EDC" },
                { name: "SDTM",  value: "SDTM" },
                { name: "ADAM",  value: "ADAM" },
                { name: "代码",  value: "代码" },
                { name: "结构化数据", value: "结构化数据" },
                { name: "非结构化数据", value: "非结构化数据" }
            ],
        };
    },
    mounted() {
    },
    methods: {
        collapseChange(activeNames) {
            if (activeNames.length === 0) {
                this.collapseTitle = "搜索栏（点击展开）";
            } else {
                this.collapseTitle = "搜索栏（点击收起）";
            }
        },
        clickPage(page) {
            this.currentPage = page;
            this.searchForm.pageNo = this.currentPage;
            this.getData(this.searchForm);
        },
        searchData() {
        },

        getData(postData) {
        },

        allocate() {
            this.allocateVisible = true;
        },

        allocateCancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.allocateVisible = false;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },

        allocateConfirm() {
            this.allocateVisible = false;
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