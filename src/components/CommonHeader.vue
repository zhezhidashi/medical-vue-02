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

        this.delay(500).then(() => {
            _this.$store.commit('getUserid')
            _this.userId = _this.$store.state.user.userid
            console.log(_this.userId)
            postFormPublic(`/institution/getInsNameByUserId?userId=${_this.userId}`, {}, _this, function (res) {
                _this.insName = res.data
                _this.$store.commit("setInsName", _this.insName);

            })
        });

    },
    watch: {
        $route(to, from) {
            this.path = to.path;
        }
    },
    methods: {
        // 定义一个返回Promise的延时函数
        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
    },
}
</script>

<style>
.el-dropdown-link {
    cursor: pointer;
}

.el-icon-arrow-down {
    font-size: 12px;
}

.el-button--primary {
    background-color: #bd4747;
    border-color: #bd4747;
}
.el-button--primary:focus {
    background-color: #bd4747;
    border-color: #bd4747;
}

.el-button--primary:hover {
    background-color: #bd4747;
    border-color: #bd4747;
}

.el-pagination.is-background .el-pager li:not(.disabled).active{
    background-color: #bd4747;
    border-color: #bd4747;
}
</style>