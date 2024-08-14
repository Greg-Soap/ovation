import Socials from "../_sections/socials";
import Image from "next/image";
import Link from "next/link";

export const blogs = [
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

export default function News() {
	return (
		<main className="flex flex-col gap-20 pt-[120px] pb-[100px]">
			<section className="container w-full flex flex-col items-center gap-20">
				<div className="flex flex-col gap-[120px] items-center">
					<div className="flex flex-col gap-3 w-fit items-center">
						<p className="text-[#F8F8FF] font-bold text-5xl text-center">
							This is where we tell our stories
						</p>
						<p className="text-[#B3B3B3] text-2xl w-[80%] text-center">
							A space dedicated to sharing our journeys, experiences, and
							insights. Join us as we explore and connect through the power of
							storytelling.
						</p>
					</div>

					<Link
						href={`/news/${blogs[0].id}`}
						className="flex flex-col gap-6 w-full"
					>
						<div className="flex items-center justify-center bg-news-gradient h-[448px] w-full">
							<Image
								src={`${blogs[0].image}`}
								alt="Partners"
								width={834}
								height={177}
							/>
						</div>

						<div className="w-full flex flex-col gap-[10px]">
							<p className="text-[#E6E6E6] text-3xl lg:text-[40px] lg:leading-[50px] font-bold">
								{blogs[0].blogHeader}
							</p>
							<p className="text-[#CCCCCC] text-lg lg:text-2xl">
								{blogs[0].blogDetails}
							</p>
						</div>
					</Link>
				</div>

				<div className="flex flex-col w-full px-0 py-20 border-y border-[#29292F] gap-6">
					<p className="text-[#E4E4EC] text-[19px] sm:text-[28px] font-semibold">
						Recent blog
					</p>

					<div className="grid grid-cols-1 sm:grid-cols-2 lg:flex flex-wrap w-full gap-y-20 gap-x-9">
						{blogs.slice(1).map((blog, index) => (
							<Link
								href={`/news/${blog.id}`}
								className="flex flex-col gap-6 h-auto w-fit max-w-[385px]"
								key={index}
							>
								<img
									src={`${blog.image}`}
									alt="Blog post"
									className="w-auto h-[247px]"
								/>

								<div className="flex flex-col gap-[10px]">
									<p className="text-[#E6E6E6] text-xl font-semibold">
										{blog.blogHeader}
									</p>
									<p className="text-sm text-[#CCCCCC]">{blog.blogDetails}</p>
								</div>
							</Link>
						))}
					</div>
				</div>
			</section>

			<Socials />
		</main>
	);
}
