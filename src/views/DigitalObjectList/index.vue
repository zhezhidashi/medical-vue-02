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
            <el-table-column prop="appType" label="申请类型" align="center">
                <template slot-scope="props">
                    <el-tag v-if="props.row.appType === 1" type="primary">指针型</el-tag>
                    <el-tag v-if="props.row.appType === 2" type="success">实体型</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150">
                <template slot-scope="props">
                    <el-button v-if="props.row.appType === 2" type="primary" size="small"
                        style="margin: 5px;" @click="downloadDo(props.row, props.$index)">下载</el-button>
                    <el-button type="primary" size="small" style="margin: 5px;" @click="retrace(props.row, props.$index)">流转追溯</el-button>
                    <el-button type="primary" size="small" style="margin: 5px;" @click="trace(props.row, props.$index)">查看痕迹</el-button>
                    <!-- <el-button @click="contractHistory(props.row, props.$index)" type="primary" size="small"
                        style="margin: 5px;">权限修改历史</el-button> -->
                </template>
            </el-table-column>
        </el-table>

        <div style="margin: 24px">
            <el-pagination background layout="pager" :page-size="10" :page-count="pages" @current-change="clickPage">
            </el-pagination>
        </div>

        <el-dialog title="数字对象痕迹" :visible.sync="traceVisible" width="80%" :before-close="cancelWithoutConfirm">
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
                appName: '',
                appContent: '',
                type: '',
            },

            resultTable: [
                // {
                //     doi: 'doi1',
                //     appName: '加密',
                //     appContent: '加密',
                //     type: "EDC",
                //     sourceList: '项目1',
                //     appType: 1,
                //     retraceList: [
                //         { "doi": "86.879.5876633518\/do.711bb34f-d908-439f-a010-4d7e7641e671", "name": "DO1", "description": "", "source": "86.879.5876633518\/do.321bb34f-d908-439f-a010-4d7e7641e671,86.879.5876633518\/do.791bb34f-d908-439f-a010-4d7e7641e671", "type": "SDTM" },
                //         { "doi": "86.879.5876633518\/do.321bb34f-d908-439f-a010-4d7e7641e671", "name": "DO2", "description": "", "source": null, "type": "EDC" },
                //         { "doi": "86.879.5876633518\/do.791bb34f-d908-439f-a010-4d7e7641e671", "name": "DO3", "description": "", "source": null, "type": "EDC" },
                //     ],
                // },
                // {
                //     doi: 'doi1',
                //     appName: '加密',
                //     appContent: '加密',
                //     type: "EDC",
                //     sourceList: '项目1',
                //     appType: 2,
                //     retraceList: [
                //         { "doi": "86.879.5876633518\/do.321bb34f-d908-439f-a010-4d7e7641e671", "name": "DO2", "description": "", "source": null, "type": "EDC" },
                //     ]
                // },
            ],

            doTypeList: [
                { name: "EDC", value: "EDC" },
                { name: "SDTM", value: "SDTM" },
                { name: "ADAM", value: "ADAM" },
                { name: "代码", value: "代码" },
                { name: "结构化数据", value: "结构化数据" },
                { name: "非结构化数据", value: "非结构化数据" }
            ],

            traceVisible: false,

            tracePostData: {
                doi: "",
                pageSize: 10,
                pageNo: 1,
            },

            traceTable: [
                // {
                //     // 时间
                //     createTime: "2024",
                //     // 操作内容
                //     operation: "数据流转",
                //     // 操作标识
                //     operationDoi: "86.228.0956386869/op.41bebd18-10b8-418b-b066-a7acd2a47356",
                //     // 账本哈希值
                //     hashValue: "0x8408631c62a85ea415fbc19f028f86094b9bf5bbfbe85c9a80310a854b380f28",
                // }
            ],

            contractVisible: false,

            contractPostData: {
                doi: "",
                pageSize: 10,
                pageNo: 1,
            },

            contractTable: [
                // {
                //     number: 0,
                //     createTime: "2024",
                //     address: "0x51fB57B6B7837D4064158BDFE2DDDF91A53D46e7",
                //     hashValue: "0x13c02bbdabd149a8ab7e745a9d03b2184ca20c4312eef07c69a3f27ad49833b6",
                // }
            ],
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
                    if(item.appType === 1) {
                        _this.getDoSource(item.doi, _this.resultTable[doIndex].retraceList);
                    }
                    else {
                        _this.getDoSource(item.newDoi, _this.resultTable[doIndex].retraceList);
                    }
                }
            })
        },

        // 递归获取source
        getDoSource(doi, retraceList) {
            let _this = this;
            postFormPublic("/relationship/api/search", {doi, pageNo: 1, pageSize: 1}, _this, function (res) {
                let item = res.data.list[0];
                retraceList.push({
                    doi: item.doi,
                    name: item.name,
                    description: item.description,
                    source: JSON.parse(item.source),
                    type: item.type
                })
                let sourceList = JSON.parse(item.source)
                for(let doi of sourceList) {
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

        downloadDo(row, index) {
            let _this = this;
            postFormIn("/repository/getEntityLinkByDoi", {doi: row.doi}, _this, function(res) {
                window.open(res.data.url)
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
                // {
                //     // 时间
                //     createTime: "2024-11-14T17:55:51",
                //     // 操作内容
                //     operation: "访问数字对象",
                //     // 操作标识
                //     operationDoi: "	86.475.7249629809/op.dc43fbfa-0e47-4846-a314-7f175b21b19e",
                //     // 账本哈希值
                //     hashValue: "DxbacZ52pesgtehrNd5j4rozJsbyjBab6KdYGYxdZXswCLFTcf0jp7ftZcJUYKgB",
                // },
                // {
                //     // 时间
                //     createTime: "2024-11-14T17:55:04",
                //     // 操作内容
                //     operation: "数字对象流转入",
                //     // 操作标识
                //     operationDoi: "86.026.8937037484/op.330e71ec-1a11-4bb7-8e41-11722d17434b",
                //     // 账本哈希值
                //     hashValue: "avQEE3qjiuYQH3PAzx0Ya68rxRSVKJ7nXFWvcaNPXSmzZFPTd5tjVyZknu2OrPeK",
                // }
            ]
            let _this = this;
            postFormPublic(`/traceV2/getTraceInfoByDoi`, postData, _this, function(res) {
                _this.pagesTrace = res.data.pages;
                for(let item of res.data.list) {
                    _this.traceTable.push({
                        createTime: item.createTime,
                        operation: item.operation,
                        operationDoi: item.operationDoi,
                        hashValue: item.hashValue,
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
            postFormPublic(`/smartContract/list`, postData, _this, function(res) {
                for(let item of res.data.list) {
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

/* el-button 按钮 */
.el-button--primary, .el-button--primary:focus, .el-button--primary:hover {
    background-color: #bd4747;
    border-color: #bd4747;
}


/* .el-pagination 翻页 */
.el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: #bd4747;
    border-color: #bd4747;
}
</style>