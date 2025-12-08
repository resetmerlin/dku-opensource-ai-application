import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios'

export interface ApiError {
  message: string
  status?: number
  code?: string
  data?: unknown
}

export interface ApiResponse<T = unknown> {
  data: T
  message?: string
  success: boolean
}

class ApiClient {
  private instance: AxiosInstance

  constructor(baseURL?: string) {
    this.instance = axios.create({
      baseURL: baseURL || process.env.NEXT_PUBLIC_API_URL || '/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.setupInterceptors()
  }

  private setupInterceptors(): void {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (typeof window !== 'undefined') {
          const token = localStorage.getItem('auth_token')
          if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`
          }
        }
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(this.handleError(error))
      }
    )

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        return Promise.reject(this.handleError(error))
      }
    )
  }

  private handleError(error: AxiosError): ApiError {
    const apiError: ApiError = {
      message: 'An unexpected error occurred',
      status: error.response?.status,
      code: error.code,
      data: error.response?.data,
    }

    if (error.response) {
      const responseData = error.response.data as { message?: string }
      apiError.message =
        responseData?.message ||
        error.message ||
        `Request failed with status ${error.response.status}`
    } else if (error.request) {
      apiError.message = 'No response received from server'
    } else {
      apiError.message = error.message || 'Request setup failed'
    }

    return apiError
  }

  public async get<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.get<T>(url, config)
    return response.data
  }

  public async post<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.post<T>(url, data, config)
    return response.data
  }

  public async put<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.put<T>(url, data, config)
    return response.data
  }

  public async patch<T = unknown, D = unknown>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.patch<T>(url, data, config)
    return response.data
  }

  public async delete<T = unknown>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.instance.delete<T>(url, config)
    return response.data
  }

  public setAuthToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token)
    }
    this.instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
  }

  public clearAuthToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token')
    }
    delete this.instance.defaults.headers.common['Authorization']
  }

  public getAxiosInstance(): AxiosInstance {
    return this.instance
  }
}

export const apiClient = new ApiClient()

export default apiClient
