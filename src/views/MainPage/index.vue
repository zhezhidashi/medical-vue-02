<template>
    <div>
        <common-header :activeIndex="'0'"></common-header>
        <div>
            <el-row class="home" :gutter="20">
                <el-col :span="20" style="margin-top: 20px">
                    <el-card shadow="hover">
                        <div class="user">
                            <img src="userImg.png" />
                            <div class="userinfo">
                                <p class="name">User</p>
                                <p class="access">普通用户</p>
                            </div>
                        </div>
                        <div class="login-info">
                            <p>上次登录的时间：<span>2024-1-1</span></p>
                            <p>上次登录的地点：<span>北京</span></p>
                        </div>
                    </el-card>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import CommonHeader from '@/components/CommonHeader.vue';
export default {
    name: "MainPage",
    components: {
        CommonHeader
    },
    data() {
        return {};
    },
    mounted() { },
    methods: {},
}
</script>

<style scoped></style>
