import { Button } from '@/components/ui/button'
import { generateRandomString } from '@/lib/helper-func'

export default function MoreFromOvation() {
  return (
    <section className="container w-[75%] grid grid-cols-3 gap-x-[20px] gap-y-12 py-20 more-section">
      <div className="flex flex-col">
        <p className="font-heading text-white font-bold text-2xl md:text-3xl section-header">
          More from ovation
        </p>

        <p className="text-base md:text-xl font-medium tracking-[-0.87px] mb-8 section-description">
          Artists, projects, and enthusiasts can effortlessly
        </p>
        <Button>Browse articles</Button>
      </div>

      {moreCards.map((card) => (
        <div
          className="p-[10px] flex flex-col rounded-[20px] bg-[#1C1D19] more-card"
          key={generateRandomString()}
        >
          <img
            className="rounded-lg p-[8px]"
            src="assets/images/more-3x.png"
            alt=""
          />

          <div className="flex flex-col px-[6px] py-5 gap-3">
            <p className="text-white text-base font-medium">
              {card.description}
            </p>

            <p className="text-sm md:text-lg">15/3/2023</p>
          </div>
        </div>
      ))}
    </section>
  )
}
const moreCards = [
  {
    description:
      'Ovation. The First NFT Superapp Working to Transform Your NFT Experience.',
  },
  {
    description:
      'Ovation. The First NFT Superapp Working to Transform Your NFT Experience.',
  },
  {
    description:
      'Ovation. The First NFT Superapp Working to Transform Your NFT Experience.',
  },
  {
    description:
      'Ovation. The First NFT Superapp Working to Transform Your NFT Experience.',
  },
  {
    description:
      'Ovation. The First NFT Superapp Working to Transform Your NFT Experience.',
  },
]
