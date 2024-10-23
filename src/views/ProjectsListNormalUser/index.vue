<template>
    <div style="text-align: center; margin: 24px 40px 24px 40px;">
        <el-collapse v-model="activeNames" @change="collapseChange">
            <el-collapse-item :title="collapseTitle" name="1">
                <el-form :model="searchForm" label-width="auto" class="SearchForm">
                    <el-form-item prop="name" label="项目名称" class="SearchFormItem">
                        <el-input v-model="searchForm.name"></el-input>
                    </el-form-item>
                    <el-form-item prop="user" label="项目负责人" class="SearchFormItem">
                        <el-input v-model="searchForm.user"></el-input>
                    </el-form-item>
                    <el-form-item prop="contactInfo" label="联系方式" class="SearchFormItem">
                        <el-input v-model="searchForm.contactInfo"></el-input>
                    </el-form-item>
                    <el-form-item prop="projectDoi" label="项目标识" class="SearchFormItem">
                        <el-input v-model="searchForm.projectDoi"></el-input>
                    </el-form-item>
                    <el-form-item prop="description" label="项目描述" class="SearchFormItem">
                        <el-input v-model="searchForm.description"></el-input>
                    </el-form-item>
                    <el-form-item prop="institutionDoi" label="所属机构名称" class="SearchFormItem">
                        <el-input v-model="searchForm.institutionDoi"></el-input>
                    </el-form-item>
                    <el-form-item prop="institutionDoi" label="所属机构标识" class="SearchFormItem">
                        <el-input v-model="searchForm.institutionDoi"></el-input>
                    </el-form-item>
                </el-form>

                <el-button type="primary" @click="searchData">搜索</el-button>
            </el-collapse-item>
        </el-collapse>
        <div style="margin-top: 24px;"></div>

        <el-table :data="projectTable" stripe border style="width: 95%;" >
            <el-table-column prop="name" label="项目名称" align="center"></el-table-column>
            <el-table-column prop="projectDoi" label="项目标识" align="center"></el-table-column>
            <el-table-column prop="user" label="项目负责人" align="center"></el-table-column>
            <el-table-column prop="contactInfo" label="联系方式" align="center"></el-table-column>
            <el-table-column prop="description" label="项目描述" align="center"></el-table-column>
            <el-table-column prop="institutionName" label="所属机构名称" align="center"></el-table-column>
            <el-table-column prop="institutionDoi" label="所属机构标识" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="props">
                    <el-button @click="selectProject(props.row, props.$index)" type="primary"
                        size="small">查看详情</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="margin: 24px">
            <el-pagination background layout="pager" :page-size="10" :page-count="pages" @current-change="clickPage">
            </el-pagination>
        </div>
    </div>

</template>

<script>
import { postForm } from '@/api/data';
export default {
    name: "ProjectsListNormalUser",
    data() {
        return {
            // 机构 DOI 列表
            institutionDoiList: [],
            // 页数
            pages: 1,
            // 当前页数
            currentPage: 1,
            // 用户列表
            userList: [],
            // 折叠
            activeNames: [],
            collapseTitle: "搜索栏（点击展开）",
            // 搜索表单
            searchForm: {
                // 项目名称
                name: "",
                // 项目负责人
                user: "",
                // 项目DOI
                projectDoi: "",
                // 所属机构DOI
                institutionDoi: "",
                // 项目联系方式
                contactInfo: "",
                // 负责人邮箱
                contactEmail: "",
                // 项目描述
                description: "",
                // 申请时间范围
                createTimeRange: "",
                // 更新时间范围
                updateTimeRange: "",
            },

            // 项目列表
            projectTable: [
                {
                    // 项目名称
                    name: "围术期抗栓药物管理临床路径研究",
                    // 项目标识
                    projectDoi: "86.771.6049046735/pro.5f60449b-32b5-4042-9d2f-1c6ceae60050",
                    // 项目负责人
                    user: "李主任",
                    // 所属机构
                    institutionName: "中日友好医院",
                    // 所属机构DOI
                    institutionDoi: "86.259.5868980074/ins.8b390aec-c794-44bb-b4b1-6aa37aedbb7c",
                    // 项目联系方式
                    contactInfo: "72158345436",
                    // 项目描述
                    description: "7b50c2e43ebf459996060ab50961f57c",
                }
            ],
        };
    },
    mounted() {},
    methods: {
        clickPage(page) {
            this.currentPage = page;
            this.searchForm.page = this.currentPage;
            this.getData(this.searchForm);
        },
        getData(postData) {
        },

        collapseChange(activeNames) {
            if (activeNames.length === 0) {
                this.collapseTitle = "搜索栏（点击展开）";
            } else {
                this.collapseTitle = "搜索栏（点击收起）";
            }
        },

        searchData() {
        },

        selectProject() {
            this.$router.push({path: "/ProjectDetail"})
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