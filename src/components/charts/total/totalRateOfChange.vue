<template>
    <div class="container">
        <h1>Rate of Change (%)</h1>
        <line-chart
                v-if="loaded"
                :chartData="chartData"
                :options="options"
        />
    </div>
</template>

<script>
    import LineChart from './LineChart'
    import axios from "axios";

    export default {
        name: 'totalRateOfChange',
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
                await axios.get('http://127.0.0.1:8000/api/g_total_rate_change').then(response => {
                    this.chartData = {
                        'labels': response.data['label'],
                        'datasets': [{
                            label: 'Confirmed',
                            borderColor: 'orange',
                            data: response.data['confirmed']
                        },
                            {
                                label: 'Deaths',
                                borderColor: 'red',
                                data: response.data['deaths']
                            },
                            {
                                label: 'Recovered',
                                borderColor: 'green',
                                data: response.data['recovered']
                            }]
                    }
                }).catch(e => {
                    this.errors.push(e)
                })
                this.loaded = true
            } catch (e) {
                console.error(e)
            }
        }
    }
</script>

<style scoped>

</style>
