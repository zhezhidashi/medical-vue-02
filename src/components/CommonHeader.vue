<template>
    <div>
        <div style="display: flex; justify-content: space-between;">
            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                <el-submenu index="1">
                    <template slot="title">项目元数据列表</template>
                    <el-menu-item index="1-1">概览</el-menu-item>
                    <el-menu-item index="1-2">实体型</el-menu-item>
                    <el-menu-item index="1-3">指针型</el-menu-item>
                    <el-menu-item index="1-4">统计型</el-menu-item>
                </el-submenu>
                <el-menu-item index="2">申请数据</el-menu-item>
                <el-menu-item index="3">本地统计分析</el-menu-item>
                <el-menu-item index="5">申请统计数据</el-menu-item>
                <el-submenu index="5">
                    <template slot="title">审批页面</template>
                    <el-menu-item index="5-1">概览</el-menu-item>
                    <el-menu-item index="5-2">审批单页面-有网</el-menu-item>
                </el-submenu>
            </el-menu>
            <div class="r-content">
                <el-dropdown trigger="click" size="mini">
                    <span>
                        <img class="user" src="userImg.png" style="height: 55px;">
                    </span>
                    <el-dropdown-menu>
                        <el-dropdown-item @click.native="logOut">登出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        
        <div class="line"></div>
    </div>
</template>

<script>
export default {
    name: "MainPage",
    components: {},
    data() {
        return {
            activeIndex: '1-1',
        };
    },
    mounted() {},
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    },
}
</script>

<style scoped>
</style>