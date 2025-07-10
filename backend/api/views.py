from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.conf import settings
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import (
    SiteInfo,
    Service,
    Order,
    WelcomeSection,
    ProductShowcase,
    CatalogIntro,
    Advantage,
    DeliveryInfo,
    AboutCompany,
    ContactInfo,
    Category,
    Cart,
    CartItem,
)
from .serializers import (
    SiteInfoSerializer,
    ServiceSerializer,
    OrderSerializer,
    WelcomeSectionSerializer,
    ProductShowcaseSerializer,
    CatalogIntroSerializer,
    AdvantageSerializer,
    DeliveryInfoSerializer,
    AboutCompanySerializer,
    ContactInfoSerializer,
    CategorySerializer,
    CartSerializer,
    CartItemSerializer,
    UserSerializer,
)
from django.core.mail import send_mail
from asgiref.sync import sync_to_async

from api.utils_async import send_telegram_message_async, send_mail_async

from dotenv import load_dotenv

load_dotenv()


# --- Новый сериализатор регистрации ---
class RegisterUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("username", "email", "password")

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data["username"],
            email=validated_data["email"],
            password=validated_data["password"],
        )
        return user


# --- Новая вьюха регистрации ---
class RegisterUserView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterUserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            refresh = RefreshToken.for_user(user)
            user_data = UserSerializer(user).data  # добавляем user info

            return Response(
                {
                    "user": user_data,
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_serializer = UserSerializer(request.user)
        return Response(user_serializer.data)


class SiteInfoView(APIView):
    def get(self, request):
        site_info = SiteInfo.objects.first() or SiteInfo.objects.create()
        serializer = SiteInfoSerializer(site_info)
        return Response(serializer.data)


class ServiceListView(APIView):
    def get(self, request, category_slug=None):
        if category_slug:
            services = Service.objects.filter(category__slug=category_slug)
        else:
            services = Service.objects.all()
        serializer = ServiceSerializer(services, many=True)
        return Response(serializer.data)


class OrderCreateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = OrderSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            if bot and TELEGRAM_CHAT_ID:
                message = f"New Order:\nUser: {request.user.username}\nName: {request.data['name']}\nEmail: {request.data['email']}\nItems: {request.data['items']}"
                bot.send_message(chat_id=TELEGRAM_CHAT_ID, text=message)
            return Response(
                {"message": "Order received"}, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Новая вьюха, агрегирующая весь контент главной страницы
class HomePageView(APIView):
    def get(self, request):
        site_info = SiteInfo.objects.first()
        welcome = WelcomeSection.objects.first()
        showcase = ProductShowcase.objects.first()
        catalog_intro = CatalogIntro.objects.first()
        advantages = Advantage.objects.all()
        delivery = DeliveryInfo.objects.first()
        about = AboutCompany.objects.first()
        contacts = ContactInfo.objects.first()
        services = Service.objects.all()

        return Response(
            {
                "site_info": SiteInfoSerializer(site_info).data if site_info else {},
                "welcome": WelcomeSectionSerializer(welcome).data if welcome else {},
                "showcase": (
                    ProductShowcaseSerializer(
                        showcase, context={"request": request}
                    ).data
                    if showcase
                    else {}
                ),
                "catalog_intro": (
                    CatalogIntroSerializer(catalog_intro).data if catalog_intro else {}
                ),
                "advantages": AdvantageSerializer(
                    advantages, many=True, context={"request": request}
                ).data,
                "delivery": DeliveryInfoSerializer(delivery).data if delivery else {},
                "about": AboutCompanySerializer(about).data if about else {},
                "contacts": ContactInfoSerializer(contacts).data if contacts else {},
                "services": ServiceSerializer(
                    services, many=True, context={"request": request}
                ).data,
            },
            status=status.HTTP_200_OK,
        )


# для страниц услуг
class CategoryDetailView(APIView):
    def get(self, request, slug):
        try:
            category = Category.objects.get(slug=slug)
        except Category.DoesNotExist:
            return Response(
                {"error": "Category not found"}, status=status.HTTP_404_NOT_FOUND
            )

        services = Service.objects.filter(category=category)
        advantages = Advantage.objects.all()
        delivery = DeliveryInfo.objects.first()
        contacts = ContactInfo.objects.first()

        return Response(
            {
                "category": CategorySerializer(category).data,
                "services": ServiceSerializer(
                    services, many=True, context={"request": request}
                ).data,
                "advantages": AdvantageSerializer(
                    advantages, many=True, context={"request": request}
                ).data,
                "delivery": DeliveryInfoSerializer(delivery).data if delivery else {},
                "contacts": ContactInfoSerializer(contacts).data if contacts else {},
            }
        )


class ServiceDetailView(APIView):
    def get(self, request, slug):
        try:
            service = Service.objects.get(slug=slug)
        except Service.DoesNotExist:
            return Response(
                {"error": "Service not found"}, status=status.HTTP_404_NOT_FOUND
            )

        serializer = ServiceSerializer(service, context={"request": request})
        return Response(serializer.data)


class WelcomeSectionView(generics.ListAPIView):
    queryset = WelcomeSection.objects.all()
    serializer_class = WelcomeSectionSerializer


class ProductShowcaseView(generics.ListAPIView):
    queryset = ProductShowcase.objects.all()
    serializer_class = ProductShowcaseSerializer


class AdvantageListView(generics.ListAPIView):
    queryset = Advantage.objects.all()
    serializer_class = AdvantageSerializer


class CatalogIntroView(generics.ListAPIView):
    queryset = CatalogIntro.objects.all()
    serializer_class = CatalogIntroSerializer


class DeliveryInfoView(generics.ListAPIView):
    queryset = DeliveryInfo.objects.all()
    serializer_class = DeliveryInfoSerializer


class AboutCompanyView(generics.ListAPIView):
    queryset = AboutCompany.objects.all()
    serializer_class = AboutCompanySerializer


class ContactInfoView(generics.ListAPIView):
    queryset = ContactInfo.objects.all()
    serializer_class = ContactInfoSerializer


class CartView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    def delete(self, request):
        cart, _ = Cart.objects.get_or_create(user=request.user)
        cart.items.all().delete()
        return Response(CartSerializer(cart).data, status=200)


class CartItemUpdateView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        service_id = request.data.get("service_id")
        quantity = request.data.get("quantity", 1)
        cart, _ = Cart.objects.get_or_create(user=request.user)
        service = Service.objects.get(id=service_id)
        item, created = CartItem.objects.get_or_create(cart=cart, service=service)
        item.quantity = quantity
        item.quantity = max(1, item.quantity)
        item.save()
        return Response(CartSerializer(cart).data)

    def patch(self, request, item_id):
        try:
            item = CartItem.objects.get(id=item_id, cart__user=request.user)
        except CartItem.DoesNotExist:
            return Response({"error": "Not found"}, status=404)

        quantity = request.data.get("quantity")
        if quantity is not None and int(quantity) >= 1:
            item.quantity = int(quantity)
            item.save()

        cart = item.cart
        return Response(CartSerializer(cart).data)

    def delete(self, request, item_id):
        try:
            item = CartItem.objects.get(id=item_id, cart__user=request.user)
            cart = item.cart
            item.delete()
            return Response(CartSerializer(cart).data, status=200)
        except CartItem.DoesNotExist:
            return Response({"error": "Item not found"}, status=404)


class SubmitCartOrderView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        phone = request.data.get("phone")
        email = request.data.get("email", request.user.email)
        name = request.user.username

        if not phone:
            return Response({"error": "Phone is required"}, status=400)

        cart = Cart.objects.filter(user=request.user).first()
        if not cart or not cart.items.exists():
            return Response({"error": "Cart is empty"}, status=400)

        items_list = [
            f"{item.service.name} x {item.quantity}" for item in cart.items.all()
        ]
        items_str = "\n".join(items_list)

        total_price = sum(
            item.quantity * item.service.price for item in cart.items.all()
        )

        Order.objects.create(
            user=request.user,
            name=name,
            email=email,
            items=items_str,
            total_price=total_price,
        )

        # Отправляем телеграм-сообщение асинхронно
        send_telegram_message_async(
            f"Новая заявка от {name}\nEmail: {email}\nТелефон: {phone}\nЗаказ:\n{items_str}\nСумма: {total_price} ₽"
        )

        # Отправляем email асинхронно, если настроен
        if settings.DEFAULT_FROM_EMAIL:
            send_mail_async(
                subject="Новая заявка",
                message=f"Имя: {name}\nEmail: {email}\nТелефон: {phone}\nЗаказ:\n{items_str}\nСумма: {total_price} ₽",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.DEFAULT_FROM_EMAIL],
            )

        # Очищаем корзину
        cart.items.all().delete()

        return Response({"message": "Заявка отправлена!", "total_price": total_price})
