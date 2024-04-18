<template>
    <el-container style="">
        <el-header style="height: 50px; margin: 8px;">
            <common-header></common-header>
        </el-header>
        <el-main style="padding: 0; margin: 0;">
            <router-view></router-view>
        </el-main>
        <!-- <el-footer :height="'5vh'"></el-footer> -->
    </el-container>
</template>


<script>
import CommonHeader from '@/components/CommonHeader.vue';
export default {
    name: "Main",
    components: {
        CommonHeader,
    },
    data() {
        return {};
    },
    methods: {},
};

</script>

<style scoped>
</style>
