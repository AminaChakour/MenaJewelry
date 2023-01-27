from rest_framework import serializers
from amtranspo.models import User,Product,Admin


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=(
            'UserId',
             'lastname',
          'firstname',
          'birthday',
          'address',
          'postalcode',
          'city',
          'province',
          'phone',
          'email',
          'password')

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model=Product
        fields=('ProductId',
                'Title',
                'Description',
                'Price',
                'Stock',
                'Image')

class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model=Admin
        fields=(
            'AdminId',
             'email',
             'password')