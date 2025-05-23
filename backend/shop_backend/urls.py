from django.contrib import admin
from django.urls import path
from api.views import SiteInfoView, ServiceListView, OrderCreateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/site-info/', SiteInfoView.as_view(), name='site-info'),
    path('api/services/', ServiceListView.as_view(), name='services'),
    path('api/order/', OrderCreateView.as_view(), name='order'),
]