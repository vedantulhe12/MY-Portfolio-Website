import { Repository, GitHubStats, ContactForm, ApiResponse } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return {
        success: true,
        data,
      }
    } catch (error) {
      console.error('API request failed:', error)
      return {
        success: false,
        data: null as any,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      }
    }
  }

  async getRepositories(): Promise<ApiResponse<Repository[]>> {
    return this.request<Repository[]>('/api/github/repos/')
  }

  async getGitHubStats(): Promise<ApiResponse<GitHubStats>> {
    return this.request<GitHubStats>('/api/github/stats/')
  }

  async submitContact(data: ContactForm): Promise<ApiResponse<{ message: string }>> {
    return this.request<{ message: string }>('/api/contact/', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

export const apiClient = new ApiClient(API_URL)

// React hooks for API calls
export async function getServerSideRepositories(): Promise<Repository[]> {
  const response = await apiClient.getRepositories()
  return response.success ? response.data : []
}

export async function getServerSideGitHubStats(): Promise<GitHubStats | null> {
  const response = await apiClient.getGitHubStats()
  return response.success ? response.data : null
}