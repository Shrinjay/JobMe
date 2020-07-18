from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from .models import JobApplication, JobPosting
class PostingSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobPosting
        fields = ('title', 'description', 'location')