<template>
    <div style="width: 200px;">
        <el-menu :default-active="activeIndex" class="el-menu-demo" 
            @select="handleSelect" :unique-opened="false"
            text-color="#000000" active-text-color="#bd4747"
            background-color="rgb(246, 247, 249)">
            <el-menu-item index="1" style="font-size: 18px;">项目详情</el-menu-item>
            <el-menu-item index="2" style="font-size: 18px;">数字对象封装</el-menu-item>
            <el-menu-item index="3" style="font-size: 18px;">数字对象检索</el-menu-item>
            <el-menu-item index="4" style="font-size: 18px;">数字对象审批</el-menu-item>
            <el-menu-item index="5" style="font-size: 18px;">数字对象列表</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: "CommonAside",
    data() {
        return {
            isAdmin: false,
            activeIndex: '1',
            path: '',
        };
    },
    mounted() {
        this.isAdmin = this.$store.state.user.userType === 'admin';
        this.path = this.$router.history.current.path;
        if (this.path === '/Login') {
            this.activeIndex = '1';
        }
        else if (this.path === '/ProjectDetail') {
            this.activeIndex = '1'
        }
        else if (this.path === '/DigitalObjectSearch') {
            this.activeIndex = '3'
        }
        else if (this.path === '/DigitalObjectApproval') {
            this.activeIndex = '4'
        }
        else if (this.path === '/DigitalObjectList') {
            this.activeIndex = '5'
        }
        
    },
    watch: {
        $route(to, from) {
            this.path = to.path;
        },
        // 由于有 admin 和 user 的切换，为了切换时重新加载页面，所以监听 userType
        // 直接修改 activeIndex 没用，只能重新加载页面
        "$store.state.user.userType": {
            handler: function (oldVal, newVal) {
                if (newVal === '') {
                    // window.location.reload();
                }
            },
            deep: true
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
            if (key === '1') {
                this.$router.push('/ProjectDetail')
            }
            else if (key === '2') {
                this.$store.commit('getInsName')
                let insName = this.$store.state.user.insName
                this.$store.commit('getUserid');
                let userid = this.$store.state.user.userid
                if (userid === "85998b3446f4479bb1528171fbd36cd0") {
                    window.open("http://8.130.160.66:8086/Login?insName=" + insName, "_self")
                }
                else {
                    window.open("http://8.130.160.66:8085/Login?insName=" + insName, "_self")
                }
                
            }
            else if (key === '3') {
                this.$router.push('/DigitalObjectSearch')
            }
            else if (key === '4') {
                this.$router.push('/DigitalObjectApproval')
            }
            else if (key === '5') {
                this.$store.commit('getUserid');
                let userid = this.$store.state.user.userid
                if (userid === "85998b3446f4479bb1528171fbd36cd0") {
                    this.$router.push('/DigitalObjectOwn')
                } else {
                    this.$router.push('/DigitalObjectList')
                }
            }
        },
    },
}
</script>

<style scoped></style>