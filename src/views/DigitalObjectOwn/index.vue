<template>
    <div style="text-align: center; margin: 24px 40px 24px 40px;">
        <el-form :model="searchForm" label-width="auto" class="SearchForm">
            <el-form-item prop="doi" label="数字对象标识" class="SearchFormItem">
                <el-input v-model="searchForm.doi"></el-input>
            </el-form-item>
            <el-form-item prop="appName" label="数字对象名称" class="SearchFormItem">
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
        <el-divider></el-divider>

        <el-table :data="resultTable" stripe border style="width: 100%;">
            <el-table-column prop="doi" label="数字对象标识" align="center"></el-table-column>
            <el-table-column prop="appName" label="数字对象名称" align="center"></el-table-column>
            <el-table-column prop="appContent" label="数字对象描述" align="center"></el-table-column>
            <el-table-column prop="type" label="数字对象类型" align="center"></el-table-column>
            <!-- <el-table-column prop="sourceList" label="来源" align="center">
                <template slot-scope="props">
                    <div v-for="item in props.row.sourceList" :key="item">
                        <span>{{ item }}</span>
                    </div>
                </template>
            </el-table-column> -->
            <!-- <el-table-column prop="appType" label="申请类型" align="center">
                <template slot-scope="props">
                    <el-tag v-if="props.row.appType === 1" type="primary">指针型</el-tag>
                    <el-tag v-if="props.row.appType === 2" type="success">实体型</el-tag>
                </template>
            </el-table-column> -->
            <el-table-column label="操作" align="center" width="150">
                <template slot-scope="props">
                    <el-button type="primary" size="small" style="margin: 5px;"
                        @click="retrace(props.row, props.$index)">流转追溯</el-button>
                    <el-button type="primary" size="small" style="margin: 5px;"
                        @click="trace(props.row, props.$index)">查看痕迹</el-button>
                    <el-button @click="contractHistory(props.row, props.$index)" type="primary" size="small"
                        style="margin: 5px;">权限修改历史</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="margin: 24px">
            <el-pagination background layout="pager" :page-size="10" :page-count="pages" @current-change="clickPage">
            </el-pagination>
        </div>

        <el-dialog title="数字对象痕迹" :visible.sync="traceVisible" width="80%" :before-close="cancelWithoutConfirm">
            <el-form :model="traceSearchForm" label-width="auto" class="SearchForm">
                <el-form-item prop="createTimeRange" label="时间" class="SearchFormTimePicker">
                    <el-date-picker value-format="timestamp" type="daterange" v-model="traceSearchForm.createTimeRange"
                        range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button @click="searchTrace" type="primary">查询</el-button>
                </el-form-item>
            </el-form>
            
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
    name: "DigitalObjectOwn",
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
                appName: '',
                appContent: '',
                type: '',
            },

            resultTable: [],

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
                createTimeStart: "",
                createTimeEnd: "",
            },

            traceSearchForm: {
                createTimeRange: "",
            },

            traceTable: [],

            contractVisible: false,

            contractPostData: {
                doi: "",
                pageSize: 10,
                pageNo: 1,
            },

            contractTable: [],
        };
    },
    mounted() {
        this.getData({})
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
            let _this = this;
            this.resultTable = [];
            postForm('/doApplication/getUserApplication', postData, _this, function (res) {
                _this.pages = res.data.pages;
                for (let doIndex = 0; doIndex < res.data.records.length; doIndex++) {
                    let item = res.data.records[doIndex]
                    _this.resultTable.push({
                        appId: item.appId,
                        doi: item.appType === 1 ? item.doi : item.newDoi,
                        appName: item.appName,
                        appContent: item.appContent,
                        sourceList: JSON.parse(item.source),
                        type: item.type,
                        appType: item.appType,
                        retraceList: [],
                    })
                    _this.getDoSource(item.doi, _this.resultTable[doIndex].retraceList);
                }
            })
        },

        getDoSource(doi, retraceList) {
            let _this = this;
            postFormPublic("/relationship/retrace", { doi }, _this, function (res) {
                for(let item of res.data.retraceList) {
                    retraceList.push({
                        doi: item.doi,
                        name: item.name,
                        description: item.description,
                        source: JSON.parse(item.source),
                        type: item.type
                    })
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
            this.traceTable = [
            ]
            let _this = this;
            postFormPublic(`/traceV2/getTraceInfoByDoi`, postData, _this, function (res) {
                _this.pagesTrace = res.data.pages;
                for (let item of res.data.list) {
                    _this.traceTable.push({
                        createTime: item.createTime,
                        operation: item.operation,
                        operationDoi: item.operationDoi,
                        hashValue: item.hashValue,
                    })
                }
            })
        },

        searchTrace() {
            if (this.traceSearchForm.createTimeRange && this.traceSearchForm.createTimeRange.length > 1) {
                if (this.traceSearchForm.createTimeRange && this.traceSearchForm.createTimeRange.length > 1) {
                    this.tracePostData.createTimeStart = new Date(this.traceSearchForm.createTimeRange[0]);
                    this.tracePostData.createTimeEnd = new Date(this.traceSearchForm.createTimeRange[1] + 86399999);
                }
            }
            this.traceGetData(this.tracePostData);
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
</style>