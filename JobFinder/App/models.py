from django.db import models

# Create your models here.

class JobPosting(models.Model):
    user = models.CharField(max_length=120)
    title = models.CharField(max_length=200)
    description = models.TextField()
    location = models.CharField(max_length=120)

    def __str__(self):
        return self.title

class JobApplication(models.Model):
    user = models.CharField(max_length=120)
    applicant_name = models.CharField(max_length=120)
    applicant_skills = models.TextField()
    applicant_wage = models.IntegerField()
    location = models.CharField(max_length=120)
    Job = models.ForeignKey(JobPosting, on_delete=models.CASCADE) 

    def __str__(self):
        return self.title+self.Job



    


