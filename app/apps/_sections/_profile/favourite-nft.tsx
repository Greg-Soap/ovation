import Image from 'next/image'

interface Favourite {
  imgSrc: string
}

const favourites: Favourite[] = [
  { imgSrc: '/assets/images/profile/nft1.png' },
  { imgSrc: '/assets/images/profile/nft2.png' },
  { imgSrc: '/assets/images/profile/nft3.png' },
]

export default function FavouriteNft() {
  return (
    <div className="flex flex-col bg-[#18181C] rounded-[20px] gap-4 px-5 py-[18px]">
      <p className="text-xs font-medium text-[#808080]">Favourite NFT</p>

      <div className="grid grid-cols-3 gap-[6px]">
        {favourites.map((fav, index) => (
          <img src={fav.imgSrc} alt="NFT" key={index} />
        ))}
      </div>
    </div>
  )
}
