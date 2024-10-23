<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <div style="margin: 24px;">根据数字对象标识导出加密后的动态私钥</div>
            <el-upload
                class="upload-demo"
                action="/api/doApplication/exportEncryptPrivateKey"
                :headers="{'Authorization': 'Bearer ' + $store.state.user.token}"
                :on-success="handleUploadSuccess"
                :show-file-list="false"
            >
                <el-button type="primary">点击上传数字对象标识列表</el-button>
            </el-upload>
            
        </div>
    </div>

</template>

<script>

export default {
    name: "PrivateKeyExport",
    data() {
        return {};
    },
    mounted() {},
    methods: {
        handleUploadSuccess(res, file, fileList) {
            console.log(res);
            // 将 res 写入 csv 文件
            const link = document.createElement('a');
            const blob = new Blob([res], { type: 'text/csv;charset=utf-8;' });
            link.href = URL.createObjectURL(blob);
            link.download = `encrypt-private-key-${new Date().getTime()}.csv`
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
       
    },
}
</script>

<style scoped></style>