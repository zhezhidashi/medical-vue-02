<template>
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex;">
            <img src="favicon.png" style="height: 50px; margin-right: 10px;" />
            <div style="font-size: 25px; line-height: 200%;">医学临床数据交换系统</div>
        </div>
        <div class="r-content" v-show="path !== '/Login'">
            <el-dropdown trigger="click" size="mini"  style="display: flex; align-items: center;">
                <el-avatar :size="50" src="userImg.png"></el-avatar>
                <el-dropdown-menu>
                    <el-dropdown-item @click.native="logOut">登出</el-dropdown-item>
                    <el-dropdown-item @click.native="goToUserCenter">用户中心</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    name: "CommonAside",
    data() {
        return {
            path: ''
        }  
    },
    props: {
        activeIndex: String,
    },
    mounted() {
        this.path = this.$router.currentRoute.path;
    },
    watch: {
        $route(to, from) {
            this.path = to.path;
        }
    },
    methods: {
        logOut() {
            this.$store.commit('clearToken');
            this.$store.commit('clearUsername');
            this.$store.commit('clearUserType');
            this.$router.push('/Login');
        },
        goToUserCenter() {
            this.$router.push('/UserCenter');
        }
    },
}
</script>

<style scoped>
</style>