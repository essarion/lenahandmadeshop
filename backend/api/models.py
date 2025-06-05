from django.db import models
from django.contrib.auth.models import User

class SiteInfo(models.Model):
    title = models.CharField(max_length=200, default="Lena Handmade Shop")
    description = models.TextField(default="Welcome to our cozy shop of handmade candles and cards!")
    header = models.CharField(max_length=200, default="Discover Unique Handmade Creations")

    def __str__(self):
        return self.title

class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

class Service(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='services')
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    description = models.TextField()
    image = models.ImageField(upload_to="services/", null=True, blank=True)
    slug = models.SlugField(max_length=200, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Услуга"
        verbose_name_plural = "Услуги"

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    name = models.CharField(max_length=200)
    email = models.EmailField()
    items = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order by {self.name}"