import Stats from '@/components/stats'
import Region from "@/components/region"
import About from "@/components/about"


export const routes = [
    {path: '/', component: Stats},
    {path: '/region/:name', component: Region},
    {path: '/about', component: About}
];
