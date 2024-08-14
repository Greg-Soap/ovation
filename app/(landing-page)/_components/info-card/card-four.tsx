import MarqueeCard from "@/components/animations/marquee-card";
import Image from "next/image";

interface Divs {
	icon?: string;
	name?: string;
}

const topDivs: Divs[] = [
	{ icon: "/assets/images/info/card4/article.png", name: "Article" },
	{ icon: "/assets/images/info/card4/trading.png", name: "Trading" },
	{ icon: "/assets/images/info/card4/community.png", name: "Community" },
];

const midDivs: Divs[] = [
	{ icon: "/assets/images/info/card4/trading.png", name: "Trading" },
	{ icon: "/assets/images/info/card4/analytics.png", name: "Analytics" },
	{ icon: "/assets/images/info/card4/comment.png", name: "Comments" },
	{ icon: "/assets/images/info/card4/article.png", name: "Article" },
];

const bottomDivs: Divs[] = [
	{ icon: "/assets/images/info/card4/initiative.png", name: "Initiative" },
	{ icon: "/assets/images/info/card4/watchlist.png", name: "Watchlist" },
	{ icon: "/assets/images/info/card4/contribute.png", name: "Contribute" },
];

export default function CardFour() {
	return (
		<div className="flex flex-col items-center gap-2 md:gap-10 overflow-hidden">
			<p className="px-5 py-3 md:px-[22px] md:py-[17px] rounded-[43px] border-[5px] border-[#808E5B] bg-[#CFF073] text-sm md:text-[17px] text-[#111115] font-semibold">
				Coming soon
			</p>

			<div className="mt-0 md:-mt-8 w-full relative flex items-center">
				<MarqueeCard>
					{topDivs.map((item, index) => (
						<div
							className="min-w-fit gradient-container relative p-[1px] rounded-[12px] ml-3"
							key={index}
						>
							<div className="flex gap-2 items-center px-[23px] py-[14px] rounded-[12px] bg-[#383D2B]">
								<Image
									src={`${item.icon}`}
									alt={`${item.name}icon`}
									width={31}
									height={31}
								/>

								<p className="text-white text-xl">{item.name}</p>
							</div>
						</div>
					))}
				</MarqueeCard>
			</div>

			<div className="w-full relative flex items-center">
				<MarqueeCard reverse>
					{midDivs.map((item, index) => (
						<div
							className="min-w-fit gradient-container relative p-[1px] rounded-[12px] mr-3"
							key={index}
						>
							<div className="flex gap-2 items-center px-[23px] py-[14px] rounded-[12px] bg-[#383D2B]">
								<Image
									src={`${item.icon}`}
									alt={`${item.name}icon`}
									width={31}
									height={31}
								/>

								<p className="text-white text-xl">{item.name}</p>
							</div>
						</div>
					))}
				</MarqueeCard>
			</div>

			<div className="w-full relative flex items-center">
				<MarqueeCard>
					{bottomDivs.map((item, index) => (
						<div
							className="min-w-fit gradient-container relative p-[1px] rounded-[12px] ml-3"
							key={index}
						>
							<div className="flex gap-2 items-center px-[23px] py-[14px] rounded-[12px] bg-[#383D2B]">
								<Image
									src={`${item.icon}`}
									alt={`${item.name}icon`}
									width={31}
									height={31}
								/>

								<p className="text-white text-xl">{item.name}</p>
							</div>
						</div>
					))}
				</MarqueeCard>
			</div>
		</div>
	);
}
