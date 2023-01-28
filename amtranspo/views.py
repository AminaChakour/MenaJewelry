from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from amtranspo.models import User,Product,Cart
from amtranspo.serializers import UserSerializer,ProductSerializer,CartSerializer
# Create your views here.



@csrf_exempt
def SelectedProductApi(request,id=0):
    if request.method=='GET':
        product= Product.objects.get(ProductId=id)
        product_serializer = ProductSerializer(product,many=False)
        return JsonResponse(product_serializer.data,safe=False)

@csrf_exempt
def productsApi(request,id=0):
    if request.method=='GET':
        products= Product.objects.all()
        product_serializer = ProductSerializer(products,many=True)
        return JsonResponse(product_serializer.data,safe=False)

    elif request.method=='POST':
        product_data=JSONParser().parse(request)  #get data coming from axios react and format it to json
        product_serializer = ProductSerializer(data=product_data)
        if product_serializer.is_valid():
            product_serializer.save()         # save to mongodb
            return JsonResponse("Added Successfully",safe=False)
            
        return JsonResponse("Failed to Add",safe=False)

    elif request.method=='PUT':
        product_data=JSONParser().parse(request)
        product=Product.objects.get(ProductId=product_data['ProductId'])
        product_serializer=ProductSerializer(product,data=product_data)
        if product_serializer.is_valid():
            product_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update",safe=False)

    elif request.method=='DELETE':
        product=Product.objects.get(ProductId=id)
        product.delete()
        return JsonResponse("Deleted successfully",safe=False)

@csrf_exempt
def loginApi(request,id=0):
    if request.method=='POST':
        user_data=JSONParser().parse(request)  #get data coming from axios react and format it to json
        user=User.objects.get(email=user_data['email'])
        user_serializer=UserSerializer(user,many=False)
        return JsonResponse(user_serializer.data,safe=False)
        
        


@csrf_exempt
def userApi(request,id=0):
    if request.method=='GET':
        users= User.objects.all()
        user_serializer = UserSerializer(users,many=True)
        return JsonResponse(user_serializer.data,safe=False)
    
    elif request.method=='POST':
        user_data=JSONParser().parse(request)  #get data coming from axios react and format it to json
        user_serializer = UserSerializer(data=user_data)
        userExists = User.objects.filter(email=user_data['email'])  #check if there is a user with this email in the db

        if len(userExists)>0 :
            data = {"status": "exists" }
            return JsonResponse(data,safe=False)

        if user_serializer.is_valid() :
            user_serializer.save()         # save to mongodb
            data = {"status": "success" , "info": user_data}
            return JsonResponse(data,safe=False)

        data = {"status": "error" }
        return JsonResponse(data,safe=False)

    elif request.method=='PUT':
        user_data=JSONParser().parse(request)
        user=User.objects.get(UserId=user_data['UserId'])
        user_serializer=UserSerializer(user,data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update",safe=False)

    elif request.method=='DELETE':
        user=User.objects.get(UserId=id)
        user.delete()
        return JsonResponse("Deleted successfully",safe=False)

@csrf_exempt
def CartApi(request,id=0):
    if request.method=='GET':
        carts= Cart.objects.get(UserId=['UserId'])
        cart_serializer = CartSerializer(carts,many=True)
        return JsonResponse(cart_serializer.data,safe=False)
    
    elif request.method=='POST':
        cart_data=JSONParser().parse(request)  #get data coming from axios react and format it to json
        cart_serializer = CartSerializer(data=cart_data)
        #cartExists = Cart.objects.filter(email=cart_data['email'])  #check if there is a user with this email in the db

        #if len(cartExists)>0 :
            #data = {"status": "exists" }
           # return JsonResponse(data,safe=False)

        if cart_serializer.is_valid() :
            cart_serializer.save()         # save to mongodb
            data = {"status": "success" , "info": cart_data}
            return JsonResponse(data,safe=False)

        data = {"status": "error" }
        return JsonResponse(data,safe=False)

    elif request.method=='PUT':
        cart_data=JSONParser().parse(request)
        cart=Cart.objects.get(CartId=cart_data['CartId'])
        cart_serializer=CartSerializer(cart,data=cart_data)
        if cart_serializer.is_valid():
            cart_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update",safe=False)

    elif request.method=='DELETE':
        cart=Cart.objects.get(CartId=id)
        cart.delete()
        return JsonResponse("Deleted successfully",safe=False)

