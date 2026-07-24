🟣 HECC-Engine: Dinamik Hamming ECC Analiz ve Görselleştirme Aracı
HECC-Engine; Hamming Hata Düzeltme Kodlarını (ECC) 8-bit, 16-bit ve 32-bit mimariler üzerinde dinamik olarak simüle etmek, analiz etmek ve görselleştirmek için geliştirilmiş web tabanlı bir mühendislik aracıdır.

Proje; donanım seviyesindeki karmaşık mantıksal işlemleri (XOR ağaç matrisleri, sendrom kelimesi analizi, Tek Bit Hata Düzeltme - SEC) modern, estetik ve interaktif bir kullanıcı arayüzü ile birleştirir.

✨ Öne Çıkan Özellikler
Dinamik Bit Genişliği Desteği: 8-bit, 16-bit ve 32-bit veri girdileri arasında kesintisiz geçiş.

Eşlik (Parite) Biti Matris Hesabı: Parite bitlerinin 2^n pozisyonlarına otomatik yerleştirilmesi ve hesaplanması.

Donanım Seviyesinde Simülasyon: Sendrom kelimesi üretimi için gerçek zamanlı XOR mantık yürütmesi.

Yapay Hata Enjeksiyonu (Error Injection): Tek bitlik hata oluşturma (SEC) ve sistemin hatayı canlı olarak tespit edip düzeltmesini gözlemleme.

İnteraktif Asistan: Kullanıcıya adım adım rehberlik eden ve anlık geri bildirim sağlayan entegre avatar.

Modern ve Estetik Arayüz: Kullanıcı deneyimine odaklanan özel pastel renk paleti ve duyarlı (responsive) tasarım.

🚀 Canlı Demo 
🌐 Canlı Web Demosu: (İsteğe bağlı: GitHub Pages bağlantısı)

🛠️ Kullanılan Teknolojiler
Ön Yüz (Frontend): HTML5, CSS3, JavaScript (ES6+)

Algoritmalar: Hamming Kod Mantığı (SEC), Parite Matris Hesabı, Sendrom Analizi

Tasarım / UX: Esnek CSS Grid/Flexbox yapıları, Özel Arayüz Tasarımı

📊 Çalışma Mantığı
Veri Girişi: 8, 16 veya 32-bit formatında veri girişi yapılır.

Matris Oluşturma: 2^m >= m + k + 1 bağıntısına göre gerekli parite bit sayısı (k) hesaplanır.

Parite Kodlama: Parite bitleri 1, 2, 4, 8... (2^n) konumlarına yerleştirilir.

Hata Oluşturma: Test amacıyla isteğe bağlı olarak tek bitlik bir hata (bit-flip) enjekte edilir.

Sendrom Analizi: Sistem, bit düzeyinde XOR işlemlerini kullanarak hatanın tam konumunu tespit eder ve orijinal veriyi otomatik olarak düzeltir.

💻 Yerel Kurulum
Repoyu bilgisayarınıza klonlayın:
git clone https://github.com/leylaaksoy/HECC-Engine.git

Proje klasöründeki index.html dosyasını tarayıcınızda açarak doğrudan çalıştırabilirsiniz.

Bursa Teknik Üniversitesi Bilgisayar Mühendisliği Bölümü kapsamındaki proje çalışması olarak geliştirilmiştir.
