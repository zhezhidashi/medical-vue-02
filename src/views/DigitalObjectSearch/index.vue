<template>
    <div style="text-align: center; margin: 24px 40px 24px 40px;">
        <el-form :model="searchForm" label-width="auto" class="SearchForm" :rules="doSearchRules">
            <el-form-item prop="doi" label="数字对象标识" class="SearchFormItem">
                <el-input v-model="searchForm.doi"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="数字对象名称" class="SearchFormItem">
                <el-input v-model="searchForm.name"></el-input>
            </el-form-item>
            <el-form-item prop="description" label="数字对象描述" class="SearchFormItem">
                <el-input v-model="searchForm.description"></el-input>
            </el-form-item>
            <el-form-item prop="type" label="数字对象类型" class="SearchFormItem">
                <el-select placeholder="请选择" filterable v-model="searchForm.type">
                    <el-option v-for="(item, index) in doTypeList" :label="item.name" :value="item.value"
                        :key="index"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="institutionDoi" label="所属机构" class="SearchFormItem">
                <el-select placeholder="请选择" filterable v-model="searchForm.institutionDoi">
                    <el-option v-for="(item, index) in institutionList" :label="item.institutionName"
                        :value="item.institutionDoi" :key="index"></el-option>
                </el-select>
            </el-form-item>
        </el-form>

        <el-button type="primary" @click="searchData">搜索</el-button>
        <el-divider></el-divider>

        <el-table :data="resultTable" stripe border style="width: 100%;">
            <el-table-column prop="doi" label="数字对象标识" align="center"></el-table-column>
            <el-table-column prop="name" label="数字对象名称" align="center"></el-table-column>
            <el-table-column prop="description" label="数字对象描述" align="center"></el-table-column>
            <el-table-column prop="type" label="数字对象类型" align="center"></el-table-column>
            <el-table-column prop="institutionName" label="所属机构" align="center"></el-table-column>
            <el-table-column prop="institutionDoi" label="所属机构标识" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="props">
                    <el-button type="primary" size="small" @click="apply(props.row, props.$index)">申请</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="margin: 24px">
            <el-pagination background layout="pager" :page-size="10" :page-count="pages" @current-change="clickPage">
            </el-pagination>
        </div>

        <el-dialog title="数字对象申请" :visible.sync="applyVisible" width="80%" :before-close="applyCancel"
            style="text-align: left;">
            <el-form :model="applyForm" label-width="auto" :rules="applyRules">
                <el-form-item label="申请类型" prop="appType">
                    <el-select placeholder="请选择" filterable v-model="applyForm.appType">
                        <el-option label="实体型" :value="0" :key="0"></el-option>
                        <el-option label="指针型" :value="1" :key="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请文件" prop="appFile">
                    <el-upload drag action="/backendOut/file/upload"
                        :headers="{ 'Authorization': 'Bearer ' + $store.state.user.token }"
                        :on-success="uploadSuccess">
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="applyCancel">取 消</el-button>
                <el-button type="primary" @click="applyConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { postForm, getForm, postFormPublic, getFormPublic } from '@/api/data'
export default {
    name: "DigitalObjectList",
    data() {
        return {
            pages: 1,
            currentPage: 1,
            // 折叠
            activeNames: [],
            collapseTitle: "搜索栏（点击展开）",
            searchForm: {
                doi: '',
                name: '',
                type: '',
                description: '',
                // 项目DOI，这个从 $store 中获取
                projectDoi: "",
                institutionDoi: '',
                pageNo: 1,
                pageSize: 10,
            },
            doTypeList: [
                { name: "EDC", value: "EDC" },
                { name: "SDTM", value: "SDTM" },
                { name: "ADAM", value: "ADAM" },
                { name: "代码", value: "代码" },
                { name: "结构化数据", value: "结构化数据" },
                { name: "非结构化数据", value: "非结构化数据" }
            ],

            institutionList: [
                { institutionName: "机构1", institutionDoi: "123" },
                { institutionName: "机构2", institutionDoi: "124" }
            ],

            doSearchRules: {
                institutionDoi: [
                    { required: true, message: '请选择数字对象所属机构', trigger: 'change' }
                ],
            },

            resultTable: [
                {
                    doi: 'doi1',
                    name: '加密',
                    description: '加密',
                    type: "EDC",
                    institutionName: '456789',
                    institutionDoi: "123",
                    source: "",
                },
            ],

            applyVisible: false,
            applyForm: {
                doi: '',
                appName: "",
                appContent: "",
                appType: undefined,
                appFile: '',
                recipientInstitutionDoi: "",
                type: "",
                source: "",
            },

            applyRules: {
                appType: [
                    { required: true, message: '请选择申请类型', trigger: 'change' }
                ],
                appFile: [
                    { required: true, message: '请选择数字对象所属项目', trigger: 'change' }
                ],
            },
        };
    },
    mounted() {
        // 获取基础数据
        this.getBasicData();
    },
    methods: {
        clickPage(page) {
            this.currentPage = page;
            this.searchForm.pageNo = this.currentPage;
            this.getData(this.searchForm);
        },
        searchData() {
            let postData = {
                name: this.searchForm.name,
                doi: this.searchForm.doi,
                description: this.searchForm.description,
                type: this.searchForm.type,
                institutionDoi: this.searchForm.institutionDoi,
                pageSize: 10,
                pageNo: this.currentPage
            }
            this.getData(postData);
        },

        getBasicData() {
            let _this = this;
            // 获取项目DOI
            this.$store.commit('getProjectDoi');
            this.searchForm.projectDoi = this.$store.state.user.projectDoi
            this.institutionList = [],
            // 获取机构信息
            postFormPublic("/institution/insList/list", { pageNo: 1, pageSize: 10000 }, _this, function (res) {
                for (let item of res.data.list) {
                    _this.institutionList.push({
                        name: item.name,
                        doi: item.doi
                    })
                }
                _this.getData(_this.searchForm)
            })
        },

        getData(postData) {
            let _this = this;
            this.resultTable = []
            postFormPublic("/relationship/api/search", postData, _this, function (res) {
                for(let item of res.data.list) {
                    _this.resultTable.push({
                        doi: item.doi,
                        name: item.name,
                        description: item.description,
                        type: item.type,
                        institutionName: item.institutionName,
                        institutionDoi: item.institutionDoi,
                        source: item.source,
                    })
                }
            })
        },

        apply(row, index) {
            this.applyVisible = true;

            this.applyForm.doi = row.doi;
            this.applyForm.appName = row.name;
            this.applyForm.appContent = row.description
            this.applyForm.appType = undefined
            this.applyForm.appFile = undefined
            this.applyForm.recipientInstitutionDoi = row.institutionDoi
            this.applyForm.type = row.type
            this.applyForm.source = row.source
        },

        // 处理建项的上传文件
        uploadSuccess(response, file, fileList) {
            if (response.code === 200) {
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

        applyCancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.applyVisible = false;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },

        applyConfirm() {
            this.applyVisible = false;

            let _this = this;

            if(this.applyForm.appFile === "" || this.applyForm.appType === "") {
                this.$message({
                    type: 'warning',
                    message: '请填写完整信息'
                });
                return;
            }

            postForm('/doApplication/submitDoApplication', _this.applyForm, _this, function (res) {
                if (res.code === 200) {
                    _this.$message({
                        message: '提交申请成功',
                        type: 'success'
                    });
                    _this.applyVisible = false;
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