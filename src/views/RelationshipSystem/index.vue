<template>
    <div style="display: flex;">
        <!-- <common-aside :activeIndex="'4'"></common-aside> -->
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <div
                style="display: flex; flex-direction: column; justify-content: space-around; align-items: center; width: 100%; margin-top: 24px;">
                <el-card style="width: 90%; margin-bottom: 24px;">
                    <div class="echarts" ref="GraphEcharts" style="height: 500px;"></div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue';
import * as echarts from "echarts";
export default {
    name: "RelationshipSystem",
    components: {
        CommonAside,
    },
    data() {
        return {
            graphEchartsOptions: {
                title: {
                    text: '拓扑图示例'
                },
                tooltip: {},
                series: {
                    type: 'graph',
                    layout: 'force',
                    nodes: [
                        { id: 0, name: '节点0', symbolSize: 30 },
                        { id: 1, name: '节点1', symbolSize: 30 },
                        { id: 2, name: '节点2', symbolSize: 30 },
                        { id: 3, name: '节点3', symbolSize: 30 }
                    ],
                    links: [
                        { source: 0, target: 1 },
                        { source: 0, target: 2 },
                        { source: 1, target: 2 },
                        { source: 2, target: 3 }
                    ],
                    roam: true,
                    label: {
                        show: true
                    },
                    emphasis: {
                        focus: 'adjacency',
                        lineStyle: {
                            width: 5
                        }
                    },
                    force: {
                        repulsion: 600,
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
        initEcharts() {
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
            let nodeLength = this.graphEchartsOptions.series.nodes.length;
            console.log(nodeId);
            this.graphEchartsOptions.series.nodes.push({
                id: nodeLength,
                name: '节点' + nodeLength,
                symbolSize: 30
            });
            this.graphEchartsOptions.series.links.push({
                source: nodeId,
                target: nodeLength
            });
            const graphEcharts = this.$refs.GraphEcharts;
            const myChart = echarts.init(graphEcharts);
            myChart.setOption(this.graphEchartsOptions);

        }
    },
}
</script>

<style scoped></style>