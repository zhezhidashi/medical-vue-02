<template>
    <el-container style="">
        <el-header style="height: 86px; padding: 10px;">
            <common-header></common-header>
        </el-header>
        <el-container>
            <el-aside width="auto" style="background-color: rgb(246, 247, 249); min-height: 100vh;">
                <common-aside></common-aside>
            </el-aside>
            <el-main style="padding: 0; margin: 0; background-color: rgb(246, 247, 249)">
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
