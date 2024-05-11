<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <div style="display: flex; align-items: center; justify-content: center; ">
                <el-button @click="addNetworkingGroup" type="primary" style="margin: 24px;">增加组网组</el-button>
            </div>

            <el-table :data="tableData" style="width: 95%;" stripe border >
                <el-table-column prop="networkingGroupId" label="组网组编号" ></el-table-column>
                <el-table-column prop="networkingGroupName" label="组网组名字" ></el-table-column>
                <el-table-column prop="networkingAddress" label="组网组地址" ></el-table-column>
                <el-table-column prop="networkingPort" label="组网组端口" ></el-table-column>
                <el-table-column prop="networkingStatus" label="组网组状态" >
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.networkingStatus === '1'" type="success">正常</el-tag>
                        <el-tag v-else-if="scope.row.networkingStatus === '2'" type="danger">异常</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="networkingDesc" label="组网组描述" ></el-table-column>
                <el-table-column prop="createTime" label="创建时间" ></el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button type="primary" size="small" @click="editNetworkingGroup(scope.row, scope.$index)">编辑</el-button>
                        <el-button type="danger" size="small" @click="deleteNetworkingGroup(scope.row, scope.$index)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-dialog title="增加组网组" :visible.sync="addNetworkingGroupDialogVisible" width="90%">
                <el-form :model="addNetworkingGroupForm" label-width="auto" >
                    <el-form-item label="组网组名字">
                        <el-input v-model="addNetworkingGroupForm.networkingGroupName"></el-input>
                    </el-form-item>
                    <el-form-item label="组网组地址">
                        <el-input v-model="addNetworkingGroupForm.networkingAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="组网组端口">
                        <el-input v-model="addNetworkingGroupForm.networkingPort"></el-input>
                    </el-form-item>
                    <el-form-item label="组网组状态">
                        <el-select v-model="addNetworkingGroupForm.networkingStatus" placeholder="请选择">
                            <el-option label="正常" value="1"></el-option>
                            <el-option label="异常" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="组网组描述">
                        <el-input v-model="addNetworkingGroupForm.networkingDesc"></el-input>
                    </el-form-item>
                </el-form>
                <div style="display: flex; justify-content: center;">
                    <el-button @click="addNetworkingGroupCancel">取消</el-button>
                    <el-button type="primary" @click="addNetworkingGroupConfirm">确定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="修改组网组" :visible.sync="editNetworkingGroupDialogVisible" width="90%" >
                <el-form :model="editNetworkingGroupForm" label-width="auto">
                    <el-form-item label="组网组名字">
                        <el-input v-model="editNetworkingGroupForm.networkingGroupName"></el-input>
                    </el-form-item>
                    <el-form-item label="组网组地址">
                        <el-input v-model="editNetworkingGroupForm.networkingAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="组网组端口">
                        <el-input v-model="editNetworkingGroupForm.networkingPort"></el-input>
                    </el-form-item>
                    <el-form-item label="组网组状态">
                        <el-select v-model="editNetworkingGroupForm.networkingStatus" placeholder="请选择">
                            <el-option label="正常" value="1"></el-option>
                            <el-option label="异常" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="组网组描述">
                        <el-input v-model="editNetworkingGroupForm.networkingDesc"></el-input>
                    </el-form-item>
                </el-form>
                <div style="display: flex; justify-content: center;">
                    <el-button @click="editNetworkingGroupCancel">取消</el-button>
                    <el-button type="primary" @click="editNetworkingGroupConfirm">确定</el-button>
                </div>
            </el-dialog>
        </div> 
    </div>
</template>

<script>
export default {
    name: "NetworkingGroup",
    data() {
        return {
            // 表格数据
            tableData: [
                {
                    // 组网组编号
                    networkingGroupId: '1',
                    // 组网组名字
                    networkingGroupName: '组网组1',
                    // 组网组地址
                    networkingAddress: '127.0.0.1',
                    // 组网组端口
                    networkingPort: '8080',
                    // 组网组状态
                    networkingStatus: '1',
                    // 组网组描述
                    networkingDesc: '组网组1描述',
                    // 创建时间
                    createTime: '2021-01-01 00:00:00',
                }
            ],

            // 增加数据
            addNetworkingGroupForm: {
                // 组网组名字
                networkingGroupName: '',
                // 组网组地址
                networkingAddress: '',
                // 组网组端口
                networkingPort: '',
                // 组网组状态
                networkingStatus: '',
                // 组网组描述
                networkingDesc: '',
            },
            addNetworkingGroupDialogVisible: false,

            // 修改数据
            editNetworkingGroupForm: {
                // 组网组名字
                networkingGroupName: '',
                // 组网组地址
                networkingAddress: '',
                // 组网组端口
                networkingPort: '',
                // 组网组状态
                networkingStatus: '',
                // 组网组描述
                networkingDesc: '',
            },

            editNetworkingGroupDialogVisible: false,
            editNetworkingGroupId: '',

        };
    },
    mounted() {},
    methods: {
        addNetworkingGroup() {
            this.addNetworkingGroupDialogVisible = true;
            this.editNetworkingGroupForm.networkingGroupName = '';
            this.editNetworkingGroupForm.networkingAddress = '';
            this.editNetworkingGroupForm.networkingPort = '';
            this.editNetworkingGroupForm.networkingStatus = '';
            this.editNetworkingGroupForm.networkingDesc = '';
        },
        editNetworkingGroup(row, id) {
            this.editNetworkingGroupDialogVisible = true;
            this.editNetworkingGroupId = id;
            this.editNetworkingGroupForm.networkingGroupName = row.networkingGroupName;
            this.editNetworkingGroupForm.networkingAddress = row.networkingAddress;
            this.editNetworkingGroupForm.networkingPort = row.networkingPort;
            this.editNetworkingGroupForm.networkingStatus = row.networkingStatus;
            this.editNetworkingGroupForm.networkingDesc = row.networkingDesc;
        },
        deleteNetworkingGroup(row, id) {
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

        addNetworkingGroupCancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.addNetworkingGroupDialogVisible = false;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },

        addNetworkingGroupConfirm() {
            this.addNetworkingGroupDialogVisible = false;
            this.tableData.push({
                networkingGroupId: this.tableData.length + 1,
                networkingGroupName: this.addNetworkingGroupForm.networkingGroupName,
                networkingAddress: this.addNetworkingGroupForm.networkingAddress,
                networkingPort: this.addNetworkingGroupForm.networkingPort,
                networkingStatus: this.addNetworkingGroupForm.networkingStatus,
                networkingDesc: this.addNetworkingGroupForm.networkingDesc,
                createTime: new Date().toLocaleString(),
            });
            this.$message({
                message: '增加组网组成功',
                type: 'success'
            });
        },

        editNetworkingGroupCancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.editNetworkingGroupDialogVisible = false;
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
        },

        editNetworkingGroupConfirm() {
            this.editNetworkingGroupDialogVisible = false;
            this.tableData[this.editNetworkingGroupId].networkingGroupName = this.editNetworkingGroupForm.networkingGroupName;
            this.tableData[this.editNetworkingGroupId].networkingAddress = this.editNetworkingGroupForm.networkingAddress;
            this.tableData[this.editNetworkingGroupId].networkingPort = this.editNetworkingGroupForm.networkingPort;
            this.tableData[this.editNetworkingGroupId].networkingStatus = this.editNetworkingGroupForm.networkingStatus;
            this.tableData[this.editNetworkingGroupId].networkingDesc = this.editNetworkingGroupForm.networkingDesc;
            this.$message({
                message: '修改组网组成功',
                type: 'success'
            });
        },
    },
}
</script>

<style scoped>
</style>