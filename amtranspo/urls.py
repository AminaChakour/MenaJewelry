from django.urls import re_path as url
from amtranspo import views

urlpatterns=[
    url(r'^product$',views.productsApi),
    url(r'^product/([0-9]+)$',views.SelectedProductApi),
    url(r'^login$',views.loginApi),
    url(r'^signup$',views.userApi),
    url(r'^editprofile$',views.userApi),
    url(r'^edit$',views.AdminApi)



]