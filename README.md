# 🍽️ RestoranMenü (React Native & Expo Web)

Kırmızı tonlarında modern tasarıma sahip, restoranların listelendiği, konum (İl > İlçe > Mahalle > Sokak), kategori (Pideci, Pizzacı, Dönerci vb.) ve restoran adına göre filtrelenebildiği, detaylı menü görüntüleme özellikli web ve mobil uyumlu uygulama.

---

## 🚀 Özellikler

- **🎨 Canlı Kırmızı Tasarım Teması:** Restoran sektörüne uygun, iştah açıcı kırmızı tonları (`#E23744`, `#C5222F`, `#FFF0F1`).
- **📍 Kademeli Konum Filtresi:** İl ➔ İlçe ➔ Mahalle ➔ Sokak / Cadde hiyerarşik seçimi.
- **🔍 Canlı Arama:** Restoran ismi ve yemek isimlerine göre eşzamanlı arama.
- **🏷️ Kategori Hapları (Pills):** Tümü, 🥟 Pideci, 🍕 Pizzacı, 🥩 Dönerci, 🥙 Kebapçı, 🍔 Burger, 🍲 Ev Yemekleri, 🍰 Tatlı & Kafe.
- **⭐ Puan & Fiyat Filtreleri:** 4.5+ Puan, ₺ / ₺₺ / ₺₺₺ bütçe filtreleri.
- **📋 Restoran Kartları:** Puan, teslimat süresi, minimum sepet tutarı, açık/kapalı durumu ve adres bilgileri.
- **📜 Detaylı Menü Görünümü:** Restoran kapak fotoğrafı, kategori sekmeleri, menü içi arama, fiyatlar, etiketler (Acılı, Vejetaryen, Şefin Seçimi) ve tıklandığında açılan detaylı malzeme/kalori modalı.
- **📱 Çapraz Platform (Web & Mobil):** Tek kod tabanı ile hem web tarayıcılarında responsive (masaüstü & mobil web) hem de Android/iOS native olarak çalışır.

---

## 🛠️ Kurulum ve Çalıştırma

### 1. Bağımlılıkları Kurma
```bash
npm install
```

### 2. Web Tarayıcısında Başlatma
```bash
npm run web
```
Tarayıcınızda otomatik olarak açılır (varsayılan: `http://localhost:8081`).

### 3. Mobil Cihazda Çalıştırma (Android / iOS)
```bash
npm start
```
Terminalde çıkan QR kodu telefonunuzdaki **Expo Go** uygulaması ile okutarak doğrudan cihazınızda test edebilirsiniz.

---

## 🌐 GitHub Üzerinde Yayınlama (Public Deployment)

Projede `.github/workflows/deploy.yml` dosyası hazırdır. Projenizi GitHub'a yüklediğinizde otomatik olarak GitHub Pages üzerinde canlıya alınabilir:

1. Projeyi GitHub'da yeni bir depoya (repository) gönderin:
   ```bash
   git init
   git add .
   git commit -m "feat: Restoran menü uygulaması ilk prototip"
   git branch -M main
   git remote add origin https://github.com/<kullanici-adiniz>/<repo-adiniz>.git
   git push -u origin main
   ```

2. GitHub deponuzun **Settings > Pages** sekmesine gidin:
   - **Source** bölümünü **GitHub Actions** olarak seçin.
   - Her `git push` yaptığınızda GitHub uygulamanızı otomatik olarak derleyip internete ücretsiz olarak yayınlayacaktır!

Alternatif olarak, `npm run build:web` komutuyla oluşturulan `dist/` klasörünü Vercel, Netlify veya Cloudflare Pages üzerine sürükle-bırak yöntemiyle de 10 saniyede canlıya alabilirsiniz.

---

## 📂 Proje Yapısı

```
restaurant-menu-app/
├── App.tsx                      # Ana navigasyon ve sayfa yönlendirici
├── src/
│   ├── theme/
│   │   └── colors.ts            # Kırmızı temalı renk paleti ve gölgeler
│   ├── types/
│   │   └── index.ts             # Restoran, menü, konum ve filtre tipleri
│   ├── data/
│   │   ├── locations.ts         # İl, ilçe, mahalle ve sokak veri tabanı
│   │   ├── restaurants.ts       # Detaylı restoranlar ve menü veritabanı
│   │   └── dbService.ts         # Yerel veritabanı sorgulama ve filtreleme servisi
│   ├── components/
│   │   ├── Header.tsx           # Logo, başlık ve marka alanı
│   │   ├── FilterBar.tsx        # Arama kutusu, kategori hapları ve konum butonu
│   │   ├── LocationPickerModal.tsx # Kademeli konum seçici modal
│   │   ├── RestaurantCard.tsx   # Restoran kart bileşeni
│   │   └── MenuItemCard.tsx     # Menüdeki yemek listeleme kartı
│   └── screens/
│       ├── HomeScreen.tsx       # Ana ekran (filtreler + restoran grid'i)
│       └── MenuScreen.tsx       # Menü detay ekranı + yemek modalı
└── .github/workflows/
    └── deploy.yml               # GitHub Actions ile otomatik web yayını
```
