from rest_framework import serializers
from amtranspo.models import User,Product,Cart


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



class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model= Cart
        fields=(
            'CartId',
            'UserId',
            'ProductId',
            'Quantity'
            )