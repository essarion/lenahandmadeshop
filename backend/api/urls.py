from django.urls import path
from django.urls import path
from .views import (
    SiteInfoView,
    ServiceListView,
    OrderCreateView,
    CategoryDetailView,
    ServiceDetailView,
    WelcomeSectionView,
    ProductShowcaseView,
    CatalogIntroView,
    AdvantageListView,
    DeliveryInfoView,
    AboutCompanyView,
    ContactInfoView,
    HomePageView,
    CartView,
    CartItemUpdateView,
    SubmitCartOrderView,
    RegisterUserView,
    CurrentUserView,
)


from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("site-info/", SiteInfoView.as_view(), name="site-info"),
    path("welcome/", WelcomeSectionView.as_view(), name="welcome-section"),
    path("product-showcase/", ProductShowcaseView.as_view(), name="product-showcase"),
    path("catalog-intro/", CatalogIntroView.as_view(), name="catalog-intro"),
    path("advantages/", AdvantageListView.as_view(), name="advantages"),
    path("delivery-info/", DeliveryInfoView.as_view(), name="delivery-info"),
    path("about-company/", AboutCompanyView.as_view(), name="about-company"),
    path("contact-info/", ContactInfoView.as_view(), name="contact-info"),
    path("services/", ServiceListView.as_view(), name="services"),
    path(
        "services/<str:category_slug>/",
        ServiceListView.as_view(),
        name="services-by-category",
    ),
    path("home/", HomePageView.as_view(), name="home"),
    path("category/<str:slug>/", CategoryDetailView.as_view(), name="category-detail"),
    path("service/<str:slug>/", ServiceDetailView.as_view(), name="service-detail"),
    path("order/", OrderCreateView.as_view(), name="order"),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("cart/", CartView.as_view(), name="cart"),
    path("cart/items/", CartItemUpdateView.as_view(), name="add-to-cart"),
    path(
        "cart/items/<int:item_id>/",
        CartItemUpdateView.as_view(),
        name="update-cart-item",
    ),
    path("cart/submit/", SubmitCartOrderView.as_view(), name="submit-cart-order"),
    path("register/", RegisterUserView.as_view(), name="register"),
    path("auth/user/", CurrentUserView.as_view(), name="current-user"),
]
