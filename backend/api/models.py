from django.db import models
from django.contrib.auth.models import User


class SiteInfo(models.Model):
    title = models.CharField(max_length=200, default="Lena Handmade Shop")
    description = models.TextField(
        default="Welcome to our cozy shop of handmade candles and cards!"
    )
    header = models.CharField(
        max_length=200, default="Discover Unique Handmade Creations"
    )

    def __str__(self):
        return self.title


class WelcomeSection(models.Model):
    title = models.CharField(max_length=200)
    text = models.TextField()

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Приветствие на главной"
        verbose_name_plural = "Приветствие на главной"


class ProductShowcase(models.Model):
    title = models.CharField(max_length=200, default="Наша продукция")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Блок 'Наша продукция'"
        verbose_name_plural = "Блок 'Наша продукция'"


class ProductShowcaseItem(models.Model):
    showcase = models.ForeignKey(
        ProductShowcase, on_delete=models.CASCADE, related_name="items"
    )
    background_image = models.ImageField(upload_to="showcase/")
    text_top = models.CharField(max_length=200)
    page_name = models.CharField(
        max_length=200,
        help_text="Название страницы/категории (используется для ссылки)",
    )
    text_bottom = models.TextField()

    def __str__(self):
        return self.page_name

    class Meta:
        verbose_name = "Элемент блока 'Наша продукция'"
        verbose_name_plural = "Элементы блока 'Наша продукция'"


class CatalogIntro(models.Model):
    title = models.CharField(max_length=200)
    text = models.TextField()

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Вступление к каталогу"
        verbose_name_plural = "Вступление к каталогу"


class Advantage(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    icon = models.ImageField(upload_to="advantages/")

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Преимущество"
        verbose_name_plural = "Преимущества"


class DeliveryInfo(models.Model):
    title = models.CharField(max_length=200)
    text = models.TextField()

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Информация о доставке"
        verbose_name_plural = "Информация о доставке"


class AboutCompany(models.Model):
    title = models.CharField(max_length=200)
    text = models.TextField()

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "О компании"
        verbose_name_plural = "О компании"


class ContactInfo(models.Model):
    title = models.CharField(max_length=200)
    phone = models.CharField(max_length=50, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Блок контактов"
        verbose_name_plural = "Блок контактов"


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"


class Service(models.Model):
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="services"
    )
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
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    name = models.CharField(max_length=200)
    email = models.EmailField()
    items = models.TextField()
    total_price = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Order by {self.name}"


class Cart(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="cart")

    def __str__(self):
        return f"Cart of {self.user.username}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name="items")
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ("cart", "service")

    def __str__(self):
        return f"{self.quantity} x {self.service.name}"
