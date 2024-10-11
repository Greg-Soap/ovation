'use client'

import ovationService from '@/services/ovation.service'
import { useQuery } from '@tanstack/react-query'
import type { UserData } from '@/models/all.model'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from '@/components/error-boundary'
import { GetStarted } from './_components/get-started'
import { Header } from './_components/header'
import { Ranking } from './_components/ranking'
import { MostViewed } from './_components/most-viewed'
import { useAppStore } from '@/store/use-app-store'
import { LoginToView } from './_components/login-to-view'

export default function Page() {
  const { user, notUser } = useAppStore()

  const { data: experiences } = useQuery({
    queryKey: ['experiences'],
    queryFn: () => ovationService.getExperience(user?.userId as string),
  })

  const { data: socials } = useQuery({
    queryKey: ['socials'],
    queryFn: () => ovationService.getSocialLinks(user?.userId as string),
  })

  return (
    <div className="flex flex-col w-full bg-[#111115] h-fit items-center justify-center">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Header />
        {user && (
          <GetStarted
            user={user as UserData}
            socials={socials?.data?.data || {}}
            experiences={experiences?.data?.data || []}
          />
        )}
        <div className="flex flex-col lg:grid lg:grid-cols-3 w-[95%] gap-5">
          <div className="col-span-2 mt-10 mb-[20px] flex flex-col gap-10">
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <Ranking />
            </ErrorBoundary>
          </div>
          {notUser ? (
            <LoginToView />
          ) : (
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <MostViewed />
            </ErrorBoundary>
          )}
        </div>
      </ErrorBoundary>
    </div>
  )
}
