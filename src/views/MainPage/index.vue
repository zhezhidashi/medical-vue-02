<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <div
                style="display: flex; flex-direction: row; justify-content: space-around; width: 100%; margin-top: 24px;">
                <el-card style="width: 30%; height: 100px;">
                    牵头项目数量：10
                </el-card>
                <el-card style="width: 30%; height: 100px;">
                    参与项目数量：20
                </el-card>
                <el-card style="width: 30%; height: 100px;">
                    用户数量：10
                </el-card>
            </div>
            <div
                style="display: flex; flex-direction: row; justify-content: space-around; width: 100%; margin-top: 24px;">
                <el-card style="width: 30%; height: 100px;">
                    数字对象数量：200
                </el-card>
                <el-card style="width: 30%; height: 100px;">
                    待分配数字对象数量：123
                </el-card>
                <el-card style="width: 30%; height: 100px;">
                    待审批数字对象数量：234
                </el-card>
            </div>
            <div
                style="display: flex; flex-direction: row; justify-content: space-around; width: 100%; margin-top: 24px;">
                <el-card style="width: 30%; height: 100px;">
                    品种数量：200
                </el-card>
            </div>
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
    },
    methods: {
    },
}
</script>

<style scoped></style>
