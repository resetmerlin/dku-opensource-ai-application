import apiClient, { ApiResponse } from '@/lib/apiClient'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { Portfolio } from '@/types/portfolio'

export async function postResumeUpload(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  return apiClient.post<
    ApiResponse<{
      professionalSummary: string
      suggestedSkills: string[]
    }>
  >('/resume/upload', formData, {
    headers: {
      'Content-Type': undefined,
    },
  })
}

export async function postCreatePortfolio(file: File) {
  const formData = new FormData()
  formData.append('file', file)

  return apiClient.post<ApiResponse<Portfolio>>('/portfolio', formData, {
    headers: {
      'Content-Type': undefined,
    },
  })
}

export function useMutateResumeUpload() {
  return useMutation<ApiResponse<any>, Error, File>({
    mutationKey: ['/api/resume/upload'],
    mutationFn: async (file: File) => {
      return await postResumeUpload(file)
    },
  })
}

export function useCreatePortfolio() {
  return useMutation<ApiResponse<Portfolio>, Error, File>({
    mutationKey: ['/api/portfolio'],
    mutationFn: async (file: File) => {
      return await postCreatePortfolio(file)
    },
  })
}

export function updatePortfolio(data: any) {
  return apiClient.put<ApiResponse<Portfolio>>('/portfolio', data, {
    headers: { 'Content-Type': 'application/json' },
  })
}

export function useUpdatePortfolio() {
  return useMutation<ApiResponse<Portfolio>, Error, File>({
    mutationKey: ['/api/portfolio'],
    mutationFn: async (data: any) => {
      return await updatePortfolio(data)
    },
  })
}

export function useResumePreview() {
  const [resumePreview, setResumePreview] = useState<{
    professionalSummary: string
    suggestedSkills: string[]
  } | null>(null)

  const mutation = useMutation<
    ApiResponse<{
      professionalSummary: string
      suggestedSkills: string[]
    }>,
    Error,
    File
  >({
    mutationKey: ['/api/resume/upload'],
    mutationFn: async (file: File) => {
      return await postResumeUpload(file)
    },
    onSuccess(data) {
      // @ts-ignore
      setResumePreview(data)
    },
  })

  return {
    resumePreview,
    uploadResume: mutation.mutate,
    isUploading: mutation.isPending,
    isSuccess: mutation.isSuccess,
  }
}
