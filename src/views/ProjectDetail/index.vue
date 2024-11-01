<template>
    <div style="margin: 24px 40px 24px 40px;">
        <div style="margin-top: 24px;"></div>

        <el-descriptions title="项目详情" :column="1" border style="">
            <el-descriptions-item label="项目名称">{{ projectForm.name }}</el-descriptions-item>
            <el-descriptions-item label="项目标识">{{ projectForm.projectDoi }}</el-descriptions-item>
            <el-descriptions-item label="项目负责人">{{ projectForm.contactInfo }}</el-descriptions-item>
            <el-descriptions-item label="联系方式">{{ projectForm.description }}</el-descriptions-item>
            <el-descriptions-item label="牵头机构">正大天晴</el-descriptions-item>
            <el-descriptions-item label="参与机构">{{ projectForm.user }}</el-descriptions-item>
            <el-descriptions-item label="品种">123</el-descriptions-item>
        </el-descriptions>
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
                name: "围术期抗栓药物管理临床路径研究",
                // 项目标识
                projectDoi: "86.771.6049046735/pro.5f60449b-32b5-4042-9d2f-1c6ceae60050",
                // 所属机构名称
                user: "中日友好医院",
                // 所属机构标识
                institutionDoi: "86.259.5868980074/ins.8b390aec-c794-44bb-b4b1-6aa37aedbb7c",
                // 项目联系方式
                contactInfo: "72158345436",
            }
        };
    },
    mounted() {
    },
    methods: {
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