# Setup Project

Create .env file

```
DATABASE_URL="mysql://root:@localhost:3306/belajar_typescript_restful_api"
```

```shell

npm install

npx prisma migrate dev

npx prisma generate

npm run build

npm run start

```

# Kelompok OSS
## Anggota 
Eri Satrio Nusantara
## Deskripsi backend 
Project ini adalah bagian backend dari sistem penyewaan mobil pick up. 
## List fitur 
1. Autentikasi dengan JWT (refresh token dan access token).
2. Terdapat dua role yaitu Admin dan Anggota.
3. Anggota bisa meminjam mobil pick up tidak lebih dari 2 mobil.
4. Anggota harus menghubungi Admin untuk pengembalian mobil.
5. Terdapat validasi di sisi backend dengan Zod.
6. Untuk penggunaan API bisa lihat folder doc (menyusul).
