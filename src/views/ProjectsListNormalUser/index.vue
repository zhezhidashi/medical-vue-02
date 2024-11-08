<template>
    <div style="text-align: center; margin: 24px 40px 24px 40px;">
        <div style="margin-top: 24px;"></div>

        <el-table :data="projectTable" stripe border style="width: 100%;">
            <el-table-column prop="name" label="项目名称" align="center"></el-table-column>
            <el-table-column prop="projectDoi" label="项目标识" align="center"></el-table-column>
            <el-table-column prop="user" label="项目负责人" align="center"></el-table-column>
            <el-table-column prop="contactEmail" label="联系方式" align="center"></el-table-column>
            <el-table-column prop="leadingInstitutionDoiList" label="牵头机构" align="center">
                <template slot-scope="scope">
                    <div v-for="item in scope.row.leadingInstitutionDoiList" :key="item">{{ item }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="involvedInstitutionDoiList" label="参与机构" align="center">
                <template slot-scope="scope">
                    <div v-for="item in scope.row.involvedInstitutionDoiList" :key="item">{{ item }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="brandList" label="品种" align="center">
                <template slot-scope="scope">
                    <div v-for="item in scope.row.brandList" :key="item">{{ item }}</div>
                </template>
            </el-table-column>
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
            institutionList: [],
            // 页数
            pages: 1,
            // 当前页数
            currentPage: 1,

            // 项目列表
            projectTable: [
            {
                    pid: 1,
                    name: "111",
                    projectDoi: "",
                    user: "111",
                    contactEmail: "111",
                    leadingInstitutionDoiList: ["123"],
                    involvedInstitutionDoiList: ["1234"],
                    brandList: ["感冒灵"],
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
            this.getData({page: this.currentPage});
        },
        getData(postData) {
            let _this = this;
            _this.projectTable = [];
            postForm('/users/getProjects', postData, _this, function (res) {
                _this.pages = res.data.pages;
                for (let item of res.data.records) {
                    let dataItem = {
                        pid: item.pid,
                        name: item.name,
                        projectDoi: item.projectDoi,
                        user: item.user,
                        contactEmail: item.contactEmail,
                    }
                    if (item.leadingInstitution === undefined || item.leadingInstitution === null || item.leadingInstitution === "") {
                        dataItem.leadingInstitutionDoiList = [];
                    } else {
                        dataItem.leadingInstitutionDoiList = item.leadingInstitution.split(",");
                    }
                    if (item.involveInsDoi === undefined || item.involveInsDoi === null || item.involveInsDoi === "") {
                        dataItem.involvedInstitutionDoiList = [];
                    } else {
                        dataItem.involvedInstitutionDoiList = item.involveInsDoi.split(",");
                    }
                    if (item.brand === undefined || item.brand === null || item.brand === "") {
                        dataItem.brandList = [];
                    } else {
                        dataItem.brandList = item.brand.split(",");
                    }
                    _this.projectTable.push(dataItem);
                }
            })
        },

        selectProject(row, index) {
            this.$store.commit('setProjectDoi', row.projectDoi)
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