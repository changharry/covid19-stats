<template>
    <v-container>
        <v-row class="text-center">
            <v-col cols="12">
                <v-card
                        class="mx-auto"
                        max-width=""
                        outlined
                        color="brown"
                >
                    <v-list-item three-line>
                        <v-list-item-content>
                            <v-list-item-title class="headline mb-1">{{$route.params.name}}</v-list-item-title>
                            <v-list-item-subtitle></v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card
                        class="mx-auto"
                        max-width=""
                        outlined
                        color="blue"
                >
                    <v-list-item three-line>
                        <v-list-item-content>
                            <v-list-item-title class="headline mb-1" v-if="region_loaded">
                                {{ r_itr()['confirmed'] }}
                                <span>({{ r_itr()['confirmed_change'] }})</span>
                                <span style="color: #ffa500" v-if="r_itr()['confirmed'] > 0">↑</span>
                            </v-list-item-title>
                            <v-list-item-subtitle>Total Confirmed</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card
                        class="mx-auto"
                        max-width=""
                        outlined
                        color="blue"
                >
                    <v-list-item three-line>
                        <v-list-item-content>
                            <v-list-item-title class="headline mb-1" v-if="region_loaded">
                                {{ r_itr()['deaths'] }}
                                <span>({{ r_itr()['deaths_change'] }})</span>
                                <span style="color: red" v-if="r_itr()['deaths'] > 0">↑</span>
                            </v-list-item-title>
                            <v-list-item-subtitle>Total Deaths</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-card
                        class="mx-auto"
                        max-width=""
                        outlined
                        color="blue"
                >
                    <v-list-item three-line>
                        <v-list-item-content>
                            <v-list-item-title class="headline mb-1" v-if="region_loaded">
                                {{ r_itr()['recovered']}}
                                <span>({{ r_itr()['recovered_change'] }})</span>
                                <span style="color: greenyellow" v-if="r_itr()['recovered'] > 0">↑</span>
                            </v-list-item-title>
                            <v-list-item-subtitle>Total Recovered</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card v-if=have_states()>
                    <v-card-title v-if="region_loaded">
                        National Trend ({{ global[0]['update_time']}})
                        <v-spacer></v-spacer>
                        <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                label="Search"
                                single-line
                                hide-details
                        ></v-text-field>
                    </v-card-title>
                    <v-data-table v-if=have_states()
                                  :headers="headers"
                                  :items="regional[$route.params.name]"
                                  :items-per-page="5"
                                  class="elevation-1"
                                  :search="search"
                    >
                        <template v-slot:item.country="{ item }">
                            <div @click="api_regional">{{ item.province }}</div>
                        </template>
                        <template v-slot:item.confirmed="{ item }">
                            {{ item.confirmed }}
                            <span>({{ item.confirmed_change }})</span>
                            <span style="color: orange" v-if="item.confirmed_change > 0">↑</span>
                        </template>
                        <template v-slot:item.deaths="{ item }">
                            {{ item.deaths }}
                            <span>({{ item.deaths_change }})</span>
                            <span style="color: red" v-if="item.deaths_change > 0">↑</span>
                        </template>
                        <template v-slot:item.recovered="{ item }">
                            {{ item.recovered}}
                            <span>({{ item.recovered_change }})</span>
                            <span style="color: green" v-if="item.recovered_change > 0">↑</span>
                        </template>
                    </v-data-table>
                </v-card>
                <div>
                    <region-daily/>
                    <region-change/>
                    <region-rate-of-change/>
                    <region-delta-rate-of-change/>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import axiosInstance from './axiosConfig'
    import RegionDeltaRateOfChange from "@/components/charts/region/regionDeltaChange";
    import RegionDaily from "@/components/charts/region/regionDaily";
    import RegionChange from "@/components/charts/region/regionChange";
    import RegionRateOfChange from "@/components/charts/region/regionRateOfChange";


    export default {
        name: "region",
        components: {RegionRateOfChange, RegionChange, RegionDaily, RegionDeltaRateOfChange},
        data: () => ({
            headers: [
                {
                    text: 'State / Province / Overseas Territories',
                    align: 'start',
                    sortable: false,
                    value: 'country',
                },
                { text: 'Confirmed', value: 'confirmed' },
                { text: 'Deaths', value: 'deaths' },
                { text: 'Recovered', value: 'recovered' },],
            regional: [],
            global: [],
            search: '',
            list_hs: ['Australia', 'Canada', 'China', 'Netherlands', 'United Kingdom', 'France', 'Denmark'],
            region_loaded: false,
        }),
        methods: {
            api_regional() {
                axiosInstance.get('/api/regional_stats').then(response => {
                    this.regional = response.data;
                }).catch(e => {
                    this.errors.push(e)
                })
            },
            have_states() {
                return this.list_hs.includes(this.$route.params.name)
            },
            api_global() {
                axiosInstance.get('/api/global').then(response => {
                    this.global = response.data;
                    this.region_loaded = true
                }).catch(e => {
                    this.errors.push(e)
                })
            },
            r_itr() {
                for (let i = 0; i < this.global.length; i++){
                    if (this.global[i]['country'] === this.$route.params.name){
                        return this.global[i]
                    }
                }
            }
        },
        mounted: function() {
            this.api_regional()
            this.api_global()
        }
    }
</script>

<style scoped>
    span {
        font-size: small;
    }
</style>
