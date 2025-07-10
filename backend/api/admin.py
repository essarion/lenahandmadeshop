from django.contrib import admin
from django.utils.html import format_html
from .models import (
    Category,
    Service,
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


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["name", "slug"]
    prepopulated_fields = {"slug": ("name",)}


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ["name", "category", "price", "created_at"]
    list_filter = ["category"]
    search_fields = ["name", "description"]
    prepopulated_fields = {"slug": ("name",)}

    readonly_fields = ["webp_image", "avif_image", "image_preview"]
    fields = [
        "category",
        "name",
        "price",
        "description",
        "slug",
        "image",
        "webp_image",
        "avif_image",
        "image_preview",
        "created_at",
    ]

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                """
                <picture>
                    <source srcset="{}" type="image/avif">
                    <source srcset="{}" type="image/webp">
                    <img src="{}" style="max-height: 200px;" />
                </picture>
                """,
                obj.avif_image.url if obj.avif_image else "",
                obj.webp_image.url if obj.webp_image else "",
                obj.image.url,
            )
        return "Нет изображения"

    image_preview.short_description = "Превью"


@admin.register(SiteInfo)
class SiteInfoAdmin(admin.ModelAdmin):
    list_display = ["title"]


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "created_at", "user"]
    search_fields = ["name", "email", "user__username"]
    readonly_fields = ["created_at"]


@admin.register(WelcomeSection)
class WelcomeSectionAdmin(admin.ModelAdmin):
    list_display = ["title"]
    search_fields = ["title"]


@admin.register(ProductShowcase)
class ProductShowcaseAdmin(admin.ModelAdmin):
    list_display = ["title"]


@admin.register(ProductShowcaseItem)
class ProductShowcaseItemAdmin(admin.ModelAdmin):
    list_display = ["page_name", "showcase"]
    list_filter = ["showcase"]
    search_fields = ["page_name", "text_top", "text_bottom"]


@admin.register(CatalogIntro)
class CatalogIntroAdmin(admin.ModelAdmin):
    list_display = ["title"]


@admin.register(Advantage)
class AdvantageAdmin(admin.ModelAdmin):
    list_display = ["title"]
    search_fields = ["title", "description"]


@admin.register(DeliveryInfo)
class DeliveryInfoAdmin(admin.ModelAdmin):
    list_display = ["title"]


@admin.register(AboutCompany)
class AboutCompanyAdmin(admin.ModelAdmin):
    list_display = ["title"]


@admin.register(ContactInfo)
class ContactInfoAdmin(admin.ModelAdmin):
    list_display = ["title", "phone", "email", "address"]
    search_fields = ["title", "phone", "email", "address"]
