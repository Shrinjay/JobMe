from django.shortcuts import render
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from .serializers import PostingSerializer, UserSerializerWithToken, UserSerializer, ApplicationSerializer
from .models import JobPosting, JobApplication
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core import serializers
from rest_framework.decorators import action
import json
# Create your views here.

class PostingViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
         queryset = JobPosting.objects.filter(user=self.request.GET.get('user', ''))
         return queryset
    def perform_create(self, serializer):
        
        serializer.save(user = self.request.data['user'])
    serializer_class = PostingSerializer
        

class ApplicationViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        queryset = JobApplication.objects.filter(id=self.request.GET.get('jobID', ''))
        return queryset
    serializer_class = ApplicationSerializer

class UserList(APIView):
    

    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors)

    def get(self, request):
        return Response(serializers.serialize('json', User.objects.all(), fields=('username', 'password')))