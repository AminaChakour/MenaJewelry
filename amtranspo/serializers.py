from rest_framework import serializers
from amtranspo.models import User, Product, SCart, Order, OrderDetails


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
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
        model = Product

        fields = (
            'ProductId',
                  'Title',
                  'Description',
                  'Price',
                  'Stock',
                  'Image')


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = SCart
        fields = (
            'CartId',
            'UserId',
            'ProductId',
            'Quantity'
        )


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            'OrderId',
            'UserId',
            'PurchaseDate',
            'Total'
        )


class OrderDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetails
        fields = (
            'OrderDetailsId',
            'OrderId',
            'ProductId',
            'Title',
            'Description',
            'Price',
            'Image',
            'Quantity'
        )
