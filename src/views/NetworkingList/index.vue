<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <el-form :model="searchForm" label-width="auto" class="SearchForm">
                <el-form-item label="组网组编号" class="SearchFormItem">
                    <el-input v-model="searchForm.gid"></el-input>
                </el-form-item>
                <el-form-item label="组网组状态" class="SearchFormItemSelect">
                    <el-select v-model="searchForm.status" placeholder="请选择">
                        <el-option label="正常" value="0"></el-option>
                        <el-option label="异常" value="1"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="组网组描述" class="SearchFormItem">
                    <el-input v-model="searchForm.description"></el-input>
                </el-form-item>
                <el-form-item label="组网组名字" class="SearchFormItem">
                    <el-input v-model="searchForm.publicRootName"></el-input>
                </el-form-item>
                <el-form-item label="组网组地址" class="SearchFormItem">
                    <el-input v-model="searchForm.publicRootAddress"></el-input>
                </el-form-item>
                <el-form-item label="组网组端口" class="SearchFormItem">
                    <el-input v-model="searchForm.publicRootPort"></el-input>
                </el-form-item>
                <el-form-item label="机构DOI" class="SearchFormItem">
                    <el-input v-model="searchForm.institutionDoi"></el-input>
                </el-form-item>
            </el-form>

            <el-button type="primary" @click="searchData">搜索</el-button>
            <el-divider></el-divider>

            <el-table :data="tableData" style="width: 95%;" stripe border >
                <el-table-column prop="institutionDoi" label="机构DOI" ></el-table-column>
                <el-table-column prop="institutionName" label="机构名字" ></el-table-column>
                <el-table-column prop="institutionAddress" label="机构IP地址" ></el-table-column>
                <el-table-column prop="institutionPort" label="机构端口" ></el-table-column>
                <el-table-column prop="institutionPublicKey" label="机构公钥" ></el-table-column>
                <el-table-column prop="institutionDesc" label="机构描述" min-width="200"></el-table-column>
                <el-table-column prop="createTime" label="创建时间" ></el-table-column>
                <el-table-column prop="updateTime" label="修改时间" ></el-table-column>
                <el-table-column prop="networkingStatus" label="机构组网状态" >
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.networkingStatus === 0" type="success">正常</el-tag>
                        <el-tag v-else-if="scope.row.networkingStatus === 1" type="danger">异常</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template slot-scope="scope">
                        <el-button @click="editNetworking(scope.row, scope.$index)" type="primary" size="small">修改</el-button>
                        <el-button @click="deleteNetworking(scope.row, scope.$index)" type="danger" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>

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
import { postForm } from '@/api/data';
export default {
    name: "NetworkingList",
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
                    // 修改时间
                    updateTime: new Date().toLocaleString(),
                    // 机构组网状态
                    networkingStatus: 0,
                }
            ],

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

            // 搜索表格
            searchForm: {
                // 组网组编号
                gid: '',
                // 组网组状态
                status: '',
                // 组网组描述
                description: '',
                // 组网组名字
                publicRootName: '',
                // 组网组地址
                publicRootAddress: '',
                // 组网组端口
                publicRootPort: '',
                // 机构DOI
                institutionDoi: '',
            },
        };
    },
    mounted() {
        this.getData({})
    },
    methods: {
        // 获取数据
        getData(postData) {
            this.tableData = [];
            let _this = this;
            postForm('/networkGroups/get', postData, _this, function(res){
                for(let item of res.data.records) {
                    _this.tableData.push({
                        gid: item.gid,
                        // 机构DOI
                    institutionDoi: item.institutionDoi,
                    // 机构名字
                    institutionName: item.publicRootName,
                    // 机构IP地址
                    institutionAddress: item.publicRootAddress,
                    // 机构端口
                    institutionPort: item.publicRootPort,
                    // 机构公钥
                    institutionPublicKey: item.publicRootKey,
                    // 机构描述
                    institutionDesc: item.description,
                    // 创建时间
                    createTime: new Date(item.createTime).toLocaleString(),
                    // 修改时间
                    updateTime: new Date(item.updateTime).toLocaleString(),
                    // 组网状态
                    networkingStatus: item.status,
                    })
                }
            })
        },

        searchData(){
            this.getData(this.searchForm)
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
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });
            });
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
.SearchForm {
    display: flex;
    flex-wrap: wrap;
    margin-top: 24px;
}
.SearchFormItem {
    margin: 0 24px 24px 24px;
}
.SearchFormItemSelect {
    margin: 0 24px 24px 24px;
    width: 260px;
}

</style>