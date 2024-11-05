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
            <el-table-column prop="source" label="来源" align="center"></el-table-column>
            <el-table-column prop="appType" label="申请类型" align="center">
                <template slot-scope="props">
                    <el-tag v-if="props.row.appType === 1" type="primary">指针型</el-tag>
                    <el-tag v-if="props.row.appType === 2" type="success">实体型</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150">
                <template slot-scope="props">
                    <el-button v-if="props.row.appType === 2" type="primary" size="small"
                        style="margin: 5px;">下载</el-button>
                    <el-button type="primary" size="small" style="margin: 5px;" @click="retrace(props.row, props.$index)">流转追溯</el-button>
                    <el-button type="primary" size="small" style="margin: 5px;" @click="trace(props.row, props.$index)">查看痕迹</el-button>
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
            <el-table :data="traceTable" stripe border style="width: 95%;">
                <el-table-column prop="createTime" label="时间" align="center"></el-table-column>
                <el-table-column prop="operation" label="操作内容" align="center"></el-table-column>
                <el-table-column prop="operationDoi" label="操作标识" align="center"></el-table-column>
                <el-table-column prop="hashValue" label="账本哈希值" align="center"></el-table-column>
            </el-table>

            <div style="margin: 24px">
                <el-pagination background layout="pager" :page-size="10" :page-count="pages"
                    @current-change="clickPage">
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
                <el-pagination background layout="pager" :page-size="10" :page-count="pages"
                    @current-change="clickPage">
                </el-pagination>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { postForm } from '@/api/data'
import * as echarts from "echarts";
export default {
    name: "DigitalObjectList",
    data() {
        return {
            pages: 1,
            currentPage: 1,
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
                    appName: '加密',
                    appContent: '加密',
                    type: "EDC",
                    source: '项目1',
                    appType: 1,
                    retraceList: [
                        { "doi": "86.879.5876633518\/do.711bb34f-d908-439f-a010-4d7e7641e671", "name": "DO1", "description": "", "source": "86.879.5876633518\/do.321bb34f-d908-439f-a010-4d7e7641e671,86.879.5876633518\/do.791bb34f-d908-439f-a010-4d7e7641e671", "type": "SDTM" },
                        { "doi": "86.879.5876633518\/do.321bb34f-d908-439f-a010-4d7e7641e671", "name": "DO2", "description": "", "source": null, "type": "EDC" },
                        { "doi": "86.879.5876633518\/do.791bb34f-d908-439f-a010-4d7e7641e671", "name": "DO3", "description": "", "source": null, "type": "EDC" },
                    ],
                },
                {
                    doi: 'doi1',
                    appName: '加密',
                    appContent: '加密',
                    type: "EDC",
                    source: '项目1',
                    appType: 2,
                    retraceList: [
                        { "doi": "86.879.5876633518\/do.321bb34f-d908-439f-a010-4d7e7641e671", "name": "DO2", "description": "", "source": null, "type": "EDC" },
                    ]
                },
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

            traceTable: [
                {
                    // 时间
                    createTime: "2024",
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
                    hashValue: "0x13c02bbdabd149a8ab7e745a9d03b2184ca20c4312eef07c69a3f27ad49833b6",
                }
            ],

            graphEchartsOptions: {
                title: {
                    text: '流转追溯图',
                    textStyle: {
                        fontSize: 16 // 设置标题字体大小
                    }
                },
                tooltip: {},
                legend: [
                    {
                        // 定义图例
                        data: ["EDC", 'SDTM', 'ADAM', '代码', '结构化数据', '非结构化数据']
                    },
                ],
                series: {
                    type: 'graph',
                    layout: 'force',
                    categories: [
                        {
                            name: 'EDC',
                            itemStyle: { color: 'yellow' },
                        },
                        {
                            name: 'SDTM',
                            itemStyle: { color: 'red' },
                        },
                        {
                            name: 'ADAM',
                            itemStyle: { color: 'blue' },
                        },
                        {
                            name: '代码',
                            itemStyle: { color: 'lightgreen' },
                        },
                        {
                            name: '结构化数据',
                            itemStyle: { color: 'orange' },
                        },
                        {
                            name: '非结构化数据',
                            itemStyle: { color: 'grey' },
                        },
                    ],
                    nodes: [],
                    links: [],
                    roam: true,
                    label: {
                        show: true,
                        position: 'top', // 标签显示在节点上方
                    },
                    lineStyle: {
                        normal: {
                            width: 4,
                            color: 'darkpurple',
                            opacity: 0.9,
                            width: 2,
                            curveness: 0,
                            arrow: true
                        },
                    },
                    edgeSymbol: ['none', 'arrow'],
                    emphasis: {
                        focus: 'adjacency',
                        lineStyle: {
                            width: 5,
                        }
                    },
                    force: {
                        repulsion: 700,
                    },
                    draggable: true,
                    animation: false,
                }
            },
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

        retrace(row, index) {
            this.$router.push({
                path: "/RetraceSystem",
                name: "RetraceSystem",
                params: {
                    retraceList: row.retraceList
                }
            })
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