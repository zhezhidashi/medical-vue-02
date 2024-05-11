<template>
    <div style="display: flex;">
        <div style="display: flex; flex-direction: column; align-items: center; width: 100%;">
            <div style="text-align: center; font-size: 20px; margin: 24px;">选择导出的时间段</div>
            <div style="display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
                <el-date-picker v-model="dateValue" type="daterange" unlink-panels range-separator="至"
                    start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions">
                </el-date-picker>
                <el-button style="margin-left: 10px;" type="primary" @click="queryDigitalObject">查询</el-button>
            </div>

            <div style="margin-bottom: 24px; display: flex; justify-content: center;">
                <div style="display: flex; flex-direction: column; justify-content: center; width: 70vw; padding: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)">
                    <div v-for="(item, index) in digitalObjectList" :key="index">
                        <el-checkbox style="margin: 5px;" v-model="item.selected">{{ item.name }}</el-checkbox>
                    </div>
                </div>
            </div>


            <div style="text-align: center;">
                <el-button type="primary" @click="ferry">摆渡</el-button>
            </div>
        </div>

    </div>

</template>

<script>
export default {
    name: "MainPage",
    data() {
        return {
            dateValue: '',
            digitalObjectList: [
                {
                    name: '数字对象1',
                    selected: false,
                },
                {
                    name: '数字对象22',
                    selected: false,
                },
                {
                    name: '数字对象333',
                    selected: false,
                },
            ],
            pickerOptions: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
        };
    },
    mounted() { },
    methods: {
        queryDigitalObject() {
            console.log(this.dateValue);
        },
        ferry() {
            const selectedDigitalObject = this.digitalObjectList.filter(item => item.selected);
            console.log(selectedDigitalObject);
        },
    },
}
</script>

<style scoped></style>