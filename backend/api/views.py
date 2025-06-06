from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
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
)
import telegram
import os
from dotenv import load_dotenv

load_dotenv()
bot = (
    telegram.Bot(token=os.getenv("TELEGRAM_BOT_TOKEN"))
    if os.getenv("TELEGRAM_BOT_TOKEN")
    else None
)
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID")


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
                    ProductShowcaseSerializer(showcase).data if showcase else {}
                ),
                "catalog_intro": (
                    CatalogIntroSerializer(catalog_intro).data if catalog_intro else {}
                ),
                "advantages": AdvantageSerializer(advantages, many=True).data,
                "delivery": DeliveryInfoSerializer(delivery).data if delivery else {},
                "about": AboutCompanySerializer(about).data if about else {},
                "contacts": ContactInfoSerializer(contacts).data if contacts else {},
                "services": ServiceSerializer(services, many=True).data,
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
                "services": ServiceSerializer(services, many=True).data,
                "advantages": AdvantageSerializer(advantages, many=True).data,
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

        serializer = ServiceSerializer(service)
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
