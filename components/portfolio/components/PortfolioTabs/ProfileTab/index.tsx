'use client'

import { Award, PencilIcon, type LucideIcon } from 'lucide-react'
import { Avatar as AvatarUI, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import EmptyProfile from './EmptyProfile'
import { usePortfolioContext } from '@/components/portfolio/PortfolioContext'
import { useClerk, UserAvatar, UserProfile } from '@clerk/nextjs'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { useUpdatePortfolio } from '@/components/portfolio/remote'
import { Spinner } from '@/components/ui/spinner'
import { useQueryClient } from '@tanstack/react-query'
import { PORTFOLIO_QUERY_KEY } from '@/hooks/usePortfolio'

const ProfileTab = () => {
  const {
    portfolio,
    displayCoreSkills,
    displayFeaturedProjects,
    displayCareerTimeline,
    displayAchievementBadges,
    isMyPortfolio,
  } = usePortfolioContext()
  const { user } = useClerk()

  // Build default values for the entire form including nested data
  const buildDefaultValues = () => {
    const careerTimelineDefaults = displayCareerTimeline.reduce(
      (acc, item, index) => {
        acc[`careerTimeline.${index}.year`] = item.year
        acc[`careerTimeline.${index}.title`] = item.title
        acc[`careerTimeline.${index}.company`] = item.company
        return acc
      },
      {} as Record<string, any>
    )

    const featuredProjectsDefaults = displayFeaturedProjects.reduce(
      (acc, project, index) => {
        acc[`featuredProjects.${index}.title`] = project.title
        acc[`featuredProjects.${index}.desc`] = project.desc
        acc[`featuredProjects.${index}.imageUrl`] = project.imageUrl || ''
        return acc
      },
      {} as Record<string, any>
    )

    return {
      name: portfolio?.profile.name || '',
      title: portfolio?.profile.title || '',
      bio: portfolio?.profile.bio || '',
      yearsOfCareer: portfolio?.profile?.stats?.yearsOfCareer || 0,
      projects: portfolio?.profile?.stats?.projects || 0,
      ...careerTimelineDefaults,
      ...featuredProjectsDefaults,
    }
  }

  const methods = useForm({
    defaultValues: buildDefaultValues(),
  })

  const {
    register,
    formState: { dirtyFields },
    getValues,
    handleSubmit,
    watch,
  } = methods

  const queryClient = useQueryClient()

  const { mutateAsync, isPending } = useUpdatePortfolio()
  const onSaveProfile = async (data: any) => {
    Object.entries(data).forEach(([key, val]) => {
      if (!val) {
        delete data[key]
      }
    })

    console.log(data)

    await mutateAsync(data)

    queryClient.invalidateQueries({ queryKey: [PORTFOLIO_QUERY_KEY] })
  }

  if (!portfolio) {
    return <EmptyProfile />
  }

  const { profile } = portfolio
  const initials = profile.name
    ?.split(' ')
    ?.map((n) => n[0])
    ?.join('')
    ?.toUpperCase()

  const hasAnyChanges = Object.keys(dirtyFields).length > 0

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSaveProfile)} className="space-y-12">
        <div className="rounded-lg border border-gray-200 bg-white p-8 ">
          <div className="flex items-start space-x-8">
            <AvatarUI className="h-20 w-20">
              {isMyPortfolio ? (
                <AvatarImage src={user?.imageUrl} alt={profile.name} />
              ) : profile.avatar ? (
                <AvatarImage src={profile.avatar} alt={profile.name} />
              ) : (
                <AvatarFallback className="bg-gray-100 text-lg font-medium text-gray-600">
                  {initials}
                </AvatarFallback>
              )}
            </AvatarUI>
            <div className="flex-1">
              {isMyPortfolio ? (
                <>
                  <input
                    type="text"
                    {...register('name')}
                    className={`mb-1 text-xl font-medium bg-transparent border-b transition-colors w-full ${
                      dirtyFields.name
                        ? 'text-slate-900 border-yellow-400 focus:border-yellow-500'
                        : 'text-slate-900 border-transparent hover:border-slate-300 focus:border-slate-400'
                    } focus:outline-none`}
                  />
                  <input
                    type="text"
                    {...register('title')}
                    className={`mb-8 bg-transparent border-b transition-colors w-full ${
                      dirtyFields.title
                        ? 'text-slate-500 border-yellow-400 focus:border-yellow-500'
                        : 'text-slate-500 border-transparent hover:border-slate-300 focus:border-slate-400'
                    } focus:outline-none`}
                  />
                </>
              ) : (
                <>
                  <h1 className="mb-1 text-xl font-medium text-slate-900">{profile.name}</h1>
                  <p className="mb-8 text-slate-500">{profile.title}</p>
                </>
              )}
              <div className="flex items-center space-x-8">
                <div>
                  {isMyPortfolio ? (
                    <input
                      type="number"
                      {...register('yearsOfCareer', { valueAsNumber: true })}
                      className={`text-lg font-medium bg-transparent border-b transition-colors w-16 ${
                        dirtyFields.yearsOfCareer
                          ? 'text-slate-900 border-yellow-400 focus:border-yellow-500'
                          : 'text-slate-900 border-transparent hover:border-slate-300 focus:border-slate-400'
                      } focus:outline-none`}
                    />
                  ) : (
                    <div className="text-lg font-medium text-slate-900">
                      {profile.stats?.yearsOfCareer || 0}
                    </div>
                  )}
                  <div className="text-xs text-slate-400">Years of Career</div>
                </div>
                <div>
                  {isMyPortfolio ? (
                    <input
                      type="number"
                      {...register('projects', { valueAsNumber: true })}
                      className={`text-lg font-medium bg-transparent border-b transition-colors w-16 ${
                        dirtyFields.projects
                          ? 'text-slate-900 border-yellow-400 focus:border-yellow-500'
                          : 'text-slate-900 border-transparent hover:border-slate-300 focus:border-slate-400'
                      } focus:outline-none`}
                    />
                  ) : (
                    <div className="text-lg font-medium text-slate-900">
                      {profile.stats?.projects || 0}
                    </div>
                  )}
                  <div className="text-xs text-slate-400">Projects</div>
                </div>
              </div>
            </div>
            {isMyPortfolio && (
              <div className="flex items-center space-x-2">
                <Button
                  type="submit"
                  disabled={!hasAnyChanges}
                  className={`h-8 cursor-pointer whitespace-nowrap rounded-button px-3 text-sm text-white transition-all ${
                    hasAnyChanges
                      ? 'bg-slate-900 hover:bg-slate-800'
                      : 'bg-slate-400 cursor-not-allowed'
                  }`}
                >
                  {isPending && <Spinner />}
                  Save
                </Button>
              </div>
            )}
          </div>
        </div>

        <Card
          className={`rounded-lg border border-gray-100 bg-white p-6 ${
            dirtyFields.bio ? 'text-slate-600 border-yellow-400 focus:border-yellow-500' : ''
          }`}
        >
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-medium text-slate-900">About</h2>
            <Badge className="rounded bg-gray-50 px-2 py-1 text-xs text-gray-500">
              AI Enhanced
            </Badge>
          </div>
          {isMyPortfolio ? (
            <textarea
              {...register('bio')}
              className={`w-full text-sm leading-relaxed bg-transparent border rounded-lg p-2 transition-colors min-h-[100px] text-slate-600 border-transparent focus:outline-none resize-none`}
              placeholder="Write about yourself..."
            />
          ) : (
            <p className="text-sm leading-relaxed text-slate-600">{profile.bio}</p>
          )}
        </Card>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <div>
              <h3 className="mb-4 text-sm font-medium text-slate-900">Core Skills</h3>
              <div className="flex flex-wrap gap-2">
                {displayCoreSkills.map((skill) => (
                  <Badge
                    key={skill}
                    className="cursor-pointer rounded border-0 bg-gray-50 px-2 py-1 text-xs text-slate-600 hover:bg-gray-100"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-medium text-slate-900">Featured Experiences</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {displayFeaturedProjects.map((project, i) => (
                  <FeatureExperiencedCard
                    index={i}
                    title={project.title}
                    desc={project.desc}
                    baseImageUrl={project.imageUrl}
                    isEditable={isMyPortfolio}
                    key={i}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="mb-4 text-sm font-medium text-slate-900">Career Timeline</h3>
              <div className="space-y-3">
                {displayCareerTimeline.map((item, index) => (
                  <CareerTimeline
                    key={item.id || item.year}
                    index={index}
                    id={item.id}
                    year={item.year}
                    title={item.title}
                    company={item.company}
                    isEditable={isMyPortfolio}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-medium text-slate-900">Achievements</h3>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map((item) => (
                  <Card
                    key={item}
                    className="group cursor-pointer border-2 border-dashed border-gray-200 p-4 text-center transition-all duration-300 hover:border-yellow-200 hover:bg-yellow-50/30"
                  >
                    <Award className="mb-2 inline-block h-5 w-5 text-gray-300 transition-colors group-hover:text-yellow-400" />
                    <div className="text-xs text-slate-400">Add Achievement</div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  )
}

function CareerTimeline(props: {
  index: number
  id?: string
  year: string
  title: string
  company: string
  isEditable?: boolean
  onUpdate?: (id: string, field: 'year' | 'title' | 'company', value: string) => void
}) {
  const {
    register,
    formState: { dirtyFields },
    getValues,
  } = useFormContext()

  const yearField = `careerTimeline.${props.index}.year` as const
  const titleField = `careerTimeline.${props.index}.title` as const
  const companyField = `careerTimeline.${props.index}.company` as const

  const isYearChanged = !!dirtyFields[yearField]
  const isTitleChanged = !!dirtyFields[titleField]
  const isCompanyChanged = !!dirtyFields[companyField]
  const isValueChanged = isYearChanged || isTitleChanged || isCompanyChanged

  const handleBlur = (field: 'year' | 'title' | 'company') => {
    const fieldMap = {
      year: yearField,
      title: titleField,
      company: companyField,
    }
    const value = getValues(fieldMap[field])
    if (dirtyFields[fieldMap[field]] && props.isEditable && props.onUpdate && props.id) {
      props.onUpdate(props.id, field, value)
    }
  }

  if (!props.isEditable) {
    return (
      <div className="flex items-start space-x-3 pb-2">
        <div className="w-8 text-xs text-slate-400">{props.year}</div>
        <div className="flex-1">
          <div className="text-sm font-medium text-slate-900">{props.title}</div>
          <div className="text-xs text-slate-500">{props.company}</div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={` flex items-start space-x-3 pb-2 group relative ${isValueChanged ? 'pl-3 border-l-2 border-yellow-400' : ''}`}
    >
      {isValueChanged && (
        <div className="absolute -left-1 top-0 bottom-0 w-0.5 bg-yellow-400 rounded-full" />
      )}
      <input
        type="text"
        {...register(yearField, { maxLength: 4 })}
        onBlur={() => handleBlur('year')}
        className={`mt-1 w-8 text-xs text-slate-400 bg-transparent border-b transition-colors ${
          isYearChanged
            ? 'border-yellow-400 focus:border-yellow-500'
            : 'border-transparent hover:border-slate-300 focus:border-slate-400'
        } focus:outline-none`}
        maxLength={4}
      />
      <div className="flex-1 space-y-1">
        <input
          type="text"
          {...register(titleField)}
          onBlur={() => handleBlur('title')}
          className={`w-full text-sm font-medium text-slate-900 bg-transparent border-b transition-colors ${
            isTitleChanged
              ? 'border-yellow-400 focus:border-yellow-500'
              : 'border-transparent hover:border-slate-300 focus:border-slate-400'
          } focus:outline-none`}
          placeholder="Job Title"
        />
        <input
          type="text"
          {...register(companyField)}
          onBlur={() => handleBlur('company')}
          className={`w-full text-xs text-slate-500 bg-transparent border-b transition-colors ${
            isCompanyChanged
              ? 'border-yellow-400 focus:border-yellow-500'
              : 'border-transparent hover:border-slate-300 focus:border-slate-400'
          } focus:outline-none`}
          placeholder="Company Name"
        />
      </div>
    </div>
  )
}

function FeatureExperiencedCard({
  index,
  title,
  desc,
  baseImageUrl,
  isEditable,
}: {
  index: number
  title: string
  desc: string
  baseImageUrl?: string
  isEditable?: boolean
}) {
  const {
    register,
    formState: { dirtyFields },
    watch,
  } = useFormContext()

  const titleField = `featuredProjects.${index}.title` as const
  const descField = `featuredProjects.${index}.desc` as const
  const imageUrlField = `featuredProjects.${index}.imageUrl` as const

  const imageUrl = watch(imageUrlField)

  const isTitleChanged = !!dirtyFields[titleField]
  const isDescChanged = !!dirtyFields[descField]
  const isImageUrlChanged = !!dirtyFields[imageUrlField]
  const isValueChanged = isTitleChanged || isDescChanged || isImageUrlChanged

  if (!isEditable) {
    return (
      <Card className="cursor-pointer rounded border border-gray-100 bg-white p-4 transition-shadow hover:shadow-sm">
        <div className="mb-3 aspect-video overflow-hidden rounded bg-gray-50">
          {imageUrl || baseImageUrl ? (
            <img src={imageUrl} alt={title} className="h-full w-full object-cover object-top" />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-slate-400 text-xs">
              No image
            </div>
          )}
        </div>
        <h4 className="text-sm font-medium text-slate-900">{title}</h4>
        <p className="mt-1 text-xs text-slate-500 line-clamp-2">{desc}</p>
      </Card>
    )
  }

  return (
    <Card
      className={`cursor-pointer rounded border bg-white p-4 transition-shadow hover:shadow-sm ${
        isValueChanged ? 'border-yellow-400' : 'border-gray-100'
      }`}
    >
      <div className="mb-3 aspect-video overflow-hidden rounded bg-gray-50 relative group">
        {imageUrl || baseImageUrl ? (
          <img
            src={imageUrl || baseImageUrl}
            alt={title}
            className="h-full w-full object-cover object-top"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-slate-400 text-xs">
            No image
          </div>
        )}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="text-white text-xs">Click to edit image URL</span>
        </div>
      </div>
      <input
        type="text"
        {...register(imageUrlField)}
        className={`w-full text-xs bg-transparent border-b transition-colors mb-2 ${
          isImageUrlChanged
            ? 'text-slate-600 border-yellow-400 focus:border-yellow-500'
            : 'text-slate-600 border-transparent hover:border-slate-300 focus:border-slate-400'
        } focus:outline-none`}
        placeholder="Image URL"
      />
      <input
        type="text"
        {...register(titleField)}
        className={`w-full text-sm font-medium bg-transparent border-b transition-colors  ${
          isTitleChanged
            ? 'text-slate-900 border-yellow-400 focus:border-yellow-500'
            : 'text-slate-900 border-transparent hover:border-slate-300 focus:border-slate-400'
        } focus:outline-none`}
        placeholder="Project Title"
      />
      <textarea
        {...register(descField)}
        className={`w-full text-xs bg-transparent border rounded p-1 transition-colors resize-none ${
          isDescChanged
            ? 'text-slate-500 border-yellow-400 focus:border-yellow-500'
            : 'text-slate-500 border-transparent hover:border-slate-300 focus:border-slate-400'
        } focus:outline-none [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]`}
        placeholder="Project Description"
        rows={4}
      />
    </Card>
  )
}

export default ProfileTab
