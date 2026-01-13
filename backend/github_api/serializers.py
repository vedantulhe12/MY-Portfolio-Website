from rest_framework import serializers
from typing import List, Dict

class RepositorySerializer(serializers.Serializer):
    """Serializer for GitHub repository data."""
    
    id = serializers.IntegerField()
    name = serializers.CharField(max_length=255)
    description = serializers.CharField(allow_blank=True)
    html_url = serializers.URLField()
    homepage = serializers.URLField(required=False, allow_null=True, allow_blank=True)
    topics = serializers.ListField(child=serializers.CharField(max_length=50), default=list)
    stargazers_count = serializers.IntegerField(min_value=0)
    forks_count = serializers.IntegerField(min_value=0)
    language = serializers.CharField(max_length=50, allow_null=True, required=False)
    updated_at = serializers.DateTimeField()
    created_at = serializers.DateTimeField()
    visibility = serializers.CharField(max_length=20, default='public')

class LanguageStatsSerializer(serializers.Serializer):
    """Serializer for language statistics."""
    
    name = serializers.CharField(max_length=50)
    count = serializers.IntegerField(min_value=0)
    percentage = serializers.FloatField(min_value=0, max_value=100)
    color = serializers.CharField(max_length=7)  # Hex color code

class GitHubStatsSerializer(serializers.Serializer):
    """Serializer for GitHub user statistics."""
    
    total_repos = serializers.IntegerField(min_value=0)
    total_stars = serializers.IntegerField(min_value=0)
    total_forks = serializers.IntegerField(min_value=0)
    public_repos = serializers.IntegerField(min_value=0)
    followers = serializers.IntegerField(min_value=0)
    following = serializers.IntegerField(min_value=0)
    languages = LanguageStatsSerializer(many=True)
    last_updated = serializers.DateTimeField()

class ErrorResponseSerializer(serializers.Serializer):
    """Serializer for error responses."""
    
    error = serializers.CharField()
    message = serializers.CharField()
    status_code = serializers.IntegerField()
    timestamp = serializers.DateTimeField()