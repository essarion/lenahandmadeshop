from rest_framework import serializers
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
        fields = ["id", "user", "name", "email", "items", "created_at"]


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
