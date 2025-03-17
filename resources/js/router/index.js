import { createRouter, createWebHistory } from 'vue-router';

// Import komponen halaman
import Dashboard from '@/pages/Dashboard.vue';
import Akun from '@/pages/Akun.vue';
import Petugas from '@/pages/Petugas.vue';
import Arsip from '@/pages/arsip/index.vue';
import DataSiswa from '@/pages/Data_Siswa.vue';
import FormSurat from '@/pages/arsip/surat.vue';
import DataSurat from '@/pages/arsip/data.vue';
import Fasilitas from '@/pages/Fasilitas.vue';

const routes = [
    { path: '/', component: Dashboard },
    { path: '/akun', component: Akun },
    { path: '/fasilitas', component: Fasilitas },
    { path: '/petugas', component: Petugas },
    { path: '/datasiswa', component: DataSiswa},
    { 
        path: '/arsip', 
        component: Arsip, 
        children: [
            { path: 'surat', component: FormSurat },
            { path: 'data', component: DataSurat }
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;