from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from amtranspo.models import User,Product,Admin
from amtranspo.serializers import UserSerializer,ProductSerializer,AdminSerializer
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
def AdminApi(request,id=0):
    if request.method=='GET':
        admins= Admin.objects.all()
        admin_serializer = AdminSerializer(admins,many=True)
        return JsonResponse(admin_serializer.data,safe=False)
    
    elif request.method=='POST':
        admin_data=JSONParser().parse(request)  #get data coming from axios react and format it to json
        admin_serializer = AdminSerializer(data=admin_data)
        adminExists = Admin.objects.filter(email=admin_data['email'])  #check if there is a user with this email in the db

        if len(adminExists)>0 :
            data = {"status": "exists" }
            return JsonResponse(data,safe=False)

        if admin_serializer.is_valid() :
            admin_serializer.save()         # save to mongodb
            data = {"status": "success" , "info": admin_data}
            return JsonResponse(data,safe=False)

        data = {"status": "error" }
        return JsonResponse(data,safe=False)

    elif request.method=='PUT':
        admin_data=JSONParser().parse(request)
        admin=Admin.objects.get(AdminId=admin_data['AdminId'])
        admin_serializer=AdminSerializer(admin,data=admin_data)
        if admin_serializer.is_valid():
            admin_serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update",safe=False)

    elif request.method=='DELETE':
        admin=Admin.objects.get(AdminId=id)
        admin.delete()
        return JsonResponse("Deleted successfully",safe=False)

