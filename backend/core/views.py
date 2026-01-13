import logging
from datetime import datetime, timedelta
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from django.core.cache import cache
from django.views.decorators.csrf import csrf_exempt

from .models import ContactSubmission
from .serializers import ContactFormSerializer, ContactResponseSerializer

logger = logging.getLogger(__name__)

class ContactRateThrottle(AnonRateThrottle):
    """Custom throttle for contact form submissions."""
    rate = '5/hour'  # Allow 5 submissions per hour per IP

def get_client_ip(request):
    """Get client IP address from request."""
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

def is_spam_submission(request, data):
    """Basic spam detection."""
    
    # Check for honeypot field (should be empty)
    if request.data.get('website'):  # Hidden field
        logger.warning(f"Spam detected: honeypot field filled from {get_client_ip(request)}")
        return True
    
    # Check submission frequency per IP
    client_ip = get_client_ip(request)
    recent_submissions_key = f"contact_submissions_{client_ip}"
    recent_count = cache.get(recent_submissions_key, 0)
    
    if recent_count >= 3:  # Max 3 submissions per hour from same IP
        logger.warning(f"Spam detected: too many submissions from {client_ip}")
        return True
    
    # Check for duplicate content in recent submissions
    message_hash = hash(data.get('message', ''))
    recent_message_key = f"contact_message_{message_hash}"
    
    if cache.get(recent_message_key):
        logger.warning(f"Spam detected: duplicate message from {client_ip}")
        return True
    
    # Check message length and patterns
    message = data.get('message', '')
    if len(message) < 10:
        return True
    
    # Check for too many links
    import re
    urls = re.findall(r'http[s]?://(?:[a-zA-Z]|[0-9]|[$-_@.&+]|[!*\\(\\),]|(?:%[0-9a-fA-F][0-9a-fA-F]))+', message)
    if len(urls) > 2:
        logger.warning(f"Spam detected: too many URLs from {client_ip}")
        return True
    
    return False

@api_view(['POST'])
@throttle_classes([ContactRateThrottle])
@csrf_exempt
def submit_contact_form(request):
    """
    Submit contact form.
    
    Expected data:
    - name: Full name
    - email: Valid email address
    - subject: Message subject
    - message: Message content
    
    Returns:
    - Success/error response
    """
    try:
        # Get client information
        client_ip = get_client_ip(request)
        user_agent = request.META.get('HTTP_USER_AGENT', '')
        
        # Basic spam detection
        if is_spam_submission(request, request.data):
            return Response({
                'success': False,
                'message': 'Submission rejected. Please try again later.',
                'timestamp': datetime.now().isoformat()
            }, status=status.HTTP_429_TOO_MANY_REQUESTS)
        
        # Validate form data
        serializer = ContactFormSerializer(data=request.data)
        
        if not serializer.is_valid():
            return Response({
                'success': False,
                'message': 'Invalid form data.',
                'errors': serializer.errors,
                'timestamp': datetime.now().isoformat()
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Save submission
        contact_submission = serializer.save(
            ip_address=client_ip,
            user_agent=user_agent
        )
        
        # Update spam detection counters
        recent_submissions_key = f"contact_submissions_{client_ip}"
        recent_count = cache.get(recent_submissions_key, 0)
        cache.set(recent_submissions_key, recent_count + 1, 3600)  # 1 hour
        
        # Cache message hash to prevent duplicates
        message_hash = hash(contact_submission.message)
        cache.set(f"contact_message_{message_hash}", True, 3600)  # 1 hour
        
        logger.info(f"Contact form submitted successfully from {client_ip}")
        
        # TODO: Send email notification (implement email service)
        # send_contact_notification(contact_submission)
        
        return Response({
            'success': True,
            'message': 'Thank you for your message! I\'ll get back to you soon.',
            'timestamp': datetime.now().isoformat()
        }, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        logger.error(f"Error submitting contact form: {e}")
        return Response({
            'success': False,
            'message': 'An error occurred while submitting your message. Please try again.',
            'timestamp': datetime.now().isoformat()
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def contact_info(request):
    """
    Get contact information and form configuration.
    
    Returns:
    - Contact details and form settings
    """
    return Response({
        'success': True,
        'data': {
            'form_fields': [
                {
                    'name': 'name',
                    'type': 'text',
                    'required': True,
                    'placeholder': 'Your full name',
                    'max_length': 100
                },
                {
                    'name': 'email',
                    'type': 'email',
                    'required': True,
                    'placeholder': 'your.email@example.com'
                },
                {
                    'name': 'subject',
                    'type': 'text',
                    'required': True,
                    'placeholder': 'Subject of your message',
                    'max_length': 200
                },
                {
                    'name': 'message',
                    'type': 'textarea',
                    'required': True,
                    'placeholder': 'Your message...',
                    'max_length': 5000
                }
            ],
            'submission_limits': {
                'max_per_hour': 3,
                'max_message_length': 5000,
                'max_urls': 2
            }
        }
    })