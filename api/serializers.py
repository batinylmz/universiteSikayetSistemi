from rest_framework import serializers
from .models import SeninModelin # Kendi model ismini yaz

class SeninModelinSerializer(serializers.ModelSerializer):
    class Meta:
        model = SeninModelin
        fields = '__all__' # Tüm alanları JSON'a çevirir