import { Button } from '@/components/ui/button'
import type {
  UserData,
  UserExperience,
  UserSocialsMod,
} from '@/models/all.model'
import Link from 'next/link'

export function GetStarted({
  user,
  socials,
  experiences,
}: {
  user: UserData
  socials: UserSocialsMod
  experiences: UserExperience[]
}) {
  const tasks = [
    {
      title: 'ADD BASIC PROFILE INFORMATION',
      description: '"Personal info" - Bio, Profile, Picture, Location, etc.',
      icon: '/assets/images/profile/task2.png',
      link: '/apps/settings?tab=Personal Info',
      buttonText: 'Add info',
      isComplete: !!(user?.bio && user?.location && user?.profileImage),
    },
    {
      title: 'ADD A LINK',
      description:
        'Link to your LinkedIn, Twitter, etc. Make Ovation your web3 landing page.',
      icon: '/assets/images/profile/task3.png',
      link: '/apps/settings?tab=Socials',
      buttonText: 'Add Socials',
      isComplete: Object.keys(socials || {}).length > 0,
    },
    {
      title: 'ADD YOUR EXPERIENCE',
      description: "Show the world what you've contributed to!",
      icon: '/assets/images/profile/task1.png',
      link: '/apps/settings?tab=Experience',
      buttonText: 'Add Experience',
      isComplete: experiences?.length > 0,
    },
  ]

  const incompleteTasks = tasks.filter((task) => !task.isComplete)

  if (incompleteTasks.length === 0) {
    return null
  }

  return (
    <div className="w-[95%] h-fit rounded-[14px] flex flex-col p-6 border border-[#353538] gap-[30px] mt-10">
      <div className="flex flex-col gap-1">
        <p className=" font-medium">GET STARTED</p>
        <p className="text-light">
          Complete your profile to earn the profile complete badge
        </p>
      </div>

      <div className="w-full h-fit flex flex-col gap-4">
        {incompleteTasks.map((task, index) => (
          <div
            key={index}
            className="flex flex-col lg:flex-row gap-4 bg-[#18181C] border border-[#FFFFFF14] rounded-[10px] items-start lg:items-center justify-between px-5 py-10"
          >
            <div className="flex items-start lg:items-center gap-4 flex-col lg:flex-row">
              <div className="flex items-center justify-center rounded-full min-w-11 min-h-11 bg-[#333726]">
                <img
                  src={task.icon}
                  alt="task icon"
                  className="w-[22px] h-[22px]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <p className=" font-semibold text-sm">{task.title}</p>
                <p className="text-xs text-lighter">{task.description}</p>
              </div>
            </div>
            <Button
              asChild
              className="transition-all duration-300 mt-2 hover:opacity-80"
            >
              <Link
                href={task.link}
                className="text-[10px] text-[#111115] font-medium"
              >
                {task.buttonText}
              </Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}
