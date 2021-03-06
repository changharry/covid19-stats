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
                         <v-list-item-title class="headline mb-1">Global</v-list-item-title>
                         <v-list-item-subtitle>Update once a day between 00:00 to 06:00 UTC</v-list-item-subtitle>
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
                         <v-list-item-title class="headline mb-1">
                             {{ global_total["total_confirmed"] }}
                             <span>({{ global_total["total_confirmed_change"]}})</span>
                             <span style="color: #ffa500" v-if="global_total['total_confirmed'] > 0">↑</span>
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
                         <v-list-item-title class="headline mb-1">
                             {{ global_total["total_deaths"] }}
                             <span>({{ global_total["total_deaths_change"] }})</span>
                             <span style="color: red" v-if="global_total['total_deaths'] > 0">↑</span>
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
                         <v-list-item-title class="headline mb-1">
                             {{ global_total["total_recovered"] }}
                             <span>({{ global_total["total_recovered_change"] }})</span>
                             <span style="color: greenyellow" v-if="global_total['total_recovered'] > 0">↑</span>
                         </v-list-item-title>
                         <v-list-item-subtitle>Total Recovered</v-list-item-subtitle>
                     </v-list-item-content>
                 </v-list-item>
             </v-card>
         </v-col>
         <v-col cols="12">
             <v-card>
                 <v-card-title v-if="global_loaded">
                     Global Trend ({{ global[0]['update_time']}})
                     <v-spacer></v-spacer>
                     <v-text-field
                             v-model="search"
                             append-icon="mdi-magnify"
                             label="Search"
                             single-line
                             hide-details
                     ></v-text-field>
                 </v-card-title>
                 <v-data-table :headers="headers"
                               :items="global"
                               :items-per-page="5"
                               class="elevation-1"
                               :search="search"
                                >
                     <template v-slot:item.country="{ item }">
                         <router-link :to=get_route(item.country) >{{ item.country }}</router-link>
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
                 <total/>
                 <total-change/>
                 <total-rate-of-change/>
                 <total-delta-rate-of-change/>
             </div>
         </v-col>
     </v-row>
 </v-container>
</template>

<script>
    import axiosInstance from './axiosConfig';
    import TotalChange from "@/components/charts/total/totalChange";
    import Total from "@/components/charts/total/total";
    import TotalRateOfChange from "@/components/charts/total/totalRateOfChange";
    import TotalDeltaRateOfChange from "@/components/charts/total/totalDeltaRateOfChange";

    export default {
        name: "stats",
        components: {TotalDeltaRateOfChange, TotalRateOfChange, Total, TotalChange},
        data: () => ({
            headers: [
                {
                    text: 'Country',
                    align: 'start',
                    sortable: false,
                    value: 'country',
                },
                { text: 'Confirmed', value: 'confirmed' },
                { text: 'Deaths', value: 'deaths' },
                { text: 'Recovered', value: 'recovered' },],
            global: [],
            global_total: [],
            search: '',
            global_loaded: false,
        }),
        methods: {
            api_global() {
                axiosInstance.get('/api/global').then(response => {
                    this.global = response.data;
                    this.global_loaded= true
                }).catch(e => {
                    this.errors.push(e)
                })
            },
            api_global_total() {
                axiosInstance.get('/api/global_total').then(response => {
                    this.global_total = response.data;
                }).catch(e => {
                    this.errors.push(e)
                })
            },
            get_route(country) {
                return '/region/' + country
            }
        },
        mounted(){
            this.api_global_total()
            this.api_global()
        },
    }
</script>

<style scoped>
    span {
        font-size: small;
    }
</style>
