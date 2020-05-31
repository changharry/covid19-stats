<template>
    <v-app id="inspire">
        <v-navigation-drawer
                v-model="drawer"
                app
                clipped
        >
            <v-list dense>
                <v-list-item
                        v-for="item in items"
                        :key="item.text"
                        link
                        :to="item.link"
                >
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.text }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar
                app
                clipped-left
                color="white"
                dense
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="mr-12 align-center">
                <span class="title">COVID-19 STATS</span>
            </v-toolbar-title>
        </v-app-bar>

        <v-content>
            <v-container class="fill-height">
                <router-view/>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    export default {
        props: {
            source: String,
        },
        components:{
        },
        data: () => ({
            drawer: null,
            items: [
                { icon: 'mdi-earth', text: 'Global', link: '/'},
                // { icon: 'mdi-flag', text: 'Regional', },
                {icon: 'mdi-flag', text: 'About', link: '/about'}
            ],
        }),
        created () {
            this.$vuetify.theme.dark = false
        },
    }
</script>
