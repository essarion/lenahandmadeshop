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
    Cart,
    CartItem,
)
from decimal import Decimal


class ImageFormatSerializer(serializers.Serializer):
    def get_webp_image(self, obj, field_name):
        image = getattr(obj, f"webp_{field_name}", None)
        if image:
            request = self.context.get("request")
            return request.build_absolute_uri(image.url) if request else image.url
        return None

    def get_avif_image(self, obj, field_name):
        image = getattr(obj, f"avif_{field_name}", None)
        if image:
            request = self.context.get("request")
            return request.build_absolute_uri(image.url) if request else image.url
        return None


class ServiceSerializer(ImageFormatSerializer, serializers.ModelSerializer):
    category = serializers.SlugRelatedField(
        slug_field="slug", queryset=Category.objects.all()
    )
    webp_image = serializers.SerializerMethodField()
    avif_image = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = [
            "id",
            "name",
            "description",
            "price",
            "image",
            "webp_image",
            "avif_image",
            "slug",
            "category",
            "created_at",
        ]

    def get_webp_image(self, obj):
        return super().get_webp_image(obj, "image")

    def get_avif_image(self, obj):
        return super().get_avif_image(obj, "image")


class CategorySerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True)

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


class WelcomeSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = WelcomeSection
        fields = ["title", "text"]


class ProductShowcaseItemSerializer(ImageFormatSerializer, serializers.ModelSerializer):
    webp_background_image = serializers.SerializerMethodField()
    avif_background_image = serializers.SerializerMethodField()

    class Meta:
        model = ProductShowcaseItem
        fields = [
            "background_image",
            "webp_background_image",
            "avif_background_image",
            "text_top",
            "page_name",
            "text_bottom",
        ]

    def get_webp_background_image(self, obj):
        return super().get_webp_image(obj, "background_image")

    def get_avif_background_image(self, obj):
        return super().get_avif_image(obj, "background_image")


class ProductShowcaseSerializer(serializers.ModelSerializer):
    items = ProductShowcaseItemSerializer(many=True, read_only=True)

    class Meta:
        model = ProductShowcase
        fields = ["title", "items"]


class CatalogIntroSerializer(serializers.ModelSerializer):
    class Meta:
        model = CatalogIntro
        fields = ["title", "text"]


class AdvantageSerializer(ImageFormatSerializer, serializers.ModelSerializer):
    webp_icon = serializers.SerializerMethodField()
    avif_icon = serializers.SerializerMethodField()

    class Meta:
        model = Advantage
        fields = ["title", "description", "icon", "webp_icon", "avif_icon"]

    def get_webp_icon(self, obj):
        return super().get_webp_image(obj, "icon")

    def get_avif_icon(self, obj):
        return super().get_avif_image(obj, "icon")


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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email"]


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
        items = cart.items.select_related("service").all()
        total = sum(Decimal(str(item.service.price)) * item.quantity for item in items)
        return total
