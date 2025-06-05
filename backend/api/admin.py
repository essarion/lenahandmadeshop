from django.contrib import admin
from .models import Category, Service, SiteInfo, Order

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

@admin.register(SiteInfo)
class SiteInfoAdmin(admin.ModelAdmin):
    list_display = ["title"]

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ["name", "email", "created_at"]