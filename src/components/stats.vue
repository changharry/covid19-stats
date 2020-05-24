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
                         <v-list-item-subtitle>testtesttest</v-list-item-subtitle>
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
<!--             <v-simple-table>-->
<!--                 <template v-slot:default>-->
<!--                     <thead>-->
<!--                     <tr>-->
<!--                         <th class="text-left">Country</th>-->
<!--                         <th class="text-left">Confirmed</th>-->
<!--                         <th class="text-left">Deaths</th>-->
<!--                         <th class="text-left">Recovered</th>-->
<!--                     </tr>-->
<!--                     </thead>-->
<!--                     <tbody>-->
<!--                     <tr v-for="record in global" :key="record.name">-->
<!--                         <td class="text-left">{{ record.country }}</td>-->
<!--                         <td class="text-left">-->
<!--                             {{ record.confirmed }}-->
<!--                             <span>({{ record.confirmed_change }})</span>-->
<!--                             <span style="color: yellow" v-if="record.confirmed_change > 0">↑</span>-->
<!--                         </td>-->
<!--                         <td class="text-left">-->
<!--                             {{ record.deaths }}-->
<!--                             <span>({{ record.deaths_change }})</span>-->
<!--                             <span style="color: red" v-if="record.deaths_change > 0">↑</span>-->
<!--                         </td>-->
<!--                         <td class="text-left">-->
<!--                             {{ record.recovered}}-->
<!--                             <span>({{ record.recovered_change }})</span>-->
<!--                             <span style="color: green" v-if="record.recovered_change > 0">↑</span>-->
<!--                         </td>-->
<!--                     </tr>-->
<!--                     </tbody>-->
<!--                 </template>-->
<!--             </v-simple-table>-->
             <v-card>
                 <v-card-title>
                     Global Trend
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
                         <div @click="api-regional">{{ item.country }}</div>
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
         </v-col>
     </v-row>
 </v-container>
</template>

<script>
    import axios from 'axios'
    // import { Bar } from 'vue-chartjs'

    export default {
        name: "stats",
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
            search: ''
        }),
        methods: {
            api_global() {
                axios.get('http://127.0.0.1:8000/api/global').then(response => {
                    this.global = response.data;
                }).catch(e => {
                    this.errors.push(e)
                })
            },
            api_global_total() {
                axios.get('http://127.0.0.1:8000/api/global_total').then(response => {
                    this.global_total = response.data;
                }).catch(e => {
                    this.errors.push(e)
                })
            }
        },
        created: function() {
            this.api_global()
            this.api_global_total()
        }
    }
</script>

<style scoped>
    span {
        font-size: small;
    }
</style>
