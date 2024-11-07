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
                        <el-select v-model="searchForm.brand" filterable placeholder="请选择">
                            <el-option v-for="item in brandList" :key="item" :label="item" :value="item"></el-option>
                        </el-select>
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
            <el-table-column prop="status" label="申请状态" align="center">
                <template slot-scope="scope">
                    <el-tag v-if="scope.row.status === 0">待审批</el-tag>
                    <el-tag v-if="scope.row.status === 1" type="success">已通过</el-tag>
                    <el-tag v-if="scope.row.status === 2" type="danger">已拒绝</el-tag>
                </template>
            </el-table-column>
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
                <el-form-item label="其他牵头机构" prop="leadingInstitutionDoiList">
                    <el-select v-model="addProjectForm.leadingInstitutionDoiList" multiple filterable placeholder="请选择">
                        <el-option v-for="item in institutionList" :key="item.doi" :label="item.name"
                            :value="item.doi"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目参与机构" prop="involvedInstitutionDoiList">
                    <el-select v-model="addProjectForm.involvedInstitutionDoiList" multiple filterable
                        placeholder="请选择">
                        <el-option v-for="item in institutionList" :key="item.doi" :label="item.name"
                            :value="item.doi"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="品种" prop="brandList">
                    <el-select v-model="addProjectForm.brandList" multiple filterable placeholder="请选择">
                        <el-option v-for="item in brandList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目申请文件" prop="applyDocumentAddress">
                    <el-upload drag action="/api/file/upload"
                        :headers="{ 'Authorization': 'Bearer ' + $store.state.user.token }"
                        :on-success="uploadSuccessAdd">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
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
                <el-form-item label="其他牵头机构" prop="leadingInstitutionDoiList">
                    <el-select v-model="modifyProjectForm.leadingInstitutionDoiList" multiple filterable placeholder="请选择">
                        <el-option v-for="item in institutionList" :key="item.doi" :label="item.name"
                            :value="item.doi"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目参与机构" prop="involvedInstitutionDoiList">
                    <el-select v-model="modifyProjectForm.involvedInstitutionDoiList" multiple filterable
                        placeholder="请选择">
                        <el-option v-for="item in institutionList" :key="item.doi" :label="item.name"
                            :value="item.doi"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="品种" prop="brandList">
                    <el-select v-model="modifyProjectForm.brandList" multiple filterable placeholder="请选择">
                        <el-option v-for="item in brandList" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目申请文件" prop="applyDocumentAddress">
                    <el-upload drag action="/api/file/upload"
                        :headers="{ 'Authorization': 'Bearer ' + $store.state.user.token }"
                        :on-success="uploadSuccessModify">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
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
                <el-table-column prop="hashValue" label="哈希值" align="center"></el-table-column>
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
import { postForm, getForm, postFormPublic, getFormPublic } from '@/api/data';
export default {
    name: "ProjectsList",
    data() {
        return {
            pages: 1,
            currentPage: 1,
            institutionList: [
                { name: "北医三院", doi: "123" },
                { name: "北医四院", doi: "1234" }
            ],
            userList: [
                { username: "user001", uid: 1 }
            ],
            uidToUsername: {
                1: "user001",
            },
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
                    leadingInstitutionDoiList: ["123"],
                    involvedInstitutionDoiList: ["1234"],
                    brandList: ["感冒灵"],
                    status: 2,
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
                leadingInstitutionDoiList: [],
                involvedInstitutionDoiList: [],
                brandList: [],
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
                leadingInstitutionDoiList: [],
                involvedInstitutionDoiList: [],
                brandList: [],
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
                    hashValue: "0x13c02bbdabd149a8ab7e745a9d03b2184ca20c4312eef07c69a3f27ad49833b6",
                }
            ],
        };
    },
    mounted() {
        // 获取基础数据
        this.getBasicData();
    },
    methods: {
        // 获取基础数据
        getBasicData() {
            let _this = this;

            this.institutionList = []
            this.userList = []
            this.uidToUsername = {}
            this.brandList = []
            // 获取所有机构
            postFormPublic("/institution/insList/list", { pageNo: 1, pageSize: 10000 }, _this, function (res) {
                for (let item of res.data.list) {
                    _this.institutionList.push({
                        name: item.name,
                        doi: item.doi
                    })
                }
                // 获取所有用户 
                postForm("/users/getUsers", { page: 1, size: 10000 }, _this, function (res) {
                    for (let item of res.data.records) {
                        _this.userList.push({
                            uid: item.uid,
                            username: item.username,
                        });
                        _this.uidToUsername[item.uid] = item.username
                    }
                    // 获取所有品种
                    getForm("/brand/getAll", _this, function (res) {
                        for (let item of res.data) {
                            _this.brandList.push(item)
                        }
                        // 获取所有数据
                        _this.getData({})
                    })
                });
            })
        },

        clickPage(page) {
            this.currentPage = page;
            this.searchForm.page = this.currentPage;
            this.getData(this.searchForm);
        },

        collapseChange(activeNames) {
            if (activeNames.length === 0) {
                this.collapseTitle = "搜索栏（点击展开）";
            } else {
                this.collapseTitle = "搜索栏（点击收起）";
            }
        },

        searchData() {
            let postData = {
                name: this.searchForm.name,
                projectDoi: this.searchForm.projectDoi,
                leadingInstitution: this.searchForm.leadingInstitution,
                involvedInstitutionDoi: this.searchForm.involvedInstitutionDoi,
                brand: this.searchForm.brand,
            }
            this.getData(postData);
        },

        getData(postData) {
            let _this = this;
            _this.projectTable = [];
            postForm('/projectInfos/getProjectInfo', postData, _this, function (res) {
                _this.pages = res.data.pages;
                for (let item of res.data.records) {
                    let dataItem = {
                        pid: item.pid,
                        name: item.name,
                        projectDoi: item.projectDoi,
                        user: item.user,
                        contactEmail: item.contactEmail,
                        status: item.status,
                        uidList: [],
                    }
                    if (item.leadingInstitution !== undefined && item.leadingInstitution !== null) {
                        dataItem.leadingInstitutionDoiList = item.leadingInstitution.split(",");
                    } else {
                        dataItem.leadingInstitutionDoiList = [];
                    }
                    if (item.involveInsDoi !== undefined && item.involveInsDoi !== null) {
                        dataItem.involvedInstitutionDoiList = item.involveInsDoi.split(",");
                    } else {
                        dataItem.involvedInstitutionDoiList = [];
                    }
                    if (item.brand !== undefined && item.brand !== null) {
                        dataItem.brandList = item.brand.split(",");
                    } else {
                        dataItem.brandList = [];
                    }

                    for (let item of item.userBoList) {
                        dataItem.uidList.push(item.uid)
                    }
                    _this.projectTable.push(dataItem);
                }
            })
        },

        // 处理建项的上传文件
        uploadSuccessAdd(response, file, fileList) {
            if (response.code === 200) {
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
                this.addProjectForm.applyDocumentAddress = response.data;
            } else {
                this.$message({
                    message: response.message,
                    type: 'error'
                });
            }
        },

        addProject() {
            this.addProjectDialogVisible = true;
            this.addProjectForm = {
                name: "",
                user: "",
                contactEmail: "",
                leadingInstitutionDoiList: [],
                involvedInstitutionDoiList: [],
                brandList: [],
                applyDocumentAddress: "",
            }
        },

        addProjectConfirm() {
            let _this = this;

            let postData = {
                name: this.addProjectForm.name,
                user: this.addProjectForm.user,
                contactEmail: this.addProjectForm.contactEmail,
                leadingInstitution: this.addProjectForm.leadingInstitutionDoiList.toString(),
                involvedInstitutionDoi: this.addProjectForm.involvedInstitutionDoiList.toString(),
                brand: this.addProjectForm.brandList.toString(),
                applyDocumentAddress: this.addProjectForm.applyDocumentAddress,
            }

            postForm('/projectOrder/create', postData, _this, function (res) {
                if (res.code === 200) {
                    _this.$message({
                        type: 'success',
                        message: '添加成功'
                    });
                    _this.getData({});
                    _this.addProjectDialogVisible = false;
                }
            })
        },

        // 处理修改项目的上传文件
        uploadSuccessModify(response, file, fileList) {
            if (response.code === 200) {
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
                this.modifyProjectForm.applyDocumentAddress = response.data;
            } else {
                this.$message({
                    message: response.message,
                    type: 'error'
                });
            }
        },
        modifyProject(row, index) {
            this.modifyProjectDialogVisible = true;
            this.modifyProjectIndex = index;
            this.modifyProjectForm = JSON.parse(JSON.stringify(row));
            console.log(this.modifyProjectForm)
        },

        modifyProjectConfirm() {
            let postData = {
                pid: this.projectTable[this.modifyProjectIndex].pid,
                name: this.modifyProjectForm.name,
                user: this.modifyProjectForm.user,
                contactEmail: this.modifyProjectForm.contactEmail,
                leadingInstitution: this.modifyProjectForm.leadingInstitutionDoiList.toString(),
                involvedInstitutionDoi: this.modifyProjectForm.involvedInstitutionDoiList.toString(),
                brand: this.modifyProjectForm.brandList.toString(),
                applyDocumentAddress: this.modifyProjectForm.applyDocumentAddress,
            }

            let _this = this;
            postForm("/projectOrder/modify", postData, _this, function (res) {
                if (res.code === 200) {
                    _this.$message({
                        type: 'success',
                        message: '修改成功'
                    });
                    _this.getData({});
                    _this.modifyProjectDialogVisible = false;
                }
            })
        },

        modifyUser(row, index) {
            this.modifyUserDialogVisible = true;
            this.modifyUserIndex = index;
            this.modifyUserForm.uidList = row.uidList;
            console.log(this.modifyUserForm)
        },

        modifyUserConfirm() {
            postData = {
                pid: this.projectTable[this.modifyUserIndex].pid,
                uidList: this.modifyUserForm.uidList,
            }
            let _this = this;
            postForm('/projectInfos/batchAddUsers', postData, _this, function (res) {
                if (res.code === 200) {
                    _this.$message({
                        type: 'success',
                        message: '添加用户成功'
                    });
                }
                _this.getData(_this.searchForm);
                _this.modifyUserDialogVisible = false;
            })
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

        contractHistory(row, index) {
            this.contractVisible = true;
            this.contractTable = [];
            let _this = this;
            getForm(`/getContractListByPid/${row.pid}`, _this, function(res) {
                for(let item of res.data) {
                    _this.contractTable.push(item)
                }
            })
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