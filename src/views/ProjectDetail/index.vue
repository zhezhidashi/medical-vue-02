<template>
    <div style="margin: 24px 40px 24px 40px;">
        <div style="margin-top: 24px;"></div>

        <el-descriptions title="项目详情" :column="1" border>
            <el-descriptions-item label="项目名称">{{ projectForm.name }}</el-descriptions-item>
            <el-descriptions-item label="项目标识">{{ projectForm.projectDoi }}</el-descriptions-item>
            <el-descriptions-item label="项目负责人">{{ projectForm.user }}</el-descriptions-item>
            <el-descriptions-item label="联系方式">{{ projectForm.contactEmail }}</el-descriptions-item>
            <el-descriptions-item label="牵头机构">
                <div v-for="item in projectForm.leadingInstitutionDoiList" :key="item">
                    <span>{{ item }}</span>
                </div>
            </el-descriptions-item>
            <el-descriptions-item label="参与机构">
                <div v-for="item in projectForm.involvedInstitutionDoiList" :key="item">
                    <span>{{ item }}</span>
                </div>
            </el-descriptions-item>
            <el-descriptions-item label="品种">
                <div v-for="item in projectForm.brandList" :key="item">
                    <span>{{ item }}</span>
                </div>
            </el-descriptions-item>
        </el-descriptions>
    </div>

</template>

<script>
import { postForm } from '@/api/data';
export default {
    name: "ProjectDetail",
    data() {
        return {
            // 项目列表
            projectForm: {
                name: "111",
                projectDoi: "111",
                user: "111",
                contactEmail: "111",
                leadingInstitutionDoiList: ["123", "1234"],
                involvedInstitutionDoiList: ["123", "1234"],
                brandList: ["感冒灵", "板蓝根"],
            }
        };
    },
    mounted() {
        this.getData({})
    },
    methods: {
        getData() {
            let _this = this;
            this.$store.commit('getProjectDoi');
            let postData = {
                page: 1,
                size: 1,
                projectDoi: this.$store.state.user.projectDoi
            }
            postForm('/users/getProjects', postData, _this, function (res) {
                let item = res.data.records[0];
                _this.projectForm.pid = item.pid
                _this.projectForm.name = item.name
                _this.projectForm.projectDoi = item.projectDoi
                _this.projectForm.user = item.user
                _this.projectForm.contactEmail = item.contactEmail
                if (item.leadingInstitution === undefined || item.leadingInstitution === null || item.leadingInstitution === null) {
                    _this.projectForm.leadingInstitutionDoiList = [];

                } else {
                    _this.projectForm.leadingInstitutionDoiList = item.leadingInstitution.split(",");
                }
                if (item.involvedInstitutionDoi === undefined || item.involvedInstitutionDoi === null || item.involvedInstitutionDoi === "") {
                    _this.projectForm.involvedInstitutionDoiList = [];
                } else {
                    _this.projectForm.involvedInstitutionDoiList = item.involvedInstitutionDoi.split(",");
                }
                if (item.brand === undefined || item.brand === null || item.brand === "") {
                    _this.projectForm.brandList = [];
                } else {
                    _this.projectForm.brandList = item.brand.split(",");
                }
            })
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