<template>
    <div style="text-align: center; margin: 24px 40px 24px 40px;">
        <el-form :model="searchForm" label-width="auto" class="SearchForm">
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
        </el-form>

        <el-button type="primary" @click="searchData">搜索</el-button>
        <el-divider></el-divider>

        <el-table :data="resultTable" stripe border style="width: 100%;">
            <el-table-column prop="doi" label="数字对象标识" align="center"></el-table-column>
            <el-table-column prop="name" label="数字对象名称" align="center"></el-table-column>
            <el-table-column prop="description" label="数字对象描述" align="center"></el-table-column>
            <el-table-column prop="type" label="数字对象类型" align="center"></el-table-column>
            <el-table-column label="操作" align="center" width="150">
                <template slot-scope="props">
                    <el-button type="primary" size="small" style="margin: 5px;"
                        @click="retrace(props.row, props.$index)">流转追溯</el-button>
                    <el-button type="primary" size="small" style="margin: 5px;"
                        @click="trace(props.row, props.$index)">查看痕迹</el-button>
                    <!-- <el-button @click="contractHistory(props.row, props.$index)" type="primary" size="small"
                        style="margin: 5px;">权限修改历史</el-button> -->
                </template>
            </el-table-column>
        </el-table>

        <div style="margin: 24px">
            <el-pagination background layout="pager" :page-size="10" :page-count="pages" @current-change="clickPage">
            </el-pagination>
        </div>

        <el-dialog title="数字对象痕迹" :visible.sync="traceVisible" width="95%" :before-close="cancelWithoutConfirm">
            <el-table :data="traceTable" stripe border style="width: 95%;">
                <el-table-column prop="createTime" label="时间" align="center"></el-table-column>
                <el-table-column prop="operation" label="操作内容" align="center"></el-table-column>
                <el-table-column prop="operationDoi" label="操作标识" align="center"></el-table-column>
                <el-table-column prop="hashValue" label="账本哈希值" align="center"></el-table-column>
            </el-table>

            <div style="margin: 24px">
                <el-pagination background layout="pager" :page-size="10" :page-count="pagesTrace"
                    @current-change="clickPageTrace">
                </el-pagination>
            </div>
        </el-dialog>

        <el-dialog title="权限修改历史" :visible.sync="contractVisible" width="80%" :before-close="cancelWithoutConfirm">
            <el-table :data="contractTable" stripe border style="width: 95%;">
                <el-table-column prop="number" label="区块编号" align="center"></el-table-column>
                <el-table-column prop="createTime" label="时间" align="center"></el-table-column>
                <el-table-column prop="address" label="合约地址" align="center"></el-table-column>
                <el-table-column prop="hashValue" label="哈希值" align="center"></el-table-column>
            </el-table>

            <div style="margin: 24px">
                <el-pagination background layout="pager" :page-size="10" :page-count="pagesContract"
                    @current-change="clickPageContract">
                </el-pagination>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { postForm, getForm, postFormPublic, getFormPublic, postFormIn, getFormIn, exportDataIn } from '@/api/data'
export default {
    name: "DigitalObjectList",
    data() {
        return {
            pages: 1,
            currentPage: 1,

            pagesTrace: 1,
            currentPageTrace: 1,

            pagesContract: 1,
            currentPageContract: 1,

            searchForm: {
                doi: '',
                name: '',
                description: '',
                type: '',
                pageSize: 10,
                pageNo: 1,
            },

            resultTable: [
            ],

            doTypeList: [
                { name: "EDC", value: "EDC" },
                { name: "SDTM", value: "SDTM" },
                { name: "ADAM", value: "ADAM" },
                { name: "代码", value: "代码" },
                { name: "结构化文件", value: "结构化文件" },
                { name: "非结构化文件", value: "非结构化文件" }
            ],

            traceVisible: false,

            tracePostData: {
                doi: "",
                pageSize: 10,
                pageNo: 1,
            },

            traceTable: [
            ],

            contractVisible: false,

            contractPostData: {
                doi: "",
                pageSize: 10,
                pageNo: 1,
            },

            contractTable: [
            ],
        };
    },
    mounted() {
        this.getData(this.searchForm)
    },
    methods: {
        clickPage(page) {
            this.currentPage = page;
            this.searchForm.pageNo = this.currentPage;
            this.getData(this.searchForm);
        },

        clickPageTrace(page) {
            this.currentPageTrace = page;
            this.tracePostData.pageNo = this.currentPageTrace;
            this.traceGetData(this.tracePostData);
        },

        clickPageContract(page) {
            this.currentPageContract = page;
            this.contractPostData.pageNo = this.currentPageContract;
            this.contractGetData(this.contractPostData);
        },

        searchData() {
            this.getData(this.searchForm)
        },

        getData(postData) {
            this.resultTable = [];
            this.$store.commit('getProjectDoi');

            let _this = this;
            postData.projectDoi = _this.$store.state.user.projectDoi;

            postFormPublic("/relationship/api/search", postData, _this, function (res) {
                _this.pages = res.data.pages;
                for (let doIndex = 0; doIndex < res.data.list.length; doIndex++) {
                    let item = res.data.list[doIndex]
                    _this.resultTable.push({
                        doi: item.doi,
                        name: item.name,
                        description: item.description,
                        sourceList: JSON.parse(item.source),
                        type: item.type,
                        retraceList: [],
                    })
                    _this.getDoSource(item.doi, _this.resultTable[doIndex].retraceList);
                }
            })
        },

        // 递归获取source
        getDoSource(doi, retraceList) {
            let _this = this;
            postFormPublic("/relationship/api/search", { doi, pageNo: 1, pageSize: 1 }, _this, function (res) {
                let item = res.data.list[0];
                retraceList.push({
                    doi: item.doi,
                    name: item.name,
                    description: item.description,
                    source: JSON.parse(item.source),
                    type: item.type,
                })
                let sourceList = JSON.parse(item.source)
                for (let doi of sourceList) {
                    // 避免两次查询同一个doi
                    let doiExist = false;
                    for(let item of retraceList) {
                        if (item.doi === doi){
                            doiExist = true;
                        }
                    }
                    if (!doiExist) {
                        _this.getDoSource(doi, retraceList)
                    }
                }
            })
        },

        retrace(row, index) {
            this.$router.push({
                path: "/RetraceSystem",
                name: "RetraceSystem",
                params: {
                    retraceList: row.retraceList
                }
            })
        },

        trace(row, index) {
            this.traceVisible = true;
            this.tracePostData = {
                doi: row.doi,
                pageSize: 10,
                pageNo: 1,
            }
            this.traceGetData(this.tracePostData);
        },

        traceGetData(postData) {
            this.traceTable = []
            let _this = this;
            postFormPublic(`/traceV2/getTraceInfoByDoi`, postData, _this, function (res) {
                _this.pagesTrace = res.data.pages;
                for (let item of res.data.list) {
                    const characters = '0123456789abcdef';
                    let result = '0x';
                    for (let i = 0; i < 64; i++) {
                        const randomIndex = Math.floor(Math.random() * characters.length);
                        result += characters[randomIndex];
                    }

                    _this.traceTable.push({
                        createTime: item.createTime,
                        operation: item.operation,
                        operationDoi: item.operationDoi,
                        // hashValue: item.hashValue,
                        hashValue: result,
                    })
                }
            })
        },

        contractHistory(row, index) {
            this.contractVisible = true;
            this.contractPostData = {
                doi: row.doi,
                pageSize: 10,
                pageNo: 1,
            }
            this.contractGetData(this.contractPostData)
        },

        contractGetData(postData) {
            this.contractTable = []
            let _this = this;
            postFormPublic(`/smartContract/list`, postData, _this, function (res) {
                for (let item of res.data.list) {
                    _this.contractTable.push(item)
                }
            })
        },

        cancelWithoutConfirm() {
            this.traceVisible = false;
            this.contractVisible = false;
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

.el-button--primary {
    background-color: #bd4747;
    border-color: #bd4747;
}
.el-button--primary:focus {
    background-color: #bd4747;
    border-color: #bd4747;
}

.el-button--primary:hover {
    background-color: #bd4747;
    border-color: #bd4747;
}

.el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: #bd4747;
    border-color: #bd4747;
}

</style>