from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Service,
    Category,
    SiteInfo,
    Order,
    WelcomeSection,
    ProductShowcase,
    ProductShowcaseItem,
    CatalogIntro,
    Advantage,
    DeliveryInfo,
    AboutCompany,
    ContactInfo,
)
from decimal import Decimal


class ServiceSerializer(serializers.ModelSerializer):
    category = serializers.SlugRelatedField(
        slug_field="slug", queryset=Category.objects.all()
    )
    image = serializers.ImageField(required=False, allow_null=True)

    class Meta:
        model = Service
        fields = [
            "id",
            "name",
            "description",
            "price",
            "image",
            "slug",
            "category",
            "created_at",
        ]


class CategorySerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True)  # Используем related_name

    class Meta:
        model = Category
        fields = ["name", "slug", "services"]


class SiteInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteInfo
        fields = ["title", "description", "header"]


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ["id", "user", "name", "email", "items", "total_price", "created_at"]


# Для страниц дополнение:
class WelcomeSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WelcomeSection
        fields = ["title", "text"]


class ProductShowcaseItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductShowcaseItem
        fields = ["background_image", "text_top", "page_name", "text_bottom"]


class ProductShowcaseSerializer(serializers.ModelSerializer):
    items = ProductShowcaseItemSerializer(many=True, read_only=True)

    class Meta:
        model = ProductShowcase
        fields = ["title", "items"]


class CatalogIntroSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogIntro
        fields = ["title", "text"]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


class AdvantageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Advantage
        fields = ["title", "description", "icon"]


class DeliveryInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = DeliveryInfo
        fields = ["title", "text"]


class AboutCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutCompany
        fields = ["title", "text"]


class ContactInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactInfo
        fields = ["title", "phone", "email", "address"]


from .models import Cart, CartItem


class CartItemSerializer(serializers.ModelSerializer):
    service = ServiceSerializer(read_only=True)
    service_id = serializers.PrimaryKeyRelatedField(
        queryset=Service.objects.all(), source="service", write_only=True
    )

    class Meta:
        model = CartItem
        fields = ["id", "service", "service_id", "quantity"]


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True)
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ["id", "items", "total_price"]

    def get_total_price(self, cart):
        total = Decimal("0.00")  # обязательно с отступом
        for item in cart.items.select_related("service").all():
            price = item.service.price
            if isinstance(price, str):
                price = Decimal(price)
            total += price * item.quantity
        return total
