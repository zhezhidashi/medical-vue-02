<template>
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex;">
            <img src="favicon.png" style="height: 50px; margin-right: 10px;" />
            <div style="font-size: 25px; line-height: 200%;">医学临床数据交换公网系统</div>
        </div>
        <div class="r-content" v-show="path !== '/Login'" style="display: flex">
            <el-button @click="goToIn" size="mini" type="primary" style="margin-right: 20px;">内网</el-button>
            <el-dropdown style="display: flex; align-items: center;">
                <div class="el-dropdown-link" style="display: flex; flex-direction: row; align-items: center;">
                    <div style="display: flex; flex-direction: column; font-weight: bold;">
                        <div>机构：{{ insName }} </div>
                        <div>用户：user</div>
                    </div>

                </div>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { getForm, postForm } from '@/api/data';
export default {
    name: "CommonHeader",
    data() {
        return {
            path: '',
            userInfoForm: {
                username: '',
                newPassword: '',
                confirmPassword: '',
                email: '',
            },
            modifyPasswordDialogVisible: false,
            userType: '',
            username: '',

            institutionInfo: {
                name: "",
            },
            // insName for exhibition
            insName: "",
        }
    },
    mounted() {
        let _this = this;   

        this.$store.commit('getProid');
        let proid = this.$store.state.user.proid;

        console.log("&&&", proid)
        if(proid == "7b50c2e43ebf459996060ab50961f57c") this.insName = "中日友好医院"
        else this.insName = "正大天晴"

    },
    watch: {
        $route(to, from) {
            this.path = to.path;
        }
    },
    methods: {
        goToIn() {
            window.open("http://8.130.160.66:8085/")
        }
    },
}
</script>

<style scoped>
.el-dropdown-link {
    cursor: pointer;
}

.el-icon-arrow-down {
    font-size: 12px;
}
</style>