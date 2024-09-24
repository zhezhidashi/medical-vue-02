<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <el-upload
                class="upload-demo"
                action="/api/registry/batchImportMetadata"
                :headers="{'Authorization': 'Bearer ' + $store.state.user.token}"
                :on-success="handleUploadSuccess"
                :show-file-list="false"
                style="margin-top: 24px;"
            >
                <el-button type="primary">点击上传</el-button>
            </el-upload>
            
            <el-divider></el-divider>

            <el-table :data="tableData" stripe border style="width: 95%;">
                <el-table-column prop="doi" label="数字对象标识" width="180"></el-table-column>
                <el-table-column prop="name" label="数字对象名称" width="180"></el-table-column>
                <el-table-column prop="institutionDoi" label="机构DOI" width="180"></el-table-column>
                <el-table-column prop="institutionName" label="机构名字" width="180"></el-table-column>
                <el-table-column prop="description" label="数字对象描述" width="180"></el-table-column>
                <el-table-column prop="type" label="数字对象类型" width="180"></el-table-column>
                <el-table-column prop="status" label="数字对象状态" width="180">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.status === 1" type="success">正常</el-tag>
                        <el-tag v-else type="danger">异常</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="source" label="数字对象来源" width="180"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="180"></el-table-column>
                <el-table-column prop="updateTime" label="修改时间" width="180"></el-table-column>
            </el-table>
        </div>


    </div>

</template>

<script>

export default {
    name: "MetadataImport",
    data() {
        return {
            uploadFile: "",
            uploadLoading: false,
            tableData: [
                // {
                //     // DOI
                //     doi: "",
                //     // 数字对象名称
                //     name: "",
                //     // 机构DOI
                //     institutionDoi: "",
                //     // 机构名字
                //     institutionName: "",
                //     // 数字对象描述
                //     description: "",
                //     // 数字对象类型
                //     type: "",
                //     // 数字对象状态
                //     status: "",
                //     // 数字对象来源
                //     source: "",
                //     // 创建时间
                //     createTime: "",
                //     // 修改时间
                //     updateTime: "",
                // }
            ],

        };
    },
    mounted() { },
    methods: {
        handleUploadSuccess(response, file, fileList) {
            console.log(response);
            this.tableData = []
            if(response.code === 200) {
                this.$message({
                    message: '上传成功',
                    type: 'success'
                });
                for(let item of response.data) {
                    this.tableData.push({
                        doi: item.doi,
                        name: item.name,
                        institutionDoi: item.institutionDoi,
                        institutionName: item.institutionName,
                        description: item.description,
                        type: item.type,
                        status: item.status,
                        source: item.source,
                        createTime: new Date(item.createTime).toLocaleDateString(),
                        updateTime: new Date(item.updateTime).toLocaleDateString(),
                    })
                }
            } else {
                this.$message({
                    message: response.message,
                    type: 'error'
                });
            }
        },

       
    },
}
</script>

<style scoped></style>