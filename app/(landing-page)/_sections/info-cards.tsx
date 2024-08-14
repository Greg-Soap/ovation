/* eslint-disable @next/next/no-img-element */
import { generateRandomString } from "@/lib/helper-func";
import CardTwo from "../_components/info-card/card-two";
import CardFour from "../_components/info-card/card-four";
import ShineBorder from "@/components/animations/shiny-border";

export default function InfoCards() {
	return (
		<section className="container   grid md:grid-cols-1 lg:grid-cols-2 gap-x-5 gap-y-12 py-20 ">
			{moreCards.map((card, i) => (
				<ShineBorder
					key={i}
					color={["#353538", "#939393", "#353538"]}
					borderRadius={20}
					className={
						"flex flex-col items-center justify-center rounded-[20px] bg-card-gradient h-auto md:h-[684px] py-10  overflow-hidden"
					}
				>
					<div className="h-[300px] md:h-[400px] w-full flex justify-center items-center">
						{card.hasComponent ? (
							<div className={"w-full "}>{card.component}</div>
						) : (
							<img
								className={`h-[inherit] rounded-lg ${card.isFullWidth ? "w-auto h-auto" : "w-[80%] h-auto"}`}
								src={card.imgSrc}
								alt=""
							/>
						)}
					</div>

					<div className="flex flex-col gap-3 mt-10  px-[30px]">
						<p
							className={
								"text-white text-lg md:text-[28px] font-medium text-center"
							}
						>
							{card.header}
						</p>

						<p className={"text-sm md:text-xl text-center"}>
							{card.description}
						</p>
					</div>
				</ShineBorder>
			))}
		</section>
	);
}
const moreCards = [
	{
		header: "Intelligent Profiles",
		description:
			"Showcase your NFT collections with intelligent profiles that highlight your unique notoriety, favorite NFTs, sales, experience, and more",
		imgSrc: "/assets/images/info/stats.png",
		component: null,
		hasComponent: false,
		isFullWidth: false,
	},
	{
		header: "Earn Badges",
		description:
			"Gain recognition and rewards by earning badges as you highlight experience, sales, and showcase your NFTs.",
		imgSrc: "/assets/images/info/card-2.png",
		component: <CardTwo />,
		hasComponent: true,
		isFullWidth: false,
	},
	{
		header: "Discover",
		description:
			"Easily discover and connect with other users through the discover page, featuring top profiles and badges.",
		imgSrc: "/assets/images/info/card-3.png",
		component: null,
		hasComponent: false,
		isFullWidth: false,
	},
	{
		header: "Future Features Teaser",
		description: "Stay tuned for exciting new features!",
		imgSrc: "/assets/images/info/card-4.png",
		component: <CardFour />,
		hasComponent: true,
		isFullWidth: true,
	},
];
