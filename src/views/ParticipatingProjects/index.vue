<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">

            <el-form :model="searchForm" label-width="auto" class="SearchForm">
                <el-form-item prop="projectName" label="项目名称" class="SearchFormItem">
                    <el-input v-model="searchForm.projectName" placeholder="项目名称"></el-input>
                </el-form-item>
                <el-form-item prop="projectLeader" label="项目负责人" class="SearchFormItem">
                    <el-input v-model="searchForm.projectLeader" placeholder="项目负责人"></el-input>
                </el-form-item>
                <el-form-item prop="projectContact" label="项目联系方式" class="SearchFormItem">
                    <el-input v-model="searchForm.projectContact" placeholder="项目联系方式"></el-input>
                </el-form-item>
                <el-form-item prop="projectDescription" label="项目描述" class="SearchFormItem">
                    <el-input v-model="searchForm.projectDescription" placeholder="项目描述"></el-input>
                </el-form-item>
                
                <el-form-item prop="involvedInstitutionDoi" label="机构DOI" class="SearchFormItem">
                    <el-input v-model="searchForm.involvedInstitutionDoi" placeholder="机构DOI"></el-input>
                </el-form-item>
                <el-form-item prop="projectApplyEmail" label="申请人邮箱" class="SearchFormItem">
                    <el-input v-model="searchForm.projectApplyEmail" placeholder="申请人邮箱"></el-input>
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
                    <el-date-picker
                        value-format="timestamp"
                        v-model="searchForm.projectApplyTimeRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item prop="projectApprovalTimeRange" label="审批时间" class="SearchFormTimePicker">
                    <el-date-picker
                        value-format="timestamp"
                        v-model="searchForm.projectApprovalTimeRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>

            <el-button type="primary" @click="searchData">搜索</el-button>
            <el-divider></el-divider>

            <div style="display: flex; align-items: center; justify-content: center;">
                <el-button @click="addProject" type="primary" style="margin-bottom: 24px;">申请项目</el-button>
            </div>

            <el-table :data="projectTable" stripe border style="width: 95%;">
                <el-table-column prop="projectName" label="项目名称" min-width="120" align="center"></el-table-column>
                <el-table-column prop="projectLeader" label="项目负责人" min-width="120" align="center"></el-table-column>
                <el-table-column prop="projectContact" label="项目联系方式" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="projectDescription" label="项目描述" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="involvedInstitutionDoi" label="机构DOI" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="projectApplyFile" label="项目申请文件" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="projectApplyTime" label="申请时间" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="projectApplyEmail" label="申请人邮箱" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="projectApprovalStatus" label="审批状态" min-width="120" align="center">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.projectApprovalStatus === 0" >待审批</el-tag>
                        <el-tag v-if="scope.row.projectApprovalStatus === 1" type="success">已通过</el-tag>
                        <el-tag v-if="scope.row.projectApprovalStatus === 2" type="danger">未通过</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="projectApprovalOpinion" label="审批意见" min-width="120" align="center">
                </el-table-column>
                <el-table-column prop="projectApprovalTime" label="审批时间" min-width="120" align="center">
                </el-table-column>

                <el-table-column label="操作" align="center">
                    <template slot-scope="props">
                        <el-button @click="modifyProject(props.row, props.$index)" type="primary"
                            size="small">修改</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div style="margin: 24px">
                <el-pagination background layout="pager" :page-size="10" :page-count="pages"
                    @current-change="clickPage">
                </el-pagination>
            </div>

            <el-dialog title="修改项目" :visible.sync="modifyProjectDialogVisible" width="80%"
                :before-close="modifyProjectCancel">
                <el-form :model="modifyProjectItem" label-width="auto">
                    <el-form-item label="项目名称">
                        <el-input v-model="modifyProjectItem.projectName"></el-input>
                    </el-form-item>
                    <el-form-item label="项目负责人">
                        <el-input v-model="modifyProjectItem.projectLeader"></el-input>
                    </el-form-item>
                    <el-form-item label="项目联系方式">
                        <el-input v-model="modifyProjectItem.projectContact"></el-input>
                    </el-form-item>
                    <el-form-item label="项目描述">
                        <el-input v-model="modifyProjectItem.projectDescription"></el-input>
                    </el-form-item>
                    <el-form-item label="项目DOI">
                        <el-input v-model="modifyProjectItem.involvedInstitutionDoi"></el-input>
                    </el-form-item>
                    <el-form-item label="项目申请文件" prop="projectApplyFile">
                        <el-upload 
                        drag action="/api/file/upload"
                        :headers="{'Authorization': 'Bearer ' + $store.state.user.token}" :on-success="uploadSuccessModify">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="申请人邮箱">
                        <el-input v-model="modifyProjectItem.projectApplyEmail"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="modifyProjectCancel">取 消</el-button>
                    <el-button type="primary" @click="modifyProjectConfirm">确 定</el-button>
                </span>
            </el-dialog>

            <el-dialog title="增加项目" :visible.sync="addProjectDialogVisible" width="80%"
                :before-close="addProjectCancel">
                <el-form :model="addProjectItem" label-width="auto">
                    <el-form-item label="组网组">
                        <el-select v-model="addProjectItem.gid" placeholder="请选择">
                            <el-option v-for="item in gidList" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="项目名称">
                        <el-input v-model="addProjectItem.projectName"></el-input>
                    </el-form-item>
                    <el-form-item label="项目负责人">
                        <el-input v-model="addProjectItem.projectLeader"></el-input>
                    </el-form-item>
                    <el-form-item label="项目联系方式">
                        <el-input v-model="addProjectItem.projectContact"></el-input>
                    </el-form-item>
                    <el-form-item label="项目描述">
                        <el-input v-model="addProjectItem.projectDescription"></el-input>
                    </el-form-item>
                    <el-form-item label="机构DOI">
                        <el-input v-model="addProjectItem.involvedInstitutionDoi"></el-input>
                    </el-form-item>
                    <el-form-item label="项目申请文件" prop="projectApplyFile">
                        <el-upload class="upload-demo" 
                        drag action="/api/file/upload"
                        :headers="{'Authorization': 'Bearer ' + $store.state.user.token}"
                        :on-success="uploadSuccessAdd">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        </el-upload>
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
    name: "ParticipatingProjects",
    data() {
        return {
            // 页数
            pages: 1,
            // 当前页数
            currentPage: 1,
            // 搜索表单
            searchForm: {
                // 项目名称
                projectName: "",
                // 项目负责人
                projectLeader: "",
                // 项目联系方式
                projectContact: "",
                // 项目描述
                projectDescription: "",
                // 机构DOI
                involvedInstitutionDoi: "",
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
                {
                    // 项目名称
                    projectName: "项目1",
                    // 项目负责人
                    projectLeader: "负责人1",
                    // 项目联系方式
                    projectContact: "联系方式1",
                    // 项目描述
                    projectDescription: "描述1",
                    // 项目申请文件
                    projectApplyFile: "文件1",
                    // 申请时间
                    projectApplyTime: "2021-01-01",
                    // 申请人邮箱
                    projectApplyEmail: "邮箱1",
                    // 审批状态
                    projectApprovalStatus: 0,
                    // 审批意见
                    projectApprovalOpinion: "审批意见1",
                    // 审批时间
                    projectApprovalTime: "2021-01-01",
                }
            ],
            // 修改项目弹窗是否显示
            modifyProjectDialogVisible: false,
            // 修改项目的 index
            modifyProjectIndex: 0,
            // 项目item的拷贝
            modifyProjectItem: {
                projectName: "",
                projectLeader: "",
                projectContact: "",
                projectDescription: "",
                involvedInstitutionDoi: "",
                projectApplyFile: "",
                projectApplyEmail: "",
            },
            // 增加项目弹窗是否显示
            addProjectDialogVisible: false,
            // 项目item的拷贝
            addProjectItem: {
                gid: "",
                projectName: "",
                projectLeader: "",
                projectContact: "",
                projectDescription: "",
                projectApplyFile: "",
                projectApplyEmail: "",
                involvedInstitutionDoi: "",
            },
            // 组网组列表
            gidList: [],
        };
    },
    mounted() { 
        // 获取组网组列表
        let _this = this;
        postForm('/networkGroups/get', {}, _this, function(res){
            for(let item of res.data.records) {
                _this.gidList.push({
                    label: item.publicRootName,
                    value: item.gid,
                });
            }
        })

        // 获取项目信息
        this.getData({});

    },
    methods: {
        clickPage(page) {
            this.currentPage = page;
            this.searchForm.page = this.currentPage;
            this.getData(this.searchForm);
        },
        getData(postData){
            let _this = this;
            _this.projectTable = [];
            postForm('/projectInfos/getApplications', postData, _this, function(res){
                _this.pages = res.data.pages;
                for(let item of res.data.records) {
                    _this.projectTable.push({
                        id: item.id,
                        gid: item.gid,
                        projectName: item.name,
                        projectLeader: item.user,
                        projectContact: item.contactInfo,
                        projectDescription: item.description,
                        involvedInstitutionDoi: item.involvedInstitutionDoi,
                        projectApplyFile: item.applyDocumentAddress,
                        projectApplyTime: new Date(item.createTime).toLocaleDateString(),
                        projectApplyEmail: item.contactEmail,
                        projectApprovalStatus: item.status,
                        projectApprovalOpinion: item.reviewComments,
                        projectApprovalTime: new Date(item.updateTime).toLocaleDateString(),
                    });
                }
            })
        },
        searchData(){
            let postData = {
                name: this.searchForm.projectName,
                user: this.searchForm.projectLeader,
                contactInfo: this.searchForm.projectContact,
                description: this.searchForm.projectDescription,
                involvedInstitutionDoi: this.searchForm.involvedInstitutionDoi,
                contactEmail: this.searchForm.projectApplyEmail,
                status: this.searchForm.projectApprovalStatus,
                reviewComments: this.searchForm.projectApprovalOpinion,
            }

            if(this.searchForm.projectApplyTimeRange && this.searchForm.projectApplyTimeRange !== "") {
                postData.createBeginTime = this.searchForm.projectApplyTimeRange[0];
                postData.createEndTime = this.searchForm.projectApplyTimeRange[1] + 86399999;
            }

            if(this.searchForm.projectApprovalTimeRange && this.searchForm.projectApprovalTimeRange !== "") {
                postData.updateBeginTime = this.searchForm.projectApprovalTimeRange[0];
                postData.updateEndTime = this.searchForm.projectApprovalTimeRange[1] + 86399999;
            }

            this.getData(postData);
        },
        modifyProject(row, index) {
            this.modifyProjectDialogVisible = true;
            this.modifyProjectIndex = index;
            this.modifyProjectItem = JSON.parse(JSON.stringify(row));
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
            let _this = this;
            let postData = {
                pid: this.modifyProjectItem.id,
                name: this.modifyProjectItem.projectName,
                user: this.modifyProjectItem.projectLeader,
                contactInfo: this.modifyProjectItem.projectContact,
                description: this.modifyProjectItem.projectDescription,
                applyDocumentAddress: this.modifyProjectItem.projectApplyFile,
                contactEmail: this.modifyProjectItem.projectApplyEmail,
                involvedInstitutionDoi: this.modifyProjectItem.involvedInstitutionDoi,
            }
            postForm("/projectInfos/modify", postData, _this, function(res){
                if(res.code === 200) {
                    _this.$message({
                        type: 'success',
                        message: '修改成功'
                    });
                    _this.getData({});
                    _this.modifyProjectDialogVisible = false;
                }
            })
        },
        addProject() {
            this.addProjectDialogVisible = true;
            this.addProjectItem = {
                gid: "",
                projectName: "",
                projectLeader: "",
                projectContact: "",
                projectDescription: "",
                projectApplyFile: "",
                projectApplyEmail: "",
                involvedInstitutionDoi: "",
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
            let _this = this;

            // 检查有没有空值
            if(this.addProjectItem.gid === "" || this.addProjectItem.projectName === "" || this.addProjectItem.projectLeader === "" || this.addProjectItem.projectContact === "" || this.addProjectItem.projectDescription === ""  || this.addProjectItem.projectApplyFile === "" || this.addProjectItem.projectApplyEmail === "" || this.addProjectItem.involvedInstitutionDoi === "") {
                this.$message({
                    type: 'warning',
                    message: '请填写完整信息'
                });
                return;
            }

            let postData = {
                gid: this.addProjectItem.gid,
                name: this.addProjectItem.projectName,
                user: this.addProjectItem.projectLeader,
                contactInfo: this.addProjectItem.projectContact,
                description: this.addProjectItem.projectDescription,
                applyDocumentAddress: this.addProjectItem.projectApplyFile,
                contactEmail: this.addProjectItem.projectApplyEmail,
                involvedInstitutionDoi: this.addProjectItem.involvedInstitutionDoi,
            }

            postForm('/projectInfos/apply', postData, this, function(res){
                if(res.code === 200) {
                    _this.$message({
                        type: 'success',
                        message: '添加成功'
                    });
                    _this.getData({});
                    _this.addProjectDialogVisible = false;
                }
            })
        },
        // 处理上传成功
        uploadSuccessAdd(response, file, fileList) {
            if(response.code === 200) {
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
                this.addProjectItem.projectApplyFile = response.data;
            } else {
                this.$message({
                    message: response.message,
                    type: 'error'
                });
            }
        },

        uploadSuccessModify(response, file, fileList) {
            if(response.code === 200) {
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
                this.modifyProjectItem.projectApplyFile = response.data;
            } else {
                this.$message({
                    message: response.message,
                    type: 'error'
                });
            }
        },
    },
}
</script>

<style scoped>
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
</style>