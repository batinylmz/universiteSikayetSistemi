from django.db import models
from django.contrib.auth.models import User # Kullanıcıları buradan çekeceğiz

class Talep(models.Model):
    # Durum seçenekleri (Dropdown menü gibi düşün)
    DURUM_SECENEKLERI = [
        ('beklemede', 'Beklemede'),
        ('islemde', 'İşlemde'),
        ('cozuldu', 'Çözüldü'),
    ]
    
    # Kategori seçenekleri
    KATEGORI_SECENEKLERI = [
        ('yemekhane', 'Yemekhane'),
        ('temizlik', 'Temizlik / Hijyen'),
        ('derslik', 'Derslik / Lab'),
        ('idari', 'İdari İşler'),
    ]

    # Tablo Sütunları
    konu = models.CharField(max_length=200, verbose_name="Şikayet Konusu")
    mesaj = models.TextField(verbose_name="Şikayet Detayı")
    kategori = models.CharField(max_length=50, choices=KATEGORI_SECENEKLERI, default='genel')
    
    # Şikayeti yazan öğrenci (User tablosuna bağlıyoruz)
    ogrenci = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name="Öğrenci Adı")
    
    durum = models.CharField(max_length=20, choices=DURUM_SECENEKLERI, default='beklemede')
    tarih = models.DateTimeField(auto_now_add=True, verbose_name="Oluşturulma Tarihi")

    def __str__(self):
        return self.konu # Admin panelinde şikayetin başlığı görünsün