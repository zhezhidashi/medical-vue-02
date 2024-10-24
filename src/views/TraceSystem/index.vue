<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <!-- <el-form :model="searchForm" label-width="auto" class="SearchForm">
                <el-form-item prop="system" label="选择系统：" class="SearchFormItem">
                    <el-select v-model="searchForm.system" placeholder="请选择">
                        <el-option v-for="item in systemOptions" :key="item.value" :label="item.label"
                            :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

            <el-button @click="getData" type="primary">搜索</el-button>
            <el-divider></el-divider> -->

            <div style="margin-top: 24px;"></div>
            <el-table :data="resultTable" stripe border style="width: 95%;">
                <el-table-column prop="createTime" label="时间"></el-table-column>
                <el-table-column prop="projectName" label="项目名称"></el-table-column>
                <el-table-column prop="projectDoi" label="项目标识"></el-table-column>
                <el-table-column prop="user" label="机构名称"></el-table-column>
                <el-table-column prop="userDoi" label="机构标识"></el-table-column>
                <el-table-column prop="operation" label="操作内容"></el-table-column>
                <el-table-column prop="operationDoi" label="操作标识"></el-table-column>
                <el-table-column prop="hashValue" label="账本哈希值"></el-table-column>
            </el-table>

            <div style="margin: 24px">
                <el-pagination background layout="pager" :page-size="10" :page-count="pages"
                    @current-change="clickPage">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { postForm } from '@/api/data'
export default {
    name: "TraceSystem",
    data() {
        return {
            pages: 1,
            currentPage: 1,
            ProjectsList: [],
            searchForm: {
                // 系统
                system: 3,
            },

            systemOptions: [
                {
                    label: "数据服务系统",
                    value: 1
                },
                {
                    label: "数据交换系统",
                    value: 2
                },
                {
                    label: "统计分析系统",
                    value: 3
                }
            ],

            resultTable: [
                {
                    // 时间
                    createTime: "2024",
                    // 项目名称
                    projectName: "围术期",
                    // 项目标识
                    projectDoi: "86.334.9807698985/pro.ae7465b8-35be-46e7-9fbe-b5979021de93",
                    // 机构名
                    user: "正大天晴",
                    // 机构标识
                    userDoi: "86.334.9807698985/user.ae7465b8-35be-46e7-9fbe-b5979021de93",
                    // 操作内容
                    operation: "数据流转",
                    // 操作标识
                    operationDoi: "86.228.0956386869/op.41bebd18-10b8-418b-b066-a7acd2a47356",
                    // 账本哈希值
                    hashValue: "8408631c62a85ea415fbc19f028f86094b9bf5bbfbe85c9a80310a854b380f28",
                }
            ],
        };
    },
    mounted() {
        let _this = this;
        this.getData({})
    },
    methods: {
        clickPage(page) {
            this.currentPage = page;
            this.searchForm.pageNo = this.currentPage;
            this.getData(this.searchForm);
        },

        getData(postData) {
            
        }
    },
}
</script>

<style scoped>
.TableItem {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.SearchForm {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
    margin-top: 24px;
}

.SearchFormItem {
    margin: 0 24px 24px 24px;
    width: 280px;
}

.SearchFormTimePicker {
    margin: 0 24px 24px 24px;
    width: 460px;
}
</style>