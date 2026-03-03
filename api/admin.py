from django.contrib import admin
from .models import Talep

# Admin panelinde şikayetleri listelerken hangi sütunlar görünsün?
class TalepAdmin(admin.ModelAdmin):
    list_display = ('konu', 'ogrenci', 'kategori', 'durum', 'tarih')
    list_filter = ('durum', 'kategori') # Yan menüye filtre ekler
    search_fields = ('konu', 'mesaj') # Arama çubuğu ekler

admin.site.register(Talep, TalepAdmin)