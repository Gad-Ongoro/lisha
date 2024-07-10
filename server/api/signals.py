from django.db.models.signals import post_save
from django.dispatch import receiver
from . import models
from .models import Profile

@receiver(post_save, sender=models.CustomUser)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, role='default')

@receiver(post_save, sender=models.CustomUser)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()