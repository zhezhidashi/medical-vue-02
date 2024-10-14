<template>
    <div style="margin: 24px 40px 24px 40px;">
        <div style="margin-top: 24px;"></div>

        <el-descriptions title="项目详情" :column="1" border>
            <el-descriptions-item label="项目名称">{{projectTable[0].name}}</el-descriptions-item>
            <el-descriptions-item label="项目标识" >{{projectTable[0].projectDoi}}</el-descriptions-item>
            <el-descriptions-item label="机构名称" >{{projectTable[0].user}}</el-descriptions-item>
            <el-descriptions-item label="机构标识" >{{projectTable[0].institutionDoi}}</el-descriptions-item>
            <el-descriptions-item label="项目联系方式" >{{projectTable[0].contactInfo}}</el-descriptions-item>
            <el-descriptions-item label="负责人邮箱" >{{projectTable[0].contactEmail}}</el-descriptions-item>
            <el-descriptions-item label="项目描述" >{{projectTable[0].description}}</el-descriptions-item>
            <el-descriptions-item  label="修改时间" >{{projectTable[0].updateTime}}</el-descriptions-item>
        </el-descriptions>
    </div>

</template>

<script>
import { postForm } from '@/api/data';
export default {
    name: "ProjectsList",
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
                    name: "",
                    // 项目负责人
                    user: "",
                    // 项目DOI
                    projectDoi: "",
                    // 所属机构DOI
                    institutionDoi: "",
                    // 参与机构DOI
                    involvedInstitutionDoi: "",
                    // 机构列表
                    institutionList: [],
                    // 项目联系方式
                    contactInfo: "",
                    // 负责人邮箱
                    contactEmail: "",
                    // 项目描述
                    description: "",
                    // 申请时间
                    createTime: "",
                    // 修改时间
                    updateTime: "",
                    // 用户列表
                    userBoList: [],
                }
            ],
        };
    },
    mounted() {
        // 获取组网组列表
        let _this = this;

        postForm('/networkGroups/getInstitutionsByGid', {}, _this, function (res) {
            for (let item of res.data.list) {
                _this.institutionDoiList.push({
                    name: item.name,
                    doi: item.doi,
                })
            }
            // 获取项目信息
            _this.getData({});
        })
    },
    methods: {
        getData(postData) {
            let _this = this;
            _this.projectTable = [];

            // 设置项目id
            this.$store.commit('getProid')
            let proid = this.$store.state.user.proid
            postData.description = proid

            postForm('/projectInfos/getProjectInfo', postData, _this, function (res) {
                _this.pages = res.data.pages;
                for (let item of res.data.records) {
                    let dataItem = {
                        pid: item.pid,
                        gid: item.gid,
                        name: item.name,
                        user: item.user,
                        projectDoi: item.projectDoi,
                        institutionDoi: item.institutionDoi,
                        involvedInstitutionDoi: item.involvedInstitutionDoi,
                        contactInfo: item.contactInfo,
                        contactEmail: item.contactEmail,
                        description: item.description,
                        createTime: new Date(item.createTime).toLocaleDateString(),
                        updateTime: new Date(item.updateTime).toLocaleDateString(),
                        institutionList: [],
                        userBoList: [],
                        userNameList: [],
                    }
                    _this.projectTable.push(dataItem);
                    break;
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