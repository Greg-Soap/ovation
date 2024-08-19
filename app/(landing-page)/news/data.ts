type ListItem = {
  header?: string
  details: string
}

type Section = {
  header?: string
  content?: string
  list?: ListItem[]
  image?: string
  link?: { name: string; url: string }[]
}

type Blog = {
  id: number
  image: string
  blogHeader: string
  blogDetails: string
  sections: Section[]
  otherInfo: string
}

export const blogs: Blog[] = [
  {
    id: 1,
    image: '/assets/images/news/news-bg.png',
    blogHeader: 'Ovation Technologies Secures ArchwayHQ Grant for Expanded Operations',
    blogDetails:
      'It is with great excitement that we announce that Ovation has been approved for the ArchwayHQ grant!',
    sections: [
      {
        content:
          'This significant milestone will enable Ovation to expand its business operations, helping us deliver innovative products to our community and build alongside the leading Layer 1 blockchain in the Cosmos ecosystem.',
      },
      {
        content:
          'This grant not only solidifies Ovation’s position in the rapidly evolving NFT space but also provides us with the financial runway to continue our ambitious project into Q1 2025. By partnering with ArchwayHQ, Ovation will leverage the advanced capabilities of the Archway blockchain to enhance our offerings, ensuring scalability, security, and seamless user experiences.',
      },
      {
        content:
          'Stay tuned for more details as we embark on this exciting journey, pushing the boundaries of what’s possible in the NFT and blockchain industries. Together with ArchwayHQ, we are set to revolutionize the future of decentralized digital experiences.',
      },
      {
        content: 'For more information, visit:',
        link: [
          {
            name: 'ArchwayHQ Website',
            url: 'https://archway.io/',
          },
          {
            name: 'Ovation Website',
            url: 'https://ovation.network/',
          },
          {
            name: 'Ovation Twitter',
            url: 'https://twitter.com/Ovation_Network',
          },
          {
            name: 'Archway Twitter',
            url: 'https://twitter.com/archwayhq',
          },
        ],
      },
    ],
    otherInfo: '(Dated back to July 31st, 2024).',
  },
  {
    id: 2,
    image: '/assets/images/news/news1.jpg',
    blogHeader: 'Is your NFT project a Security? It is if it passes the Howey Test.',
    blogDetails: 'What does this mean for your NFT project?',
    sections: [
      {
        header: 'What determines a Security?',
        content: `If there is an "investment of money in a common enterprise with a reasonable expectation of profits to be derived from the efforts of others," the transaction is subject to disclosure and registration requirements under the Securities Act of 1933 and the Security Exchange Act of 1934. In others words a Security.`,
      },
      {
        header: 'How is a Security Defined?',
        content: `The Securities Act of 1933 and the Security Exchange Act of 1934 define what a security is. They define things such as stocks, bonds, other common investment instruments, and also what is called an "investment contract." This is a flexible term to capture investments that act like securities, but don't fit within any other categories of securities.`,
      },
      {
        header: 'The Howey Test — Determining if an Investment Contract exists',
        content: `SEC v. W.J. Howey Co. 1946 was the case that legally defined if a transaction qualifies as an "investment contract" and thus a Security. The supreme court determined that an "investment contract" or the "Howey Test" is defined by the following attributes. For a transaction to qualify as a security it must involve as 4 elements below:`,
        list: [
          {
            header: 'An investment of money',
            details: 'Straightforward, an exchange of money or wealth must occur.',
          },
          {
            header: 'In a common enterprise',
            details:
              "The enterprise in which the investor's fortunes are interwoven with either the person offering the investment, a third party, or one or more investors.",
          },
          {
            header: 'With the expectation of profit',
            details:
              "This element looks at the investor's intent for buying the asset. Are they buying the transaction because they're expecting a profit? Was this communicated to them through advertisements, social media, discussions, on the contract/NFT, or on the website? Or are they investing in the NFT project because they like the art or see it as a mechanism to store wealth?",
          },
          {
            header: 'To be derived from the efforts of others',
            details:
              "This element is used to separate the investor from the third party. If the investor is actively working in the investment and thus has a role in its success, it's most likely not an investment. If all 4 of these elements are met, your NFT project is a Security",
          },
        ],
      },
      {
        header: 'What does this mean for your NFT project?',
        content: `Use the Howey Test to determine if your project falls under an "investment contract" definition and thus a Security. If it does, you will need to register as a Security. Consult a lawyer that is familiar with SEC Securities law and NFTs as a technology. Disclaimer: This is not legal advice, consult a lawyer when making decisions regarding securities law.`,
      },
    ],
    otherInfo: '(Dated back to February 6th 2024).',
  },
  {
    id: 3,
    image: '/assets/images/news/news2.jpg',
    blogHeader: 'See you at NFT NYC',
    blogDetails: 'Ovation will be attending NFT NYC 2023!',
    sections: [
      {
        content:
          'Ovation aims to be The NFT Social Platform. Combining features from Twitter, Discord, Coinbase NFT, and Opensea; users can share, discover, socialize, and trade NFTs all on the Ovation Platform. Built on a web3 infrastructure, Ovation enables users to earn OVA point as they interact and draw engagement on the platform.',
      },
      {
        content:
          'Socially, users can communicate with fellow collections holders using Ovation Hubs. On timelines, users will be enabled to have more meaningful conversations because of live data from the blockchain, the ability to create unique posts, recognize post contributions, and filter.',
      },
      {
        content:
          'Ovation empowers artists and enthusiasts by enabling personalized profiles and portfolios to show off their NFT portfolios in a dedicated, data-rich UI that improves user experience.',
      },
      {
        content:
          "We're looking forward to seeing everyone! We will be coordinating meetups, with an update on this soon! For now, if you want to meet the team, DM us on Twitter or email us at hello@ovation.network.",
      },
      {
        link: [
          {
            name: 'For more information, click to go to Nft.Nyc website',
            url: ' https://www.nft.nyc',
          },
        ],
      },
    ],
    otherInfo: '(Dated back to February 17th 2023).',
  },
  {
    id: 4,
    image: '/assets/images/news/news3.png',
    blogHeader:
      'Imagine if X, OpenSea, and Discord had a Web3 baby, that would be Ovation- The First NFT Super App.',
    blogDetails:
      'The current NFT landscape consists of a multitude of disconnected applications where NFT enthusiasts manage portfolios across multiple wallets and blockchains',
    sections: [
      {
        content:
          "They must use separate applications to trade NFTs, numerous platforms to showcase them, and even more, to talk about their experiences and engage with their communities. Even the most devoted NFT aficionados can become exhausted interacting with the vast array of current offerings — most of which are limited in functionality and don't provide a curated user experience.",
      },
      {
        content:
          "Today's NFT-related platforms do not effectively support the personalization of portfolios and give little context to the data behind the NFTs or how they relate to a broader ecosystem. Profile bios rarely enable users to prove their reputation, accomplishments, or community contributions. Marketplaces are primarily single-chain and mostly overlook the social element; the ability to barter and directly communicate with buyers and sellers is also missing, a core element of any successful marketplace.",
      },
      {
        header: 'The Ovation Platform',
        content:
          'Ovation is the first NFT Superapp that redefines Your NFT experience. It allows users to share their personalized portfolios, discover new NFTs, trade, and socialize with the entire ecosystem while rewarding them for meaningful interactions and contributions.',
        list: [
          {
            details:
              'Enables artists, influencer, and enthusiasts to impactful display their art, collections, contributions, and notoriety. Including, but not limited to NFTs, DAO tasks, project roles, etc.',
          },
          {
            details:
              'Enables users to showcase their NFTs, interact with community members, trade NFTs, and spot market trends.',
          },
          {
            details: 'Blockchain interoperable with multi-chain support.',
          },
          {
            details:
              'Natively adds a social element to marketplaces with NFTs directly on timelines, enabling direct messaging and bartering.',
          },
          {
            details: "Rewards users with OVA points, Ovation's in-platform rewards.",
          },
        ],
      },
      { image: '/assets/images/news/image3.png' },
      {
        header: 'Next-generation NFT-Centric Features',
        content:
          "Ovation will give users the ability to share NFTs and create unique posts, driving meaningful interactions with other enthusiasts. Your posts showcasing NFTs will be equipped with context-driven data which includes price history, the NFT's relationship to the broader collection, and other metrics that help keep traders well-informed in the market.",
      },
      {
        content:
          'Filters and preferences will provide a highly personalized and curated experience. Users will be able to discover new collections by genre, ranking, trending, and even get recommendations based on their interests or portfolio.',
      },
      {
        content:
          'Detailed insights into the users own portfolio, as well as other projects, holder-exclusive discussion hubs, and a gamified user experience will all serve to prompt engagement and collaboration.',
      },
      {
        content:
          'Add to this the rewards of the in-platform OVA points earned by posting valuable content or comments, sharing NFTs, and making meaningful interactions or contributions, you’ll see that Ovation has all the potential to become a unified social platform for any participant in the Web3 space — be it a complete newcomer, light user, or an experienced trader.',
      },

      {
        header: 'What’s Next for Ovation. How to get involved.',
        content:
          'As Ovation continues to bring on strategic technical and collaborative partners, interested artists, projects, influencer, and enthusiasts can purchase an Ovation Founder NFT that will give early enthusiasts and founders early and exclusive in-platform benefits. Ovation plans to launch their new MVP version in Q3 of 2024.',
      },
      {
        content:
          'Artists, influencers, and projects that want to partner with Ovation should email hello@ovation.network. Partners influence the platform’s development, share in the success through in-platform benefits, are featured on the team’s page, and receive other incentives.',
      },
    ],
    otherInfo: '(Dated back to July 31th 2024).',
  },
  {
    id: 5,
    image: '/assets/images/news/news4.jpg',
    blogHeader: 'Ovation is speaking at NFT NYC 2024!',
    blogDetails: 'Ovation will be speaking at NFT NYC 2024!',
    sections: [
      {
        content:
          'Co-Founder Jack Bliss will be speaking about how to fortify your application security program to also include web3 security principals.',
      },
      {
        content:
          'Co-Founder Grant Weaver will be speaking about how brands can use NFTs to bring value to their customer base.',
      },
      {
        content:
          'Co-Founder Maanav J. Porwal will be speaking about how to build an effective community around NFTs.',
      },
      {
        content:
          'Ovation aims to be The NFT Social Platform. Combining features from Twitter, Discord, Coinbase NFT, and OpenSea; users can share, discover, socialize, and trade NFTs all on the Ovation Platform. Built on a web3 infrastructure, Ovation enables users to earn in platform rewads called OVA points as they interact and draw engagement on the platform.',
      },
      {
        content:
          'Socially, users can communicate with fellow collections holders using Ovation Hubs. On timelines, users will be enabled to have more meaningful conversations because of live data, the ability to create unique posts, recognize post contributions, and filter.',
      },
      {
        content:
          'Ovation empowers artists and enthusiasts by enabling personalized profiles and portfolios to show off their NFT portfolios in a dedicated, data-rich UI that improves user experience.',
      },
      {
        content:
          'We’re looking forward to seeing everyone! We will be coordinating meetups, with an update on this soon! For now, if you want to meet the team, DM us on Twitter or email us at hello@ovation.network.',
      },
    ],
    otherInfo: '(Dated back to April 1st 2024)',
  },
]
