<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <!-- 统计图和组网图 -->
            <div
                style="display: flex; flex-direction: row; justify-content: space-around; width: 100%; margin-top: 24px;">
                <el-card style="width: 45%;">
                    <div class="echarts" ref="PieEcharts" style="height: 250px;"></div>
                </el-card>
                <el-card style="width: 45%;">
                    <div class="echarts" ref="BarEcharts" style="height: 250px;"></div>
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
                            <el-descriptions-item label="项目DOI">{{ item.projectDoi }}</el-descriptions-item>
                            <el-descriptions-item label="项目负责人">{{ item.user }}</el-descriptions-item>
                            <el-descriptions-item label="联系方式">{{ item.contactInfo }}</el-descriptions-item>
                        </el-descriptions>
                    </el-card>
                </div>
            </div>

            <div style="margin: 24px">
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
            pieChartsOptions: {
                legend: {
                    data: ["北京协和医院", "北京大学人民医院", "北京大学第三医院", "其他"],
                    orient: "vertical",
                    right: "0%",
                    top: "10%",
                },
                title: {
                    text: "机构牵头项目数量",
                    left: "center",
                },
                series: {
                    name: "机构牵头项目数量",
                    type: "pie",
                    radius: "65%",
                    center: ["50%", "60%"],
                    data: [
                        {
                            value: 463,
                            name: "北京协和医院"
                        },
                        {
                            value: 150,
                            name: "北京大学人民医院"
                        },
                        {
                            value: 130,
                            name: "北京大学第三医院"
                        },
                        {
                            value: 201,
                            name: "其他"
                        }
                    ],
                },
            },
            barEchartsOptions: {
                title: {
                    text: "机构参与项目数量",
                    left: "center",
                },
                xAxis: {
                    type: "category",
                    data: ["北京协和医院", "中国人民解放军总医院", "北京大学第三医院", "其他"],
                    axisLabel: {
                        showMinLabel: true,
                        showMaxLabel: true,
                        formatter: function (value) {
                            // 自定义格式化函数，实现多行显示
                            return value.replace(/(.{4})/g, '$1\n'); // 每4个字符换行
                        },
                    }
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
            lineEcharts1Options: {
                title: {
                    text: '机构数量',
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
                    text: '项目数量',
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
            projectsList: [
                {
                    projectDoi: "项目DOI",
                    name: "项目名字",
                    user: "项目负责人",
                    contactInfo: "联系方式",
                }
            ],
            pages: 1,
            currentPage: 1,
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
        this.getProjectsList({ page: 1, size: 5});
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
        clickPage(page) {
            this.currentPage = page;
            this.getProjectsList({page: this.currentPage, size: 5});
        },
        getProjectsList(postData) {
            let _this = this;
            _this.projectsList = [];
            postForm('/projectInfos/getProjectInfo', postData, _this, function(res){
                _this.pages = res.data.pages;
                for(let item of res.data.records) {
                    _this.projectsList.push({
                        name: item.name,
                        user: item.user,
                        contactInfo: item.contactInfo,
                        projectDoi: item.projectDoi,
                    });
                }
            })
        },
    },
}
</script>

<style scoped></style>
