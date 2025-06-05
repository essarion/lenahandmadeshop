from rest_framework import serializers
from .models import Service, Category, SiteInfo, Order

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'slug']

class ServiceSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(slug_field='slug', queryset=Category.objects.all())
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'price', 'image', 'slug', 'category', 'created_at']

class SiteInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteInfo
        fields = ['title', 'description', 'header']

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id', 'user', 'name', 'email', 'items', 'created_at']