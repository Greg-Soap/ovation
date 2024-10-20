import { Badge } from '@/components/ui/badge'
import { startCase } from '@/lib/helper-func'
import { cn } from '@/lib/utils'

const pathColors = {
  Trader: '#cff073',
  Enthusiast: '#EF91FF',
  Project: '#FF9B02',
  Artist: '#0094FF',
}

const pathBackgrounds = {
  Trader: '#283502',
  Enthusiast: '#42044C',
  Project: '#2F2009',
  Artist: '#0B293F',
}

export default function PathBadge({ pathName }: { pathName: string }) {
  const color = pathColors[pathName as keyof typeof pathColors] || '#000000'
  const background =
    pathBackgrounds[pathName as keyof typeof pathBackgrounds] || '#FFFFFF'

  return (
    <Badge
      className={cn('rounded-full w-fit h-fit px-2 py-1')}
      style={{ color, backgroundColor: background }}
    >
      {startCase(pathName)}
    </Badge>
  )
}
