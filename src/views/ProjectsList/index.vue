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
                    <el-form-item prop="projectDoi" label="项目标识" class="SearchFormItem">
                        <el-input v-model="searchForm.projectDoi"></el-input>
                    </el-form-item>
                    <el-form-item prop="institutionDoi" label="机构标识" class="SearchFormItem">
                        <el-input v-model="searchForm.institutionDoi"></el-input>
                    </el-form-item>
                    <el-form-item prop="contactInfo" label="项目联系方式" class="SearchFormItem">
                        <el-input v-model="searchForm.contactInfo"></el-input>
                    </el-form-item>
                    <el-form-item prop="contactEmail" label="负责人邮箱" class="SearchFormItem">
                        <el-input v-model="searchForm.contactEmail"></el-input>
                    </el-form-item>
                    <el-form-item prop="description" label="项目描述" class="SearchFormItem">
                        <el-input v-model="searchForm.description"></el-input>
                    </el-form-item>

                    <!-- <el-form-item prop="createTimeRange" label="申请时间" class="SearchFormTimePicker">
                        <el-date-picker value-format="timestamp" v-model="searchForm.createTimeRange" type="daterange"
                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>

                    <el-form-item prop="updateTimeRange" label="修改时间" class="SearchFormTimePicker">
                        <el-date-picker value-format="timestamp" v-model="searchForm.updateTimeRange" type="daterange"
                            range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item> -->
                </el-form>

                <el-button type="primary" @click="searchData">搜索</el-button>
            </el-collapse-item>
        </el-collapse>
        <div style="margin-top: 24px;"></div>

        <el-table :data="projectTable" stripe border style="width: 95%;">
            <el-table-column prop="name" label="项目名称" align="center"></el-table-column>
            <el-table-column prop="user" label="机构" align="center"></el-table-column>
            <el-table-column prop="projectDoi" label="项目标识" align="center"></el-table-column>
            <el-table-column prop="institutionDoi" label="机构标识" align="center"></el-table-column>
            <!-- <el-table-column prop="involvedInstitutionDoi" label="参与机构标识" align="center"></el-table-column> -->
            <el-table-column prop="contactInfo" label="项目联系方式" align="center"></el-table-column>
            <el-table-column prop="contactEmail" label="负责人邮箱" align="center"></el-table-column>
            <el-table-column prop="description" label="项目描述" align="center"></el-table-column>
            <!-- <el-table-column prop="createTime" label="申请时间" align="center"></el-table-column> -->
            <el-table-column prop="updateTime" label="修改时间" align="center"></el-table-column>
            <!-- <el-table-column prop="userBoList" label="用户列表" align="center">
                <template slot-scope="scope">
                    <div v-for="item in scope.row.userNameList" :key="item">{{ item }}</div>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="props">
                    <el-button @click="modifyProject(props.row, props.$index)" type="primary"
                        size="small">修改</el-button>
                </template>
            </el-table-column> -->
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
                <el-form-item label="负责人邮箱">
                    <el-input v-model="modifyProjectItem.contactEmail"></el-input>
                </el-form-item>
                <el-form-item label="项目联系方式">
                    <el-input v-model="modifyProjectItem.contactInfo"></el-input>
                </el-form-item>
                <el-form-item label="项目描述">
                    <el-input v-model="modifyProjectItem.description"></el-input>
                </el-form-item>
                <el-form-item label="参与项目DOI">
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
                <el-form-item label="项目申请文件" prop="projectApplyFile">
                    <el-upload drag action="/api/file/upload"
                        :headers="{ 'Authorization': 'Bearer ' + $store.state.user.token }"
                        :on-success="uploadSuccessModify">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
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
            // 获取项目信息
            _this.getData({});
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
                    if (item.involvedInstitutionDoi !== undefined && item.involvedInstitutionDoi !== "" && item.involvedInstitutionDoi !== null) {
                        dataItem.institutionList = item.involvedInstitutionDoi.split(",");
                    } else {
                        dataItem.institutionList = [];
                    }
                    for (let item of item.userBoList) {
                        dataItem.userBoList.push(item.uid)
                        dataItem.userNameList.push(item.username)
                    }
                    _this.projectTable.push(dataItem);
                    break;
                }
            })
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
                user: this.searchForm.user,
                contactInfo: this.searchForm.contactInfo,
                description: this.searchForm.description,
                projectDoi: this.searchForm.projectDoi,
                institutionDoi: this.searchForm.institutionDoi,
            }

            if (this.searchForm.createTimeRange && this.searchForm.createTimeRange !== "") {
                postData.createTimeBegin = this.searchForm.createTimeRange[0];
                postData.createTimeEnd = this.searchForm.createTimeRange[1] + 86399999;
            }

            if (this.searchForm.updateTimeRange && this.searchForm.updateTimeRange !== "") {
                postData.updateTimeBegin = this.searchForm.updateTimeRange[0];
                postData.updateTimeEnd = this.searchForm.updateTimeRange[1] + 86399999;
            }

            this.getData(postData);
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
            let _this = this;

            // 将 selected = true 的机构 DOI 添加到 involvedInstitutionDoi 中，以逗号分隔
            for (let item of this.modifyProjectItem.institutionList) {
                this.modifyProjectItem.involvedInstitutionDoi += item + ",";
            }

            let postData = {
                pid: _this.projectTable[_this.modifyProjectIndex].pid,
                name: _this.modifyProjectItem.name,
                user: _this.modifyProjectItem.user,
                contactInfo: _this.modifyProjectItem.contactInfo,
                contactEmail: _this.modifyProjectItem.contactEmail,
                description: _this.modifyProjectItem.description,
                applyDocumentAddress: _this.modifyProjectItem.projectApplyFile,
                involvedInstitutionDoi: _this.modifyProjectItem.involvedInstitutionDoi,
            }



            // 判断项目信息和之前有无变动，因为修改项目信息需要审批，修改用户权限不需要审批。
            let oldInfo = _this.projectTable[_this.modifyProjectIndex];
            let newInfo = _this.modifyProjectItem;
            let projectInfoModify = oldInfo.name !== newInfo.name || oldInfo.user !== newInfo.user
                || oldInfo.contactInfo !== newInfo.contactInfo || oldInfo.contactEmail !== newInfo.contactEmail
                || oldInfo.description !== newInfo.description || oldInfo.applyDocumentAddress !== newInfo.applyDocumentAddress
                || oldInfo.involvedInstitutionDoi !== newInfo.involvedInstitutionDoi;

            if (projectInfoModify) {
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
            }

            // 修改用户权限部分
            let userListAdd = [];
            let userListDelete = [];
            // 获取新增和删除的用户列表
            for (let item of this.modifyProjectItem.userBoList) {
                if (!this.modifyProjectItem.userBoListCopy.includes(item)) {
                    userListAdd.push(item);
                }
            }
            for (let item of this.modifyProjectItem.userBoListCopy) {
                if (!this.modifyProjectItem.userBoList.includes(item)) {
                    userListDelete.push(item);
                }
            }


            if (userListAdd.length !== 0) {
                postData = {
                    pid: _this.projectTable[_this.modifyProjectIndex].pid,
                    uidList: userListAdd,
                }
                postForm('/projectInfos/batchAddUsers', postData, _this, function (res) {
                    if (res.code === 200) {
                        _this.$message({
                            type: 'success',
                            message: '添加用户成功'
                        });
                    }
                })
            }

            if (userListDelete.length !== 0) {
                postData = {
                    pid: _this.projectTable[_this.modifyProjectIndex].pid,
                    uidList: userListDelete,
                }
                postForm('/projectInfos/batchDeleteUsers', postData, _this, function (res) {
                    if (res.code === 200) {
                        _this.$message({
                            type: 'success',
                            message: '删除用户成功'
                        });
                    }
                })
            }

            _this.modifyProjectDialogVisible = false;
        },

        // 处理上传成功
        uploadSuccessAdd(response, file, fileList) {
            if (response.code === 200) {
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
            if (response.code === 200) {
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