import logging
from datetime import datetime
from rest_framework import status
from rest_framework.decorators import api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from django.views.decorators.cache import cache_page
from django.utils.decorators import method_decorator
from django.views.decorators.vary import vary_on_headers

from .services import GitHubService, GitHubAPIError
from .serializers import (
    RepositorySerializer, 
    GitHubStatsSerializer, 
    ErrorResponseSerializer
)

logger = logging.getLogger(__name__)

class GitHubRateThrottle(AnonRateThrottle):
    """Custom throttle for GitHub API endpoints."""
    rate = '30/hour'

def handle_github_error(error: Exception, context: str) -> Response:
    """Helper function to handle GitHub API errors consistently."""
    
    error_data = {
        'error': 'GitHub API Error',
        'message': str(error),
        'timestamp': datetime.now().isoformat(),
        'context': context
    }
    
    if isinstance(error, GitHubAPIError):
        error_data['status_code'] = status.HTTP_503_SERVICE_UNAVAILABLE
        return Response(error_data, status=status.HTTP_503_SERVICE_UNAVAILABLE)
    else:
        error_data['status_code'] = status.HTTP_500_INTERNAL_SERVER_ERROR
        return Response(error_data, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
@throttle_classes([GitHubRateThrottle])
@cache_page(60 * 30)  # Cache for 30 minutes
@vary_on_headers('User-Agent')
def get_repositories(request):
    """
    Get GitHub repositories for the configured user.
    
    Query Parameters:
    - limit: Number of repositories to return (default: 20, max: 50)
    - featured: If true, return only featured repositories (default: false)
    
    Returns:
    - List of repository objects with metadata
    """
    try:
        # Get query parameters
        limit = min(int(request.GET.get('limit', 20)), 50)
        featured_only = request.GET.get('featured', 'false').lower() == 'true'
        
        # Initialize GitHub service
        github_service = GitHubService()
        
        # Fetch repositories
        repos = github_service.get_repositories()
        
        # Filter featured repositories if requested
        if featured_only:
            # Consider repos with more stars or specific topics as featured
            repos = [repo for repo in repos 
                    if repo['stargazers_count'] > 0 or 
                    any(topic in ['featured', 'portfolio', 'showcase'] 
                        for topic in repo['topics'])]
        
        # Limit results
        repos = repos[:limit]
        
        # Serialize data
        serializer = RepositorySerializer(repos, many=True)
        
        return Response({
            'success': True,
            'count': len(serializer.data),
            'data': serializer.data,
            'last_updated': datetime.now().isoformat()
        })
        
    except GitHubAPIError as e:
        logger.error(f"GitHub API error in get_repositories: {e}")
        return handle_github_error(e, 'fetching repositories')
    
    except Exception as e:
        logger.error(f"Unexpected error in get_repositories: {e}")
        return handle_github_error(e, 'fetching repositories')

@api_view(['GET'])
@throttle_classes([GitHubRateThrottle])
@cache_page(60 * 60)  # Cache for 1 hour
@vary_on_headers('User-Agent')
def get_github_stats(request):
    """
    Get GitHub user statistics.
    
    Returns:
    - User statistics including total repos, stars, forks, and language breakdown
    """
    try:
        # Initialize GitHub service
        github_service = GitHubService()
        
        # Fetch user statistics
        stats = github_service.get_user_stats()
        
        # Serialize data
        serializer = GitHubStatsSerializer(stats)
        
        return Response({
            'success': True,
            'data': serializer.data
        })
        
    except GitHubAPIError as e:
        logger.error(f"GitHub API error in get_github_stats: {e}")
        return handle_github_error(e, 'fetching GitHub statistics')
    
    except Exception as e:
        logger.error(f"Unexpected error in get_github_stats: {e}")
        return handle_github_error(e, 'fetching GitHub statistics')

@api_view(['POST'])
@throttle_classes([GitHubRateThrottle])
def refresh_cache(request):
    """
    Refresh GitHub data cache.
    
    This endpoint allows manual cache refresh for updated data.
    Should be used sparingly to avoid hitting GitHub rate limits.
    """
    try:
        # Initialize GitHub service
        github_service = GitHubService()
        
        # Clear existing cache
        github_service.clear_cache()
        
        # Fetch fresh data (this will populate the cache)
        repos = github_service.get_repositories()
        stats = github_service.get_user_stats()
        
        return Response({
            'success': True,
            'message': 'Cache refreshed successfully',
            'data': {
                'repositories_count': len(repos),
                'total_stars': stats['total_stars'],
                'last_updated': datetime.now().isoformat()
            }
        })
        
    except GitHubAPIError as e:
        logger.error(f"GitHub API error in refresh_cache: {e}")
        return handle_github_error(e, 'refreshing cache')
    
    except Exception as e:
        logger.error(f"Unexpected error in refresh_cache: {e}")
        return handle_github_error(e, 'refreshing cache')

@api_view(['GET'])
def health_check(request):
    """
    GitHub API health check endpoint.
    
    Returns:
    - Service status and configuration info
    """
    try:
        github_service = GitHubService()
        
        # Check if GitHub credentials are configured
        config_status = {
            'has_token': bool(github_service.token),
            'has_username': bool(github_service.username),
            'service_available': True
        }
        
        # Try to make a simple API call to verify connectivity
        if config_status['has_username']:
            try:
                github_service._make_request(f"/users/{github_service.username}")
                config_status['api_accessible'] = True
            except:
                config_status['api_accessible'] = False
        else:
            config_status['api_accessible'] = False
        
        return Response({
            'success': True,
            'service': 'GitHub API Integration',
            'status': 'healthy' if all(config_status.values()) else 'degraded',
            'configuration': config_status,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        return Response({
            'success': False,
            'service': 'GitHub API Integration',
            'status': 'unhealthy',
            'error': str(e),
            'timestamp': datetime.now().isoformat()
        }, status=status.HTTP_503_SERVICE_UNAVAILABLE)