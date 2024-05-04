<template>
    <el-container style="">
        <el-header style="height: 70px; padding: 10px; background-color: #ececec;">
            <common-header></common-header>
        </el-header>
        <el-container>
            <el-aside width="auto">
                <common-aside></common-aside>
            </el-aside>
            <el-main style="padding: 0; margin: 0;">
                <router-view></router-view>
            </el-main>
        </el-container>
        <!-- <el-footer :height="'5vh'"></el-footer> -->
    </el-container>
</template>


<script>
import CommonAside from "@/components/CommonAside.vue";
import CommonHeader from '@/components/CommonHeader.vue';
export default {
    name: "Main",
    components: {
        CommonAside,
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
