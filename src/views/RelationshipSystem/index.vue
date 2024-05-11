<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <el-form :model="searchForm" label-width="auto" class="SearchForm">
                <el-form-item prop="doi" label="DOI" class="SearchFormItem">
                    <el-input v-model="searchForm.doi" style="width: 200px;"></el-input>
                </el-form-item>
                <el-form-item prop="doiName" label="数字对象名称" class="SearchFormItem">
                    <el-input v-model="searchForm.doiName" style="width: 200px;"></el-input>
                </el-form-item>
            </el-form>

            <el-button type="primary">搜索</el-button>
            <el-divider></el-divider>

            <div
                style="display: flex; flex-direction: column; justify-content: space-around; align-items: center; width: 100%; margin-top: 24px;">
                <el-card style="width: 90%; margin-bottom: 24px;">

                    <el-descriptions title="数字对象详情">
                        <el-descriptions-item label="DOI">{{ doiDetail.doi }}</el-descriptions-item>
                        <el-descriptions-item label="数字对象名称">{{ doiDetail.doiName }}</el-descriptions-item>
                        <el-descriptions-item label="数字对象来源">{{ doiDetail.doiSource }}</el-descriptions-item>
                        <el-descriptions-item label="数字对象描述">{{ doiDetail.doiDescription }}</el-descriptions-item>
                        <el-descriptions-item label="数字对象所属项目">{{ doiDetail.doiProject }}</el-descriptions-item>
                        <el-descriptions-item label="数字对象所属机构">{{ doiDetail.doiInstitution }}</el-descriptions-item>
                    </el-descriptions>
                </el-card>
                <el-card style="width: 90%; margin-bottom: 24px;">
                    <div class="echarts" ref="GraphEcharts" style="height: 500px;"></div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from "echarts";
export default {
    name: "RelationshipSystem",
    data() {
        return {
            // 搜索表单
            searchForm: {
                // DOI
                doi: '',
                // 数字对象名称
                doiName: '',
            },

            // 数字对象详情
            doiDetail: {
                // DOI
                doi: '1',
                // 数字对象名称
                doiName: '数字对象1',
                // 数字对象来源
                doiSource: '北医三院',
                // 数字对象描述
                doiDescription: '描述',
                // 数字对象所属项目
                doiProject: '项目1',
                // 数字对象所属机构
                doiInstitution: '机构1',
            },

            graphEchartsOptions: {
                title: {
                    text: '拓扑图示例',
                    textStyle: {
                        fontSize: 16 // 设置标题字体大小
                    }
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