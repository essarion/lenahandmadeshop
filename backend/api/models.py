from django.db import models
from django.contrib.auth.models import User

class SiteInfo(models.Model):
    title = models.CharField(max_length=200, default="Lena Handmade Shop")
    description = models.TextField(default="Welcome to our cozy shop of handmade candles and cards!")
    header = models.CharField(max_length=200, default="Discover Unique Handmade Creations")

    def __str__(self):
        return self.title

class Service(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()

    def __str__(self):
        return self.name

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='orders')
    name = models.CharField(max_length=200)
    email = models.EmailField()
    items = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order by {self.name}"