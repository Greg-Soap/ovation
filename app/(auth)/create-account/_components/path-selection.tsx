import { Button } from '@/components/ui/button'
import { FormControl, FormField, FormItem } from '@/components/ui/form'
import ovationService from '@/services/ovation.service'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import PathICon from '@/components/icons/pathIcon'
import MiniLoader from '@/components/mini-loader'

export default function PathSelection({
  form,
  setPage,
}: {
  form: any
  setPage: (page: number) => void
}) {
  const [active, setActive] = useState('')
  const pathColors = ['#cff073', '#EF91FF', '#FF9B02', '#0094FF']
  const pathBackgrounds = ['#283502', '#42044C', '#2F2009', '#0B293F']

  const { data: pathOptions, isLoading } = useQuery({
    queryKey: ['path'],
    queryFn: () => ovationService.getPath(),
  })

  function handleButtonClick(pathId: string) {
    form.setValue('userPath.pathId', pathId)
    setActive(pathId)
  }

  return (
    <form
      onSubmit={form.handleSubmit(() => setPage(3))}
      className="flex flex-col gap-7"
    >
      <FormField
        control={form.control}
        name="userPath.pathId"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <div className="flex flex-col md:flex-row items-center flex-wrap w-full gap-4">
                {isLoading ? (
                  <div className="flex justify-center items-center w-full h-[400px]">
                    <MiniLoader />
                  </div>
                ) : pathOptions?.data?.data?.length === 0 ? (
                  <p>No path options available</p>
                ) : (
                  pathOptions?.data?.data?.map((option, index) => (
                    <Button
                      key={option.pathId}
                      onClick={() => handleButtonClick(option.pathId)}
                      type="button"
                      className={`${
                        active === option.pathId
                          ? `border-[${pathColors[index % 4]}] scale-95 shadow-lg`
                          : 'border-[#353538]'
                      } h-[234px] hover:scale-95 max-w-[242px] bg-transparent border-[1px] flex flex-col gap-2 rounded-lg`}
                    >
                      <span
                        className={`rounded-full mb-5 w-9 h-9 bg-[${pathBackgrounds[index % 4]}] items-center flex justify-center`}
                      >
                        <PathICon strokeLine={pathColors[index % 4]} />
                      </span>
                      <h3 className="font-semibold text-sm text-white">
                        {option.name.toUpperCase()}
                      </h3>
                      <p className="text-[11px] text-wrap text-[#B3B3B3]">
                        {option.description}
                      </p>
                    </Button>
                  ))
                )}
              </div>
            </FormControl>
          </FormItem>
        )}
      />
      <Button
        type="submit"
        className="hover:scale-95 w-full h-[52px] text-sm font-semibold"
      >
        Continue
      </Button>
    </form>
  )
}
