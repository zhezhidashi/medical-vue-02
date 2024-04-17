<template>
    <div style="display: flex;">
        <common-aside :activeIndex="'0'"></common-aside>
        <div style="display: flex; flex-direction: column; align-items: center; background-color: aqua; width: 100%;">
        </div> 
    </div>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue';
export default {
    name: "MainPage",
    components: {
        CommonAside
    },
    data() {
        return {
            user: {
                username: '',
                userType: '',
            }
        };
    },
    mounted() {
        this.user.username = this.$store.state.user.username;
        const userType = this.$store.state.user.userType;
        if (userType === 'admin') {
            this.user.userType = '管理员';
        } else if (userType === 'user') {
            this.user.userType = '普通用户';
        }
    },
    methods: {},
}
</script>

<style scoped></style>
