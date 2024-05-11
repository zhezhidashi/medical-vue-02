<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <!-- 统计图和组网图 -->
            <div
                style="display: flex; flex-direction: row; justify-content: space-around; width: 100%; margin-top: 24px;">
                <el-card style="width: 40%;">
                    <div class="echarts" ref="PieEcharts" style="height: 250px;"></div>
                </el-card>
                <el-card style="width: 40%;">
                    <div class="echarts" ref="BarEcharts" style="height: 250px;"></div>
                </el-card>
            </div>
            <div
                style="display: flex; flex-direction: row; justify-content: space-around; width: 100%; margin-top: 24px;">
                <el-card style="width: 40%;">
                    <div class="echarts" ref="ScatterEcharts" style="height: 250px;"></div>
                </el-card>
                <el-card style="width: 40%;">
                    <div class="echarts" ref="LineEcharts" style="height: 250px;"></div>
                </el-card>
            </div>
            <!-- 卡片 -->
            <div
                style="display: flex; flex-direction: column; justify-content: space-around; align-items: center; width: 100%; margin-top: 24px;">
                <el-card style="width: 90%; margin-bottom: 24px;">
                    <div class="echarts" ref="TreeEcharts" style="height: 350px;"></div>
                </el-card>
                <el-card style="width: 90%; margin-bottom: 24px;">

                    <el-descriptions title="项目名字1">
                        <el-descriptions-item label="项目所属机构">北医三院</el-descriptions-item>
                        <el-descriptions-item label="项目负责人">张三</el-descriptions-item>
                        <el-descriptions-item label="项目描述">苏州市</el-descriptions-item>
                        <el-descriptions-item label="项目类型">
                            <el-tag size="small">类型1</el-tag>
                        </el-descriptions-item>
                        <el-descriptions-item label="联系方式">aaaaa@pku.edu.cn</el-descriptions-item>
                    </el-descriptions>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from "echarts";
export default {
    name: "MainPage",
    data() {
        return {
            user: {
                username: '',
                userType: '',
            },
            pieChartsOptions: {
                legend: {
                    data: ["山东", "山西", "河北", "河南"],
                    orient: "vertical",
                    right: "0%",
                    top: "10%",
                },
                title: {
                    text: "地区分布",
                    left: "center",
                },
                series: {
                    name: "地区分布",
                    type: "pie",
                    radius: "65%",
                    center: ["50%", "60%"],
                    data: [
                        {
                            value: 463,
                            name: "山东"
                        },
                        {
                            value: 100,
                            name: "山西"
                        },
                        {
                            value: 157,
                            name: "河北"
                        },
                        {
                            value: 149,
                            name: "河南"
                        },
                    ],
                },
            },
            barEchartsOptions: {
                title: {
                    text: "用户分布",
                    left: "center",
                },
                xAxis: {
                    type: "category",
                    data: ["山东", "山西", "河北", "河南"],
                },
                yAxis: {
                    type: "value",
                },
                series: [
                    {
                        data: [463, 100, 157, 149],
                        type: "bar",
                    },
                ],
            },
            scatterEchartsOptions: {
                title: {
                    text: '散点图示例',
                    left: 'center',
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '({c})',
                },
                xAxis: {
                    type: 'value',
                    name: 'X轴',
                    nameLocation: 'middle',
                    nameGap: 30,
                },
                yAxis: {
                    type: 'value',
                    name: 'Y轴',
                    nameLocation: 'middle',
                    nameGap: 40,
                },
                series: [
                    {
                        type: 'scatter',
                        data: [
                            [10, 20],
                            [15, 25],
                            [30, 40],
                            [45, 35],
                            [50, 50],
                        ],
                        symbolSize: 10,
                    },
                ],
            },
            lineEchartsOptions: {
                title: {
                    text: '折线图示例',
                    left: 'center',
                },
                xAxis: {
                    type: 'category',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130],
                        type: 'line',
                    },
                ],
            },

            treeEchartsOptions: {
                title: {
                    text: '组网结构示例',
                    left: 'center',
                },
                series: {
                    type: 'tree',
                    orient: 'vertical', // 设置为垂直布局
                    left: '0%', // 将根节点放在正中间
                    symbol: 'emptyRectangle', // 将节点形状设置为方块
                    symbolSize: [40, 20], // 方块的大小
                    data: [
                        {
                            name: 'A',
                            children: [
                                {
                                    name: 'A1',
                                    children: [
                                        {
                                            name: 'A11',
                                        },
                                        {
                                            name: 'A12',
                                        },
                                    ],
                                },
                                {
                                    name: 'A2',
                                },
                            ],
                        },
                        {
                            name: 'B',
                            children: [
                                {
                                    name: 'B1',
                                },
                                {
                                    name: 'B2',
                                },
                            ],
                        },
                    ],
                },
            }
        };
    },
    mounted() {
        this.user.username = this.$store.state.user.username;
        const userType = this.$store.state.user.userType;
        if (userType === 'admin') {
            this.user.userType = '管理员';
        } else if (userType === 'user') {
            this.user.userType = '普通用户';
        }
        this.initEcharts();
    },
    methods: {
        initEcharts() {
            const pieEcharts = echarts.init(this.$refs.PieEcharts);
            pieEcharts.setOption(this.pieChartsOptions);
            // 监听窗口变化
            window.addEventListener("resize", () => {
                pieEcharts.resize();
            });

            const barEcharts = echarts.init(this.$refs.BarEcharts);
            barEcharts.setOption(this.barEchartsOptions);
            window.addEventListener("resize", () => {
                barEcharts.resize();
            });

            const scatterEcharts = echarts.init(this.$refs.ScatterEcharts);
            scatterEcharts.setOption(this.scatterEchartsOptions);
            window.addEventListener("resize", () => {
                scatterEcharts.resize();
            });

            const lineEcharts = echarts.init(this.$refs.LineEcharts);
            lineEcharts.setOption(this.lineEchartsOptions);
            window.addEventListener("resize", () => {
                lineEcharts.resize();
            });

            const treeEcharts = echarts.init(this.$refs.TreeEcharts);
            treeEcharts.setOption(this.treeEchartsOptions);
            window.addEventListener("resize", () => {
                treeEcharts.resize();
            });
        },
    },
}
</script>

<style scoped></style>
