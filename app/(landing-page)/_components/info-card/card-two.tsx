import { AnimatedList } from "@/components/animations/animated-list";

const badges = [
	"/assets/images/info/card2/card2-1.png",
	"/assets/images/info/card2/card2-2.png",
	"/assets/images/info/card2/card2-3.png",
	"/assets/images/info/card2/card2-5.png",
];

export default function CardTwo() {
	return (
		<div className="flex flex-col items-center w-full h-fit gap-5">
			<AnimatedList>
				{badges.map((badge, idx) => (
					<div
						key={idx}
						className="w-full gradient-container p-[1px] rounded-[26px] md:rounded-[30px] z-[100]"
					>
						<div className="flex items-center px-6 py-5 bg-[#383D2B] rounded-[26px] md:rounded-[30px] gap-4 shadow-info">
							<img
								src={badge}
								alt="10K badge"
								className="w-10 h-10 md:w-[65px] md:h-[65px] 2xl:w-[74px] 2xl:h-[74px]"
							/>

							<div className="flex flex-col">
								<p className="text-xs md:text-[19px] 2xl:text-[21px] text-[#F8F8FF] font-medium">
									Congratulations: New badge
								</p>
								<p className="text-xs md:text-lg 2xl:text-[21px] text-[#999999]">
									You just earned a new badge
								</p>
							</div>
						</div>
					</div>
				))}
			</AnimatedList>
		</div>
	);
}
