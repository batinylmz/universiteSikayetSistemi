from django import forms
from .models import Talep

class TalepForm(forms.ModelForm):
    class Meta:
        model = Talep
        # Kullanıcı sadece bu alanları doldursun, diğerlerini (tarih, durum vs.) biz halledeceğiz.
        fields = ['konu', 'kategori', 'mesaj']