"""portfolio_api URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

@require_http_methods(["GET"])
def health_check(request):
    """Simple health check endpoint."""
    return JsonResponse({
        'status': 'healthy',
        'message': 'Portfolio API is running'
    })

@require_http_methods(["GET"])
def api_info(request):
    """API information endpoint."""
    return JsonResponse({
        'name': 'Portfolio API',
        'version': '1.0.0',
        'description': 'Backend API for portfolio website with GitHub integration',
        'endpoints': {
            'github': '/api/github/',
            'contact': '/api/contact/',
            'health': '/health/',
        }
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_info, name='api-info'),
    path('api/github/', include('github_api.urls')),
    path('api/contact/', include('core.urls')),
    path('health/', health_check, name='health-check'),
]