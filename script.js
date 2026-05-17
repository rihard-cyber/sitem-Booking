// Tulis kode JavaScript di sini nanti
console.log("Aplikasi Booking siap!");

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reservasiForm');
    const riwayatList = document.getElementById('riwayatList');

    // --Tahap 8: Mengambil data dari localStorage
    let riwayatReservasi = JSON.parse(localStorage.getItem('dataReservasi')) || [];

    // Fungsi untuk menampilkan riwayat ke layar (Tahap 9)
    function tampilkanRiwayat() {
        if (riwayatReservasi.length === 0) {
            riwayatList.innerHTML = '<p class="riwayat-kosong">Belum ada riwayat reservasi.</p>';
            return;
        }

        riwayatList.innerHTML = ''; // Kosongkan daftar sebelum diisi ulang

        riwayatReservasi.forEach((data, index) => {
            const item = document.createElement('div');
            item.className = 'riwayat-item';
            item.style.animationDelay = `${index * 0.08}s`;
            item.innerHTML = `
                <strong>✨ ${data.layanan}</strong>
                <div class="riwayat-meta">📅 ${data.tanggal} &nbsp;⏰ ${data.waktu}</div>
                <small>👤 ${data.nama} &nbsp;|&nbsp; ✉️ ${data.email}${data.catatan ? '<br>📝 ' + data.catatan : ''}</small>
            `;
            riwayatList.appendChild(item);
        });
    }

    // Tampilkan riwayat saat halaman pertama kali dimuat
    tampilkanRiwayat();

    // --Tahap 7: Validasi Tanggal (mencegah input tanggal masa lalu)
    //1. Ambil elemen input tanggal
    const inputTanggal = document.getElementById('tanggal');

    //2. Dapatkan tanggal hari ini (format YYYY-MM-DD)
    const tanggalHariIni = new Date().toISOString().split('T')[0];

    //3. Atur atribut min pada input tanggal agar tidak bisa memilih tanggal masa lalu
    inputTanggal.setAttribute('min', tanggalHariIni);

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Mencegah halaman reload saat form dikirim

        // Tahap 5: Mengambil nilai dari input form
        const nama = document.getElementById('nama').value;
        const email = document.getElementById('email').value;
        const layanan = document.getElementById('layanan').value;
        const tanggal = document.getElementById('tanggal').value;
        const waktu = document.getElementById('waktu').value;
        const catatan = document.getElementById('catatan').value;

        // Tahap 6: Menampilkan notifikasi pop-up (alert)
        // alert(`Halo ${nama}, terima kasih! Reservasi untuk layanan ${layanan} pada ${tanggal} jam ${waktu} berhasil dibuat.`);

        // Menyimpan data ke dalam objek (Tahap 8)
        const dataBaru = {
            nama: nama,
            email: email,
            layanan: layanan,
            tanggal: tanggal,
            waktu: waktu,
            catatan: catatan
        };

        // Menambahkan data baru ke array riwayat
        riwayatReservasi.push(dataBaru);

        // Menyimpan array yang sudah diperbarui ke localStorage (Tahap 8)
        localStorage.setItem('dataReservasi', JSON.stringify(riwayatReservasi));

        // Memperbarui tampilan daftar riwayat (Tahap 9)
        tampilkanRiwayat();

        // Tahap 6 & 10: Menampilkan notifikasi pop-up (SweetAlert)
        Swal.fire({
            title: 'Reservasi Berhasil! 🎉',
            text: `Halo ${nama}, reservasi layanan ${layanan} untuk tanggal ${tanggal} pukul ${waktu} telah kami terima.`,
            icon: 'success',
            confirmButtonText: 'Oke, Mantap!',
            confirmButtonColor: '#3498db'
        });

        // Mengosongkan form setelah sukses dikirim
        form.reset();
    });
});
