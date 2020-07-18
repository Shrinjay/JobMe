from django.db import models

# Create your models here.

class JobPosting(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=200)

class JobApplication(models.Model):
    applicant_name = models.CharField(max_length=120)
    applicant_skills = models.TextField()
    applicant_wage = models.IntegerField()
    Job = models.ForeignKey(JobPosting, on_delete=models.CASCADE)



    


