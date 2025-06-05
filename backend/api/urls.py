from django.urls import path
from .views import SiteInfoView, ServiceListView, OrderCreateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('site-info/', SiteInfoView.as_view(), name='site-info'),
    path('services/', ServiceListView.as_view(), name='services'),
    path('services/<str:category_slug>/', ServiceListView.as_view(), name='services-by-category'),
    path('order/', OrderCreateView.as_view(), name='order'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]