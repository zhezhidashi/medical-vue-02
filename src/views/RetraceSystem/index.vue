<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <div
                style="display: flex; flex-direction: column; justify-content: space-around; align-items: center; width: 100%; margin-top: 24px;">
                <el-card style="width: 90%; margin-bottom: 24px;">

                    <el-descriptions title="数字对象详情" :column="1">
                        <el-descriptions-item label="数字对象标识">{{ doiDetail[doiIndex].doi }}</el-descriptions-item>
                        <el-descriptions-item label="数字对象名称">{{ doiDetail[doiIndex].doiName }}</el-descriptions-item>
                        <!-- <el-descriptions-item label="数字对象来源">{{ doiDetail[doiIndex].doiSource }}</el-descriptions-item> -->
                        <el-descriptions-item label="数字对象所属项目">{{ doiDetail[doiIndex].doiProject
                            }}</el-descriptions-item>
                        <el-descriptions-item label="数字对象类型">{{ doiDetail[doiIndex].doiType }}</el-descriptions-item>
                    </el-descriptions>
                </el-card>
                <el-card style="width: 90%; margin-bottom: 24px;">
                    <div class="echarts" ref="GraphEcharts" style="height: 800px;"></div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from "echarts";
export default {
    name: "RetraceSystem",
    data() {
        return {
            // 数字对象详情
            doiDetail: [
                { "doi": "86.879.5876633518\/do.711bb34f-d908-439f-a010-4d7e7641e671", "doiName": "EDC", "doiSource": null, "doiProject": "围术期抗栓药物管理临床路径研究", "doiType": "EDC" },
                { "doi": "86.633.1412578611\/do.b3524146-fe5f-4a15-935c-ff1ae6213f12", "doiName": "CM", "doiSource": "SDTM-01", "doiProject": "围术期抗栓药物管理临床路径研究", "doiType": "SDTM" },
                { "doi": "86.642.9981100019\/do.e8b05ced-4f38-4bd2-8668-76b1842a74f1", "doiName": "SUPPDM", "doiSource": "SDTM-01", "doiProject": "围术期抗栓药物管理临床路径研究", "doiType": "SDTM" },
                { "doi": "86.546.7107975866\/do.24e9fbdb-a0ec-45fa-907f-12e9b8fc4831", "doiName": "DM", "doiSource": "SDTM-01", "doiProject": "围术期抗栓药物管理临床路径研究", "doiType": "SDTM" },
                { "doi": "86.328.1809789528\/do.bb74025c-1cbe-432d-9e33-5eeab0db2ac3", "doiName": "SUPPDM", "doiSource": "SDTM-01", "doiProject": "围术期抗栓药物管理临床路径研究", "doiType": "SDTM" },
                { "doi": "86.239.6314865150\/do.1d26018d-e7cf-4b6a-8384-d6f66660adff", "doiName": "EC", "doiSource": "SDTM-01", "doiProject": "围术期抗栓药物管理临床路径研究", "doiType": "SDTM" },
                { "doi": "86.469.4473469688\/do.74b20618-1b46-4268-b4a8-3cdab5421890", "doiName": "SUPPEC", "doiSource": "SDTM-01", "doiProject": "围术期抗栓药物管理临床路径研究", "doiType": "SDTM" },
                { "doi": "86.203.2508123815\/do.7f2a8048-bd6e-4bed-904c-e529ca4873f9", "doiName": "LB", "doiSource": "SDTM-01", "doiProject": "围术期抗栓药物管理临床路径研究", "doiType": "SDTM" },
                { "doi": "86.074.8623266330\/do.e3f03938-0c6a-4c62-85b3-00e5df644f45", "doiName": "MH", "doiSource": "SDTM-01", "doiProject": "围术期抗栓药物管理临床路径研究", "doiType": "SDTM" },
                { "doi": "86.905.1027919175\/do.f1773111-3f6e-4f69-9a6b-4d11c2ea3296", "doiName": "QS", "doiSource": "SDTM-01", "doiProject": "围术期抗栓药物管理临床路径研究", "doiType": "SDTM" },
                { "doi": "86.269.9425625366\/do.4a2a2e4a-4a11-48d1-9a2c-2fe49e829fc7", "doiName": "SUPPQS", "doiSource": "SDTM-01", "doiProject": "围术期抗栓药物管理临床路径研究", "doiType": "SDTM" },
                { "doi": "86.412.0718893507\/do.16b5b2e6-8202-4625-976e-6b8310a8131e", "doiName": "SDTM-01", "doiSource": "EDC", "doiProject": "围术期抗栓药物管理临床路径研究", "doiType": "SDTM" },
                { "doi": "86.137.1440716644\/do.9fccea09-9662-4853-a456-f5bbc9a612fc", "doiName": "SDTM-02", "doiSource": "EDC", "doiProject": "围术期抗栓药物管理临床路径研究", "doiType": "SDTM" },
                { "doi": "86.100.3976183865\/do.453a3671-f546-4f78-a688-509384699dad", "doiName": "CM", "doiSource": "SDTM-02", "doiProject": "围术期抗栓药物管理临床路径研究", "doiType": "SDTM" },
                { "doi": "86.708.3672867577\/do.31a13d39-4e8b-4841-96bf-beaca7cd3f20", "doiName": "DM", "doiSource": "SDTM-02", "doiProject": "围术期抗栓药物管理临床路径研究", "doiType": "SDTM" },
                { "doi": "86.044.8826212971\/do.56842ecc-35ed-43a8-a508-31cf7e6b3cc2", "doiName": "LB", "doiSource": "SDTM-02", "doiProject": "围术期抗栓药物管理临床路径研究", "doiType": "SDTM" },
                { "doi": "86.705.6680948492\/do.3042ec3e-2a40-4654-bde0-c1bc39850a4c", "doiName": "IMPUTATION-DATA", "doiSource": "SDTM-01", "doiProject": "围术期抗栓药物管理临床路径研究", "doiType": "结构化数据" },
            ],

            doiIndex: 0,

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
                    nodes: [
                        // { id: 0, name: '节点0', symbolSize: 30 },
                    ],
                    links: [
                        // { source: 1, target: 0 },
                    ],
                    roam: true,
                    label: {
                        show: true,
                        position: 'top', // 标签显示在节点上方
                        // formatter: function (param) {
                        //     return param.data.showLabel; // 自定义悬浮文字为节点名称
                        // }
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
                        // edgeLength: 280,
                    },
                    draggable: true,
                    animation: false,
                }
            }
        };
    },
    mounted() {

        this.initEcharts(this.doiDetail);

    },
    methods: {
        createEdge(fromIdx, toNode, doiList) {
            for (let idx = 0; idx < doiList.length; idx++) {
                if (doiList[idx].doiName === toNode) {
                    this.graphEchartsOptions.series.links.push({
                        source: idx,
                        target: fromIdx
                    })
                }
            }
        },

        initEcharts(doiList) {
            for (let idx = 0; idx < doiList.length; idx++) {
                this.graphEchartsOptions.series.nodes.push({
                    id: idx,
                    name: doiList[idx].doiName,
                    category: doiList[idx].doiType,
                    symbolSize: 20
                })
                if (doiList[idx].doiSource != null) {
                    let edges = doiList[idx].doiSource.split(',')
                    for (let item of edges) {
                        this.createEdge(idx, item, doiList)
                    }
                }

            }

            const graphEcharts = this.$refs.GraphEcharts;
            const myChart = echarts.init(graphEcharts);
            myChart.setOption(this.graphEchartsOptions);
            window.addEventListener("resize", () => {
                myChart.resize();
            });

            // 监听点击事件
            myChart.on('click', params => {
                if (params.dataType === 'node') {
                    // 执行你想要的函数
                    this.handleClickNode(params.data.id);
                }
            });
        },


        handleClickNode(nodeId) {
            this.doiIndex = nodeId;
            const graphEcharts = this.$refs.GraphEcharts;
            const myChart = echarts.init(graphEcharts);
            myChart.setOption(this.graphEchartsOptions);

        }
    },
}
</script>

<style scoped>
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
</style>