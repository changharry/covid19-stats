import Stats from '@/components/stats'
import Region from "@/components/region"


export const routes = [
    {path: '/', component: Stats},
    {path: '/region/:name', component: Region},
];
