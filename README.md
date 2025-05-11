# NOT: Projede kullanılan API anahtarı çok kısıtlı sayıda istek kotası içerdiği için limit dolumuna uğruyor. Bu nedenle eğer hata alırsanız network tabından limit dolumunu kontrol edebilirsiniz. Eğer limit dolmuşsa yeni bir API anahtarı almanız gerekecek.


## Proje Özeti

Bu proje, spor bahisleri için modern bir web uygulamasıdır. Kullanıcılar, farklı spor etkinliklerini görüntüleyebilir, bahis seçeneklerini inceleyebilir ve bahis geçmişlerini takip edebilir. Proje, performanslı ve ölçeklenebilir bir yapı sağlamak için modern web teknolojileri kullanılarak geliştirilmiştir.


### Kullanılan Teknolojiler

- **React**: Kullanıcı arayüzü oluşturmak için kullanılan popüler bir JavaScript kütüphanesi.
- **TypeScript**: Daha güvenli ve ölçeklenebilir bir kod tabanı için statik tip kontrolü sağlayan bir dil.
- **Vite**: Hızlı geliştirme ve üretim için modern bir build aracı.
- **Redux Toolkit**: Uygulama durumunu yönetmek için kullanılan bir araç seti.
- **Tailwind CSS**: Hızlı ve özelleştirilebilir bir CSS framework'ü.
- **Framer Motion**: Animasyonlar ve geçişler için kullanılan bir kütüphane.
- **Axios**: API isteklerini yönetmek için kullanılan bir HTTP istemcisi.

### Proje Özellikleri

- **Spor Etkinlikleri**: Kullanıcılar, farklı spor dallarındaki etkinlikleri görüntüleyebilir.
- **Gerçek Zamanlı Güncellemeler**: API'den alınan verilerle dinamik içerik güncellemeleri.

### Proje Yapısı

Proje, aşağıdaki gibi bir dosya yapısına sahiptir:

```
src/
├── components/       # UI bileşenleri
├── contexts/         # Context API ile durum yönetimi
├── hooks/            # Özel React hook'ları
├── lib/              # Yardımcı fonksiyonlar ve API çağrıları
├── pages/            # Sayfa bileşenleri
├── redux/            # Redux durum yönetimi
├── types/            # TypeScript tip tanımları
```

### Kurulum ve Çalıştırma

Projeyi yerel ortamınızda çalıştırmak için aşağıdaki adımları izleyin:

1. Depoyu klonlayın:
   ```bash
   git clone https://github.com/kullanici/sports-betting-web-app.git
   cd sports-betting-web-app
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

4. Tarayıcınızda `http://localhost:5173` adresine gidin.

