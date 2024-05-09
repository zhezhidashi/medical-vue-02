<template>
    <div style="display: flex;">
        <!-- <common-aside :activeIndex="'5'"></common-aside> -->

        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">

            <el-form :model="searchForm" label-width="auto" class="SearchForm">
                <el-form-item label="DOI" class="SearchFormItem">
                    <el-input v-model="searchForm.doi"></el-input>
                </el-form-item>
                <el-form-item label="数字对象名字" class="SearchFormItem">
                    <el-input v-model="searchForm.doiName"></el-input>
                </el-form-item>
                <el-form-item label="数字对象来源" class="SearchFormItem">
                    <el-input v-model="searchForm.doiSource"></el-input>
                </el-form-item>
                <el-form-item label="数字对象描述" class="SearchFormItem">
                    <el-input v-model="searchForm.doiDesc"></el-input>
                </el-form-item>
                <el-form-item label="申请类型" class="SearchFormItem">
                    <el-select v-model="searchForm.applyType" placeholder="请选择">
                        <el-option label="指针型" value="1"></el-option>
                        <el-option label="实体型" value="2"></el-option>
                        <el-option label="统计型" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="申请人邮箱" class="SearchFormItem">
                    <el-input v-model="searchForm.applyUserEmail"></el-input>
                </el-form-item>
                
                
                <el-form-item label="审批状态" class="SearchFormItem">
                    <el-select v-model="searchForm.approvalStatus" placeholder="请选择">
                        <el-option label="待审批" value="1"></el-option>
                        <el-option label="已通过" value="2"></el-option>
                        <el-option label="未通过" value="3"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审批意见" class="SearchFormItem">
                    <el-input v-model="searchForm.approvalOpinion"></el-input>
                </el-form-item>

                <el-form-item label="申请时间" class="SearchFormTimePicker">
                    <el-date-picker
                        v-model="searchForm.applyTimeRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>

                <el-form-item label="审批时间" class="SearchFormTimePicker">
                    <el-date-picker
                        v-model="searchForm.approvalTimeRange"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </el-form-item>
                
            </el-form>

            <el-button type="primary">搜索</el-button>

            <el-divider></el-divider>

            <div style="display: flex; align-items: center; justify-content: center;">
                <el-button @click="addApply" type="primary" style="margin-bottom: 24px;">增加申请</el-button>
            </div>

            <el-table :data="applyTable" style="width: 95%;" stripe border >
                <el-table-column prop="doi" label="待申请DOI"></el-table-column>
                <el-table-column prop="doiName" label="数字对象名字"></el-table-column>
                <el-table-column prop="doiSource" label="数字对象来源"></el-table-column>
                <el-table-column prop="doiDesc" label="数字对象描述"></el-table-column>
                <el-table-column prop="applyFile" label="申请审批文件"></el-table-column>
                <el-table-column prop="applyType" label="申请类型"></el-table-column>
                <el-table-column prop="applyTime" label="申请时间"></el-table-column>
                <el-table-column prop="applyUserEmail" label="申请人邮箱"></el-table-column>
                <el-table-column prop="approvalStatus" label="审批状态"></el-table-column>
                <el-table-column prop="approvalOpinion" label="审批意见"></el-table-column>
                <el-table-column prop="approvalTime" label="审批时间"></el-table-column>
            </el-table>

            <el-dialog title="增加申请" :visible.sync="addApplyDialogVisible" width="80%"
                :before-close="addApplyCancel">
                <el-form :model="applyForm" ref="applyForm" label-width="auto">

                    <el-form-item label="待申请DOI" prop="doi">
                        <el-input v-model="applyForm.doi"></el-input>
                    </el-form-item>

                    <el-form-item label="数字对象名字" prop="doiName">
                        <el-input v-model="applyForm.doiName"></el-input>
                    </el-form-item>

                    <el-form-item label="数字对象描述" prop="doiDesc">
                        <el-input v-model="applyForm.doiDesc"></el-input>
                    </el-form-item>

                    <el-form-item label="申请人邮箱" prop="applyUserEmail">
                        <el-input v-model="applyForm.applyUserEmail"></el-input>
                    </el-form-item>

                    <el-form-item label="申请审批文件" prop="applyFile">
                        <el-upload class="upload-demo" drag action="/api/posts/" :on-success="handleUploadSuccess">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        </el-upload>
                    </el-form-item>

                    <el-form-item label="申请类型" prop="applyType">
                        <el-radio-group v-model="applyForm.applyType">
                            <el-radio label="1">指针型</el-radio>
                            <el-radio label="2">实体型</el-radio>
                            <el-radio label="3">统计型</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="addApplyCancel">取 消</el-button>
                    <el-button type="primary" @click="addApplyConfirm">确 定</el-button>
                </span>
            </el-dialog>
        </div>

    </div>

</template>

<script>
import CommonAside from '@/components/CommonAside.vue';
export default {
    name: "DigitalObjectApply",
    components: {
        CommonAside,
    },
    data() {
        return {
            // 表格数据
            applyTable: [
                {
                    doi: '10.1000/182',
                    doiName: '数字对象1',
                    doiSource: '数据源1',
                    doiDesc: '描述1',
                    applyFile: '文件1',
                    applyType: '指针型',
                    applyTime: '2021-01-01',
                    applyUserEmail: '用户1',
                    approvalStatus: '待审批',
                    approvalOpinion: '无',
                    approvalTime: '2021-01-02',
                }
            ],

            // 表单数据
            applyForm: {
                // 待申请DOI
                doi: undefined,
                // 数字对象名字
                doiName: undefined,
                // 数字对象来源
                doiSource: undefined,
                // 数字对象描述
                doiDesc: undefined,
                // 申请审批文件
                applyFile: undefined,
                // 申请类型
                applyType: undefined,
                // 申请时间
                applyTime: undefined,
                // 申请人邮箱
                applyUserEmail: undefined,
                // 审批状态
                approvalStatus: undefined,
                // 审批意见
                approvalOpinion: undefined,
                // 审批时间
                approvalTime: undefined,
            },
            addApplyDialogVisible: false,

            searchForm : {
                // doi
                doi: undefined,
                // 数字对象名字
                doiName: undefined,
                // 数字对象来源
                doiSource: undefined,
                // 数字对象描述
                doiDesc: undefined,
                // 申请类型
                applyType: undefined,
                // 申请人邮箱
                applyUserEmail: undefined,
                // 审批状态
                approvalStatus: undefined,
                // 审批意见
                approvalOpinion: undefined,
                // 申请时间范围
                applyTimeRange: undefined,
                // 审批时间范围
                approvalTimeRange: undefined,
            },
        };
    },
    mounted() { },
    methods: {
        // 处理上传成功
        handleUploadSuccess(response, file, fileList) {
            console.log(response, file, fileList);
            this.applyForm.applyFile = response.id;
        },

        // 增加申请
        addApply() {
            this.addApplyDialogVisible = true;
        },

        // 取消增加申请
        addApplyCancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.addApplyDialogVisible = false;
            }).catch(() => {});
        },

        // 确定增加申请
        addApplyConfirm() {
            console.log(this.applyForm);
            this.addApplyDialogVisible = false;
            this.applyTable.push({
                dataItem: this.applyForm.dataItem,
                infoItem: this.applyForm.infoItem,
                doi: this.applyForm.doi,
                applyFile: this.applyForm.applyFile,
                applyType: this.applyForm.applyType,
            })
            this.$message({
                message: '增加申请成功',
                type: 'success'
            });
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