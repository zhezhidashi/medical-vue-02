<template>
    <div style="text-align: center; margin: 24px 40px 24px 40px;">

        <el-collapse v-model="activeNames" @change="collapseChange">
            <el-collapse-item :title="collapseTitle" name="1">
            <el-form :model="searchForm" label-width="auto" class="SearchForm">
                <el-form-item class="SearchFormItem" label="申请机构DOI">
                    <el-input v-model="searchForm.applicantInstitutionDoi"></el-input>
                </el-form-item>
                <el-form-item class="SearchFormItem" label="接受机构DOI">
                    <el-input v-model="searchForm.recipientInstitutionDoi"></el-input>
                </el-form-item>
                <el-form-item class="SearchFormItem" label="DOI">
                    <el-input v-model="searchForm.doi"></el-input>
                </el-form-item>
                <el-form-item class="SearchFormItem" label="申请类型">
                    <el-select v-model="searchForm.appType" placeholder="请选择" clearable>
                        <el-option label="实体型" value="1"></el-option>
                        <el-option label="指针型" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="SearchFormItem" label="申请名称">
                    <el-input v-model="searchForm.appName"></el-input>
                </el-form-item>
                <el-form-item class="SearchFormItem" label="申请内容">
                    <el-input v-model="searchForm.appContent"></el-input>
                </el-form-item>
                <el-form-item class="SearchFormItem" label="申请文件">
                    <el-input v-model="searchForm.appFile"></el-input>
                </el-form-item>
                <el-form-item class="SearchFormTimePicker" label="创建时间范围">
                    <el-date-picker
                        v-model="searchForm.createTimeRange"
                        value-format="timestamp"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="SearchFormTimePicker" label="更新时间范围">
                    <el-date-picker
                        v-model="searchForm.updateTimeRange"
                        value-format="timestamp"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
                    </el-date-picker>
                </el-form-item>
                <el-form-item class="SearchFormItem" label="申请状态">
                    <el-select v-model="searchForm.appStatus" placeholder="请选择" clearable>
                        <el-option label="已批准" value="1"></el-option>
                        <el-option label="已拒绝" value="2"></el-option>
                        <el-option label="待审核" value="3"></el-option>
                        <el-option label="无效记录" value="4"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <el-button type="primary" @click="searchData">搜索</el-button>
        </el-collapse-item>
    </el-collapse>
    <div style="margin-top: 24px;"></div>

            <div style="display: flex; align-items: center; justify-content: center;">
                <el-button @click="addApply" type="primary" style="margin-bottom: 24px;">增加申请</el-button>
            </div>

            <el-table :data="applyTable" style="width: 95%;" stripe border >
                <el-table-column prop="applicantInstitutionDoi" label="申请机构DOI"></el-table-column>
                <el-table-column prop="recipientInstitutionDoi" label="接受机构DOI"></el-table-column>
                <el-table-column prop="doi" label="DOI"></el-table-column>
                <el-table-column prop="appType" label="申请类型">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.appType === 1">实体型</el-tag>
                        <el-tag v-else-if="scope.row.appType === 2">指针型</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="appName" label="申请名称"></el-table-column>
                <el-table-column prop="appContent" label="申请内容"></el-table-column>
                <el-table-column prop="appFile" label="申请文件"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column prop="updateTime" label="更新时间"></el-table-column>
                <el-table-column prop="appStatus" label="申请状态">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.appStatus === 1" type="success">已批准</el-tag>
                        <el-tag v-else-if="scope.row.appStatus === 2" type="error">已拒绝</el-tag>
                        <el-tag v-else-if="scope.row.appStatus === 3">待审核</el-tag>
                        <el-tag v-else-if="scope.row.appStatus === 4" type="warning">无效记录</el-tag>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="changeApply(scope.row, scope.$index)" type="text" size="small">修改</el-button>
                        <el-button @click="deleteApply(scope.$index)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column> -->
            </el-table>

            <div style="margin: 24px">
                <el-pagination background layout="pager" :page-size="10" :page-count="pages"
                    @current-change="clickPage">
                </el-pagination>
            </div>

            <el-dialog title="增加申请" :visible.sync="addApplyDialogVisible" width="80%"
                :before-close="addApplyCancel">
                <el-form :model="applyForm" ref="applyForm" label-width="auto">

                    <el-form-item label="DOI" prop="doi">
                        <el-input v-model="applyForm.doi"></el-input>
                    </el-form-item>

                    <el-form-item label="申请类型" prop="applyType">
                        <el-select v-model="applyForm.appType" placeholder="请选择" clearable>
                            <el-option label="实体型" value="1"></el-option>
                            <el-option label="指针型" value="2"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="接受机构DOI" prop="recipientInstitutionDoi">
                        <el-input v-model="applyForm.recipientInstitutionDoi"></el-input>
                    </el-form-item>

                    <el-form-item label="申请名字" prop="appName">
                        <el-input v-model="applyForm.appName"></el-input>
                    </el-form-item>

                    <el-form-item label="申请内容" prop="appContent">
                        <el-input v-model="applyForm.appContent"></el-input>
                    </el-form-item>

                    <el-form-item label="申请审批文件" prop="appFile">
                        <el-upload 
                            class="upload-demo" drag 
                            action="/api/file/upload" 
                            :headers="{'Authorization': 'Bearer ' + $store.state.user.token}" 
                            :on-success="handleUploadSuccess">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        </el-upload>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="addApplyCancel">取 消</el-button>
                    <el-button type="primary" @click="addApplyConfirm">确 定</el-button>
                </span>
            </el-dialog>

            <!-- <el-dialog title="修改申请" :visible.sync="modifyDialogVisible" width="80%"
                :before-close="modifyCancel">
                <el-form :model="modifyForm" ref="modifyForm" label-width="auto">

                    <el-form-item label="DOI" prop="doi">
                        <el-input v-model="modifyForm.doi"></el-input>
                    </el-form-item>

                    <el-form-item label="申请类型" prop="applyType">
                        <el-radio-group v-model="modifyForm.applyType">
                            <el-radio label="1">实体型</el-radio>
                            <el-radio label="2">指针型</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label="接受机构DOI" prop="recipientInstitutionDoi">
                        <el-input v-model="modifyForm.recipientInstitutionDoi"></el-input>
                    </el-form-item>

                    <el-form-item label="申请名字" prop="appName">
                        <el-input v-model="modifyForm.appName"></el-input>
                    </el-form-item>

                    <el-form-item label="申请内容" prop="appContent">
                        <el-input v-model="modifyForm.appContent"></el-input>
                    </el-form-item>

                    <el-form-item label="申请审批文件" prop="appFile">
                        <el-upload class="upload-demo" drag action="/api/file/upload" :headers="{'Authorization': 'Bearer ' + $store.state.user.token}" :on-success="handleUploadSuccess">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        </el-upload>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="modifyCancel">取 消</el-button>
                    <el-button type="primary" @click="modifyConfirm">确 定</el-button>
                </span>
            </el-dialog> -->


    </div>

</template>

<script>
import { postForm } from '@/api/data'
export default {
    name: "DigitalObjectApplyUser",
    data() {
        return {
            // 页数
            pages: 1,
            // 当前页数
            currentPage: 1,
// 折叠
activeNames: [],
            collapseTitle: "搜索栏（点击展开）",
            
            searchForm : {
                // 申请机构DOI
                applicantInstitutionDoi: undefined,
                // 申请人ID
                applicantUserId: undefined,
                // 接受机构DOI
                recipientInstitutionDoi: undefined,
                // DOI
                doi: undefined,
                // 申请类型
                appType: undefined,
                // 申请名称
                appName: undefined,
                // 申请内容
                appContent: undefined,
                // 申请文件
                appFile: undefined,
                // 创建时间范围
                createTimeRange: undefined,
                // 更新时间范围
                updateTimeRange: undefined,
                // 申请状态
                appStatus: undefined,
            },

            // 表格数据
            applyTable: [
                {
                    appId: 1,
                    applicantInstitutionDoi: '申请机构DOI',
                    applicantUserId: '申请人ID',
                    recipientInstitutionDoi: '接受机构DOI',
                    doi: 'DOI',
                    appType: '申请类型',
                    appName: '申请名称',
                    appContent: '申请内容',
                    appFile: '申请文件',
                    createTime: '创建时间',
                    updateTime: '更新时间',
                    appStatus: 1,
                }
            ],

            // 表单数据
            applyForm: {
                // DOI
                doi: '',
                // 申请类型
                appType: '',
                // 接受机构DOI
                recipientInstitutionDoi: '',
                // 申请名字
                appName: '',
                // 申请内容
                appContent: '',
                // 申请审批文件
                appFile: '',
            },
            addApplyDialogVisible: false,

            // modifyIndex: 0,
            // modifyDialogVisible: false,
            // modifyForm: {
            //     // DOI
            //     doi: '',
            //     // 申请类型
            //     appType: '',
            //     // 接受机构DOI
            //     recipientInstitutionDoi: '',
            //     // 申请名字
            //     appName: '',
            //     // 申请内容
            //     appContent: '',
            //     // 申请审批文件
            //     appFile: '',
            // },
        };
    },
    mounted() {
        this.getData({});
     },
    methods: {
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
                applicantInstitutionDoi: this.searchForm.applicantInstitutionDoi,
                recipientInstitutionDoi: this.searchForm.recipientInstitutionDoi,
                doi: this.searchForm.doi,
                appType: this.searchForm.appType,
                appName: this.searchForm.appName,
                appContent: this.searchForm.appContent,
                appFile: this.searchForm.appFile,
                appStatus: this.searchForm.appStatus,
            }
            if(this.searchForm.createTimeRange && this.searchForm.createTimeRange.length > 1) {
                postData.createTimeBegin = this.searchForm.createTimeRange[0];
                postData.createTimeEnd = this.searchForm.createTimeRange[1] + 86399999;
            }
            if(this.searchForm.updateTimeRange && this.searchForm.updateTimeRange.length > 1) {
                postData.updateTimeBegin = this.searchForm.updateTimeRange[0];
                postData.updateTimeEnd = this.searchForm.updateTimeRange[1] + 86399999;
            }
            this.getData(postData);
        },
        getData(postData) {
            let _this = this;
            this.applyTable = [];
            postForm('/doApplication/getUserApplication', postData, _this, function(res) {
                _this.pages = res.data.pages;
                for(let item of res.data.records) {
                    _this.applyTable.push({
                        appId: item.appId,
                        applicantInstitutionDoi: item.applicantInstitutionDoi,
                        applicantUserId: item.applicantUserId,
                        recipientInstitutionDoi: item.recipientInstitutionDoi,
                        doi: item.doi,
                        appType: item.appType,
                        appName: item.appName,
                        appContent: item.appContent,
                        appFile: item.appFile,
                        createTime: new Date(item.createTime).toLocaleDateString(),
                        updateTime: new Date(item.updateTime).toLocaleDateString(),
                        appStatus: item.appStatus,
                    })
                }
            })
        },
        // 处理上传成功
        handleUploadSuccess(response, file, fileList) {
            console.log(response);
            if(response.code === 200){
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
                this.applyForm.appFile = response.data;
            } else {
                this.$message({
                    message: response.message,
                    type: 'error'
                });
            }
        },

        // 增加申请
        addApply() {
            this.addApplyDialogVisible = true;
            this.applyForm = {
                doi: '',
                appType: '',
                recipientInstitutionDoi: '',
                appName: '',
                appContent: '',
                appFile: '',
            }
        },

        // 取消增加申请
        addApplyCancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.addApplyDialogVisible = false;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },

        // 确定增加申请
        addApplyConfirm() {            
            let postData = ({
                doi: this.applyForm.doi,
                appType: this.applyForm.appType,
                recipientInstitutionDoi: this.applyForm.recipientInstitutionDoi,
                appName: this.applyForm.appName,
                appContent: this.applyForm.appContent,
                appFile: this.applyForm.appFile,
            })
            let _this = this;
            postForm('/doApplication/submitDoApplication', postData, this, function(res) {
                if(res.code === 200) {
                    _this.$message({
                        message: '增加申请成功',
                        type: 'success'
                    });
                    _this.addApplyDialogVisible = false;
                }
                // else {
                //     _this.$message({
                //         message: res.message,
                //         type: 'error'
                //     });
                // }
            })
        },

        // // 修改申请
        // changeApply(row, index) {
        //     this.modifyDialogVisible = true;
        //     this.modifyIndex = index;
        //     this.modifyForm = {
        //         doi: row.doi,
        //         doiName: row.doiName,
        //         appFile: row.appFile,
        //         applyType: row.applyType,
        //         applyUserEmail: row.applyUserEmail,
        //     }
        // },
        
        // // 取消修改申请
        // modifyCancel() {
        //     this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //     }).then(() => {
        //         this.modifyDialogVisible = false;
        //     }).catch(() => {
        //         this.$message({
        //             type: 'info',
        //             message: '已取消'
        //         });
        //     });
        // },

        // // 确定修改申请
        // modifyConfirm() {
        //     console.log(this.modifyForm);
        //     this.applyTable[this.modifyIndex].doi = this.modifyForm.doi;
        //     this.applyTable[this.modifyIndex].doiName = this.modifyForm.doiName;
        //     this.applyTable[this.modifyIndex].appFile = this.modifyForm.appFile;
        //     this.applyTable[this.modifyIndex].applyType = this.modifyForm.applyType;
        //     this.applyTable[this.modifyIndex].applyUserEmail = this.modifyForm.applyUserEmail;
        //     this.modifyDialogVisible = false;
        //     this.$message({
        //         message: '修改申请成功',
        //         type: 'success'
        //     });
        // },

        // // 删除申请
        // deleteApply(index) {
        //     this.$confirm('此操作将永久删除该申请, 是否继续?', '提示', {
        //         confirmButtonText: '确定',
        //         cancelButtonText: '取消',
        //         type: 'warning'
        //     }).then(() => {
        //         this.applyTable.splice(index, 1);
        //         this.$message({
        //             message: '删除申请成功',
        //             type: 'success'
        //         });
        //     }).catch(() => {
        //         this.$message({
        //             type: 'info',
        //             message: '已取消删除'
        //         });
        //     });
        // },
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