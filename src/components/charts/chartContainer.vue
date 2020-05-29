<template>
    <div class="container">
        <line-chart
                v-if="loaded"
                :chartData="chartData"
                :options="options"
                />
    </div>
</template>

<script>
    import LineChart from './chart'
    import axios from "axios";

    export default {
        name: 'LineChartContainer',
        components: { LineChart },
        data: () => ({
            loaded: false,
            chartData: null,
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }),
        async mounted () {
            this.loaded = false
            try {
                // const { userlist } = await fetch('/api/userlist')
                await axios.get('http://127.0.0.1:8000/api/graph').then(response => {
                    this.chartData = {
                        'labels': response.data['label'],
                        'datasets': [{
                            label: 'Data One',
                            backgroundColor: '#f87979',
                            data: response.data['confirmed']
                        }]
                    }
                }).catch(e => {
                    this.errors.push(e)
                })
                this.loaded = true
                console.log(this.chartData)
            } catch (e) {
                console.error(e)
            }
        }
    }
</script>

<style scoped>

</style>
