from django.contrib import admin
from django.urls import path
from api.views import SiteInfoView, ServiceListView, OrderCreateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/site-info/', SiteInfoView.as_view(), name='site-info'),
    path('api/services/', ServiceListView.as_view(), name='services'),
    path('api/order/', OrderCreateView.as_view(), name='order'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]