import { Button } from '@/components/ui/button'
import ovationService from '@/services/ovation.service'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import PathICon from '@/components/icons/pathIcon'
import MiniLoader from '@/components/mini-loader'
import { FormField } from '@/components/customs/custom-form'

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
      <FormField name="userPath.pathId" form={form}>
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
                style={{
                  borderColor:
                    active === option.pathId
                      ? pathColors[index % 4]
                      : '#353538',
                }}
                className={`${
                  active === option.pathId ? 'scale-95 shadow-lg' : ''
                } h-[234px] hover:scale-95 max-w-[242px] bg-transparent border-[1px] flex flex-col gap-2 rounded-lg`}
              >
                <span
                  style={{ backgroundColor: pathBackgrounds[index % 4] }}
                  className="rounded-full mb-5 w-9 h-9 items-center flex justify-center"
                >
                  <PathICon strokeLine={pathColors[index % 4]} />
                </span>
                <h3 className="font-semibold text-sm text-foreground ">
                  {option?.name?.toUpperCase()}
                </h3>
                <p className="text-[11px] text-wrap text-light">
                  {option?.description}
                </p>
              </Button>
            ))
          )}
        </div>
      </FormField>

      <Button
        type="submit"
        className="hover:scale-95 w-full h-[52px] text-sm font-semibold"
      >
        Continue
      </Button>
    </form>
  )
}
