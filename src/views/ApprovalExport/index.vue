<template>
    <div style="text-align: center; margin: 24px 40px 24px 40px;">
        <el-collapse v-model="activeNames" @change="collapseChange">
            <el-collapse-item :title="collapseTitle" name="1">
                <el-form :model="searchForm" label-width="auto" class="SearchForm">
                    <el-form-item class="SearchFormItem" label="申请机构标识">
                        <el-input v-model="searchForm.applicantInstitutionDoi"></el-input>
                    </el-form-item>
                    <el-form-item class="SearchFormItem" label="申请人ID">
                        <el-input v-model="searchForm.applicantUserId"></el-input>
                    </el-form-item>
                    <el-form-item class="SearchFormItem" label="DOI">
                        <el-input v-model="searchForm.doi"></el-input>
                    </el-form-item>
                    <el-form-item class="SearchFormItem" label="申请类型">
                        <el-select v-model="searchForm.appType" placeholder="请选择" clearable>
                            <el-option label="实体型" value="1"></el-option>
                            <el-option label="指针型" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class="SearchFormItem" label="申请名称">
                        <el-input v-model="searchForm.appName"></el-input>
                    </el-form-item>
                    <el-form-item class="SearchFormItem" label="申请内容">
                        <el-input v-model="searchForm.appContent"></el-input>
                    </el-form-item>
                    <el-form-item class="SearchFormItem" label="申请文件">
                        <el-input v-model="searchForm.applyFile"></el-input>
                    </el-form-item>
                    <el-form-item class="SearchFormTimePicker" label="创建时间范围">
                        <el-date-picker v-model="searchForm.createTimeRange" value-format="timestamp"
                            type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                            align="right">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item class="SearchFormTimePicker" label="更新时间范围">
                        <el-date-picker v-model="searchForm.updateTimeRange" value-format="timestamp"
                            type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"
                            align="right">
                        </el-date-picker>
                    </el-form-item>
                </el-form>

                <el-button type="primary" @click="searchData">搜索</el-button>
            </el-collapse-item>
        </el-collapse>
        <div style="margin-top: 24px;"></div>

        <div style="margin-bottom: 24px; display: flex; justify-content: center;">
            <div style="display: flex; flex-direction: column; justify-content: center; width: 70vw; padding: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
                <div v-for="(item, index) in digitalObjectList" :key="index">
                    <el-checkbox style="margin: 5px;" v-model="item.selected">{{ item.name }}</el-checkbox>
                </div>
            </div>
        </div>
        <div style="text-align: center;">
            <el-button type="primary" @click="ferry">导出</el-button>
        </div>
    </div>

</template>

<script>
import { postForm, exportData } from '@/api/data';
export default {
    name: "ApprovalExport",
    data() {
        return {
            // 折叠
            activeNames: [],
            collapseTitle: "搜索栏（点击展开）",
            searchForm: {
                // 申请机构DOI
                applicantInstitutionDoi: undefined,
                // 申请人ID
                applicantUserId: undefined,
                // DOI
                doi: undefined,
                // 申请类型
                appType: undefined,
                // 申请名称
                appName: undefined,
                // 申请内容
                appContent: undefined,
                // 申请文件
                applyFile: undefined,
                // 创建时间范围
                createTimeRange: undefined,
                // 更新时间范围
                updateTimeRange: undefined,
                // 申请状态
                appStatus: 1,
            },

            digitalObjectList: [
                {
                    appId: 1,
                    name: '数字对象1',
                    selected: false,
                },
                {
                    appId: 2,
                    name: '数字对象22',
                    selected: false,
                },
                {
                    appId: 3,
                    name: '数字对象333',
                    selected: false,
                },
            ],
        };
    },
    mounted() {
        this.searchData();
    },
    methods: {

        collapseChange(activeNames) {
            if (activeNames.length === 0) {
                this.collapseTitle = "搜索栏（点击展开）";
            } else {
                this.collapseTitle = "搜索栏（点击收起）";
            }
        },

        searchData() {
            let postData = {
                applicantInstitutionDoi: this.searchForm.applicantInstitutionDoi,
                applicantUserId: this.searchForm.applicantUserId,
                doi: this.searchForm.doi,
                appType: this.searchForm.appType,
                appName: this.searchForm.appName,
                appContent: this.searchForm.appContent,
                applyFile: this.searchForm.applyFile,
                appStatus: this.searchForm.appStatus,
            }
            if (this.searchForm.createTimeRange && this.searchForm.createTimeRange.length > 1) {
                postData.createTimeBegin = this.searchForm.createTimeRange[0];
                postData.createTimeEnd = this.searchForm.createTimeRange[1] + 86399999;
            }
            if (this.searchForm.updateTimeRange && this.searchForm.updateTimeRange.length > 1) {
                postData.updateTimeBegin = this.searchForm.updateTimeRange[0];
                postData.updateTimeEnd = this.searchForm.updateTimeRange[1] + 86399999;
            }
            this.getData(postData);
        },

        getData(postData) {
            this.digitalObjectList = [];
            postData.pageSize = -1;
            let _this = this;
            postForm('/doApplication/getPassedList', postData, _this, function (res) {
                for (let item of res.data.records) {
                    _this.digitalObjectList.push({
                        appId: item.appId,
                        name: item.appName,
                        selected: false,
                    })
                }
            })
        },

        ferry() {
            const selectedDigitalObject = this.digitalObjectList.filter(item => item.selected);
            console.log(selectedDigitalObject);
            let postData = { idList: [] }
            for (let item of selectedDigitalObject) {
                postData.idList.push(item.appId);
            }

            if (postData.idList.length === 0) {
                this.$message.error('请选择要导出的数字对象');
                return;
            }

            let _this = this;
            exportData('/doApplication/exportApproveDoi', postData, _this, function (res) {
                // 将 res 写入 csv 文件
                const link = document.createElement('a');
                const blob = new Blob([res], { type: 'text/csv;charset=utf-8;' });
                link.href = URL.createObjectURL(blob);
                link.download = `approved-digital-object${new Date().getTime()}.csv`
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            })
        },
    },
}
</script>

<style>
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

.el-collapse-item__header {
    font-size: 16px;
    font-weight: 500;
    width: 100%;
    border: 0px;
}
</style>