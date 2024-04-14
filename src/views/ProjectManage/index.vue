<template>
    <div>
        <common-header :activeIndex="'2'"></common-header>

        <div style="display: flex; align-items: center; justify-content: center;">
            <el-button @click="addProject" type="primary" style="margin: 10px;">增加项目</el-button>
        </div>

        <el-table :data="projectTable" stripe border>
            <el-table-column prop="institutionDoi" label="项目所属机构"></el-table-column>
            <el-table-column prop="name" label="项目名称"></el-table-column>
            <el-table-column prop="remark" label="项目描述"></el-table-column>
            <el-table-column label="操作" min-width="120" align="center">
                <template slot-scope="props">
                    <el-button @click="changeProject(props.row, props.$index)" type="primary"
                        size="small">修改</el-button>
                    <el-button @click.native.prevent="deleteProject(props.$index)" type="danger" size="small">
                        删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="修改项目" :visible.sync="modifyProjectDialogVisible" width="80%" :before-close="modifyProjectCancel">
            <el-form :model="modifyProjectItem"  label-width="auto" class="demo-ruleForm">
                <el-form-item prop="institutionDoi" label="项目所属机构">
                    <el-input v-model="modifyProjectItem.institutionDoi"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="项目名称">
                    <el-input v-model="modifyProjectItem.name"></el-input>
                </el-form-item>
                <el-form-item prop="remark" label="项目描述">
                    <el-input v-model="modifyProjectItem.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="modifyProjectCancel">取 消</el-button>
                <el-button type="primary" @click="modifyProjectConfirm">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="增加项目" :visible.sync="addProjectDialogVisible" width="80%" :before-close="addProjectCancel">
            <el-form :model="addProjectItem"  label-width="auto" class="demo-ruleForm">
                <el-form-item prop="institutionDoi" label="项目所属机构">
                    <el-input v-model="addProjectItem.institutionDoi"></el-input>
                </el-form-item>
                <el-form-item prop="name" label="项目名称">
                    <el-input v-model="addProjectItem.name"></el-input>
                </el-form-item>
                <el-form-item prop="remark" label="项目描述">
                    <el-input v-model="addProjectItem.remark"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addProjectCancel">取 消</el-button>
                <el-button type="primary" @click="addProjectConfirm">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import CommonHeader from '@/components/CommonHeader.vue';
export default {
    name: "ProjectManage",
    components: {
        CommonHeader,
    },
    data() {
        return {
            // 项目列表
            projectTable: [
                {
                    pid: 3,
                    institutionDoi: "北京第二医院",
                    name: "项目3",
                    remark: "这是北京第二医院的项目3",
                },
                {
                    pid: 4,
                    institutionDoi: "北京第二医院",
                    name: "项目4",
                    remark: "这是北京第二医院的项目4",
                },
                {
                    pid: 5,
                    institutionDoi: "北京第二医院",
                    name: "项目5",
                    remark: "这是北京第二医院的项目5",
                },
            ],
            // 修改项目弹窗是否显示
            modifyProjectDialogVisible: false,
            // 修改项目的 index
            modifyProjectIndex: 0,
            // 项目item的拷贝
            modifyProjectItem: {
                pid: 0,
                institutionDoi: "",
                name: "",
                remark: "",
            },
            // 增加项目弹窗是否显示
            addProjectDialogVisible: false,
            // 项目item的拷贝
            addProjectItem: {
                pid: 0,
                institutionDoi: "",
                name: "",
                remark: "",
            },
        };
    },
    mounted() { },
    methods: {
        changeProject(row, index) {
            this.modifyProjectDialogVisible = true;
            this.modifyProjectIndex = index;
            this.modifyProjectItem = JSON.parse(JSON.stringify(row));
        },
        deleteProject(index) {
            let _this = this;
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.projectTable.splice(index, 1);
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        modifyProjectCancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.modifyProjectDialogVisible = false;
            }).catch(() => {});
        },
        modifyProjectConfirm() {
            console.log(this.modifyProjectItem, this.modifyProjectIndex);
            // 更新项目列表
            this.projectTable[this.modifyProjectIndex].institutionDoi = this.modifyProjectItem.institutionDoi;
            this.projectTable[this.modifyProjectIndex].name = this.modifyProjectItem.name;
            this.projectTable[this.modifyProjectIndex].remark = this.modifyProjectItem.remark;

            this.modifyProjectDialogVisible = false;
        },
        addProject() {
            this.addProjectDialogVisible = true;
        },
        addProjectCancel() {
            this.$confirm('不保存而直接关闭可能会丢失本次编辑的信息，是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.addProjectDialogVisible = false;
            }).catch(() => {});
        },
        addProjectConfirm() {
            console.log(this.addProjectItem);
            this.projectTable.push(JSON.parse(JSON.stringify(this.addProjectItem)));
            this.addProjectDialogVisible = false;
        },
    },
}
</script>

<style scoped></style>