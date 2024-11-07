<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <div
                style="display: flex; flex-direction: column; justify-content: space-around; align-items: center; width: 100%; margin-top: 24px;">
                <el-card style="width: 90%; margin-bottom: 24px;">

                    <el-descriptions title="数字对象详情" :column="1">
                        <el-descriptions-item label="数字对象标识">{{ retraceList[doIndex].doi }}</el-descriptions-item>
                        <el-descriptions-item label="数字对象名称">{{ retraceList[doIndex].name }}</el-descriptions-item>
                        <el-descriptions-item label="数字对象描述">{{ retraceList[doIndex].description }}</el-descriptions-item>
                        <el-descriptions-item label="数字对象类型">{{ retraceList[doIndex].type }}</el-descriptions-item>
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
            retraceList: [
                {
                    doi: "",
                    name: "",
                    description: "",
                    source: [],
                    type: ""
                }
            ],
            doIndex: 0,

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
        this.retraceList = this.$route.params.retraceList;
        this.initEcharts(this.retraceList);
    },
    methods: {
        // 绘制追溯图
        initEcharts(retraceList) {
            for (let idx = 0; idx < retraceList.length; idx++) {
                this.graphEchartsOptions.series.nodes.push({
                    id: idx,
                    name: retraceList[idx].name,
                    category: retraceList[idx].type,
                    symbolSize: 20
                })
            }

            for (let idx = 0; idx < retraceList.length; idx++) {
                if (retraceList[idx].source != null) {
                    let edges = retraceList[idx].source
                    for (let item of edges) {
                        this.createEdge(idx, item, retraceList)
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

        createEdge(fromIdx, toNode, retraceList) {
            for (let idx = 0; idx < retraceList.length; idx++) {
                if (retraceList[idx].doi === toNode) {
                    this.graphEchartsOptions.series.links.push({
                        source: idx,
                        target: fromIdx
                    })
                }
            }
        },


        handleClickNode(nodeId) {
            this.doIndex = nodeId;
            // const graphEcharts = this.$refs.GraphEcharts;
            // const myChart = echarts.init(graphEcharts);
            // myChart.setOption(this.graphEchartsOptions);
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