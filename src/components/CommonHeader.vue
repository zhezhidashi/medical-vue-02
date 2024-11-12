<template>
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <div style="display: flex;">
            <img src="navigator.png" style="height: 36px; margin: 15px;" />
            <!-- <div style="font-size: 25px; line-height: 200%;">医学临床数据交换公网系统</div> -->
        </div>
        <div class="r-content" v-show="path !== '/Login'" style="display: flex">
            <el-dropdown style="display: flex; align-items: center;">
                <div class="el-dropdown-link" style="display: flex; flex-direction: row; align-items: center;">
                    <div style="display: flex; flex-direction: column; font-weight: bold; color:black">
                        <div>机构：{{ insName }} </div>
                        <div>用户：user </div>
                    </div>
                </div>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { getForm, postForm, getFormPublic, postFormPublic } from '@/api/data';
export default {
    name: "CommonHeader",
    data() {
        return {
            path: '',
            userType: '',
            username: '',

            userId: "",
            insName: "",
        }
    },
    mounted() {
        let _this = this;

        this.$store.commit('getUserid')
        this.userId = this.$store.state.user.userid
        console.log(this.userId)
        postFormPublic(`/institution/getInsNameByUserId?userId=${this.userId}`, {}, _this, function (res) {
            _this.insName = res.data
            _this.$store.commit("setInsName", _this.insName);

        })

        
    },
    watch: {
        $route(to, from) {
            this.path = to.path;
        }
    },
    methods: {
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