<template>
    <div style="text-align: center; margin: 24px 40px 24px 40px;">
        <div style="font-size: 20px; font-weight: bold; line-height: 300%;">账户余额：{{ balance }}</div>
        <el-progress type="circle" :percentage="balancePercent"></el-progress>
    </div>
</template>

<script>
import { postForm, postFormMock, postFormGanache } from "@/api/data";
export default {
    name: "AccountBlocksQuery",
    data() {
        return {
            pages: 0,
            currentPage: 1,
            pageSize: 10,
            balance: 0,
            balancePercent: 0,
            blocks: [],
        }
    },
    mounted() {
        this.getData();
    },
    methods: {
        getData() {
            let _this = this;
            postFormGanache('/getBalance', {}, _this, function(res){
                _this.balance = res.data.balance;
                _this.balancePercent = Math.round(_this.balance / 10000000000000000000, 2);
                console.log("balance: ", _this.balance);
            })

            let param = {
                page: this.currentPage,
                size: this.pageSize,
            }
            postFormGanache('/getBlocks', param, _this, function(res){
                _this.blocks = res.data.blocks;
                _this.pages = res.data.pages;
                console.log("blocks: ", _this.blocks);
            })
        },
    }
}
</script>

<style>
</style>