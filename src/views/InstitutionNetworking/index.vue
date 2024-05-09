<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <div style="display: flex; align-items: center; justify-content: center; ">
                <el-button @click="addNetworking" type="primary" style="margin: 24px;">增加组网组</el-button>
            </div>

            <el-table :data="tableData" style="width: 95%;" stripe border >
                <el-table-column prop="institutionDoi" label="机构DOI" ></el-table-column>
                <el-table-column prop="institutionName" label="机构名字" ></el-table-column>
                <el-table-column prop="institutionAddress" label="机构IP地址" ></el-table-column>
                <el-table-column prop="institutionPort" label="机构端口" ></el-table-column>
                <el-table-column prop="institutionPublicKey" label="机构公钥" ></el-table-column>
                <el-table-column prop="institutionDesc" label="机构描述" ></el-table-column>
                <el-table-column prop="createTime" label="创建时间" ></el-table-column>
                <el-table-column prop="networkingGroupId" label="所属组网组编号" ></el-table-column>
                <el-table-column prop="networkingGroupName" label="所属组网组名字" ></el-table-column>
                <el-table-column prop="networkingStatus" label="机构组网状态" ></el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button @click="editNetworking(scope.row, scope.$index)" type="primary" size="small">修改</el-button>
                        <el-button @click="deleteNetworking(scope.row, scope.$index)" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="增加组网组" :visible.sync="addNetworkingDialogVisible" width="90%">
                <el-form :model="addNetworkingForm" label-width="auto" >
                    <el-form-item label="机构DOI" prop="institutionDoi">
                        <el-input v-model="addNetworkingForm.institutionDoi" placeholder="请输入机构DOI"></el-input>
                    </el-form-item>
                    <el-form-item label="机构名字" prop="institutionName">
                        <el-input v-model="addNetworkingForm.institutionName" placeholder="请输入机构名字"></el-input>
                    </el-form-item>
                    <el-form-item label="机构IP地址" prop="institutionAddress">
                        <el-input v-model="addNetworkingForm.institutionAddress" placeholder="请输入机构IP地址"></el-input>
                    </el-form-item>
                    <el-form-item label="机构端口" prop="institutionPort">
                        <el-input v-model="addNetworkingForm.institutionPort" placeholder="请输入机构端口"></el-input>
                    </el-form-item>
                    <el-form-item label="机构公钥" prop="institutionPublicKey">
                        <el-input v-model="addNetworkingForm.institutionPublicKey" placeholder="请输入机构公钥"></el-input>
                    </el-form-item>
                    <el-form-item label="机构描述" prop="institutionDesc">
                        <el-input v-model="addNetworkingForm.institutionDesc" placeholder="请输入机构描述"></el-input>
                    </el-form-item>
                    <el-form-item label="所属组网组编号" prop="networkingGroupId">
                        <el-input v-model="addNetworkingForm.networkingGroupId" placeholder="请输入所属组网组编号"></el-input>
                    </el-form-item>
                    <el-form-item label="所属组网组名字" prop="networkingGroupName">
                        <el-input v-model="addNetworkingForm.networkingGroupName" placeholder="请输入所属组网组名字"></el-input>
                    </el-form-item>
                    <el-form-item label="机构组网状态" prop="networkingStatus">
                        <el-input v-model="addNetworkingForm.networkingStatus" placeholder="请输入机构组网状态"></el-input>
                    </el-form-item>
                </el-form>
                <div style="display: flex; justify-content: center;">
                    <el-button @click="addNetworkingCancel">取消</el-button>
                    <el-button type="primary" @click="addNetworkingConfirm">确定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="修改组网组" :visible.sync="editNetworkingDialogVisible" width="90%" >
                <el-form :model="editNetworkingForm" label-width="auto">
                    <el-form-item label="机构DOI" prop="institutionDoi">
                        <el-input v-model="editNetworkingForm.institutionDoi" placeholder="请输入机构DOI"></el-input>
                    </el-form-item>
                    <el-form-item label="机构名字" prop="institutionName">
                        <el-input v-model="editNetworkingForm.institutionName" placeholder="请输入机构名字"></el-input>
                    </el-form-item>
                    <el-form-item label="机构IP地址" prop="institutionAddress">
                        <el-input v-model="editNetworkingForm.institutionAddress" placeholder="请输入机构IP地址"></el-input>
                    </el-form-item>
                    <el-form-item label="机构端口" prop="institutionPort">
                        <el-input v-model="editNetworkingForm.institutionPort" placeholder="请输入机构端口"></el-input>
                    </el-form-item>
                    <el-form-item label="机构公钥" prop="institutionPublicKey">
                        <el-input v-model="editNetworkingForm.institutionPublicKey" placeholder="请输入机构公钥"></el-input>
                    </el-form-item>
                    <el-form-item label="机构描述" prop="institutionDesc">
                        <el-input v-model="editNetworkingForm.institutionDesc" placeholder="请输入机构描述"></el-input>
                    </el-form-item>
                    <el-form-item label="所属组网组编号" prop="networkingGroupId">
                        <el-input v-model="editNetworkingForm.networkingGroupId" placeholder="请输入所属组网组编号"></el-input>
                    </el-form-item>
                    <el-form-item label="所属组网组名字" prop="networkingGroupName">
                        <el-input v-model="editNetworkingForm.networkingGroupName" placeholder="请输入所属组网组名字"></el-input>
                    </el-form-item>
                    <el-form-item label="机构组网状态" prop="networkingStatus">
                        <el-input v-model="editNetworkingForm.networkingStatus" placeholder="请输入机构组网状态"></el-input>
                    </el-form-item>
                </el-form>
                <div style="display: flex; justify-content: center;">
                    <el-button @click="editNetworkingCancel">取消</el-button>
                    <el-button type="primary" @click="editNetworkingConfirm">确定</el-button>
                </div>
            </el-dialog>
        </div> 
    </div>
</template>

<script>
export default {
    name: "InstitutionNetworking",
    data() {
        return {
            // 表格数据
            tableData: [
                {
                    // 机构DOI
                    institutionDoi: '10.1000/182',
                    // 机构名字
                    institutionName: '北京301医院',
                    // 机构IP地址
                    institutionAddress: '127.0.0.1',
                    // 机构端口
                    institutionPort: '8080',
                    // 机构公钥
                    institutionPublicKey: '123456',
                    // 机构描述
                    institutionDesc: '这是一个机构',
                    // 创建时间
                    createTime: new Date().toLocaleString(),
                    // 所属组网组编号
                    networkingGroupId: '1',
                    // 所属组网组名字
                    networkingGroupName: '组网组1',
                    // 机构组网状态
                    networkingStatus: '1',
                }
            ],

            // 增加数据
            addNetworkingForm: {
                // 机构DOI
                institutionDoi: '',
                // 机构名字
                institutionName: '',
                // 机构IP地址
                institutionAddress: '',
                // 机构端口
                institutionPort: '',
                // 机构公钥
                institutionPublicKey: '',
                // 机构描述
                institutionDesc: '',
                // 所属组网组编号
                networkingGroupId: '',
                // 所属组网组名字
                networkingGroupName: '',
                // 机构组网状态
                networkingStatus: '',
            },
            addNetworkingDialogVisible: false,

            // 修改数据
            editNetworkingForm: {
                // 机构DOI
                institutionDoi: '',
                // 机构名字
                institutionName: '',
                // 机构IP地址
                institutionAddress: '',
                // 机构端口
                institutionPort: '',
                // 机构公钥
                institutionPublicKey: '',
                // 机构描述
                institutionDesc: '',
                // 所属组网组编号
                networkingGroupId: '',
                // 所属组网组名字
                networkingGroupName: '',
                // 机构组网状态
                networkingStatus: '',
            },

            editNetworkingDialogVisible: false,
            editNetworkingId: '',

        };
    },
    mounted() {},
    methods: {
        // 增加组网组
        addNetworking() {
            this.addNetworkingDialogVisible = true;
            this.addNetworkingForm.institutionDoi = '';
            this.addNetworkingForm.institutionName = '';
            this.addNetworkingForm.institutionAddress = '';
            this.addNetworkingForm.institutionPort = '';
            this.addNetworkingForm.institutionPublicKey = '';
            this.addNetworkingForm.institutionDesc = '';
            this.addNetworkingForm.networkingGroupId = '';
            this.addNetworkingForm.networkingGroupName = '';
            this.addNetworkingForm.networkingStatus = '';
        },
        // 取消增加组网组
        addNetworkingCancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.addNetworkingDialogVisible = false;
            }).catch(() => {});
        },
        // 确定增加组网组
        addNetworkingConfirm() {
            this.addNetworkingDialogVisible = false;
            this.tableData.push({
                institutionDoi: this.addNetworkingForm.institutionDoi,
                institutionName: this.addNetworkingForm.institutionName,
                institutionAddress: this.addNetworkingForm.institutionAddress,
                institutionPort: this.addNetworkingForm.institutionPort,
                institutionPublicKey: this.addNetworkingForm.institutionPublicKey,
                institutionDesc: this.addNetworkingForm.institutionDesc,
                createTime: new Date().toLocaleString(),
                networkingGroupId: this.addNetworkingForm.networkingGroupId,
                networkingGroupName: this.addNetworkingForm.networkingGroupName,
                networkingStatus: this.addNetworkingForm.networkingStatus,
            });
        },
        // 修改组网组
        editNetworking(row, index) {
            this.editNetworkingForm.institutionDoi = row.institutionDoi;
            this.editNetworkingForm.institutionName = row.institutionName;
            this.editNetworkingForm.institutionAddress = row.institutionAddress;
            this.editNetworkingForm.institutionPort = row.institutionPort;
            this.editNetworkingForm.institutionPublicKey = row.institutionPublicKey;
            this.editNetworkingForm.institutionDesc = row.institutionDesc;
            this.editNetworkingForm.networkingGroupId = row.networkingGroupId;
            this.editNetworkingForm.networkingGroupName = row.networkingGroupName;
            this.editNetworkingForm.networkingStatus = row.networkingStatus;

            this.editNetworkingId = index;
            this.editNetworkingDialogVisible = true;
        },
        // 取消修改组网组
        editNetworkingCancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.editNetworkingDialogVisible = false;
            }).catch(() => {});
        },
        // 确定修改组网组
        editNetworkingConfirm() {
            this.tableData[this.editNetworkingId].institutionDoi = this.editNetworkingForm.institutionDoi;
            this.tableData[this.editNetworkingId].institutionName = this.editNetworkingForm.institutionName;
            this.tableData[this.editNetworkingId].institutionAddress = this.editNetworkingForm.institutionAddress;
            this.tableData[this.editNetworkingId].institutionPort = this.editNetworkingForm.institutionPort;
            this.tableData[this.editNetworkingId].institutionPublicKey = this.editNetworkingForm.institutionPublicKey;
            this.tableData[this.editNetworkingId].institutionDesc = this.editNetworkingForm.institutionDesc;
            this.tableData[this.editNetworkingId].networkingGroupId = this.editNetworkingForm.networkingGroupId;
            this.tableData[this.editNetworkingId].networkingGroupName = this.editNetworkingForm.networkingGroupName;
            this.tableData[this.editNetworkingId].networkingStatus = this.editNetworkingForm.networkingStatus;

            this.editNetworkingDialogVisible = false;
        },
        // 删除组网组
        deleteNetworking(row, id) {
            this.$confirm('此操作将永久删除该组网组, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.tableData.splice(id, 1);
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
    },
}
</script>

<style scoped>
</style>