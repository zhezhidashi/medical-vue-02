<template>
    <div style="width: 250px;" v-show="path !== '/Login'">
        <el-menu :default-active="activeIndex" class="el-menu-demo"  @select="handleSelect" :unique-opened="false">
            <el-menu-item index="0">主页</el-menu-item>
            <!-- <el-menu-item v-show="isAdmin" index="1">组网管理</el-menu-item> -->
            <el-submenu v-show="isAdmin" index="1">
                <template slot="title">组网管理</template>
                <el-menu-item index="1-1">申请管理</el-menu-item>
                <el-menu-item index="1-2">组网列表</el-menu-item>
            </el-submenu>
            <el-submenu v-show="isAdmin" index="2">
                <template slot="title">项目管理</template>
                <el-menu-item index="2-1">本机构牵头项目</el-menu-item>
                <el-menu-item index="2-2">本机构参与项目</el-menu-item>
            </el-submenu>
            <el-menu-item v-show="isAdmin" index="3">账号管理</el-menu-item>
            <el-menu-item v-show="!isAdmin" index="4">关系系统</el-menu-item>
            <el-menu-item v-show="!isAdmin" index="5">数字对象申请</el-menu-item>
            <el-menu-item v-show="isAdmin" index="6">数字对象审批</el-menu-item>
            <el-menu-item v-show="!isAdmin" index="7">数字对象检索</el-menu-item>
            <el-submenu v-show="!isAdmin" index="8">
                <template slot="title">数字对象摆渡</template>
                <el-menu-item index="8-1">数字对象导入</el-menu-item>
                <el-menu-item index="8-2">数字对象导出</el-menu-item>
            </el-submenu>
            <!-- <el-menu-item v-show="!isAdmin" index="8">数字对象摆渡</el-menu-item> -->
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "CommonAside",
    data() {
        return {
            isAdmin: false,
            activeIndex: '0',
            path: '',
        };
    },
    mounted() {
        this.isAdmin = this.$store.state.user.userType === 'admin';
        this.path = this.$router.currentRoute.path;
        if(this.path === '/Login') {
            this.activeIndex = '0';
        }
        else if(this.path === '/MainPage') {
            this.activeIndex = '0';
        }
        else if (this.path === '/NetworkingApply') {
            this.activeIndex = '1-1';
        }
        else if (this.path === '/NetworkingList') {
            this.activeIndex = '1-2';
        }
        else if (this.path === '/LeadingProjects') {
            this.activeIndex = '2-1';
        }
        else if (this.path === '/ParticipatingProjects') {
            this.activeIndex = '2-2';
        }
        else if (this.path === '/AccountManage') {
            this.activeIndex = '3';
        }
        else if (this.path === '/RelationshipSystem') {
            this.activeIndex = '4';
        }
        else if (this.path === '/DigitalObjectApply') {
            this.activeIndex = '5';
        }
        else if (this.path === '/DigitalObjectApproval') {
            this.activeIndex = '6';
        }
        else if (this.path === '/DigitalObjectSearch') {
            this.activeIndex = '7';
        }
        else if (this.path === 'DigitalObjectImport') {
            this.activeIndex = '8-1'
        }
        else if (this.path === '/DigitalObjectExport') {
            this.activeIndex = '8-2';
        }
    },
    watch: {
        $route(to, from) {
            this.path = to.path;
            console.log(this);
        },
        // 由于有 admin 和 user 的切换，为了切换时重新加载页面，所以监听 userType
        // 直接修改 activeIndex 没用，只能重新加载页面
        "$store.state.user.userType": {
            handler:function(oldVal, newVal) {
                if(newVal === '') {
                    window.location.reload();
                }
            },
            deep:true
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
            if (key === '0') {
                this.$router.push('/MainPage')
            } 
            else if (key === '1-1') {
                this.$router.push('/NetworkingApply')
            } 
            else if (key === '1-2') {
                this.$router.push('/NetworkingList')
            } else if (key === '2-1') {
                this.$router.push('/LeadingProjects')
            } else if(key === '2-2') {
                this.$router.push('/ParticipatingProjects')
            } else if (key === '3') {
                this.$router.push('/AccountManage')
            } else if (key === '4') {
                this.$router.push('/RelationshipSystem')
            } else if (key === '5') {
                this.$router.push('/DigitalObjectApply')
            } else if (key === '6') {
                this.$router.push('/DigitalObjectApproval')
            } else if (key === '7') {
                this.$router.push('/DigitalObjectSearch')
            } else if (key === '8-1') {
                this.$router.push('/DigitalObjectImport')
            } else if (key === '8-2') {
                this.$router.push('/DigitalObjectExport')
            }
        },
    },
}
</script>

<style scoped>
</style>