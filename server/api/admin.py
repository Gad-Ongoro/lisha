from django.contrib import admin
from . import models

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    model = User
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('email', 'otp_secret', 'is_verified', 'updated_at')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 
                                    'groups', 'user_permissions')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('id', 'first_name', 'last_name', 'email', 'username', 'otp_secret', 'is_verified', 'password'),
        }),
    )
    list_display = ('email', 'username', 'is_staff', 'is_verified', 'updated_at')
    search_fields = ('email', 'username')
    ordering = ('email',)

admin.site.register(User, CustomUserAdmin)


# Register your models here.
admin.site.register(models.Profile)
admin.site.register(models.Product)
admin.site.register(models.Order)
admin.site.register(models.Cart)
admin.site.register(models.Review)