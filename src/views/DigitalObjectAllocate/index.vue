<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <div style="margin-top: 24px; display: flex; flex-direction: row; justify-content: center; align-items: center;">
                <div style="font-size: 14px; color: #606266; line-height: 40px;padding: 0 12px 0 0;">选择数字对象</div>
                <el-select v-model="doi" placeholder="请选择" >
                    <div v-for="(item, index) in doiList" :key = index>
                        <el-option :label="item.label" :value="item.value"></el-option>
                    </div>
                </el-select>
            </div>
            
            <el-divider></el-divider>
            <el-form :model="searchForm" label-width="auto" class="SearchForm">
                <el-form-item prop="projectName" label="项目名称" class="SearchFormItem">
                    <el-input v-model="searchForm.projectName" placeholder="项目名称"></el-input>
                </el-form-item>
                <el-form-item prop="projectLeader" label="项目负责人" class="SearchFormItem">
                    <el-input v-model="searchForm.projectLeader" placeholder="项目负责人"></el-input>
                </el-form-item>
                <el-form-item prop="projectContact" label="项目联系方式" class="SearchFormItem">
                    <el-input v-model="searchForm.projectContact" placeholder="项目联系方式"></el-input>
                </el-form-item>
                <el-form-item prop="projectDescription" label="项目描述" class="SearchFormItem">
                    <el-input v-model="searchForm.projectDescription" placeholder="项目描述"></el-input>
                </el-form-item>
                
                <el-form-item prop="projectApplyEmail" label="申请人邮箱" class="SearchFormItem">
                    <el-input v-model="searchForm.projectApplyEmail" placeholder="申请人邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="projectApprovalStatus" label="审批状态" class="SearchFormItem">
                    <el-select v-model="searchForm.projectApprovalStatus" placeholder="请选择">
                        <el-option label="待审批" value="0"></el-option>
                        <el-option label="已通过" value="1"></el-option>
                        <el-option label="未通过" value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item prop="projectApprovalOpinion" label="审批意见" class="SearchFormItem">
                    <el-input v-model="searchForm.projectApprovalOpinion" placeholder="审批意见"></el-input>
                </el-form-item>
                <el-form-item prop="projectApplyTimeRange" label="申请时间" class="SearchFormTimePicker">
                    <el-date-picker
                        value-format="timestamp"
                        v-model="searchForm.projectApplyTimeRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item prop="projectApprovalTimeRange" label="审批时间" class="SearchFormTimePicker">
                    <el-date-picker
                        value-format="timestamp"
                        v-model="searchForm.projectApprovalTimeRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
            </el-form>

            <el-button type="primary" @click="searchData">搜索</el-button>
            <el-divider></el-divider>

            <div style="margin-bottom: 24px; display: flex; justify-content: center;">
                <div style="display: flex; flex-direction: column; justify-content: center; width: 70vw; padding: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
                    <div v-for="(item, index) in projectList" :key="index">
                        <el-checkbox style="margin: 5px;" v-model="item.selected">{{ item.name }}</el-checkbox>
                    </div>
                </div>
            </div>
            
            <div style="text-align: center; margin-bottom: 24px;">
                <el-button type="primary" @click="allocate">分配</el-button>
            </div>

            
        </div>
        
    </div>
</template>

<script>
import { postForm } from '@/api/data';
export default {
    name: "DigitalObjectAllocate",
    data() {
        return {
            // DOI表单
            doi: "",

            doiList: [
                {
                    label: 'doi',
                    value: 'doi',
                }
            ],

            // 搜索表单
            searchForm: {
                // 项目名称
                projectName: "",
                // 项目负责人
                projectLeader: "",
                // 项目联系方式
                projectContact: "",
                // 项目描述
                projectDescription: "",
                // 申请时间范围
                projectApplyTimeRange: "",
                // 申请人邮箱
                projectApplyEmail: "",
                // 审批状态
                projectApprovalStatus: "",
                // 审批意见
                projectApprovalOpinion: "",
                // 审批时间范围
                projectApprovalTimeRange: "",
            },

            projectList: [
                {
                    projectDoi: 1,
                    name: '项目1',
                    selected: false,
                },
            ],

            
        };
    },
    mounted() { 
        // 获取项目信息
        this.getData({});

    },
    methods: {
        getData(postData){
            

            let _this = this;

            postForm('/registry/query', {pageSize: -1}, _this, function(res){
                _this.doiList = [];
                for(let item of res.data.records) {
                    _this.doiList.push({
                        value: item.doi,
                        label: item.name
                    });
                }
            })
            _this.projectList = [];
            postForm('/projectInfos/getProjectInfo', postData, _this, function(res){
                for(let item of res.data.records) {
                    _this.projectList.push({
                        projectDoi: item.doi,
                        name: item.name,
                        selected: false,
                    })
                }
            })
        },
        searchData(){
            let postData = {
                name: this.searchForm.projectName,
                user: this.searchForm.projectLeader,
                contactInfo: this.searchForm.projectContact,
                description: this.searchForm.projectDescription,
                contactEmail: this.searchForm.projectApplyEmail,
                status: this.searchForm.projectApprovalStatus,
                reviewComments: this.searchForm.projectApprovalOpinion,
                size: -1,
            }

            if(this.searchForm.projectApplyTimeRange && this.searchForm.projectApplyTimeRange !== "") {
                postData.createBeginTime = this.searchForm.projectApplyTimeRange[0];
                postData.createEndTime = this.searchForm.projectApplyTimeRange[1] + 86399999;
            }

            if(this.searchForm.projectApprovalTimeRange && this.searchForm.projectApprovalTimeRange !== "") {
                postData.updateBeginTime = this.searchForm.projectApprovalTimeRange[0];
                postData.updateEndTime = this.searchForm.projectApprovalTimeRange[1] + 86399999;
            }

            this.getData(postData);
        },

        allocate(){
            if (this.doi === "") {
                this.$message({
                    message: '请输入DOI',
                    type: 'warning'
                });
                return;
            }
            let postData = {
                doi: this.doi,
                projectDoiList: [],
            }
            for(let item of this.projectList) {
                if(item.selected) {
                    postData.projectDoiList.push(item.projectDoi);
                }
            }

            if(postData.projectDoiList.length === 0) {
                this.$message({
                    message: '请选择项目',
                    type: 'warning'
                });
                return;
            }
            let _this = this;
            postForm('/projectDo/allocateProject', postData, this, function(res){
                if (res.code === 200) {
                    _this.$message({
                        message: '分配成功',
                        type: 'success'
                    });
                }
            })
        },
        
    },
}
</script>

<style scoped>
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