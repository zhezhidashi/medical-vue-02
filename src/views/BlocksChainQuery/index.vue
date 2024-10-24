<template>
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin: 24px 40px 24px 40px;">
        <div style="font-size: 20px; font-weight: bold; line-height: 300%;">账户余额：{{ balance }}</div>
        <el-progress type="circle" :percentage="balancePercent"></el-progress>

        <!-- <el-card class="box-card" style="margin: 24px; width: 100%;">
            <div slot="header" class="clearfix">
                <span>智能合约权限访问控制表</span>
            </div>
            <div style="text-align: center; margin: 24px 40px 24px 40px;">
                <el-tree :data="tableData" :props="defaultProps"></el-tree>
            </div>
        </el-card> -->

        <div style="margin-top: 24px"></div>
        <el-table :data="blocks" stripe border style="width: 100%;">
            <el-table-column prop="number" label="区块编号"></el-table-column>
            <el-table-column prop="gasUsed" label="gas使用量"></el-table-column>
            <el-table-column prop="gasLimit" label="gas使用限制"></el-table-column>
            <el-table-column prop="minedOn" label="产生时间"></el-table-column>
            <el-table-column prop="hash" label="区块哈希值"></el-table-column>
            <el-table-column prop="createdContractAddress" label="创建合约地址"></el-table-column>
            <el-table-column label="操作" width="150" align="center">
                <template slot-scope="props">
                    <el-button @click="getTransaction(props.row, props.$index)" type="primary"
                        size="small">查看交易</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div style="margin: 24px">
            <el-pagination background layout="pager" :page-size="10" :page-count="pages" @current-change="clickPage">
            </el-pagination>
        </div>


        <el-dialog title="交易详情" :visible.sync="transactionDialogVisible" width="80%" :before-close="transactionCancel">
            <el-descriptions :column="1">
                <el-descriptions-item label="交易哈希值"> {{ transactionForm.txHash }}</el-descriptions-item>
                <el-descriptions-item label="账户地址"> {{ transactionForm.from }} </el-descriptions-item>
                <el-descriptions-item label="gas价格"> {{ transactionForm.gasPrice }} </el-descriptions-item>
                <el-descriptions-item label="交易内容"> {{ transactionForm.data }} </el-descriptions-item>
            </el-descriptions>
        </el-dialog>
    </div>
</template>

<script>
import { postForm, postFormMock, postFormGanache } from "@/api/data";
export default {
    name: "BlocksChainQuery",
    data() {
        return {
            pages: 0,
            currentPage: 1,
            pageSize: 10,

            // 账户数据
            balance: 0,
            balancePercent: 0,

            // 区块链数据
            blocks: [],
            transactionDialogVisible: false,
            transactionForm: {},

            // 权限控制数据
            tableData: [],
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    mounted() {
        this.getData();
        this.getPermissionControlData();
    },
    methods: {
        InsProSync() {

        },

        ProUserSync() {

        },

        getData() {
            let _this = this;
            postFormGanache('/getBalance', {}, _this, function (res) {
                _this.balance = res.data.balance;
                _this.balancePercent = Math.round(_this.balance / 10000000000000000000, 2);
                console.log("balance: ", _this.balance);
            })

            this.blocks = [];
            let param = {
                page: this.currentPage,
                size: this.pageSize,
            }
            postFormGanache('/getBlocks', param, _this, function (res) {
                for (let item of res.data.blocks) {
                    _this.blocks.push({
                        number: item.number,
                        gasUsed: item.gasUsed,
                        gasLimit: item.gasLimit,
                        minedOn: item.minedOn,
                        hash: item.hash,
                        createdContractAddress: item.createdContractAddress === null ? "非创建合约交易" : item.createdContractAddress,
                        transactions: item.transactions
                    })
                }
                _this.pages = res.data.pages;
                console.log("blocks: ", _this.blocks);
            })
        },

        getTransaction(row, index) {
            this.transactionForm = row.transactions[0];
            this.transactionDialogVisible = true;
        },

        transactionCancel() {
            this.transactionDialogVisible = false;
        },

        clickPage(page) {
            this.currentPage = page;
            this.getData();
        },

        // 获取权限控制数据
        getPermissionControlData() {
            let _this = this;
            // 机构-项目
            let projectsForm = {};
            // 项目-用户
            let usersForm = {};

            postFormGanache("/institution/getAllProjects", {}, _this, function (res) {
                projectsForm = res.data.allProjects;
                postFormGanache("/users/getAllUsers", {}, _this, function (res) {
                    usersForm = res.data.allUsers;
                    for (let key in projectsForm) {
                        let ins = {};
                        ins["label"] = "机构名：" + key;
                        ins["children"] = [];
                        for (let item1 of projectsForm[key]) {
                            let pro = {};
                            pro["label"] = "项目名：" + item1;
                            pro["children"] = [];
                            for (let item2 of usersForm[item1]) {
                                let user = {};
                                user["label"] = "用户名：" + item2;
                                pro["children"].push(user);
                            }
                            ins["children"].push(pro);
                        }
                        _this.tableData.push(ins);
                    }
                    console.log(_this.tableData)
                })
            })
        }
    }
}
</script>

<style></style>