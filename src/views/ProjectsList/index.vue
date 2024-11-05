<template>
    <div style="text-align: center; margin: 24px 40px 24px 40px;">
        <el-collapse v-model="activeNames" @change="collapseChange">
            <el-collapse-item :title="collapseTitle" name="1">
                <el-form :model="searchForm" label-width="auto" class="SearchForm">
                    <el-form-item prop="name" label="项目名称" class="SearchFormItem">
                        <el-input v-model="searchForm.name"></el-input>
                    </el-form-item>
                    <el-form-item prop="projectDoi" label="项目标识" class="SearchFormItem">
                        <el-input v-model="searchForm.projectDoi"></el-input>
                    </el-form-item>
                    <el-form-item prop="leadingInstitution" label="牵头机构" class="SearchFormItem">
                        <el-select v-model="searchForm.leadingInstitution" filterable placeholder="请选择">
                            <el-option v-for="item in institutionList" :key="item.doi" :label="item.name"
                                :value="item.doi"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="involvedInstitutionDoi" label="参与机构" class="SearchFormItem">
                        <el-select v-model="searchForm.involvedInstitutionDoi" filterable placeholder="请选择">
                            <el-option v-for="item in institutionList" :key="item.doi" :label="item.name"
                                :value="item.doi"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop="brand" label="品种" class="SearchFormItem">
                        <el-input v-model="searchForm.brand"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" @click="searchData">搜索</el-button>
            </el-collapse-item>
        </el-collapse>

        <div style="display: flex; align-items: center; justify-content: center;">
            <el-button @click="addProject" type="primary" style="margin: 24px;">申请项目</el-button>
        </div>

        <el-table :data="projectTable" stripe border style="width: 100%;">
            <el-table-column prop="name" label="项目名称" align="center"></el-table-column>
            <el-table-column prop="projectDoi" label="项目标识" align="center"></el-table-column>
            <el-table-column prop="user" label="项目负责人" align="center"></el-table-column>
            <el-table-column prop="contactEmail" label="联系方式" align="center"></el-table-column>
            <el-table-column prop="leadingInstitution" label="牵头机构" align="center"></el-table-column>
            <el-table-column prop="involveInsDoi" label="参与机构" align="center"></el-table-column>
            <el-table-column prop="brand" label="品种" align="center"></el-table-column>
            <el-table-column prop="status" label="申请状态" align="center"></el-table-column>
            <el-table-column prop="uidList" label="用户列表" align="center">
                <template slot-scope="scope">
                    <div v-for="item in scope.row.uidList" :key="item">{{ uidToUsername[item] }}</div>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="props">
                    <el-button @click="modifyProject(props.row, props.$index)" type="primary" size="small"
                        style="margin: 5px;">修改项目信息</el-button>
                    <el-button @click="modifyUser(props.row, props.$index)" type="primary" size="small"
                        style="margin: 5px;">添加权限用户</el-button>
                    <el-button @click="contractHistory(props.row, props.$index)" type="primary" size="small"
                        style="margin: 5px;">权限修改历史</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="margin: 24px">
            <el-pagination background layout="pager" :page-size="10" :page-count="pages" @current-change="clickPage">
            </el-pagination>
        </div>

        <el-dialog title="申请项目" :visible.sync="addProjectDialogVisible" width="80%" :before-close="cancel">
            <el-form :model="addProjectForm" label-width="auto" align="left" :rules="addProjectRules">
                <el-form-item prop="name" label="项目名称">
                    <el-input v-model="addProjectForm.name"></el-input>
                </el-form-item>
                <el-form-item prop="user" label="项目负责人">
                    <el-input v-model="addProjectForm.user"></el-input>
                </el-form-item>
                <el-form-item prop="contactEmail" label="联系方式">
                    <el-input v-model="addProjectForm.contactEmail"></el-input>
                </el-form-item>
                <el-form-item label="其他牵头机构" prop="leadingInstitution">
                    <el-select v-model="addProjectForm.leadingInstitution" multiple filterable placeholder="请选择">
                        <el-option v-for="item in institutionList" :key="item.doi" :label="item.name"
                            :value="item.doi"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目参与机构" prop="involvedInstitutionDoi">
                    <el-select v-model="addProjectForm.involvedInstitutionDoi" multiple filterable placeholder="请选择">
                        <el-option v-for="item in institutionList" :key="item.doi" :label="item.name"
                            :value="item.doi"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="品种" prop="brand">
                    <el-select v-model="addProjectForm.brand" multiple filterable placeholder="请选择">
                        <el-option v-for="item in brandList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目申请文件" prop="applyDocumentAddress">
                    <el-button type="primary">点击上传</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="addProjectConfirm">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="修改项目信息" :visible.sync="modifyProjectDialogVisible" width="80%" :before-close="cancel">
            <el-form :model="modifyProjectForm" label-width="auto" align="left" :rules="modifyProjectRules">
                <el-form-item prop="name" label="项目名称">
                    <el-input v-model="modifyProjectForm.name"></el-input>
                </el-form-item>
                <el-form-item label="项目负责人">
                    <el-input v-model="modifyProjectForm.user"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="modifyProjectForm.contactEmail"></el-input>
                </el-form-item>
                <el-form-item label="其他牵头机构" prop="institutionList">
                    <el-select v-model="addProjectForm.leadingInstitution" multiple filterable placeholder="请选择">
                        <el-option v-for="item in institutionList" :key="item.doi" :label="item.name"
                            :value="item.doi"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目参与机构" prop="involveInsDoi">
                    <el-select v-model="addProjectForm.involveInsDoi" multiple filterable placeholder="请选择">
                        <el-option v-for="item in institutionList" :key="item.doi" :label="item.name"
                            :value="item.doi"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="品种" prop="brand">
                    <el-select v-model="addProjectForm.brand" multiple filterable placeholder="请选择">
                        <el-option v-for="item in brandList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目申请文件" prop="applyDocumentAddress">
                    <el-button type="primary">点击上传</el-button>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="modifyProjectConfirm">确 定</el-button>
            </span>
        </el-dialog>


        <el-dialog title="添加权限用户" :visible.sync="modifyUserDialogVisible" width="80%" :before-close="cancel">
            <el-form :model="modifyUserForm" label-width="auto" align="left" :rules="userRules">
                <el-form-item label="已授权用户">
                    <span>user001, user002</span>
                </el-form-item>
                <el-form-item label="添加用户" prop="user">
                    <el-select v-model="modifyUserForm.uidList" multiple filterable placeholder="请选择">
                        <el-option v-for="item in userList" :key="item.uid" :label="item.username"
                            :value="item.uid"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="modifyUserConfirm">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="权限修改历史" :visible.sync="contractVisible" width="80%" :before-close="cancelWithoutConfirm">
            <el-table :data="contractTable" stripe border style="width: 95%;">
                <el-table-column prop="number" label="区块编号" align="center"></el-table-column>
                <el-table-column prop="createTime" label="时间" align="center"></el-table-column>
                <el-table-column prop="address" label="合约地址" align="center"></el-table-column>
                <el-table-column prop="hashingValue" label="哈希值" align="center"></el-table-column>
            </el-table>

            <div style="margin: 24px">
                <el-pagination background layout="pager" :page-size="10" :page-count="pages"
                    @current-change="clickPage">
                </el-pagination>
            </div>
        </el-dialog>
    </div>

</template>

<script>
import { postForm } from '@/api/data';
export default {
    name: "ProjectsList",
    data() {
        return {
            pages: 1,
            currentPage: 1,
            userList: [
                { username: "user001", uid: 1 }
            ],
            uidToUsername: {
                1: "user001",
            },
            institutionList: [
                { name: "北医三院", doi: "123" }
            ],
            // 品种列表
            brandList: [
                "感冒灵", "诺氟沙星"
            ],
            // 折叠
            activeNames: [],
            collapseTitle: "搜索栏（点击展开）",
            // 搜索表单
            searchForm: {
                // 项目名称
                name: "",
                projectDoi: "",
                involveInsDoi: "",
                leadingInstitution: "",
                brand: "",
            },
            // 项目列表
            projectTable: [
                {
                    pid: 1,
                    name: "111",
                    projectDoi: "111",
                    user: "111",
                    contactEmail: "111",
                    leadingInstitution: "111",
                    involveInsDoi: "111",
                    brand: "111",
                    status: "111",
                    // 用户列表
                    uidList: [1],
                }
            ],

            // 增加项目弹窗是否显示
            addProjectDialogVisible: false,
            // 项目item的拷贝
            addProjectForm: {
                name: "",
                user: "",
                contactEmail: "",
                leadingInstitution: "",
                involveInsDoi: "",
                brand: "",
                applyDocumentAddress: "",
            },

            addProjectRules: {
                name: [
                    { required: true, message: '请输入项目名字', trigger: 'blur' }
                ],
                applyDocumentAddress: [
                    { required: true, message: '请上传申请文件', trigger: 'blur' }
                ]
            },

            // 修改项目弹窗是否显示
            modifyProjectDialogVisible: false,
            // 修改项目的 index
            modifyProjectIndex: 0,
            // 项目item的拷贝
            modifyProjectForm: {
                pid: undefined,
                name: "",
                user: "",
                contactEmail: "",
                leadingInstitution: "",
                involveInsDoi: "",
                brand: "",
                applyDocumentAddress: "",
            },
            modifyProjectRules: {
                applyDocumentAddress: [
                    { required: true, message: '请上传申请文件', trigger: 'blur' }
                ]
            },


            // 修改用户弹窗是否显示
            modifyUserDialogVisible: false,
            // 修改用户对应项目的 index
            modifyUserIndex: 0,
            modifyUserForm: {
                uidList: [],
            },
            userRules: {
                applyDocumentAddress: [
                    { required: true, message: '请上传申请文件', trigger: 'blur' }
                ]
            },

            modifyUserDialogVisible: false,

            contractVisible: false,
            contractTable: [
                {
                    number: 0,
                    createTime: "2024",
                    address: "0x51fB57B6B7837D4064158BDFE2DDDF91A53D46e7",
                    hashingValue: "0x13c02bbdabd149a8ab7e745a9d03b2184ca20c4312eef07c69a3f27ad49833b6",
                }
            ],
        };
    },
    mounted() {

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


        addProject() {
            this.addProjectDialogVisible = true;
            this.addProjectForm = {
                projectName: "",
                projectLeader: "",
                projectContact: "",
                projectDescription: "",
                projectApplyFile: "",
                projectApplyEmail: "",
                institutionList: [],
                involvedInstitutionDoi: "",
            }
        },
        cancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.addProjectDialogVisible = false;
                this.modifyProjectDialogVisible = false;
                this.modifyUserDialogVisible = false;
                this.contractVisible = false;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        addProjectConfirm() {
            let _this = this;
            // 将 selected = true 的机构 DOI 添加到 involvedInstitutionDoi 中，以逗号分隔
            for (let item of this.addProjectForm.institutionList) {
                this.addProjectForm.involvedInstitutionDoi += item + ",";
            }

            // 检查有没有空值
            if (this.addProjectForm.projectName === "" || this.addProjectForm.projectLeader === "" || this.addProjectForm.projectContact === "" || this.addProjectForm.projectDescription === "" || this.addProjectForm.projectApplyFile === "" || this.addProjectForm.projectApplyEmail === "") {
                this.$message({
                    type: 'warning',
                    message: '请填写完整信息'
                });
                return;
            }
            _this.addProjectDialogVisible = false;
        },

        modifyProject(row, index) {
            this.modifyProjectDialogVisible = true;
            this.modifyProjectIndex = index;
            this.modifyProjectForm = JSON.parse(JSON.stringify(row));
            console.log(this.modifyProjectForm)
        },

        modifyProjectConfirm() {
            _this.modifyProjectDialogVisible = false;
        },

        modifyUser(row, index) {
            this.modifyUserDialogVisible = true;
            this.modifyUserIndex = index;
            this.modifyUserForm.uidList = row.uidList;
            console.log(this.modifyUserForm)
        },

        modifyUserConfirm() {
            this.modifyUserDialogVisible = false;
        },

        contractHistory() {
            this.contractVisible = true;
        },
        cancelWithoutConfirm() {
            this.contractVisible = false;
        }
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