from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import SiteInfo, Service, Order
from .serializers import SiteInfoSerializer, ServiceSerializer, OrderSerializer
import telegram
import os
from dotenv import load_dotenv

load_dotenv()
bot = telegram.Bot(token=os.getenv('TELEGRAM_BOT_TOKEN')) if os.getenv('TELEGRAM_BOT_TOKEN') else None
TELEGRAM_CHAT_ID = os.getenv('TELEGRAM_CHAT_ID')

class SiteInfoView(APIView):
    def get(self, request):
        site_info = SiteInfo.objects.first() or SiteInfo.objects.create()
        serializer = SiteInfoSerializer(site_info)
        return Response(serializer.data)

class ServiceListView(APIView):
    def get(self, request):
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
            return Response({"message": "Order received"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)