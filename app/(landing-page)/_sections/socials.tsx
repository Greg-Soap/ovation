/* eslint-disable @next/next/no-img-element */
import PulseButton from "@/components/animations/pulse-btn";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Socials() {
	return (
		<section className="container w-full h-fit relative">
			<div className="w-full h-fit bg-[#275102] rounded-[40px] pt-8 lg:pt-[0px] lg:pb-[100px] pb-[50px] flex flex-col items-center justify-center relative">
				<div className="bg-vector-one bg-top bg-cover bg-no-repeat w-full lg:h-[150px] h-[50px] md:h-[100px] flex rounded-[40px]" />
				<img
					src="/assets/images/social-LP1.png"
					alt=""
					className="absolute left-[25%] top-[35px] md:top-[55px] lg:top-[30px] lg:w-[50px] lg:h-[50px] w-9 h-9"
				/>

				<img
					src="/assets/images/social-LP2.png"
					alt=""
					className="absolute right-[25%] top-[35px] md:top-[55px] lg:top-[30px] lg:w-[50px] lg:h-[50px] w-9 h-9"
				/>

				<img
					src="/assets/images/social-LP3.png"
					alt=""
					className="absolute lg:left-20 left-[8%] lg:bottom-[90px] bottom-[81%] md:bottom-[73%] lg:w-[50px] lg:h-[50px] w-9 h-9"
				/>

				<img
					src="/assets/images/social-LP4.png"
					alt=""
					className="absolute lg:right-20 right-[8%] lg:bottom-[90px] bottom-[81%] md:bottom-[73%] lg:w-[50px] lg:h-[50px] w-9 h-9"
				/>

				<div className="flex flex-col items-center gap-10 mb-10 mt-5">
					<p className="text-white w-[90%] text-[35px] md:text-5xl font-bold text-center leading-[60px]">
						Explore Next-Gen NFT Socials
					</p>
					<p className="text-base md:leading-9 md:text-[22px] -mt-5 text-[#CCCCCC] w-[75%] text-center">
						The only Web3 platform with intelligent profiles, personalized
						portfolios, and a blockchain UI for a unified NFT experience.
					</p>
				</div>

				<div className="flex lg:flex-row flex-col items-center gap-5 w-fit">
					<Link
						href="https://x.com/Ovation_Network"
						className="flex items-center gap-2"
						target="_blank"
					>
						<Button
							asChild
							className="bg-[#CFF073] text-sm text-[#0B0A10] h-fit gap-2"
						>
							<PulseButton pulseColor="#CFF073">
								<img
									src="/assets/images/twitter-LP.png"
									alt="Twitter Logo"
									className="w-4 h-3"
								/>
								Follow us on twitter
							</PulseButton>
						</Button>
					</Link>
					<Link
						href=" https://www.linkedin.com/company/ovationnetwork/posts/?feedView=all"
						className="flex items-center gap-2"
						target="_blank"
					>
						<Button
							asChild
							className="bg-[#CFF073] text-sm text-[#0B0A10] h-fit gap-2"
						>
							<PulseButton pulseColor="#CFF073">
								<img
									src="/assets/images/linkedIn-LP.png"
									alt="LinkedIn Logo"
									className="w-4 h-4"
								/>
								Follow us on LinkedIn
							</PulseButton>
						</Button>
					</Link>
				</div>
			</div>
		</section>
	);
}
