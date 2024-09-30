<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <el-form :model="searchForm" label-width="auto" class="SearchForm">
                <el-form-item prop="userDoi" label="用户标识" class="SearchFormItem">
                    <el-input v-model="searchForm.userDoi"></el-input>
                </el-form-item>
                <el-form-item prop="email" label="用户" class="SearchFormItem">
                    <el-input v-model="searchForm.email"></el-input>
                </el-form-item>
                <el-form-item prop="operationDoi" label="操作标识" class="SearchFormItem">
                    <el-input v-model="searchForm.operationDoi"></el-input>
                </el-form-item>
                <el-form-item prop="url" label="网址" class="SearchFormItem">
                    <el-input v-model="searchForm.url"></el-input>
                </el-form-item>
                <el-form-item prop="page" label="操作页面" class="SearchFormItem">
                    <el-input v-model="searchForm.page"></el-input>
                </el-form-item>
                <el-form-item prop="region" label="操作区域" class="SearchFormItem">
                    <el-input v-model="searchForm.region"></el-input>
                </el-form-item>
                <el-form-item prop="hashValue" label="账号账本值" class="SearchFormItem">
                    <el-input v-model="searchForm.hashValue"></el-input>
                </el-form-item>
            </el-form>

            <el-button type="primary" @click="searchData">搜索</el-button>
            <el-divider></el-divider>

            <el-table :data="resultTable" stripe border style="width: 95%;">
                <el-table-column prop="time" label="时间"></el-table-column>
                <el-table-column prop="userDoi" label="用户标识"></el-table-column>
                <el-table-column prop="email" label="用户邮箱"></el-table-column>
                <el-table-column prop="operationDoi" label="操作标识"></el-table-column>
                <el-table-column prop="url" label="网址"></el-table-column>
                <el-table-column prop="page" label="操作页面"></el-table-column>
                <el-table-column prop="region" label="操作区域"></el-table-column>
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
import { postForm, postFormMock } from '@/api/data'
export default {
    name: "TraceSystem",
    data() {
        return {
            pages: 1,
            currentPage: 1,
            projectList: [],
            searchForm: {
                // 用户标识
                userDoi: "",
                // 用户
                email: "",
                // 操作标识
                operationDoi: "",
                // 网址
                url: "",
                // 操作页面
                page: "",
                // 操作区域
                region: "",
                // 账本哈希值
                hashValue: "",
                // 页码
                pageNo: 1,
            },

            resultTable: [],
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
        searchData() {
            if (this.searchForm.project === "") {
                this.$message.warning('请选择项目');
                return;
            }
            let postData = {
                // 用户标识
                userDoi: this.searchForm.userDoi,
                // 用户
                email: this.searchForm.email,
                // 操作标识
                operationDoi: this.searchForm.operationDoi,
                // 网址
                url: this.searchForm.url,
                // 操作页面
                page: this.searchForm.page,
                // 操作区域
                region: this.searchForm.region,
                // 账本哈希值
                hashValue: this.searchForm.hashValue,
            };
            
            this.getData(postData);
        },
        
        getData(postData) {
            this.resultTable = [];
            postData.pageSize = 10;
            postData.pageNo = this.currentPage;
            let _this = this;
            postFormMock('/trace/list', postData, _this, function(res){
                if(res.code === 200) {
                    _this.pages = res.data.pages;
                    for(let item of res.data.list) {
                        _this.resultTable.push({
                            time: item.time,
                            userDoi: item.userDoi,
                            email: item.email,
                            operationDoi: item.operationDoi,
                            url: item.url,
                            page: item.page,
                            region: item.region,
                            hashValue: item.hashValue
                        })
                    }
                }
            })
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