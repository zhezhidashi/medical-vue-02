<template>
	<el-container>
        <el-header style="height: 50px;">
            <common-header ></common-header>
        </el-header>
        <el-main>
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
