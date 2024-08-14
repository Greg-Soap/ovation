interface Blog {
	id: number;
	image: string;
	blogHeader: string;
	blogDetails: string;
	blogLink: string;
}
export const blogs: Blog[] = [
	{
		id: 1,
		image: "/assets/images/news/news-bg.png",
		blogHeader: `Ovation Technologies Secures ArchwayHQ Grant for Expanded
                Operations`,
		blogDetails: `A space dedicated to sharing our journeys, experiences, and
              insights. Join us as we explore and connect through the power of
              storytelling.`,
		blogLink: "/",
	},
	{
		id: 2,
		image: "/assets/images/news/news1.png",
		blogHeader:
			"Ovation Technologies Secures ArchwayHQ Grant for Expanded Operations",
		blogDetails: `It is with great excitement that we announce that Ovation has been
              approved for the ArchwayHQ grant!`,
		blogLink: "/",
	},
	{
		id: 3,
		image: "/assets/images/news/news2.png",
		blogHeader: "See you at NFT NYC",
		blogDetails: "Ovation will be attending NFT NYC 2023!",
		blogLink: "/",
	},
	{
		id: 4,
		image: "/assets/images/news/news3.png",
		blogHeader:
			"Imagine if X, OpenSea, and Discord had a Web3 baby, that would be Ovation- The First NFT Super App.",
		blogDetails:
			"The current NFT landscape consists of a multitude of disconnected applications where NFT enthusiasts manage portfolios across multiple wallets and blockchains",
		blogLink: "/",
	},
	{
		id: 5,
		image: "/assets/images/news/news4.png",
		blogHeader: "Ovation is speaking at NFT NYC 2024!",
		blogDetails: "Ovation will be speaking at NFT NYC 2024!",
		blogLink: "/",
	},
];
