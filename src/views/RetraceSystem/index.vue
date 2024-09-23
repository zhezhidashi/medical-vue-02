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
                { "doi": "86.999.5629936870\/do.d9f13c9c-78e4-42c6-898c-35534111a7c8", "doiName": "adrs.sas7bdat", "doiSource": "adrs.txt", "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "ADAM" },
                { "doi": "86.778.6080935952\/do.6749e8bf-8b8d-4424-a58c-2d6d7195b7e8", "doiName": "adrs.txt", "doiSource": null, "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "代码" },
                { "doi": "86.168.3014884855\/do.dc83dab2-32de-479c-981e-2ee1e0c017d9", "doiName": "adsl.sas7bdat", "doiSource": "dm.sas7bdat,ex.sas7bdat,ds.sas7bdat,sc.sas7bdat,vs.sas7bdat,qs.sas7bdat,lb.sas7bdat,adsl.txt", "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "ADAM" },
                { "doi": "86.068.6036097826\/do.765a5aad-75cb-42fb-a243-e2666ddcb1a8", "doiName": "adsl.txt", "doiSource": null, "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "代码" },
                { "doi": "86.456.4502210033\/do.b3ab3d96-529e-4c6d-a2b5-eed614997e55", "doiName": "adtte.sas7bdat", "doiSource": "adsl.sas7bdat,rs.sas7bdat,adtte.txt", "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "ADAM" },
                { "doi": "86.787.5247682233\/do.373c3c6f-811c-4af8-ae4f-7e3f2e3a04ac", "doiName": "adtte.txt", "doiSource": null, "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "代码" },
                { "doi": "86.027.3915229710\/do.5eacec49-dfc6-4b7d-92b6-22e4d0f9023a", "doiName": "dm.sas7bdat", "doiSource": null, "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "ADAM" },
                { "doi": "86.726.3578050664\/do.d9634862-2875-479d-a185-7b7482d2f022", "doiName": "ds.sas7bdat", "doiSource": null, "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "SDTM" },
                { "doi": "86.878.2434639417\/do.3a1e96b2-5acf-4ef6-b910-73db552896b6", "doiName": "ex.sas7bdat", "doiSource": null, "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "SDTM" },
                { "doi": "86.564.3760408971\/do.2da28b19-a4b4-4537-9167-7f022d8282ad", "doiName": "lb.sas7bdat", "doiSource": null, "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "SDTM" },
                { "doi": "86.456.7865279273\/do.6f4b89c8-cbc8-460f-994b-7dd834e5b553", "doiName": "qs.sas7bdat", "doiSource": null, "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "SDTM" },
                { "doi": "86.089.0900463897\/do.ed9aa199-8fcf-40a4-91b5-4b3a1acf9e09", "doiName": "rs.sas7bdat", "doiSource": "ts.txt", "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "SDTM" },
                { "doi": "86.664.5514774006\/do.c8934519-3051-4664-9982-1a28d043886f", "doiName": "sc.sas7bdat", "doiSource": null, "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "SDTM" },
                { "doi": "86.411.9994926312\/do.066f0516-7bec-4b8a-8b84-1fdc655e8b06", "doiName": "transfer.R", "doiSource": null, "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "代码" },
                { "doi": "86.472.0045666043\/do.624a30a5-c61d-487e-a918-bb858f20bd47", "doiName": "ts.txt", "doiSource": null, "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "代码" },
                { "doi": "86.303.5992206572\\\/do.2606ef10-c9d1-47e2-864e-1a3c3ade9fc1", "doiName": "vs.sas7bdat", "doiSource": null, "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "SDTM" },
                { "doi": "86.438.6101112648\\\/do.ae8c75fa-e07a-482a-bdc2-d69dc29643a1", "doiName": "TQ-B2303-III-01-MERGED-DATA.csv", "doiSource": "adsl.sas7bdat,adtte.sas7bdat,adrs.sas7bdat,transfer.R", "doiProject": "TQ-B2303-III-01-关键注册临床-III期", "doiType": "结构化数据" },

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
                        data: ['SDTM', 'ADAM', '代码', '结构化数据', '非结构化数据']
                    },
                ],
                series: {
                    type: 'graph',
                    layout: 'force',
                    categories: [
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
                            itemStyle: { color: 'purple' },
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
                            width: 4, // 连线的粗细
                            color: 'darkpurple', // 可以是单一颜色，也可以是颜色数组或回调函数
                        },
                    },
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
        this.initEcharts();
    },
    methods: {
        createEdge(fromIdx, toNode) {
            for (let idx = 0; idx < this.doiDetail.length; idx++) {
                if (this.doiDetail[idx].doiName === toNode) {
                    this.graphEchartsOptions.series.links.push({
                        source: fromIdx,
                        target: idx
                    })
                }
            }
        },

        initEcharts() {
            for (let idx = 0; idx < this.doiDetail.length; idx++) {
                this.graphEchartsOptions.series.nodes.push({
                    id: idx,
                    name: this.doiDetail[idx].doiName,
                    category: this.doiDetail[idx].doiType,
                    symbolSize: 20
                })
                if (this.doiDetail[idx].doiSource != null) {
                    let edges = this.doiDetail[idx].doiSource.split(',')
                    for (let item of edges) {
                        this.createEdge(idx, item)
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