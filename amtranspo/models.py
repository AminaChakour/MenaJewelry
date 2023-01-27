from django.db import models

# Create your models here.

class User(models.Model):
    UserId = models.AutoField(primary_key=True)
    lastname = models.CharField(max_length=50)
    firstname = models.CharField(max_length=50) 
    birthday = models.CharField(max_length=50)
    address=models.CharField(max_length=200)
    postalcode = models.CharField(max_length=50)
    city = models.CharField(max_length=50) 
    province = models.CharField(max_length=20)
    phone=models.CharField(max_length=20)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)

  

class Product(models.Model):
    ProductId = models.AutoField(primary_key=True)
    Title = models.CharField(max_length=50)
    Description = models.CharField(max_length=500,blank=True) 
    Price = models.CharField(max_length=10)
    Stock=models.CharField(max_length=10)
    Image = models.CharField(max_length=1000)


class Admin(models.Model):
    AdminId = models.AutoField(primary_key=True)
    email = models.CharField(max_length=200)
    password = models.CharField(max_length=200)