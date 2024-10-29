<template>
    <div style="margin: 24px 40px 24px 40px;">
        <div style="margin-top: 24px;"></div>

        <el-descriptions title="组网详情" :column="1" border>
            <el-descriptions-item label="管理平台地址">{{ projectForm.name }}</el-descriptions-item>
            <el-descriptions-item label="机构名称"> 正大天晴 </el-descriptions-item>
            <el-descriptions-item label="机构标识">86.771.6049046735/ins.5f60449b-32b5-4042-9d2f-1c6ceae60050</el-descriptions-item>
            <el-descriptions-item label="统一社会信用代码">{{ projectForm.contactInfo }}</el-descriptions-item>
            <el-descriptions-item label="机构描述">{{ projectForm.description }}</el-descriptions-item>
            <el-descriptions-item label="组网状态">{{ projectForm.user }}</el-descriptions-item>
            <el-descriptions-item label="修改组网">
                <el-button type="primary" size="mini" @click="modifyNetwork">修改</el-button>
            </el-descriptions-item>
        </el-descriptions>


        <el-dialog title="修改组网" :visible.sync="modifyProjectDialogVisible" width="80%"
            :before-close="modifyProjectCancel">
            <el-form :model="modifyProjectItem" label-width="auto" align="left">
                <el-form-item label="* 管理平台地址">
                    <el-input v-model="modifyProjectItem.name"></el-input>
                </el-form-item>
                <el-form-item label="* 机构名称">
                    <el-input v-model="modifyProjectItem.user"></el-input>
                </el-form-item>
                <el-form-item label="统一社会信用代码">
                    <el-input v-model="modifyProjectItem.description"></el-input>
                </el-form-item>
                <el-form-item label="公钥">
                    <el-button type="primary">点击上传</el-button>
                </el-form-item>
                <el-form-item label="机构描述">
                    <el-input v-model="modifyProjectItem.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modifyProjectCancel">取 消</el-button>
                <el-button type="primary" @click="modifyProjectConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
import { postForm } from '@/api/data';
export default {
    name: "ProjectDetail",
    data() {
        return {
            // 项目列表
            projectForm: {
                // 项目名称
                name: "http://123.456.789.45:8080",
                // 项目标识
                projectDoi: "86.771.6049046735/pro.5f60449b-32b5-4042-9d2f-1c6ceae60050",
                // 所属机构名称
                user: "已组网",
                // 所属机构标识
                institutionDoi: "86.259.5868980074/ins.8b390aec-c794-44bb-b4b1-6aa37aedbb7c",
                // 项目联系方式
                contactInfo: "72158345436",
                // 项目描述
                description: "7b50c2e43ebf459996060ab50961f57c",
            },

            // 修改项目弹窗是否显示
            modifyProjectDialogVisible: false,
            // 修改项目的 index
            modifyProjectIndex: 0,
            // 项目item的拷贝
            modifyProjectItem: {
                name: "",
                user: "",
                contactInfo: "",
                contactEmail: "",
                description: "",
            },
        };
    },
    mounted() {
    },
    methods: {
        modifyNetwork() {
            this.modifyProjectDialogVisible = true;
        },
        modifyProjectCancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.modifyProjectDialogVisible = false;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },
        modifyProjectConfirm() {
            _this.modifyProjectDialogVisible = false;
        },
    },
}
</script>

<style>
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