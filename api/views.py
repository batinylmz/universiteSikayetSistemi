# En üste bu satırları ekle:
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from .models import Talep # Başına nokta koy!
from .forms import TalepForm # Başına nokta koy!
from django.http import JsonResponse
from rest_framework.decorators import api_view # Bu satırı mutlaka ekle!
def test_api(request):
    data = {
        "durum": "basarili",
        "mesaj": "Django API su an calisiyor!"
    }
    return JsonResponse(data)

@api_view(['GET'])
def test_api(request):
    data = {
        "durum": "basarili",
        "mesaj": "Django API su an calisiyor!"
    }
    return JsonResponse(data)

#@login_required # Bu komut: "Sadece giriş yapmış kullanıcılar şikayet yazabilir" demek.
def talep_olustur(request):
    if request.method == 'POST':
        # Eğer kullanıcı "Gönder" butonuna bastıysa:
        form = TalepForm(request.POST)
        if form.is_valid():
            yeni_talep = form.save(commit=False)
            yeni_talep.ogrenci = request.user # Şikayeti o an giriş yapmış kişiye bağlıyoruz
            yeni_talep.save() # Veritabanına kaydet
            return redirect('anasayfa') # İş bitince anasayfaya yönlendir
    else:
        # Sayfa ilk açıldığında boş form göster:
        form = TalepForm()

    return render(request, 'tickets/talep_olustur.html', {'form': form})






from .models import Talep  # Başına nokta koy!
from .forms import TalepForm # Başına nokta koy!

def anasayfa(request):
    # 1. Veritabanındaki tüm talepleri çek
    tum_talepler = Talep.objects.all().order_by('-tarih') # En yenisi en üstte
    
    # 2. Bu talepleri HTML sayfasına gönder
    context = {
        'talepler': tum_talepler
    }
    
    # 3. Sayfayı ekrana bas
    return render(request, 'tickets/anasayfa.html', context)