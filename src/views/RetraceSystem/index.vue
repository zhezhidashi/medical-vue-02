<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <div
                style="display: flex; flex-direction: column; justify-content: space-around; align-items: center; width: 100%; margin-top: 24px;">
                <el-card style="width: 90%; margin-bottom: 24px;">

                    <el-descriptions title="数字对象详情" :column="1">
                        <el-descriptions-item label="数字对象标识">{{ doiDetailNow[doiIndex].doi }}</el-descriptions-item>
                        <el-descriptions-item label="数字对象名称">{{ doiDetailNow[doiIndex].doiName }}</el-descriptions-item>
                        <!-- <el-descriptions-item label="数字对象来源">{{ doiDetailNow[doiIndex].doiSource }}</el-descriptions-item> -->
                        <el-descriptions-item label="数字对象所属项目">{{ doiDetailNow[doiIndex].doiProject
                            }}</el-descriptions-item>
                        <el-descriptions-item label="数字对象类型">{{ doiDetailNow[doiIndex].doiType }}</el-descriptions-item>
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
            graphNo: 2,

            // 数字对象详情
            doiDetail1: [
                { "doi": "86.879.5876633518\/do.711bb34f-d908-439f-a010-4d7e7641e671", "doiName": "EDC", "doiSource": null, "doiProject": "围术期抗栓药物管理临床路径", "doiType": "EDC" },
                { "doi": "86.633.1412578611\/do.b3524146-fe5f-4a15-935c-ff1ae6213f12", "doiName": "CM", "doiSource": "SDTM-01", "doiProject": "围术期抗栓药物管理临床路径", "doiType": "SDTM" },
                { "doi": "86.642.9981100019\/do.e8b05ced-4f38-4bd2-8668-76b1842a74f1", "doiName": "SUPPDM", "doiSource": "SDTM-01", "doiProject": "围术期抗栓药物管理临床路径", "doiType": "SDTM" },
                { "doi": "86.546.7107975866\/do.24e9fbdb-a0ec-45fa-907f-12e9b8fc4831", "doiName": "DM", "doiSource": "SDTM-01", "doiProject": "围术期抗栓药物管理临床路径", "doiType": "SDTM" },
                { "doi": "86.328.1809789528\/do.bb74025c-1cbe-432d-9e33-5eeab0db2ac3", "doiName": "SUPPDM", "doiSource": "SDTM-01", "doiProject": "围术期抗栓药物管理临床路径", "doiType": "SDTM" },
                { "doi": "86.239.6314865150\/do.1d26018d-e7cf-4b6a-8384-d6f66660adff", "doiName": "EC", "doiSource": "SDTM-01", "doiProject": "围术期抗栓药物管理临床路径", "doiType": "SDTM" },
                { "doi": "86.469.4473469688\/do.74b20618-1b46-4268-b4a8-3cdab5421890", "doiName": "SUPPEC", "doiSource": "SDTM-01", "doiProject": "围术期抗栓药物管理临床路径", "doiType": "SDTM" },
                { "doi": "86.203.2508123815\/do.7f2a8048-bd6e-4bed-904c-e529ca4873f9", "doiName": "LB", "doiSource": "SDTM-01", "doiProject": "围术期抗栓药物管理临床路径", "doiType": "SDTM" },
                { "doi": "86.074.8623266330\/do.e3f03938-0c6a-4c62-85b3-00e5df644f45", "doiName": "MH", "doiSource": "SDTM-01", "doiProject": "围术期抗栓药物管理临床路径", "doiType": "SDTM" },
                { "doi": "86.905.1027919175\/do.f1773111-3f6e-4f69-9a6b-4d11c2ea3296", "doiName": "QS", "doiSource": "SDTM-01", "doiProject": "围术期抗栓药物管理临床路径", "doiType": "SDTM" },
                { "doi": "86.269.9425625366\/do.4a2a2e4a-4a11-48d1-9a2c-2fe49e829fc7", "doiName": "SUPPQS", "doiSource": "SDTM-01", "doiProject": "围术期抗栓药物管理临床路径", "doiType": "SDTM" },
                { "doi": "86.412.0718893507\/do.16b5b2e6-8202-4625-976e-6b8310a8131e", "doiName": "SDTM-01", "doiSource": "EDC", "doiProject": "围术期抗栓药物管理临床路径", "doiType": "SDTM" },
                { "doi": "86.137.1440716644\/do.9fccea09-9662-4853-a456-f5bbc9a612fc", "doiName": "SDTM-02", "doiSource": "EDC", "doiProject": "围术期抗栓药物管理临床路径", "doiType": "SDTM" },
                { "doi": "86.100.3976183865\/do.453a3671-f546-4f78-a688-509384699dad", "doiName": "CM", "doiSource": "SDTM-02", "doiProject": "围术期抗栓药物管理临床路径", "doiType": "SDTM" },
                { "doi": "86.708.3672867577\/do.31a13d39-4e8b-4841-96bf-beaca7cd3f20", "doiName": "DM", "doiSource": "SDTM-02", "doiProject": "围术期抗栓药物管理临床路径", "doiType": "SDTM" },
                { "doi": "86.044.8826212971\/do.56842ecc-35ed-43a8-a508-31cf7e6b3cc2", "doiName": "LB", "doiSource": "SDTM-02", "doiProject": "围术期抗栓药物管理临床路径", "doiType": "SDTM" },
                { "doi": "86.159.8913230823\/do.91888cfa-c97f-4198-9cc7-9b3b767e9818", "doiName": "ref_LB", "doiSource": null, "doiProject": "围术期抗栓药物管理临床路径", "doiType": "结构化数据" },
                { "doi": "86.093.1831403174\/do.db4d9ba1-cfa2-48b8-872d-e445bca34ed6", "doiName": "药物不良反应", "doiSource": null, "doiProject": "围术期抗栓药物管理临床路径", "doiType": "结构化数据" },
                { "doi": "86.099.5131183842\/do.fbfbb9f4-02e5-4751-a962-54d19b42b290", "doiName": "药物靶点示例", "doiSource": null, "doiProject": "围术期抗栓药物管理临床路径", "doiType": "结构化数据" },
            ],

            doiDetail2: [
                { "doi": "86.999.5629936870\/do.d9f13c9c-78e4-42c6-898c-35534111a7c8", "doiName": "ADRS", "doiSource": "adrs.sas", "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "ADAM" },
                { "doi": "86.778.6080935952\/do.6749e8bf-8b8d-4424-a58c-2d6d7195b7e8", "doiName": "adrs.sas", "doiSource": null, "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "代码" },
                { "doi": "86.168.3014884855\/do.dc83dab2-32de-479c-981e-2ee1e0c017d9", "doiName": "ADSL", "doiSource": "DM,EX,DS,SC,VS,QS,LB,adsl.sas", "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "ADAM" },
                { "doi": "86.068.6036097826\/do.765a5aad-75cb-42fb-a243-e2666ddcb1a8", "doiName": "adsl.sas", "doiSource": null, "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "代码" },
                { "doi": "86.456.4502210033\/do.b3ab3d96-529e-4c6d-a2b5-eed614997e55", "doiName": "ADTTE", "doiSource": "ADSL,RS,adtte.sas", "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "ADAM" },
                { "doi": "86.787.5247682233\/do.373c3c6f-811c-4af8-ae4f-7e3f2e3a04ac", "doiName": "adtte.sas", "doiSource": null, "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "代码" },
                { "doi": "86.027.3915229710\/do.5eacec49-dfc6-4b7d-92b6-22e4d0f9023a", "doiName": "DM", "doiSource": "dm.sas", "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "ADAM" },
                { "doi": "86.726.3578050664\/do.d9634862-2875-479d-a185-7b7482d2f022", "doiName": "DS", "doiSource": null, "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "SDTM" },
                { "doi": "86.878.2434639417\/do.3a1e96b2-5acf-4ef6-b910-73db552896b6", "doiName": "EX", "doiSource": null, "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "SDTM" },
                { "doi": "86.564.3760408971\/do.2da28b19-a4b4-4537-9167-7f022d8282ad", "doiName": "LB", "doiSource": null, "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "SDTM" },
                { "doi": "86.456.7865279273\/do.6f4b89c8-cbc8-460f-994b-7dd834e5b553", "doiName": "QS", "doiSource": null, "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "SDTM" },
                { "doi": "86.089.0900463897\/do.ed9aa199-8fcf-40a4-91b5-4b3a1acf9e09", "doiName": "RS", "doiSource": "rs.sas", "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "SDTM" },
                { "doi": "86.664.5514774006\/do.c8934519-3051-4664-9982-1a28d043886f", "doiName": "SC", "doiSource": null, "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "SDTM" },
                { "doi": "86.411.9994926312\/do.066f0516-7bec-4b8a-8b84-1fdc655e8b06", "doiName": "transfer.R", "doiSource": null, "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "代码" },
                { "doi": "86.472.0045666043\/do.624a30a5-c61d-487e-a918-bb858f20bd47", "doiName": "rs.sas", "doiSource": null, "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "代码" },
                { "doi": "86.303.5992206572\\\/do.2606ef10-c9d1-47e2-864e-1a3c3ade9fc1", "doiName": "VS", "doiSource": null, "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "SDTM" },
                { "doi": "86.438.6101112648\\\/do.ae8c75fa-e07a-482a-bdc2-d69dc29643a1", "doiName": "TQ-B2303-III-01-MERGED-DATA", "doiSource": "ADSL,ADTTE,ADRS,transfer.R", "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "结构化数据" },
                { "doi": "86.474.5735590245\\\/do.hdvy8qse-5tyu-8dh3-nxf3d83h03nstvod", "doiName": "dm.sas", "doiSource": null, "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "代码" },
            ],

            doiDetailNow: [
                {
                    "doi": "",
                    "doiName": "",
                    "doiSource": "",
                    "doiProject": "",
                    "doiType": ""
                }
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
                        data: ["原始数据文件", "EDC", 'SDTM', 'ADAM', '代码', '结构化数据', '非结构化数据']
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
        // 设置项目id
        this.$store.commit('getProid');
        let proid = this.$store.state.user.proid;
        console.log(proid)

        if (proid === "657cc8720201477d9453d5d0b5e27e6d") this.graphNo = 2;
        else this.graphNo = 1;

        if (this.graphNo === 1) {
            this.initEcharts(this.doiDetail1);
            this.doiDetailNow = this.doiDetail1;
        }
        else {
            this.initEcharts(this.doiDetail2);
            this.doiDetailNow = this.doiDetail2;
        }
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