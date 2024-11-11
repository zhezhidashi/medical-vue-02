<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <div
                style="display: flex; flex-direction: row; justify-content: space-around; width: 100%; margin-top: 50px;">
                <el-card style="width: 28%; height: 100px;">
                    <div style="text-align: center;">用户数量</div>
                    <div style="text-align: center; font-size: 25px; line-height: 200%;">{{ userNumber }}</div>
                </el-card>
                <el-card style="width: 28%; height: 100px;">
                    <div style="text-align: center;">项目数量</div>
                    <div style="text-align: center; font-size: 25px; line-height: 200%;">{{ projectNumber }}</div>
                </el-card>
                <el-card style="width: 28%; height: 100px;">
                    <div style="text-align: center;">数字对象数量</div>
                    <div style="text-align: center; font-size: 25px; line-height: 200%;">{{ doNumber }}</div>
                </el-card>
            </div>
            <div
                style="display: flex; flex-direction: row; justify-content: space-around; width: 100%; margin-top: 50px;">
                <el-card style="width: 45%;">
                    <div class="echarts" ref="PieEcharts1" style="height: 250px;"></div>
                </el-card>
                <el-card style="width: 45%;">
                    <div class="echarts" ref="PieEcharts2" style="height: 250px;"></div>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
import * as echarts from "echarts";
import { postForm, getForm, postFormPublic, getFormPublic } from "@/api/data";
export default {
    name: "MainPage",
    data() {
        return {
            user: {
                username: '',
                userType: '普通用户',
            },
            // 用户数量
            userNumber: 0,
            // 项目数量
            projectNumber: 0,
            // 数字对象数量
            doNumber: 0,

            // 待分配数字对象数量
            allocatingDoNumber: 0,
            // 已分配数字对象数量
            allocatedDoNumber: 0,
            // 待审批数字对象数量
            approvingDoNumber: 0,
            // 已审批数字对象数量
            approvedDoNumber: 0,

            pieChartsOptions1: {
                legend: {
                    data: ["待分配数字对象数量", "已分配数字对象数量"],
                    orient: "vertical",
                    right: "0%",
                    top: "10%",
                },
                title: {
                    text: "数字对象分配情况",
                    left: "center",
                },
                series: {
                    name: "数字对象分配情况",
                    type: "pie",
                    radius: "65%",
                    center: ["50%", "60%"],
                    data: [
                        {
                            value: 0,
                            name: "待分配数字对象数量"
                        },
                        {
                            value: 0,
                            name: "已分配数字对象数量"
                        },
                    ],
                },
            },
            pieChartsOptions2: {
                legend: {
                    data: ["待审批数字对象请求", "已审批数字对象请求"],
                    orient: "vertical",
                    right: "0%",
                    top: "10%",
                },
                title: {
                    text: "数字对象审批情况",
                    left: "center",
                },
                series: {
                    name: "数字对象审批情况",
                    type: "pie",
                    radius: "65%",
                    center: ["50%", "60%"],
                    data: [
                        {
                            value: 0,
                            name: "待审批数字对象请求"
                        },
                        {
                            value: 0,
                            name: "已审批数字对象请求"
                        },
                    ],
                },
            },
        };
    },
    mounted() {
        this.user.username = this.$store.state.user.username;
        this.user.userType = this.$store.state.user.userType;
        if (this.user.userType === 'user') {
            this.$router.push({ path: "/ProjectsListNormalUser" });
        }
        else {
            this.getBasicData()
        }
    },
    methods: {
        getBasicData() {
            let _this = this;
            this.getUserNumber();
            this.getProjectNumber();
            this.getAllocateStatus();
            this.getApproveStatus();
        },
        getUserNumber() {
            let _this = this;
            postForm("/users/getUsers", {}, _this, function (res) {
                _this.userNumber = res.data.total;
            });
        },
        getProjectNumber() {
            let _this = this;
            postForm('/projectInfos/getProjectInfo', {}, _this, function (res) {
                _this.projectNumber = res.data.total;
            })
        },
        getAllocateStatus() {
            let _this = this;
            postForm('/networkGroups/get', {}, _this, function (res) {
                if (res.data !== null) {
                    postFormPublic("/relationship/api/search", { institutionDoi: res.data.institutionDoi, pageNo: 1, pageSize: 100000 }, _this, function (res) {
                        _this.doNumber = res.data.list.length;
                        for(let item of res.data.list) {
                            if (item.projectDoi === null || item.projectDoi === undefined || item.projectDoi === "") {
                                _this.allocatingDoNumber++;
                            }
                            else {
                                _this.allocatedDoNumber++;
                            }
                        }
                        _this.initEcharts1();
                    })
                }
            })
        },
        getApproveStatus() {
            let _this = this;
            postForm('/doApplication/getInstApplication', {}, _this, function (res) {
                if (res.data !== null && res.data !== undefined) {
                    for (let item of res.data.records) {
                        if (item.appStatus === 3) {
                            _this.approvingDoNumber++;
                        }
                        else {
                            _this.approvedDoNumber++;
                        }
                    }
                }
                _this.initEcharts2();
            })
        },
        initEcharts1() {
            this.pieChartsOptions1.series.data[0].value = this.allocatingDoNumber;
            this.pieChartsOptions1.series.data[1].value = this.allocatedDoNumber;
            const pieEcharts1 = echarts.init(this.$refs.PieEcharts1);
            pieEcharts1.setOption(this.pieChartsOptions1);
            // 监听窗口变化
            window.addEventListener("resize", () => {
                pieEcharts1.resize();
            });
        },
        initEcharts2() {
            this.pieChartsOptions2.series.data[0].value = this.approvingDoNumber;
            this.pieChartsOptions2.series.data[1].value = this.approvedDoNumber;
            const pieEcharts2 = echarts.init(this.$refs.PieEcharts2);
            pieEcharts2.setOption(this.pieChartsOptions2);
            // 监听窗口变化
            window.addEventListener("resize", () => {
                pieEcharts2.resize();
            });
        },
    },
}
</script>

<style scoped></style>
