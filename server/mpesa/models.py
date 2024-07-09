from django.db import models
from uuid import uuid4

# Create your models here.
class Transaction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    transaction_id = models.CharField(max_length=100)
    status = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=20)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)