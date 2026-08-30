# ============================================
# PROJECT RW011-MEKARINDAH - DAFTAR KERJAAN
# Terakhir diupdate: Agustus 2025
# ============================================

## STRUKTUR FOLDER
public/ = folder utama yang di-host Firebase
  - index.html = Web utama (dari Git, versi lengkap)
  - flipbook-offline.html = Flipbook Peraturan RW (fullscreen)
  - admin.html = Admin utama
  - admin-galeri.html = Admin Galeri (tambah/edit/hapus)
  - admin-kegiatan.html = Admin Kegiatan (tambah/edit/hapus)
  - panel.html = Halaman pintu semua admin
  - arsip.js = Script arsip (tampil 3, sisanya klik tombol)
  - fix-drive.js = Fix foto Google Drive
  - kegiatan-drive-v3.js = Video Drive di Kegiatan
  - logo.jpg, manifest.json

## YANG SUDAH DIKERJAKAN
1. Flipbook fullscreen (hapus hitam, tinggi 90vh)
2. Pinch zoom aktif
3. Backup ke ~/storage/shared/Backup_RW/
4. Arsip Kegiatan dan Mading
5. Fix foto Google Drive
6. Video Drive di Kegiatan (thumbnail play)
7. Admin Galeri khusus (koleksi: galeri)
8. Admin Kegiatan khusus (koleksi: kegiatan)
9. Panel.html pintu admin
10. admin.html dipindah ke public/
11. firebase.json diperbaiki

## YANG AKAN DIKERJAKAN
1. Dark Theme (tanpa backdrop-filter)
2. Mengembalikan sw.js
3. Fix caption galeri
4. Menambahkan link Admin di admin.html
5. Video Drive di Galeri

## CARA DEPLOY
cd ~/rw011-mekarindah && firebase deploy

## CARA BACKUP
tar -czvf ~/storage/shared/Backup_RW/rw-backup-$(date +%Y%m%d-%H%M).tar.gz -C ~/ rw011-mekarindah/

## CARA RESTORE
cd ~/ && rm -rf rw011-mekarindah && tar -xzvf ~/storage/shared/Backup_RW/rw-backup-NAMAFILE.tar.gz && cd rw011-mekarindah && firebase deploy

## PERINTAH TERMUX PENTING
grep -n "kata" file        = Cari teks di file
sed -n '100,110p' file   = Lihat baris 100-110
sed -i 's/lama/baru/' file = Ganti teks
sed -i '10s/lama/baru/' file = Ganti di baris 10
sed -i '10d' file          = Hapus baris 10
head -5 file / tail -5 file = Lihat awal/akhir
ls -lh file               = Cek ukuran file

## DATABASE FIREBASE
settings = Profil, Sambutan, Struktur
kegiatan = Laporan kegiatan (tipe, url, keterangan, tanggal)
galeri = Galeri (tipe, url, keterangan, created_at)
keuangan = Laporan keuangan
mading = Pengumuman
aduan = Aduan warga

## TIPS PENTING
- Buat file JS baru dengan nama beda (anti cache)
- Web error setelah edit? Buka Incognito Mode dulu
- Google Drive gak bisa hotlink gambar, pakai lh3.googleusercontent.com
- Video Drive di iframe bug bawaan Google, solusi pakai thumbnail play
