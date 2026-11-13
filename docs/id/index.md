# Anya Baileys

> Terjemahan Indonesia dari dokumentasi Elaina Baileys, disesuaikan dengan paket `@teamolduser/baileys`. Panduan bahasa Inggris di [`docs/en/`](../en/index.md) adalah rujukan utama dan bisa lebih baru.

Library WhatsApp Multi-Device untuk Node.js. Bicara langsung ke protokol WhatsApp Web lewat WebSocket — tanpa browser, tanpa Selenium, tanpa headless Chrome.

Fork ini mengikuti bundle WhatsApp Web dari dekat: skema protobuf, revisi klien, dan tipe pesan baru dijaga tetap sejalan dengan yang benar-benar dikirim klien resmi.

## Isinya apa saja

- **MessageBuilder sudah termasuk.** Tombol, list, carousel, dan respons AIRich tanpa memasang paket kedua.
- **Dukungan channel.** Buat dan kelola newsletter, termasuk polling, pertanyaan, insight, dan undangan admin.
- **Skema protobuf yang selalu terkini.** Workflow harian membandingkan `WAProto` dengan bundle live dan menerapkan yang kurang.
- **Sadar LID.** Menangani identitas `@lid` yang baru berdampingan dengan JID nomor telepon.

## Mulai dari mana

- [Mulai cepat](./getting-started.md) — pasang, sambungkan, pasangkan perangkat
- [Pesan](./messages.md) — terima, baca, dan kirim
- [MessageBuilder](./builder.md) — pesan interaktif
- [Newsletter](./newsletter.md) — channel
- [Grup](./groups.md) — grup dan komunitas
- [Contoh](./examples.md) — bot lengkap
- [Referensi API](./api.md) — semua method, dibangkitkan dari kode

## Pemasangan

```bash
npm install @teamolduser/baileys
```

Butuh Node.js 22 atau lebih baru. Paket ini ESM-first, jadi pakai `import`, bukan `require()`.

## Versi terpendek yang sudah jalan

```js
import makeWASocket, { useMultiFileAuthState } from '@teamolduser/baileys'

const { state, saveCreds } = await useMultiFileAuthState('./session')
const sock = makeWASocket({ auth: state })

sock.ev.on('creds.update', saveCreds)

sock.ev.on('messages.upsert', async ({ messages }) => {
  const message = messages[0]
  if (!message?.message) return
  await sock.sendMessage(message.key.remoteJid, { text: 'Halo 💜' })
})
```

Itu menyambung, menampilkan QR di terminal, dan membalas semua pesan. [Mulai cepat](./getting-started.md) mengubahnya jadi sesuatu yang benar-benar layak dijalankan.

## Catatan soal tingkat verifikasi

Sebagian library ini direkonstruksi dengan membaca bundle WhatsApp Web, bukan dari implementasi yang sudah ada. Bagian itu didokumentasikan apa adanya di [EXPERIMENTAL.md](https://github.com/rexxzyid/baileys/blob/main/EXPERIMENTAL.md), yang menandai tiap fitur sebagai **Live** (sudah dijalankan ke server WhatsApp), **Offline** (diverifikasi lokal, belum pernah dikirim), atau **Derived** (bentuknya diambil dari bundle, belum pernah dijalankan).

Baca file itu dulu sebelum merilis apa pun yang bergantung pada API channel yang baru.

## Lisensi dan kredit

Ini fork yang dipelihara aktif. Pemberitahuan upstream disimpan di `LICENSE`, dan daftar kreditnya ada di README repositori.
