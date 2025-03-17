<script setup>
import { ref, onMounted } from 'vue';

const fasilitas = ref([]);
const showForm = ref(false);
const newFasilitas = ref({
    id: null,
    nama: '',
    kategori: '',
    kondisi: '',
    lokasi: '',
    deskripsi: '',
    gambar: null
});
const previewGambar = ref(null); // Untuk menampilkan pratinjau gambar

const fetchFasilitas = async () => {
    fasilitas.value = [
        {
            id: 1,
            nama: 'Praktek TJKT',
            kategori: 'Ruang Praktik',
            kondisi: 'Baik',
            lokasi: 'Universitas Old Trafford',
            deskripsi: 'Ruang untuk praktik Jurusan TJKT dengan dilengkapi peralatan praktik.',
            gambar: '/img/TJKT.jpg'
        },
        {
            id: 2,
            nama: 'Praktek PPLG',
            kategori: 'Ruang Praktik',
            kondisi: 'Baik',
            lokasi: 'Universitas Old Trafford',
            deskripsi: 'Ruang untuk praktik Jurusan PPLG dengan dilengkapi peralatan praktik.',
            gambar: '/img/RPL.jpg'
        },
        {
            id: 3,
            nama: 'Praktek TBSM',
            kategori: 'Ruang Praktik',
            kondisi: 'Baik',
            lokasi: 'Universitas Old Trafford',
            deskripsi: 'Ruang untuk praktik Jurusan TBSM dengan dilengkapi peralatan praktik.',
            gambar: '/img/TBSM.jpg'
        }
    ];
};

const deleteFasilitas = (id) => {
    fasilitas.value = fasilitas.value.filter(item => item.id !== id);
};

const tambahFasilitas = () => {
    if (!newFasilitas.value.nama || !newFasilitas.value.gambar) return;

    newFasilitas.value.id = fasilitas.value.length + 1;
    fasilitas.value.push({ ...newFasilitas.value });

    // Reset form
    newFasilitas.value = { id: null, nama: '', kategori: '', kondisi: '', lokasi: '', deskripsi: '', gambar: null };
    previewGambar.value = null;
    showForm.value = false;
};

// Fungsi untuk menangani upload gambar
const handleUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
        newFasilitas.value.gambar = file;
        previewGambar.value = URL.createObjectURL(file);
    }
};

onMounted(fetchFasilitas);
</script>

<template>
    <div class="container mt-4">
        <!-- Search Bar & Tambah Button -->
        <div class="d-flex justify-content-between align-items-center mb-4">
            <input type="text" class="form-control w-25" placeholder="Search..." />
            <button class="btn btn-primary px-4 py-2" @click="showForm = !showForm">+ Tambah</button>
        </div>

        <!-- Form Tambah Fasilitas -->
        <div v-if="showForm" class="card p-3 mb-4">
            <h5>Tambah Fasilitas</h5>
            <input v-model="newFasilitas.nama" type="text" class="form-control mb-2" placeholder="Nama Fasilitas" />
            <input v-model="newFasilitas.kategori" type="text" class="form-control mb-2" placeholder="Kategori" />
            <input v-model="newFasilitas.kondisi" type="text" class="form-control mb-2" placeholder="Kondisi" />
            <input v-model="newFasilitas.lokasi" type="text" class="form-control mb-2" placeholder="Lokasi" />
            <textarea v-model="newFasilitas.deskripsi" class="form-control mb-2" placeholder="Deskripsi"></textarea>

            <!-- Upload Gambar -->
            <input type="file" class="form-control mb-2" accept="image/*" @change="handleUpload" />
            <div v-if="previewGambar" class="mt-2">
                <img :src="previewGambar" alt="Preview" class="img-thumbnail" style="max-width: 200px;" />
            </div>

            <button class="btn btn-success mt-2" @click="tambahFasilitas">Simpan</button>
        </div>

        <!-- Kartu Fasilitas -->
        <div class="row">
            <div v-for="item in fasilitas" :key="item.id" class="col-md-4">
                <div class="card shadow-sm mb-4">
                    <img v-if="typeof item.gambar === 'string'" :src="item.gambar" class="card-img-top img-fluid" alt="Gambar Fasilitas">
                    <img v-else :src="URL.createObjectURL(item.gambar)" class="card-img-top img-fluid" alt="Gambar Fasilitas">

                    <div class="card-body">
                        <h5 class="card-title fw-bold">{{ item.nama }}</h5>
                        <p class="mb-1"><strong>Kategori:</strong> {{ item.kategori }}</p>
                        <p class="mb-1"><strong>Kondisi:</strong> {{ item.kondisi }}</p>
                        <p class="mb-1"><strong>Lokasi:</strong> {{ item.lokasi }}</p>
                        <p class="mb-1"><strong>Deskripsi:</strong> {{ item.deskripsi }}</p>
                        <div class="d-flex justify-content-end gap-2">
                            <button class="btn btn-warning btn-sm"><i class="bi bi-pencil"></i></button>
                            <button class="btn btn-danger btn-sm" @click="deleteFasilitas(item.id)">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.card {
    border-radius: 12px;
    transition: transform 0.2s ease-in-out;
}
.card:hover {
    transform: scale(1.03);
}
</style>
