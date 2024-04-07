<template>
    <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px;">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-menu-item index="0">主页</el-menu-item>
                <el-menu-item index="1">项目元数据列表</el-menu-item>
                <el-menu-item index="2">申请数据</el-menu-item>
                <!-- <el-menu-item index="3">本地统计分析</el-menu-item>
                <el-menu-item index="4">申请统计数据</el-menu-item> -->
                <el-menu-item index="5">数字对象摆渡</el-menu-item>
            </el-menu>
            <div class="r-content">
                <el-dropdown trigger="click" size="mini">
                    <div class="block"><el-avatar :size="50" src="userImg.png"></el-avatar></div>
                    <el-dropdown-menu>
                        <el-dropdown-item @click.native="logOut">登出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CommonHeader",
    data() {
        return {};
    },
    props: {
        activeIndex: String,
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
            if (key === '0') {
                this.$router.push('/MainPage')
            } else if (key === '1') {
                this.$router.push('/MetadataList');
            } else if (key === '2') {
                this.$router.push('/ApplyData');
            } else if (key === '3') {
                this.$router.push('/LocalStatisticalAnalysis');
            } else if (key === '4') {
                this.$router.push('/ApplyStatistics');
            } else if (key === '5') {
                this.$router.push('/DigitalObjectFerry');
            }
        },
    },
}
</script>

<style scoped>
</style>