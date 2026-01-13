from rest_framework import serializers
from .models import ContactSubmission
import re

class ContactFormSerializer(serializers.ModelSerializer):
    """Serializer for contact form submissions."""
    
    class Meta:
        model = ContactSubmission
        fields = ['name', 'email', 'subject', 'message']
        extra_kwargs = {
            'name': {
                'required': True,
                'allow_blank': False,
                'max_length': 100,
                'help_text': 'Your full name'
            },
            'email': {
                'required': True,
                'help_text': 'A valid email address'
            },
            'subject': {
                'required': True,
                'allow_blank': False,
                'max_length': 200,
                'help_text': 'Brief subject of your message'
            },
            'message': {
                'required': True,
                'allow_blank': False,
                'help_text': 'Your message content'
            }
        }
    
    def validate_name(self, value):
        """Validate name field."""
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        
        # Check for suspicious patterns
        if re.search(r'[<>]|script|javascript|php|sql', value.lower()):
            raise serializers.ValidationError("Invalid characters in name.")
        
        return value.strip()
    
    def validate_subject(self, value):
        """Validate subject field."""
        if len(value.strip()) < 3:
            raise serializers.ValidationError("Subject must be at least 3 characters long.")
        
        # Check for suspicious patterns
        if re.search(r'[<>]|script|javascript|php|sql', value.lower()):
            raise serializers.ValidationError("Invalid characters in subject.")
        
        return value.strip()
    
    def validate_message(self, value):
        """Validate message field."""
        if len(value.strip()) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters long.")
        
        if len(value.strip()) > 5000:
            raise serializers.ValidationError("Message is too long. Maximum 5000 characters allowed.")
        
        # Check for suspicious patterns
        suspicious_patterns = [
            r'<script',
            r'javascript:',
            r'php',
            r'sql\s+(select|insert|update|delete|drop|create)',
            r'http[s]?://[^\s]+\.(exe|zip|rar)',  # Suspicious file downloads
        ]
        
        for pattern in suspicious_patterns:
            if re.search(pattern, value.lower()):
                raise serializers.ValidationError("Message contains suspicious content.")
        
        return value.strip()
    
    def validate_email(self, value):
        """Additional email validation."""
        # Basic email pattern validation
        email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(email_pattern, value):
            raise serializers.ValidationError("Please enter a valid email address.")
        
        # Block common spam domains
        spam_domains = [
            '10minutemail.com',
            'tempmail.org',
            'guerrillamail.com',
            'mailinator.com'
        ]
        
        domain = value.split('@')[1].lower()
        if domain in spam_domains:
            raise serializers.ValidationError("Temporary email addresses are not allowed.")
        
        return value.lower()

class ContactResponseSerializer(serializers.Serializer):
    """Serializer for contact form response."""
    
    success = serializers.BooleanField()
    message = serializers.CharField()
    timestamp = serializers.DateTimeField()