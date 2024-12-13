<template>
    <div style="text-align: center; margin: 24px 40px 24px 40px;">

        <el-collapse v-model="activeNames" @change="collapseChange">
            <el-collapse-item :title="collapseTitle" name="1">

                <el-form :model="searchForm" label-width="auto" class="SearchForm">
                    <el-form-item prop="doi" label="数字对象标识" class="SearchFormItem">
                        <el-input v-model="searchForm.doi"></el-input>
                    </el-form-item>
                    <el-form-item prop="appName" label="数字对象名字" class="SearchFormItem">
                        <el-input v-model="searchForm.appName"></el-input>
                    </el-form-item>
                    <el-form-item prop="appContent" label="数字对象描述" class="SearchFormItem">
                        <el-input v-model="searchForm.appContent"></el-input>
                    </el-form-item>
                    <el-form-item prop="type" label="数字对象类型" class="SearchFormItem">
                        <el-select placeholder="请选择" filterable v-model="searchForm.type">
                            <el-option v-for="(item, index) in doTypeList" :label="item.name" :value="item.value"
                                :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

                <el-button type="primary" @click="searchData">搜索</el-button>
            </el-collapse-item>
        </el-collapse>

        <div style="margin-top: 24px;"></div>

        <el-table :data="approvalTable" style="width: 100%;" stripe border>
            <el-table-column prop="doi" label="数字对象标识" align="center"></el-table-column>
            <el-table-column prop="appName" label="数字对象名称" align="center"></el-table-column>
            <el-table-column prop="appContent" label="数字对象描述" align="center"></el-table-column>
            <el-table-column prop="type" label="数字对象类型" align="center"></el-table-column>
            <el-table-column prop="appType" label="申请类型" align="center">
                <template slot-scope="props">
                    <el-tag v-if="props.row.appType === 1" type="primary">指针型</el-tag>
                    <el-tag v-if="props.row.appType === 2" type="success">实体型</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="appFile" label="申请文件" align="center">
                <template slot-scope="props">
                    <el-button type="primary" size="mini" @click="downloadFile(props.row, props.$index)">下载</el-button>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="申请时间" align="center"></el-table-column>
            <el-table-column prop="operation" label="操作" align="center">
                <template slot-scope="props">
                    <el-button type="primary" @click="conductApproval(props.row, props.$index)"
                        size="mini">审批</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="margin: 24px">
            <el-pagination background layout="pager" :page-size="10" :page-count="pages" @current-change="clickPage">
            </el-pagination>
        </div>


        <el-dialog title="审批" :visible.sync="approvalDialogVisible" width="80%">
            <el-form :model="approvalForm" label-width="80px" align="left" :rules="approvalRules">
                <el-form-item prop="status" label="审批结果">
                    <el-select v-model="approvalForm.status" placeholder="请选择">
                        <el-option label="通过" :value="1"></el-option>
                        <el-option label="拒绝" :value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="approvalCancel">取 消</el-button>
                <el-button type="primary" @click="approvalConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { postForm } from '@/api/data'
export default {
    name: "DigitalObjectApproval",
    data() {
        return {
            // 页数
            pages: 1,
            // 当前页数
            currentPage: 1,

            // 折叠
            activeNames: [],
            collapseTitle: "搜索栏（点击展开）",

            searchForm: {
                doi: "",
                appName: "",
                appContent: "",
                type: "",
            },

            // 表格数据
            approvalTable: [
                {
                    doi: 'DOI1',
                    appName: "加密",
                    appContent: "加密",
                    appType: 1,
                    type: "EDC",
                    appFile: '申请文件',
                    createTime: '2024',
                },
            ],

            approvalForm: {
                appId: undefined,
                status: undefined,
            },
            approvalDialogVisible: false,

            approvalRules: {
                status: [
                    { required: true, message: '请选择是否通过', trigger: 'change' }
                ],
            },

            doTypeList: [
                { name: "EDC", value: "EDC" },
                { name: "SDTM", value: "SDTM" },
                { name: "ADAM", value: "ADAM" },
                { name: "代码", value: "代码" },
                { name: "结构化文件", value: "结构化文件" },
                { name: "非结构化文件", value: "非结构化文件" }
            ],
        };
    },
    mounted() {
        this.getData({})
    },
    methods: {
        clickPage(page) {
            this.currentPage = page;
            this.searchForm.page = this.currentPage;
            this.getData(this.searchForm);
        },
        searchData() {
            this.getData(this.searchForm);
        },
        collapseChange(activeNames) {
            if (activeNames.length === 0) {
                this.collapseTitle = "搜索栏（点击展开）";
            } else {
                this.collapseTitle = "搜索栏（点击收起）";
            }
        },
        getData(postData) {
            let _this = this;
            this.approvalTable = [];
            postForm('/doApplication/getApprovalList', postData, _this, function (res) {
                _this.pages = res.data.pages;
                for (let item of res.data.records) {
                    _this.approvalTable.push({
                        appId: item.appId,
                        doi: item.doi,
                        appName: item.appName,
                        appContent: item.appContent,
                        type: item.type,
                        appType: item.appType,
                        appFile: item.appFile,
                        createTime: new Date(item.createTime).toLocaleDateString(),
                    })
                }
            })
        },

        // 下载文件
        downloadFile(row, index) {
            window.open(row.appFile);
        },
        // 进行审批
        conductApproval(row, index) {
            console.log(row, index);
            this.approvalDialogVisible = true;
            this.approvalForm.appId = row.appId;
            this.approvalForm.status = undefined;
        },
        // 取消审批
        approvalCancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.approvalDialogVisible = false;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        // 确定审批
        approvalConfirm() {
            this.approvalDialogVisible = false;
            let postData = {
                id: this.approvalForm.appId,
                status: this.approvalForm.status,
            }
            let _this = this;

            // 提交审批结果
            postForm('/doApplication/submitApproval', postData, _this, function (res) {
                if (res.code === 200) {
                    _this.$message({
                        message: '审批完成',
                        type: 'success'
                    });
                    
                    // 审批通过的数字对象流转【打通】
                    postForm("/doApplication/exportApproveDoiOnline", {idList: [postData.id]}, _this, function(res) {
                        _this.approvalDialogVisible = false;
                        _this.getData(_this.searchForm);
                    })
                    
                }
            })
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