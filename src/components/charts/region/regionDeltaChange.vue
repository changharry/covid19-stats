<template>
    <div class="container">
        <h1>New Cases Growth Rate (%)</h1>
        <line-chart
                v-if="loaded"
                :chartData="chartData"
                :options="options"
        />
    </div>
</template>

<script>
    import LineChart from '../LineChart'
    import axios from "@/components/axiosConfig";

    export default {
        name: 'RegionDeltaRateOfChange',
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
                await axios.get('/api/r_delta_rate_change/' + this.$route.params.name).then(response => {
                    this.chartData = {
                        'labels': response.data['label'],
                        'datasets': [{
                            label: 'Confirmed',
                            borderColor: 'orange',
                            data: response.data['c']
                        },
                            {
                                label: 'Deaths',
                                borderColor: 'red',
                                data: response.data['d']
                            },
                            {
                                label: 'Recovered',
                                borderColor: 'green',
                                data: response.data['r']
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
