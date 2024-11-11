<template>
    <div style="margin: 24px 40px 24px 40px;">
        <div style="margin-top: 24px;"></div>

        <el-descriptions title="项目详情" :column="1" border style="">
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
import { postForm, loginRequest } from '@/api/data';
export default {
    name: "Login",
    data() {
        return {
            // 项目列表
            projectForm: {
                name: "",
                projectDoi: "",
                user: "",
                contactEmail: "",
                leadingInstitutionDoiList: [],
                involvedInstitutionDoiList: [],
                brandList: [],
            }
        };
    },
    mounted() {
        let _this = this;
        let proid = this.$route.query.proid;
        this.$store.commit("setProid", proid);
        let officeid = this.$route.query.officeid;
        this.$store.commit("setOfficeid", officeid);
        let userid = this.$route.query.userid;
        this.$store.commit("setUserid", userid);


        loginRequest('/login', { username: "abc", password: "456" }, _this, function (res) {
            let postData = {
                description: proid,
                page: 1,
                size: 1
            }
            // 查询projectDoi
            postForm('/projectInfos/getProjectInfo', postData, _this, function (res) {
                for (let item of res.data.records) {
                    _this.$store.commit("setProjectDoi", item.projectDoi)
                }
                _this.$router.push('/ProjectDetail')
            })
        })

        // if(userid === "8ead3a16f61c4362852b750cd49c95d2") {
        //     _this.$store.commit("setNormalUsername", "pku-user-001")
        //     _this.$store.commit("setInsName", "中日友好医院");
        // }
        // else if (userid === "1308da365f5a4cbfa2f3c1fb88c41025") {
        //     _this.$store.commit("setNormalUsername", "pku-user-002")
        //     _this.$store.commit("setInsName", "正大天晴药业集团股份有限公司");
        // }
        // else if (userid === "b86a7e041e36435fbcd8cc868f2753b1") {
        //     _this.$store.commit("setNormalUsername", "pku-user-003")
        //     _this.$store.commit("setInsName", "中国生物技术股份有限公司");
        // }
        // else if (userid === "cad5417cf1924e57b9ff89708a6cc380") {
        //     _this.$store.commit("setNormalUsername", "pku-user-004")
        //     _this.$store.commit("setInsName", "数据分析方");
        // }
        // else if (userid === "69431cf525f54dca9bd004433199f782") {
        //     _this.$store.commit("setNormalUsername", "pku-user-005")
        //     _this.$store.commit("setInsName", "正大天晴药业集团股份有限公司");
        // }
        // else if (userid === "555ba4f49eaa4420972b76934d0c9493") {
        //     _this.$store.commit("setNormalUsername", "zhaozhixia")
        //     _this.$store.commit("setInsName", "中日友好医院");
        // }

        
    },
    methods: {},
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