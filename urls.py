from django.contrib import admin
from django.urls import path
from api import views # 'views' artık 'api' klasörünün içinde

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/test/', views.test_api),
]