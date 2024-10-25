<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <div
                style="display: flex; flex-direction: row; justify-content: space-around; width: 100%; margin-top: 24px;">
                <el-card style="width: 20%; height: 100px;">
                    牵头项目数量：10
                </el-card>
                <el-card style="width: 20%; height: 100px;">
                    参与项目数量：20
                </el-card>
                <el-card style="width: 20%; height: 100px;">
                    用户数量：10
                </el-card>
                <el-card style="width: 20%; height: 100px;">
                    数字对象数量：200
                </el-card>
            </div>
            <div
                style="display: flex; flex-direction: row; justify-content: space-around; width: 100%; margin-top: 24px;">
                <el-card style="width: 20%; height: 100px;">
                    待审批项目：123
                </el-card>
                <el-card style="width: 20%; height: 100px;">
                    待分配数字对象数量：123
                </el-card>
                <el-card style="width: 20%; height: 100px;">
                    待审批数字对象数量：234
                </el-card>
                <el-card style="width: 20%; height: 100px;">
                    智能合约账户余额：100%
                </el-card>
            </div>
            <div
                style="display: flex; flex-direction: row; justify-content: space-around; width: 100%; margin-top: 24px;">
                <el-card style="width: 45%;">
                    <div class="echarts" ref="LineEcharts1" style="height: 250px;"></div>
                </el-card>
                <el-card style="width: 45%;">
                    <div class="echarts" ref="LineEcharts2" style="height: 250px;"></div>
                </el-card>
            </div>
            <!-- 卡片 -->
            <!-- <div style="display: flex; flex-direction: column; justify-content: space-around; align-items: center; width: 95%; margin-top: 24px;">
                <div v-for="(item, index) in projectsList">
                    <el-card style="width: 100%; margin-bottom: 24px;">
                        <el-descriptions :title="item.name">
                            <el-descriptions-item label="项目标识">{{ item.projectDoi }}</el-descriptions-item>
                            <el-descriptions-item label="项目负责人">{{ item.user }}</el-descriptions-item>
                            <el-descriptions-item label="联系方式">{{ item.contactInfo }}</el-descriptions-item>
                        </el-descriptions>
                    </el-card>
                </div>
            </div> -->

            <!-- <div style="margin: 24px">
                <el-pagination background layout="pager" :page-size="5" :page-count="pages"
                    @current-change="clickPage">
                </el-pagination>
            </div> -->
        </div>
    </div>
</template>

<script>
import * as echarts from "echarts";
import { postForm } from "@/api/data";
export default {
    name: "MainPage",
    data() {
        return {
            user: {
                username: '',
                userType: '',
            },
            lineEcharts1Options: {
                title: {
                    text: '牵头项目数量',
                    left: 'center',
                },
                xAxis: {
                    type: 'category',
                    data: ['2022年5月', '2022年9月', '2023年1月', '2023年5月', '2023年9月', '2024年1月', '2024年5月'],
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        data: [3, 10, 14, 28, 34, 49, 78],
                        type: 'line',
                    },
                ],
            },
            lineEcharts2Options: {
                title: {
                    text: '参与项目数量',
                    left: 'center',
                },
                xAxis: {
                    type: 'category',
                    data: ['2022年5月', '2022年9月', '2023年1月', '2023年5月', '2023年9月', '2024年1月', '2024年5月'],
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        data: [120, 201, 250, 280, 370, 410, 430],
                        type: 'line',
                    },
                ],
            },
        };
    },
    mounted() {
        this.user.username = this.$store.state.user.username;
        const userType = this.$store.state.user.userType;
        if (userType === 'admin') {
            this.user.userType = '管理员';
        } else if (userType === 'user') {
            this.user.userType = '普通用户';
            this.$router.push({path: "/ProjectsListNormalUser"});
        }
        this.initEcharts();
    },
    methods: {
        initEcharts() {
            const lineEcharts1 = echarts.init(this.$refs.LineEcharts1);
            lineEcharts1.setOption(this.lineEcharts1Options);
            window.addEventListener("resize", () => {
                lineEcharts1.resize();
            });

            const lineEcharts2 = echarts.init(this.$refs.LineEcharts2);
            lineEcharts2.setOption(this.lineEcharts2Options);
            window.addEventListener("resize", () => {
                lineEcharts2.resize();
            });
        },
    },
}
</script>

<style scoped></style>
