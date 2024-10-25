<template>
    <div>
        <div style="text-align: center; margin: 24px 40px 24px 40px;">
            <el-collapse v-model="activeNames" @change="collapseChange">
                <el-collapse-item :title="collapseTitle" name="1">
                    <el-form :model="searchForm" label-width="auto" class="SearchForm">
                        <el-form-item prop="projectName" label="项目名称" class="SearchFormItem">
                            <el-input v-model="searchForm.projectName" placeholder="项目名称"></el-input>
                        </el-form-item>
                        <el-form-item prop="projectLeader" label="项目负责人" class="SearchFormItem">
                            <el-input v-model="searchForm.projectLeader" placeholder="项目负责人"></el-input>
                        </el-form-item>
                        <el-form-item prop="projectContact" label="联系方式" class="SearchFormItem">
                            <el-input v-model="searchForm.projectContact" placeholder="项目联系方式"></el-input>
                        </el-form-item>
                        <el-form-item prop="projectDescription" label="项目描述" class="SearchFormItem">
                            <el-input v-model="searchForm.projectDescription" placeholder="项目描述"></el-input>
                        </el-form-item>
                        <el-form-item prop="projectApprovalStatus" label="审批状态" class="SearchFormItem">
                            <el-select v-model="searchForm.projectApprovalStatus" placeholder="请选择">
                                <el-option label="待审批" value="0"></el-option>
                                <el-option label="已通过" value="1"></el-option>
                                <el-option label="未通过" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="projectApprovalOpinion" label="审批意见" class="SearchFormItem">
                            <el-input v-model="searchForm.projectApprovalOpinion" placeholder="审批意见"></el-input>
                        </el-form-item>
                        <el-form-item prop="projectApplyTimeRange" label="申请时间" class="SearchFormTimePicker">
                            <el-date-picker value-format="timestamp" v-model="searchForm.projectApplyTimeRange"
                                type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>

                        <el-form-item prop="projectApprovalTimeRange" label="审批时间" class="SearchFormTimePicker">
                            <el-date-picker value-format="timestamp" v-model="searchForm.projectApprovalTimeRange"
                                type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>

                    <el-button type="primary">搜索</el-button>
                </el-collapse-item>
            </el-collapse>
        </div>



        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">

            <div style="display: flex; align-items: center; justify-content: center;">
                <el-button @click="addProject" type="primary" style="margin-bottom: 24px;">申请项目权限</el-button>
            </div>

            <el-table :data="projectTable" stripe border style="width: 95%;">
                <el-table-column prop="projectName" label="项目名称" min-width="120" align="center"></el-table-column>
                <el-table-column prop="projectDoi" label="项目标识" align="center"></el-table-column>
                <el-table-column prop="projectLeader" label="项目负责人" min-width="120" align="center"></el-table-column>
                <el-table-column prop="projectContact" label="联系方式" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="projectDescription" label="项目描述" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="involvedInstitutionDoi" label="所属机构名称" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="involvedInstitutionDoi" label="所属机构标识" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="projectApplyTime" label="申请时间" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="projectApprovalStatus" label="审批状态" min-width="120" align="center">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.projectApprovalStatus === 0">待审批</el-tag>
                        <el-tag v-if="scope.row.projectApprovalStatus === 1" type="success">已通过</el-tag>
                        <el-tag v-if="scope.row.projectApprovalStatus === 2" type="danger">未通过</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="projectApprovalOpinion" label="审批意见" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="projectApprovalTime" label="审批时间" min-width="120" align="center">
                </el-table-column>
            </el-table>

            <div style="margin: 24px">
                <el-pagination background layout="pager" :page-size="10" :page-count="pages"
                    @current-change="clickPage">
                </el-pagination>
            </div>

            <el-dialog title="申请项目权限" :visible.sync="addProjectDialogVisible" width="80%"
                :before-close="addProjectCancel">
                <el-form :model="addProjectItem" label-width="auto">
                    <el-form-item label="选择项目">
                        <el-select v-model="addProjectItem.project" placeholder="请选择">
                            <el-option label="项目1" value="1"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="项目申请文件" prop="projectApplyFile">
                        <el-button type="primary">点击上传</el-button>
                    </el-form-item>
                    <el-form-item label="申请人邮箱">
                        <el-input v-model="addProjectItem.projectApplyEmail"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addProjectCancel">取 消</el-button>
                    <el-button type="primary" @click="addProjectConfirm">确 定</el-button>
                </span>
            </el-dialog>
        </div>

    </div>
</template>

<script>
import { postForm } from '@/api/data';
export default {
    name: "ProjectsApplyAccess",
    data() {
        return {
            // 机构 DOI 列表
            institutionDoiList: [],
            // 页数
            pages: 1,
            // 当前页数
            currentPage: 1,
            // 折叠
            activeNames: [],
            collapseTitle: "搜索栏（点击展开）",
            // 搜索表单
            searchForm: {
                // 项目名称
                projectName: "",
                projectDoi: "",
                // 项目负责人
                projectLeader: "",
                // 项目联系方式
                projectContact: "",
                // 项目描述
                projectDescription: "",
                // 申请时间范围
                projectApplyTimeRange: "",
                // 申请人邮箱
                projectApplyEmail: "",
                // 审批状态
                projectApprovalStatus: "",
                // 审批意见
                projectApprovalOpinion: "",
                // 审批时间范围
                projectApprovalTimeRange: "",
            },



            // 项目列表
            projectTable: [
            ],

            // 增加项目弹窗是否显示
            addProjectDialogVisible: false,
            // 项目item的拷贝
            addProjectItem: {
                projectApplyFile: "",
                projectApplyEmail: "",
            },
        };
    },
    mounted() {
        // 获取组网组列表
        let _this = this;

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

        addProject() {
            this.addProjectDialogVisible = true;
            this.addProjectItem = {
                projectApplyFile: "",
                projectApplyEmail: "",
            }
        },
        addProjectCancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.addProjectDialogVisible = false;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        addProjectConfirm() {
            _this.addProjectDialogVisible = false;
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