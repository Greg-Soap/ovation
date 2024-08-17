/* eslint-disable @next/next/no-img-element */
import Marquee from "@/components/animations/marquee";
import PulseButton from "@/components/animations/pulse-btn";
import { Button } from "@/components/ui/button";
import { generateRandomString } from "@/lib/helper-func";
import Link from "next/link";

export default function ExtendedPartners() {
	return (
		<section className="container flex flex-col w-full items-center justify-center h-fit py-20 overflow-hidden">
			<div className="relative flex  flex-col items-center justify-center">
				<Marquee className="[--duration:20s]">
					<p className=" font-bold font-heading text-[70px] leading-[90px] tracking-[-0.55px] md:text-[280px] md:leading-[355px] md:tracking-[-2px] text-white">
						JOIN US AS A <span className="text-[#CFF073]">PARTNER</span>
					</p>
				</Marquee>
			</div>
			<div className="grid grid-cols-2 gap-6 mt-10 md:mt-20 extended-partners-det-ctn">
				<p className="text-white font-bold text-2xl md:text-3xl font-heading section-header">
					Over 100 launch partners have already joined us on our journey
				</p>

				<div className="flex flex-col gap-9">
					<p className="text-base md:text-2xl font-semibold tracking-[-0.87px] section-description">
						Are you ready to join the next-generation NFT Social Platform?
						Beyond joining our Alpha launch by clicking &quot;Launch App,&quot;
						our partnerships are a mutual collaborative relationship where
						Ovation helps with their initiatives, and our partners help us
						revolutionize the NFT ecosystem.
					</p>
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
								Join us as a partner
							</PulseButton>
						</Button>
					</Link>
				</div>
			</div>

			<div className="grid grid-cols-4 gap-x-10 gap-y-[20px] w-[95%] mt-20 extended-partners-partners-ctn">
				{extendedPartners.map((partner, index) => (
					<div
						className="flex flex-col items-center opacity-100 md:opacity-30 md:hover:opacity-100 transition-opacity duration-300"
						key={generateRandomString()}
					>
						<img
							className={"rounded-full h-[200px] w-[200px] "}
							src={partner.imgSrc}
							alt="Partner display"
						/>
						<p className="text-white text-base md:text-xl font-medium text-center partners-name">
							{partner.name}
						</p>
						<p className="text-[10px] leading-[14px] md:text-sm text-center">
							{partner.position}
						</p>
					</div>
				))}
			</div>
		</section>
	);
}
const extendedPartners = [
	{
		imgSrc: "assets/images/extended/extended1.png",
		name: "Polygon village",
		position: "Polygon community",
	},
	{
		imgSrc: "assets/images/extended/extended2.png",
		name: "Phi Labs",
		position: "Development Company",
	},
	{
		imgSrc: "assets/images/extended/extended3.png",
		name: "Tommy Trillfigger",
		position: "NFT Artist / Musician",
	},
	{
		imgSrc: "assets/images/extended/extended4.png",
		name: "ArchiesNft",
		position: "NFT Project",
	},
	{
		imgSrc: "assets/images/extended/extended5.png",
		name: "Polygon Alliance",
		position: "Polygon community",
	},
	{
		imgSrc: "assets/images/extended/extended6.png",
		name: "ArchwayHQ",
		position: "Layer 1 Chain",
	},
	{
		imgSrc: "assets/images/extended/extended7.png",
		name: "Cenk",
		position: "Twitter Influencer",
	},
	{
		imgSrc: "assets/images/extended/extended8.png",
		name: "GenK",
		position: "Community of Polygon Aritists",
	},
	{
		imgSrc: "assets/images/extended/extended9.png",
		name: "Texas Blockchain",
		position: "Blockchain Student Org",
	},
	{
		imgSrc: "assets/images/extended/extended10.png",
		name: "Arlo",
		position: "NFT Artist / Illistrator",
	},
	{
		imgSrc: "assets/images/extended/extended11.png",
		name: "MhiztaLOEL",
		position: "Twitter Influencer",
	},
	{
		imgSrc: "assets/images/extended/extended12.png",
		name: "Mochi Circle",
		position: "Web3 Marketing",
	},
];
