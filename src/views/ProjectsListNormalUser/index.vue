<template>
    <div style="text-align: center; margin: 24px 40px 24px 40px;">
        <div style="margin-top: 24px;"></div>

        <el-table :data="projectTable" stripe border style="width: 100%;" >
            <el-table-column prop="name" label="项目名称" align="center"></el-table-column>
            <el-table-column prop="projectDoi" label="项目标识" align="center"></el-table-column>
            <el-table-column prop="user" label="项目负责人" align="center"></el-table-column>
            <el-table-column prop="contactEmail" label="联系方式" align="center"></el-table-column>
            <el-table-column prop="leadingInstitution" label="牵头机构" align="center"></el-table-column>
            <el-table-column prop="involveInsDoi" label="参与机构" align="center"></el-table-column>
            <el-table-column prop="brand" label="品种" align="center"></el-table-column>
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
                    name: "围术期抗栓药物管理临床路径研究",
                    projectDoi: "86.771.6049046735/pro.5f60449b-32b5-4042-9d2f-1c6ceae60050",
                    user: "李主任",
                    contactEmail: "111",
                    leadingInstitution: "111",
                    involveInsDoi: "111",
                    brand: "123",
                }
            ],
        };
    },
    mounted() {},
    methods: {
        clickPage(page) {
            this.currentPage = page;
            this.getData({page: this.currentPage});
        },
        getData(postData) {
        },


        selectProject(row, index) {
            this.$store.commit('setProjectDoi', row.projectDoi)
            this.$store.commit('getProjectDoi');
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