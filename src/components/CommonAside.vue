<template>
    <div style="width: 200px;" v-if="path !== '/Login' && path !== '/ProjectsListNormalUser'">
        <el-menu :default-active="activeIndex" class="el-menu-demo" @select="handleSelect" :unique-opened="false"
        text-color="#000000" active-text-color="#bd4747"
        background-color="rgb(246, 247, 249)">
            <el-menu-item v-show="isAdmin" index="0">主页</el-menu-item>
            <el-menu-item v-show="isAdmin" index="1">组网管理</el-menu-item>
            <el-menu-item v-show="isAdmin" index="2">账号管理</el-menu-item>
            <el-menu-item v-show="isAdmin" index="3">项目管理</el-menu-item>
            <el-submenu v-show="isAdmin" index="4">
                <template slot="title">数字对象管理</template>
                <el-menu-item index="4-1">数字对象分配</el-menu-item>
                <el-menu-item index="4-2">数字对象审批</el-menu-item>
            </el-submenu>

            <el-menu-item v-show="!isAdmin" index="5">返回参与项目列表</el-menu-item>
            <el-menu-item v-show="!isAdmin" index="6">项目详情</el-menu-item>
            <el-menu-item v-show="!isAdmin" index="7">数字对象检索</el-menu-item>
            <el-menu-item v-show="!isAdmin" index="8">数字对象列表</el-menu-item>

        </el-menu>
    </div>
</template>

<script>
export default {
    name: "CommonAside",
    data() {
        return {
            isAdmin: false,
            activeIndex: '0',
            path: '',
        };
    },
    mounted() {
        this.isAdmin = this.$store.state.user.userType === 'admin';
        this.path = this.$router.history.current.path;
        // 刷新的时候，更新左侧高亮的侧边栏选项
        this.updateActiveKey()
    },
    watch: {
        $route(to, from) {
            this.path = to.path;
            // 跳转的时候，更新左侧高亮的侧边栏选项
            this.updateActiveKey()
        },
        // 由于有 admin 和 user 的切换，为了切换时重新加载页面，所以监听 userType
        // 直接修改 activeIndex 没用，只能重新加载页面
        "$store.state.user.userType": {
            handler: function (oldVal, newVal) {
                if (newVal === '') {
                    window.location.reload();
                }
            },
            deep: true
        }
    },
    methods: {
        // 在刷新和跳转的时候，更新左侧高亮的侧边栏选项
        updateActiveKey() {
            if (this.path === '/Login') {
                this.activeIndex = '0';
            }
            else if (this.path === '/MainPage') {
                this.activeIndex = '0';
            }
            else if (this.path === '/NetworkManage') {
                this.activeIndex = '1';
            }
            else if (this.path === '/AccountManage') {
                this.activeIndex = '2'
            }
            else if (this.path === '/ProjectsList') {
                this.activeIndex = '3';
            }
            else if (this.path === '/DigitalObjectAllocate') {
                this.activeIndex = '4-1'
            }
            else if (this.path === '/DigitalObjectApproval') {
                this.activeIndex = '4-2'
            }
            else if (this.path === '/ProjectsListNormalUser') {
                this.activeIndex = '5'
            }
            else if (this.path === '/ProjectDetail') {
                this.activeIndex = '6'
            }
            else if (this.path === '/DigitalObjectSearch') {
                this.activeIndex = '7'
            }
            else if (this.path === '/DigitalObjectList') {
                this.activeIndex = '8'
            }
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
            if (key === '0') {
                if (this.isAdmin) {
                    this.$router.push('/MainPage')
                }
                else {
                    _this.$router.push({ path: "/ProjectsListNormalUser" })
                }
            }
            else if (key === '1') {
                this.$router.push('/NetworkManage')
            }
            else if (key === '2') {
                this.$router.push('/AccountManage')
            }
            else if (key === '3') {
                this.$router.push('/ProjectsList')
            }
            else if (key === '4-1') {
                this.$router.push('/DigitalObjectAllocate')
            }
            else if (key === '4-2') {
                this.$router.push('/DigitalObjectApproval')
            }
            else if (key === '5') {
                this.$router.push("/ProjectsListNormalUser")
            }
            else if (key === '6') {
                this.$router.push('/ProjectDetail')
            }
            else if (key === '7') {
                this.$router.push('/DigitalObjectSearch')
            }
            else if (key === '8') {
                this.$router.push('/DigitalObjectList')
            }
        },
    },
}
</script>

<style>
/* 侧边栏文字大小 */
.el-submenu__title, .el-menu-item, .el-submenu-item{
    font-size: 18px;
}
</style>