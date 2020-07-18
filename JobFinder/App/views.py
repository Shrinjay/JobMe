from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.decorators import action
from .serializers import PostingSerializer
from .models import JobPosting
# Create your views here.

class PostingViewSet(viewsets.ModelViewSet):

    queryset = JobPosting.objects.all()
    serializer_class = PostingSerializer