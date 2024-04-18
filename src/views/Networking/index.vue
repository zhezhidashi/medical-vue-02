<template>
    <div style="display: flex;">
        <common-aside :activeIndex="'1'"></common-aside>
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
        </div> 
    </div>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue';
export default {
    name: "Networking",
    components: {
        CommonAside,
    },
    data() {
        return {};
    },
    mounted() {},
    methods: {},
}
</script>

<style scoped>
</style>