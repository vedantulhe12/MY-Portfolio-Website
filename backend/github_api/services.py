import requests
import logging
from typing import Dict, List, Optional
from datetime import datetime
from django.conf import settings
from django.core.cache import cache

logger = logging.getLogger(__name__)

class GitHubAPIError(Exception):
    """Custom exception for GitHub API errors."""
    pass

class GitHubService:
    """Service class for GitHub API integration."""
    
    BASE_URL = "https://api.github.com"
    
    def __init__(self):
        self.token = settings.GITHUB_TOKEN
        self.username = settings.GITHUB_USERNAME
        self.headers = {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': f'Portfolio-API/1.0 ({self.username})',
        }
        
        if self.token:
            self.headers['Authorization'] = f'token {self.token}'
    
    def _make_request(self, endpoint: str, params: Optional[Dict] = None) -> Dict:
        """Make authenticated request to GitHub API."""
        url = f"{self.BASE_URL}{endpoint}"
        
        try:
            response = requests.get(url, headers=self.headers, params=params, timeout=10)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            logger.error(f"GitHub API request failed: {e}")
            raise GitHubAPIError(f"Failed to fetch data from GitHub: {str(e)}")
    
    def get_repositories(self, per_page: int = 50) -> List[Dict]:
        """
        Fetch user repositories from GitHub API.
        
        Args:
            per_page: Number of repositories to fetch per page
            
        Returns:
            List of repository dictionaries
        """
        cache_key = f"github_repos_{self.username}"
        cached_data = cache.get(cache_key)
        
        if cached_data:
            logger.info("Returning cached repository data")
            return cached_data
        
        if not self.username:
            raise GitHubAPIError("GitHub username not configured")
        
        try:
            repos_data = []
            page = 1
            
            while True:
                endpoint = f"/users/{self.username}/repos"
                params = {
                    'type': 'public',
                    'sort': 'updated',
                    'direction': 'desc',
                    'per_page': per_page,
                    'page': page
                }
                
                data = self._make_request(endpoint, params)
                
                if not data:
                    break
                
                # Filter and process repositories
                for repo in data:
                    if not repo.get('fork', True):  # Exclude forks
                        processed_repo = {
                            'id': repo['id'],
                            'name': repo['name'],
                            'description': repo.get('description', '') or f"A project by {self.username}",
                            'html_url': repo['html_url'],
                            'homepage': repo.get('homepage'),
                            'topics': repo.get('topics', []),
                            'stargazers_count': repo['stargazers_count'],
                            'forks_count': repo['forks_count'],
                            'language': repo.get('language'),
                            'updated_at': repo['updated_at'],
                            'created_at': repo['created_at'],
                            'visibility': repo.get('visibility', 'public'),
                        }
                        repos_data.append(processed_repo)
                
                # If we got less than per_page results, we're done
                if len(data) < per_page:
                    break
                
                page += 1
                
                # Limit to prevent too many requests
                if page > 10:
                    break
            
            # Sort by stars and update date
            repos_data.sort(key=lambda x: (x['stargazers_count'], x['updated_at']), reverse=True)
            
            # Cache for 1 hour
            cache.set(cache_key, repos_data, 3600)
            logger.info(f"Fetched and cached {len(repos_data)} repositories")
            
            return repos_data
            
        except Exception as e:
            logger.error(f"Error fetching repositories: {e}")
            raise GitHubAPIError(f"Failed to fetch repositories: {str(e)}")
    
    def get_user_stats(self) -> Dict:
        """
        Fetch user statistics from GitHub API.
        
        Returns:
            Dictionary containing user statistics
        """
        cache_key = f"github_stats_{self.username}"
        cached_data = cache.get(cache_key)
        
        if cached_data:
            logger.info("Returning cached stats data")
            return cached_data
        
        if not self.username:
            raise GitHubAPIError("GitHub username not configured")
        
        try:
            # Get user info
            user_data = self._make_request(f"/users/{self.username}")
            
            # Get repositories for language stats
            repos = self.get_repositories()
            
            # Calculate statistics
            total_repos = len(repos)
            total_stars = sum(repo['stargazers_count'] for repo in repos)
            total_forks = sum(repo['forks_count'] for repo in repos)
            
            # Language statistics
            language_counts = {}
            for repo in repos:
                if repo['language']:
                    language_counts[repo['language']] = language_counts.get(repo['language'], 0) + 1
            
            # Calculate language percentages and assign colors
            total_repos_with_language = sum(language_counts.values())
            language_colors = {
                'Python': '#3776ab',
                'JavaScript': '#f1e05a',
                'TypeScript': '#2b7489',
                'Java': '#b07219',
                'C++': '#f34b7d',
                'C': '#555555',
                'HTML': '#e34c26',
                'CSS': '#1572b6',
                'PHP': '#4f5d95',
                'Ruby': '#701516',
                'Go': '#00ADD8',
                'Rust': '#dea584',
                'Swift': '#ffac45',
                'Kotlin': '#F18E33',
                'Dart': '#00B4AB',
                'Shell': '#89e051',
                'Vue': '#2c3e50',
                'React': '#61dafb',
            }
            
            languages = []
            for lang, count in sorted(language_counts.items(), key=lambda x: x[1], reverse=True):
                if total_repos_with_language > 0:
                    percentage = (count / total_repos_with_language) * 100
                    languages.append({
                        'name': lang,
                        'count': count,
                        'percentage': round(percentage, 1),
                        'color': language_colors.get(lang, '#586069')
                    })
            
            stats = {
                'total_repos': total_repos,
                'total_stars': total_stars,
                'total_forks': total_forks,
                'public_repos': user_data.get('public_repos', total_repos),
                'followers': user_data.get('followers', 0),
                'following': user_data.get('following', 0),
                'languages': languages[:10],  # Top 10 languages
                'last_updated': datetime.now().isoformat(),
            }
            
            # Cache for 2 hours
            cache.set(cache_key, stats, 7200)
            logger.info(f"Fetched and cached user statistics")
            
            return stats
            
        except Exception as e:
            logger.error(f"Error fetching user stats: {e}")
            raise GitHubAPIError(f"Failed to fetch user statistics: {str(e)}")
    
    def clear_cache(self):
        """Clear all GitHub-related cache."""
        cache.delete(f"github_repos_{self.username}")
        cache.delete(f"github_stats_{self.username}")
        logger.info("GitHub cache cleared")