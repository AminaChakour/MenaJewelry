from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from amtranspo.models import User,Product,SCart,Order,OrderDetails
from amtranspo.serializers import OrderSerializer,OrderDetailsSerializer,UserSerializer,ProductSerializer,CartSerializer
# Create your views here.



@csrf_exempt
def SelectedProductApi(request,id=0):
    if request.method=='GET':

        product= Product.objects.get(ProductId=id)
        product_serializer = ProductSerializer(product,many=False)
        return JsonResponse(product_serializer.data,safe=False)
    
    elif request.method=='DELETE':
        product=Product.objects.get(ProductId=id)
        if not product:
            return JsonResponse("error",safe=False)
        else:
            try:
                print(product.delete())
                return JsonResponse("success",safe=False)
            except:
                return JsonResponse("error",safe=False)

@csrf_exempt
def productsApi(request,id=0):
    if request.method=='GET':
        products= Product.objects.all()
        product_serializer = ProductSerializer(products,many=True)
        return JsonResponse(product_serializer.data,safe=False)

    elif request.method=='POST':
        product_data=JSONParser().parse(request) 
        products= Product.objects.all()
        product_serializer0 = ProductSerializer(products,many=True) # get prods 
        if len(product_serializer0.data) == 0:
            product_data['ProductId'] = 1
        else:
            product_data['ProductId'] = int(product_serializer0.data[-1]['ProductId']) + 1 # get id of last prod in list and increment by 1

        product_serializer = ProductSerializer(data=product_data)
        if product_serializer.is_valid():
            product_serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)

    elif request.method=='PUT':
        product_data=JSONParser().parse(request)
        product=Product.objects.get(ProductId=product_data['ProductId'])
        product_serializer=ProductSerializer(product,data=product_data)
        if product_serializer.is_valid():
            product_serializer.save()
            data = {"status": "success" , "info": product_data}
            return JsonResponse(data,safe=False)
        data = {"status": "error"}
        return JsonResponse(data,safe=False)


@csrf_exempt
def loginApi(request,id=0):
    if request.method=='POST':
        user_data=JSONParser().parse(request) 
        try:
            user=User.objects.get(email=user_data['email'])
        except:
            return JsonResponse("Failed",safe=False)

        user_serializer=UserSerializer(user,many=False)
        return JsonResponse(user_serializer.data,safe=False)

        


        

@csrf_exempt
def ProfileApi(request,id=0):
    if request.method=='GET':
        user=User.objects.get(UserId=id)
        user_serializer = UserSerializer(user)
        return JsonResponse(user_serializer.data,safe=False)
    
    elif request.method=='PUT':
        user_data=JSONParser().parse(request)
        user=User.objects.get(UserId=user_data['UserId'])
        user_serializer=UserSerializer(user,data=user_data)
        if user_serializer.is_valid():
            user_serializer.save()
            return JsonResponse("success",safe=False)
        return JsonResponse("error",safe=False)






@csrf_exempt
def userApi(request,id=0):
    if request.method=='GET':
        user=User.objects.get(UserId=user_data['UserId'])
        user_serializer = UserSerializer(user)
        return JsonResponse(user_serializer.data,safe=False)
    
    elif request.method=='POST':
        user_data=JSONParser().parse(request)  #get data coming from axios react and format it to json
       
        userExists = User.objects.filter(email=user_data['email'])  #check if there is a user with this email in the db
        #increment id
        users= User.objects.all()
        user_serializer0 = UserSerializer(users,many=True) 
        if len(user_serializer0.data) == 0:
            user_data['UserId'] = 1
        else:
            user_data['UserId'] = int(user_serializer0.data[-1]['UserId']) + 1 # get id of last userin list and increment by 1

        user_serializer = UserSerializer(data=user_data)
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
        carts= SCart.objects.filter(UserId =id)
        cart_serializer = CartSerializer(carts,many=True)
        return JsonResponse(cart_serializer.data,safe=False)
    
    elif request.method=='POST':
        cart_data=JSONParser().parse(request)  
        try:
            cart = SCart.objects.get(UserId=cart_data['UserId'],ProductId=cart_data['ProductId'])  
            data = {"status": "success"}
            print('tytyt')
            oldQ = cart.Quantity
            newQ = cart_data['Quantity']
            totalQ = int(oldQ) + int(newQ)
            updatedCart = {'UserId':cart_data['UserId'], 'ProductId':cart_data['ProductId'] ,'Quantity': totalQ}
            cart_serializer=CartSerializer(cart,data=updatedCart)
            if cart_serializer.is_valid():
                cart.delete()
                cart_serializer.save()
                return JsonResponse(data,safe=False)
        except SCart.DoesNotExist:
            cart_serializer = CartSerializer(data=cart_data)
            if cart_serializer.is_valid():
                cart_serializer.save()         # save to mongodb
                data = {"status": "success" , "info": cart_data}
                return JsonResponse(data,safe=False)
        data = {"status": "error" }
        return JsonResponse(data,safe=False)

    elif request.method=='PUT':
        cart_data=JSONParser().parse(request)
        cart=SCart.objects.get(CartId=cart_data['CartId'])
        cart_serializer=CartSerializer(cart,data=cart_data)
        if cart_serializer.is_valid():
            cart_serializer.save()
            return JsonResponse("success",safe=False)
        return JsonResponse("error",safe=False)

    elif request.method=='DELETE':
        cart=SCart.objects.get(CartId=id)
        cart.delete()
        return JsonResponse("Deleted successfully",safe=False)

@csrf_exempt
def DeleteUsersCartApi(request,id):
     if request.method=='DELETE':
        cart=SCart.objects.filter(UserId=id)
        cart.delete()
        return JsonResponse({"status":"success"},safe=False)

@csrf_exempt
def ProductsByIdsApi(request):
     if request.method=='POST':
        ids_data=JSONParser().parse(request)
        products= Product.objects.filter(ProductId__in =ids_data)
        product_serializer = ProductSerializer(products,many=True)
        return JsonResponse(product_serializer.data,safe=False)



@csrf_exempt
def OrdersApi(request,id=0):

    if request.method=='GET':
        orders= Order.objects.filter(UserId=id)
        order_serializer = OrderSerializer(orders,many=True)
        return JsonResponse(order_serializer.data,safe=False)

    elif request.method=='POST':
        order_data=JSONParser().parse(request)  #get data coming from axios react and format it to json
        order_serializer = OrderSerializer(data=order_data)
        if order_serializer.is_valid():
            order_serializer.save()   
    
            data = {"status": "success" , "info":order_serializer.data}
        
            return JsonResponse(data,safe=False)
        data = {"status": "failed" }
        return JsonResponse(data,safe=False)


@csrf_exempt
def OrderDetailsApi(request,id=0):
    if request.method=='GET':
        orders= OrderDetails.objects.filter(OrderId=id)
        orders_serializer = OrderDetailsSerializer(orders,many=True)
        return JsonResponse(orders_serializer.data,safe=False)

   

    elif request.method=='POST':
        orderdetails_data=JSONParser().parse(request) 
        orderdetails_serializer = OrderDetailsSerializer(data=orderdetails_data)
        if orderdetails_serializer.is_valid():
            orderdetails_serializer.save()   
    
            data = {"status": "success" , "info":orderdetails_serializer.data}
        
            return JsonResponse(data,safe=False)
        data = {"status": "failed" }
        return JsonResponse(data,safe=False)


@csrf_exempt
def OrderByIdApi(request,id=0):

    if request.method=='GET':
        orders= Order.objects.get(OrderId=id)
        order_serializer = OrderSerializer(orders,many=False)
        return JsonResponse(order_serializer.data,safe=False)