<template>
    <div>
        <common-header :activeIndex="'0'"></common-header>
        <div>
            <el-row class="home" :gutter="20">
                <el-col :span="8" style="margin-top: 20px">
                    <el-card shadow="hover">
                        <div class="user" style="text-align: center;">
                            <img src="userImg.png" />
                            <div class="userinfo">
                                <div style="font-size: 18px; line-height: 200%;">{{ user.username }}</div>
                                <div style="font-size: 18px; line-height: 200%;"> {{ user.userType }} </div>
                            </div>
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
        return {
            user: {
                username: '',
                userType: '',
            }
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
    },
    methods: {},
}
</script>

<style scoped></style>
