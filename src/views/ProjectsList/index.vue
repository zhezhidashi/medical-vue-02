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
                    <el-form-item prop="institutionDoi" label="参与机构" class="SearchFormItem">
                        <el-input v-model="searchForm.institutionDoi"></el-input>
                    </el-form-item>
                    <el-form-item prop="createTimeRange" label="申请时间" class="SearchFormTimePicker">
                        <el-date-picker value-format="timestamp" v-model="searchForm.createTimeRange" type="daterange"
                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item prop="updateTimeRange" label="修改时间" class="SearchFormTimePicker">
                        <el-date-picker value-format="timestamp" v-model="searchForm.updateTimeRange" type="daterange"
                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </el-form>

                <el-button type="primary" @click="searchData">搜索</el-button>
            </el-collapse-item>
        </el-collapse>
        <div style="margin-top: 24px;"></div>

        <el-table :data="projectTable" stripe border style="width: 100%;" >
            <el-table-column prop="name" label="项目名称" align="center"></el-table-column>
            <el-table-column prop="projectDoi" label="项目标识" align="center"></el-table-column>
            <el-table-column prop="user" label="项目负责人" align="center"></el-table-column>
            <el-table-column prop="contactInfo" label="联系方式" align="center"></el-table-column>
            <el-table-column prop="description" label="项目描述" align="center"></el-table-column>
            <el-table-column prop="institutionDoi" label="所属机构名称" align="center"></el-table-column>
            <el-table-column prop="institutionDoi" label="所属机构标识" align="center"></el-table-column>
            <el-table-column prop="institutionDoi" label="参与机构" align="center"></el-table-column>
            <el-table-column prop="userBoList" label="用户列表" align="center">
                <template slot-scope="scope">
                    <div v-for="item in scope.row.userNameList" :key="item">{{ item }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="申请时间" align="center"></el-table-column>
            <el-table-column prop="updateTime" label="修改时间" align="center"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="props">
                    <el-button @click="modifyProject(props.row, props.$index)" type="primary"
                        size="small" style="margin: 5px;">修改项目信息</el-button>
                        <el-button @click="modifyProject(props.row, props.$index)" type="primary"
                        size="small" style="margin: 5px;">修改参与机构</el-button>
                        <el-button @click="modifyProject(props.row, props.$index)" type="primary"
                        size="small" style="margin: 5px;">修改权限用户</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="margin: 24px">
            <el-pagination background layout="pager" :page-size="10" :page-count="pages" @current-change="clickPage">
            </el-pagination>
        </div>

        <el-dialog title="修改项目" :visible.sync="modifyProjectDialogVisible" width="80%"
            :before-close="modifyProjectCancel">
            <el-form :model="modifyProjectItem" label-width="auto" align="left">
                <el-form-item label="项目名称">
                    <el-input v-model="modifyProjectItem.name"></el-input>
                </el-form-item>
                <el-form-item label="项目负责人">
                    <el-input v-model="modifyProjectItem.user"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="modifyProjectItem.contactInfo"></el-input>
                </el-form-item>
                <el-form-item label="项目描述">
                    <el-input v-model="modifyProjectItem.description"></el-input>
                </el-form-item>
                <el-form-item label="修改参与机构">
                    <el-select v-model="modifyProjectItem.institutionList" multiple collapse-tags placeholder="请选择">
                        <el-option v-for="item in institutionDoiList" :key="item.doi" :label="item.name"
                            :value="item.doi"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="修改权限用户">
                    <el-select v-model="modifyProjectItem.userBoList" multiple collapse-tags placeholder="请选择">
                        <el-option v-for="item in userList" :key="item.uid" :label="item.name"
                            :value="item.uid"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modifyProjectCancel">取 消</el-button>
                <el-button type="primary" @click="modifyProjectConfirm">确 定</el-button>
            </span>
        </el-dialog>

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
            // 修改项目弹窗是否显示
            modifyProjectDialogVisible: false,
            // 修改项目的 index
            modifyProjectIndex: 0,
            // 项目item的拷贝
            modifyProjectItem: {
                // 项目名称
                name: "",
                // 项目负责人
                user: "",
                // 项目联系方式
                contactInfo: "",
                // 负责人邮箱
                contactEmail: "",
                // 项目描述
                description: "",
                // 项目申请文件
                applyDocumentAddress: "",
                // 机构列表
                institutionList: [],
                // 参与机构列表
                involvedInstitutionDoi: "",
                // 用户列表
                userBoList: [],
                // 用户列表拷贝
                userBoListCopy: [],
            },
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
        })
        // 获取用户列表
        postForm('/users/getUsers', {}, _this, function (res) {
            for (let item of res.data.records) {
                _this.userList.push({
                    name: item.username,
                    uid: item.uid,
                })
            }
        })

    },
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

        modifyProject(row, index) {
            this.modifyProjectDialogVisible = true;
            this.modifyProjectIndex = index;
            this.modifyProjectItem = JSON.parse(JSON.stringify(row));
            console.log(this.modifyProjectItem)
            // 拷贝用户列表
            this.modifyProjectItem.userBoListCopy = this.modifyProjectItem.userBoList.slice(0);
        },

        modifyProjectCancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.modifyProjectDialogVisible = false;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        modifyProjectConfirm() {

            _this.modifyProjectDialogVisible = false;
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