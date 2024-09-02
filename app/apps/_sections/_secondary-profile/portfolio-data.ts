interface CreatedNFT {
  type: 'isComplete' | 'isDomain' | 'isCollectible' | 'isMetaverse' | 'isArt'
  imgSrc: string
  artist: string
  price: number
  isLiked: boolean
}

export const createdNFT: CreatedNFT[] = [
  {
    type: 'isComplete',
    imgSrc: '/assets/images/profile/featuredNFT.png',
    artist: 'Bored Ape',
    price: 14,
    isLiked: false,
  },
  {
    type: 'isDomain',
    imgSrc: '/assets/images/profile/featuredNFT.png',
    artist: 'Micheal Marcagi',
    price: 14,
    isLiked: false,
  },
  {
    type: 'isCollectible',
    imgSrc: '/assets/images/profile/featuredNFT.png',
    artist: 'Hozier',
    price: 14,
    isLiked: false,
  },
  {
    type: 'isMetaverse',
    imgSrc: '/assets/images/profile/featuredNFT.png',
    artist: 'Royel Otis',
    price: 14,
    isLiked: false,
  },
  {
    type: 'isArt',
    imgSrc: '/assets/images/profile/featuredNFT.png',
    artist: 'Matt Hansen',
    price: 14,
    isLiked: false,
  },
]
