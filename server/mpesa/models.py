from django.db import models
from uuid import uuid4
from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import MinValueValidator

User = get_user_model()

class Transaction(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    phone_number = models.CharField(max_length=13)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    checkout_request_id = models.CharField(max_length=100, unique=True)
    merchant_request_id = models.CharField(max_length=100, unique=True)
    mpesa_receipt_number = models.CharField(max_length=100, blank=True, null=True)
    status = models.CharField(max_length=20, default='Pending')
    result_description = models.TextField(blank=True, null=True)
    transaction_date = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.phone_number} - {self.amount} - {self.status}"