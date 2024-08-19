import Link from "next/link";
import Socials from "../_sections/socials";
import Image from "next/image";
import TwitterIcon from "@/components/icons/twitter-icon";
import LinkedInIcon from "@/components/icons/linkedin-icon";

interface Teams {
	image: string;
	name: string;
	position: string;
	social: string;
	href: string;
}

const team: Teams[] = [
	{
		image: "/assets/images/teams/Jack2-teams.png",
		name: "Jack Bliss",
		position: "CEO",
		social: "twitter",
		href: "https://x.com/Jack_Ovation",
	},
	{
		image: "/assets/images/teams/Grant2-teams.png",
		name: "Grant Weaver",
		position: "CFO",
		social: "twitter",
		href: "https://x.com/GOVAWOVA",
	},
	{
		image: "/assets/images/teams/Maanav-teams.png",
		name: "Maanav J. Porwal",
		position: "CMO",
		social: "linkedin",
		href: "http://www.linkedin.com/in/manavporwal",
	},
	{
		image: "/assets/images/teams/Guy-teams.png",
		name: "Guy Garcia",
		position: "CTO",
		social: "linkedin",
		href: "https://www.linkedin.com/in/guygarcia/",
	},
	{
		image: "/assets/images/teams/Malcom2-teams.png",
		name: "Malcolm Henzaga",
		position: "COO",
		social: "linkedin",
		href: "https://www.linkedin.com/in/malcolmhenzaga/",
	},
];

export default function Teams() {
	return (
		<main className="flex flex-col gap-[120px] pt-[120px] pb-[200px]">
			<div className="container lg:w-full lg:h-[568px] w-[90%] h-[400px] bg-team-banner bg-cover bg-center" />

			<section className="container flex flex-col mt-12">
				<div className="flex flex-col w-full h-fit gap-[80px]">
					<div className="flex flex-col items-center justify-center gap-2 w-full h-fit">
						<p className="text-white text-[35px] md:text-5xl font-bold text-center">
							Meet our team
						</p>
						<p className="text-[#999999] text-lg md:text-2xl font-medium w-[80%] text-center">
							Discover the dedicated professionals behind our success. Our team
							brings together a wealth of experience, creativity, and passion to
							deliver exceptional results.{" "}
						</p>
					</div>

					<div className="w-full flex flex-wrap items-center justify-center gap-y-[60px] gap-x-5">
						{team.map((item, index) => (
							<div
								className="flex flex-col gap-6 w-fit max-w-[396px]"
								key={index}
							>
								<div className=" rounded-full">
									<Image
										src={`${item.image}`}
										alt={`${item.name} + " " + "Picture"`}
										width={396}
										height={396}
									/>
								</div>

								<div className="flex flex-col gap-3 items-center justify-center">
									<div className="flex flex-col gap-[9px]">
										<p className="text-2xl font-semibold">{item.name}</p>
										<p className="text-[#999999] text-center">
											{item.position}
										</p>
									</div>

									<Link href={item.href} target="_blank">
										{item.social === "twitter" ? (
											<TwitterIcon className="w-[37px] h-[37px]" />
										) : (
											<LinkedInIcon className="w-[37px] h-[37px]" />
										)}
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<Socials />
		</main>
	);
}
