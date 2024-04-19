<template>
    <div style="display: flex;">
        <common-aside :activeIndex="'-1'"></common-aside>

        <div>修改密码</div>
    </div>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue';
export default {
    name: UserCenter,
    components: {
        CommonAside,
    },
    data() {
        return {

        }
    },
    methods: {

    }
}
</script>

<style scoped>
    
</style>