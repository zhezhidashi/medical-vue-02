<template>
    <div style="width: 160px;">
        <el-menu :default-active="activeIndex" class="el-menu-demo"  @select="handleSelect">
            <el-menu-item index="0">主页</el-menu-item>
            <el-menu-item v-show="isAdmin" index="1">组网</el-menu-item>
            <el-menu-item v-show="isAdmin" index="2">项目管理</el-menu-item>
            <el-menu-item v-show="isAdmin" index="3">账号管理</el-menu-item>
            <el-menu-item index="4">关系系统</el-menu-item>
            <el-menu-item index="5">数字对象申请</el-menu-item>
            <el-menu-item v-show="isAdmin" index="6">数字对象审批</el-menu-item>
            <el-menu-item index="7">数字对象检索</el-menu-item>
            <el-menu-item index="8">数字对象摆渡</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "CommonAside",
    data() {
        return {
            isAdmin: false,
        };
    },
    props: {
        activeIndex: String,
    },
    mounted() {
        this.isAdmin = this.$store.state.user.userType === 'admin';
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
            if (key === '0') {
                this.$router.push('/MainPage')
            } else if (key === '1') {
                this.$router.push('/Networking')
            } else if (key === '2') {
                this.$router.push('/ProjectManage')
            } else if (key === '3') {
                this.$router.push('/AccountManage')
            } else if (key === '4') {
                this.$router.push('/RelationshipSystem')
            } else if (key === '5') {
                this.$router.push('/DigitalObjectApply')
            } else if (key === '6') {
                this.$router.push('/DigitalObjectApproval')
            } else if (key === '7') {
                this.$router.push('/DigitalObjectSearch')
            } else if (key === '8') {
                this.$router.push('/DigitalObjectFerry')
            }
        },
    },
}
</script>

<style scoped>
</style>