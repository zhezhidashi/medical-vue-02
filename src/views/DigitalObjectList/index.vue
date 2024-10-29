<template>
    <div style="text-align: center; margin: 24px 40px 24px 40px;">
        <el-collapse v-model="activeNames" @change="collapseChange">
            <el-collapse-item :title="collapseTitle" name="1">
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
                        <el-select placeholder="请选择" v-model="searchForm.type">
                            <el-option v-for="(item, index) in doTypeList" :label="item.name" :value="item.value"
                                :key="index"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>

                <el-button type="primary" @click="searchData">搜索</el-button>
            </el-collapse-item>
        </el-collapse>
        <el-divider></el-divider>

        <el-table :data="resultTable" stripe border style="width: 100%;">
            <el-table-column prop="doi" label="数字对象标识"></el-table-column>
            <el-table-column prop="doiName" label="数字对象名称"></el-table-column>
            <el-table-column prop="doiDesc" label="数字对象描述"></el-table-column>
            <el-table-column prop="type" label="数字对象类型"></el-table-column>
            <el-table-column prop="type" label="来源"></el-table-column>
            <el-table-column prop="status" label="申请状态"></el-table-column>
            <el-table-column label="操作" align="center" width="150">
                <template slot-scope="props">
                    <el-button type="success" size="small" style="margin: 5px;">下载</el-button>
                    <el-button type="primary" size="small" style="margin: 5px;" @click="retrace">流转追溯</el-button>
                    <el-button type="primary" size="small" style="margin: 5px;" @click="trace">查看痕迹</el-button>
                    <el-button @click="contractHistory(props.row, props.$index)" type="primary" size="small"
                        style="margin: 5px;">权限修改历史</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="margin: 24px">
            <el-pagination background layout="pager" :page-size="10" :page-count="pages" @current-change="clickPage">
            </el-pagination>
        </div>

        <el-dialog title="流转追溯" :visible.sync="retraceVisible" width="80%" :before-close="cancelWithoutConfirm">
            <img src="retrace.png" style="width: 100%" />
        </el-dialog>

        <el-dialog title="数字对象痕迹" :visible.sync="traceVisible" width="80%" :before-close="cancelWithoutConfirm">
            <el-table :data="traceTable" stripe border style="width: 95%;">
                <el-table-column prop="createTime" label="时间"></el-table-column>
                <el-table-column prop="projectName" label="项目名称"></el-table-column>
                <el-table-column prop="projectDoi" label="项目标识"></el-table-column>
                <el-table-column prop="user" label="机构名称"></el-table-column>
                <el-table-column prop="userDoi" label="机构标识"></el-table-column>
                <el-table-column prop="operation" label="操作内容"></el-table-column>
                <el-table-column prop="operationDoi" label="操作标识"></el-table-column>
                <el-table-column prop="hashValue" label="账本哈希值"></el-table-column>
            </el-table>

            <div style="margin: 24px">
                <el-pagination background layout="pager" :page-size="10" :page-count="pages"
                    @current-change="clickPage">
                </el-pagination>
            </div>
        </el-dialog>

        <el-dialog title="权限修改历史" :visible.sync="contractVisible" width="80%" :before-close="cancelWithoutConfirm">
            <el-table :data="contractTable" stripe border style="width: 95%;">
                <el-table-column prop="number" label="区块编号"></el-table-column>
                <el-table-column prop="createTime" label="时间"></el-table-column>
                <el-table-column prop="address" label="合约地址"></el-table-column>
                <el-table-column prop="hash" label="哈希值"></el-table-column>
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
import { postForm } from '@/api/data'
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
                // DOI
                doi: '',
                // 数字对象名称
                name: '',
                // 数字对象类型
                type: '',
                // 数字对象状态
                status: '',
                // 数字对象描述
                description: '',
                // 机构DOI
                institutionDoi: '',
                // 机构名称
                institutionName: '',
                // 页码
                pageNo: 1,
            },

            resultTable: [
                {
                    doi: 'doi1',
                    doiName: '加密',
                    doiDesc: '加密',
                    type: "EDC",
                    project: '项目1',
                    projectDoi: '456789',
                },
                {
                    doi: 'doi2',
                    doiName: '加密',
                    doiDesc: '加密',
                    type: "ADAM",
                    project: '项目1',
                    projectDoi: '123456',
                }
            ],

            doTypeList: [
                { name: "EDC", value: 0 },
                { name: "SDTM", value: 1 },
                { name: "ADAM", value: 2 },
                { name: "代码", value: 3 },
                { name: "结构化数据", value: 4 },
                { name: "非结构化数据", value: 5 }
            ],

            retraceVisible: false,
            traceVisible: false,

            traceTable: [
                {
                    // 时间
                    createTime: "2024",
                    // 项目名称
                    projectName: "围术期",
                    // 项目标识
                    projectDoi: "86.334.9807698985/pro.ae7465b8-35be-46e7-9fbe-b5979021de93",
                    // 机构名
                    user: "正大天晴",
                    // 机构标识
                    userDoi: "86.334.9807698985/user.ae7465b8-35be-46e7-9fbe-b5979021de93",
                    // 操作内容
                    operation: "数据流转",
                    // 操作标识
                    operationDoi: "86.228.0956386869/op.41bebd18-10b8-418b-b066-a7acd2a47356",
                    // 账本哈希值
                    hashValue: "0x8408631c62a85ea415fbc19f028f86094b9bf5bbfbe85c9a80310a854b380f28",
                }
            ],

            contractVisible: false,

            contractTable: [
                {
                    number: 0,
                    createTime: "2024",
                    address: "0x51fB57B6B7837D4064158BDFE2DDDF91A53D46e7",
                    hash: "0x13c02bbdabd149a8ab7e745a9d03b2184ca20c4312eef07c69a3f27ad49833b6",
                }
            ],
        };
    },
    mounted() {
    },
    methods: {
        clickPage(page) {
            this.currentPage = page;
            this.searchForm.pageNo = this.currentPage;
            this.getData(this.searchForm);
        },
        searchData() {
        },

        getData(postData) {
        },

        retrace() {
            this.retraceVisible = true;
        },

        trace() {
            this.traceVisible = true;
        },

        applyConfirm() {
            this.retraceVisible = false;
            this.traceVisible = false;
        },

        contractHistory() {
            this.contractVisible = true;
        },

        cancelWithoutConfirm() {
            this.retraceVisible = false;
            this.traceVisible = false;
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