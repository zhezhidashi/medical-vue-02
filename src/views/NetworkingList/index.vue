<template>
	<div style="display: flex">
		<div
			style="
				display: flex;
				flex-direction: column;
				align-items: center;
				width: 100%;
			"
		>
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

			<el-table :data="tableData" style="width: 95%" stripe border>
				<el-table-column
					prop="institutionDoi"
					label="机构DOI"
				></el-table-column>
				<el-table-column
					prop="institutionName"
					label="机构名字"
				></el-table-column>
				<el-table-column
					prop="institutionAddress"
					label="机构IP地址"
				></el-table-column>
				<el-table-column
					prop="institutionPort"
					label="机构端口"
				></el-table-column>
				<!-- <el-table-column
					prop="institutionPublicKey"
					label="机构公钥"
				></el-table-column> -->
				<el-table-column
					prop="institutionDesc"
					label="机构描述"
					min-width="200"
				></el-table-column>
				<el-table-column
					prop="createTime"
					label="创建时间"
				></el-table-column>
				<el-table-column
					prop="updateTime"
					label="修改时间"
				></el-table-column>
				<el-table-column prop="networkingStatus" label="机构组网状态">
					<template slot-scope="scope">
						<el-tag
							v-if="scope.row.networkingStatus === 0"
							type="success"
							>正常</el-tag
						>
						<el-tag
							v-else-if="scope.row.networkingStatus === 1"
							type="danger"
							>异常</el-tag
						>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<el-button
							@click="modifyNetworking(scope.row, scope.$index)"
							type="primary"
							size="small"
							>修改</el-button
						>
						<!-- <el-button
							@click="deleteNetworking(scope.row, scope.$index)"
							type="danger"
							size="small"
							>删除</el-button
						> -->
					</template>
				</el-table-column>
			</el-table>

            <div style="margin: 24px">
                <el-pagination background layout="prev, pager, next" :page-size="10" :page-count="pages"
                    @prev-click="prevPage" @next-click="nextPage" @current-change="clickPage">
                </el-pagination>
            </div>

			<el-dialog
				title="修改组网组"
				:visible.sync="modifyNetworkingDialogVisible"
				width="90%"
			>
				<el-form :model="modifyNetworkingForm" label-width="auto">
					<el-form-item label="机构DOI" prop="institutionDoi">
						<el-input
							v-model="modifyNetworkingForm.institutionDoi"
							placeholder="请输入机构DOI"
						></el-input>
					</el-form-item>
					<el-form-item label="机构名字" prop="institutionName">
						<el-input
							v-model="modifyNetworkingForm.institutionName"
							placeholder="请输入机构名字"
						></el-input>
					</el-form-item>
					<el-form-item label="机构IP地址" prop="institutionAddress">
						<el-input
							v-model="modifyNetworkingForm.institutionAddress"
							placeholder="请输入机构IP地址"
						></el-input>
					</el-form-item>
					<el-form-item label="机构端口" prop="institutionPort">
						<el-input
							v-model="modifyNetworkingForm.institutionPort"
							placeholder="请输入机构端口"
						></el-input>
					</el-form-item>
					<el-form-item label="机构公钥" prop="institutionPublicKey">
                        {{ modifyNetworkingForm.institutionPublicKey }}
                        <el-upload
                            action="/api/doApplication/submitPublicKey"
                            :headers="{'Authorization': 'Bearer ' + $store.state.user.token}"
                            :show-file-list="false"
                            :on-success="importKey"
                            >
                                <el-button type="primary" style="margin: 24px;">导入公钥</el-button>
                            </el-upload>
                    </el-form-item>
					<el-form-item label="机构描述" prop="institutionDesc">
						<el-input
							v-model="modifyNetworkingForm.institutionDesc"
							placeholder="请输入机构描述"
						></el-input>
					</el-form-item>
					<el-form-item label="机构组网状态" prop="networkingStatus">
						<el-radio-group v-model="modifyNetworkingForm.networkingStatus">
                            <el-radio :label="0">正常</el-radio>
                            <el-radio :label="1">异常</el-radio>
                        </el-radio-group>
					</el-form-item>
				</el-form>
				<div style="display: flex; justify-content: center">
					<el-button @click="modifyNetworkingCancel">取消</el-button>
					<el-button type="primary" @click="modifyNetworkingConfirm"
						>确定</el-button
					>
				</div>
			</el-dialog>
		</div>
	</div>
</template>

<script>
import { postForm } from "@/api/data";
export default {
	name: "NetworkingList",
	data() {
		return {
            // 页数
            pages: 1,
            // 当前页数
            currentPage: 1,
			// 表格数据
			tableData: [
				{
					// 机构DOI
					institutionDoi: "10.1000/182",
					// 机构名字
					institutionName: "北京301医院",
					// 机构IP地址
					institutionAddress: "127.0.0.1",
					// 机构端口
					institutionPort: "8080",
					// 机构公钥
					institutionPublicKey: "123456",
					// 机构描述
					institutionDesc: "这是一个机构",
					// 创建时间
					createTime: new Date().toLocaleString(),
					// 修改时间
					updateTime: new Date().toLocaleString(),
					// 机构组网状态
					networkingStatus: 0,
				},
			],

			// 修改数据
			modifyNetworkingForm: {
				// 机构DOI
				institutionDoi: "",
				// 机构名字
				institutionName: "",
				// 机构IP地址
				institutionAddress: "",
				// 机构端口
				institutionPort: "",
				// 机构公钥
				institutionPublicKey: "",
				// 机构描述
				institutionDesc: "",
				// 机构组网状态
				networkingStatus: "",
			},

			modifyNetworkingDialogVisible: false,
			modifyNetworkingId: "",

			// 搜索表格
			searchForm: {
				// 组网组编号
				gid: "",
				// 组网组状态
				status: "",
				// 组网组描述
				description: "",
				// 组网组名字
				publicRootName: "",
				// 组网组地址
				publicRootAddress: "",
				// 组网组端口
				publicRootPort: "",
				// 机构DOI
				institutionDoi: "",
			},
		};
	},
	mounted() {
		this.getData({});
	},
	methods: {
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.getData({ page: this.currentPage });
            }
        },

        nextPage() {
            if (this.currentPage < this.pages) {
                this.currentPage++;
                this.searchForm.page = this.currentPage;
                this.getData(this.searchForm);
            }
        },

        clickPage(page) {
            this.currentPage = page;
            this.searchForm.page = this.currentPage;
            this.getData(this.searchForm);
        },
		// 获取数据
		getData(postData) {
			this.tableData = [];
			let _this = this;
			postForm("/networkGroups/get", postData, _this, function (res) {
                _this.pages = res.data.pages;
				for (let item of res.data.records) {
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
					});
				}
			});
		},

		searchData() {
			this.getData(this.searchForm);
		},

        importKey(response, file, fileList) {
            console.log(response);
            if(response.code === 200) {
                this.$message({
                    message: '导入公钥成功',
                    type: 'success'
                });
                this.modifyNetworkingForm.institutionPublicKey = response.data;
            }
            else {
                this.$message({
                    message: response.message,
                    type: 'error'
                });
            }
        },

		// 修改组网组
		modifyNetworking(row, index) {
			this.modifyNetworkingForm.institutionDoi = row.institutionDoi;
			this.modifyNetworkingForm.institutionName = row.institutionName;
			this.modifyNetworkingForm.institutionAddress = row.institutionAddress;
			this.modifyNetworkingForm.institutionPort = row.institutionPort;
			this.modifyNetworkingForm.institutionPublicKey =
				row.institutionPublicKey;
			this.modifyNetworkingForm.institutionDesc = row.institutionDesc;
	
			this.modifyNetworkingForm.networkingStatus = row.networkingStatus;

			this.modifyNetworkingId = index;
			this.modifyNetworkingDialogVisible = true;
		},
		// 取消修改组网组
		modifyNetworkingCancel() {
			this.$confirm(
				"不保存而直接关闭可能会丢失本次编辑的信息，是否继续?",
				"提示",
				{
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					type: "warning",
				}
			)
				.then(() => {
					this.modifyNetworkingDialogVisible = false;
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消",
					});
				});
		},
		// 确定修改组网组
		modifyNetworkingConfirm() {

            let postData = {
                gid: this.tableData[this.modifyNetworkingId].gid,
                institutionDoi: this.modifyNetworkingForm.institutionDoi,
                publicRootName: this.modifyNetworkingForm.institutionName,
                publicRootAddress: this.modifyNetworkingForm.institutionAddress,
                publicRootPort: this.modifyNetworkingForm.institutionPort,
                publicRootKey: this.modifyNetworkingForm.institutionPublicKey,
                description: this.modifyNetworkingForm.institutionDesc,
                status: this.modifyNetworkingForm.networkingStatus,
                publicRootKey: this.modifyNetworkingForm.institutionPublicKey,
            };

            let _this = this;
            postForm('/networkGroups/update', postData, _this, function(res){
                if (res.code === 200) {
                    _this.$message({
                        message: '修改成功',
                        type: 'success'
                    });
                    _this.modifyNetworkingDialogVisible = false;
                }
                else {
                    _this.$message({
                        message: res.message,
                        type: 'error'
                    });
                }
            })
            
			
		},
		// 删除组网组
		// deleteNetworking(row, id) {
		// 	this.$confirm("此操作将永久删除该组网组, 是否继续?", "提示", {
		// 		confirmButtonText: "确定",
		// 		cancelButtonText: "取消",
		// 		type: "warning",
		// 	})
		// 		.then(() => {
		// 			this.tableData.splice(id, 1);
		// 			this.$message({
		// 				type: "success",
		// 				message: "删除成功!",
		// 			});
		// 		})
		// 		.catch(() => {
		// 			this.$message({
		// 				type: "info",
		// 				message: "已取消删除",
		// 			});
		// 		});
		// },
	},
};
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