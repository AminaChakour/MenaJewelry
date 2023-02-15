from django.urls import re_path as url
from amtranspo import views

urlpatterns=[
    url(r'^product$',views.productsApi),
    url(r'^product/([0-9]+)$',views.SelectedProductApi),
    url(r'^login$',views.loginApi),
    url(r'^signup$',views.userApi),
    url(r'^editprofile/([0-9]+)$',views.ProfileApi),
    url(r'^editprofile$',views.ProfileApi),
    url(r'^cart$',views.CartApi),
    url(r'^cart/([0-9]+)$',views.CartApi),
    url(r'^deletecartofuser/([0-9]+)$',views.DeleteUsersCartApi),
    url(r'^productsByIds$',views.ProductsByIdsApi),
    url(r'^orders/([0-9]+)$',views.OrdersApi),
    url(r'^orderDetails/([0-9]+)$',views.OrderDetailsApi),
    url(r'^GetOrderById/([0-9]+)$',views.OrderByIdApi)




]