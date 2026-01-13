from django.contrib import admin
from .models import ContactSubmission

@admin.register(ContactSubmission)
class ContactSubmissionAdmin(admin.ModelAdmin):
    """Admin interface for contact form submissions."""
    
    list_display = ['name', 'email', 'subject', 'created_at', 'ip_address']
    list_filter = ['created_at']
    search_fields = ['name', 'email', 'subject', 'message']
    readonly_fields = ['created_at', 'ip_address', 'user_agent']
    ordering = ['-created_at']
    
    fieldsets = [
        ('Contact Information', {
            'fields': ['name', 'email', 'subject']
        }),
        ('Message', {
            'fields': ['message']
        }),
        ('Metadata', {
            'fields': ['created_at', 'ip_address', 'user_agent'],
            'classes': ['collapse']
        })
    ]