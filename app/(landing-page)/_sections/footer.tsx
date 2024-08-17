import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { LinkedinIcon } from "lucide-react";
import Link from "next/link";

export default function Footer() {
	return (
		<footer className="container flex flex-wrap justify-between w-[90%] py-10 border-t border-[#FFFFFF80] px-0">
			<div className="flex flex-col gap-10 footer-left">
				<Link href="/">
					<img
						src="/assets/images/logo/logo.png"
						width={250}
						height={40}
						alt="logo"
						className="-ml-10"
					/>
				</Link>

				<p>© 2024 Ovation Technologies.</p>
			</div>

			<div className="flex items-stretch justify-end gap-10 w-[60%] h-fit footer-right">
				{/* <div className="flex flex-col gap-6 footer-left">
					<p className="font-heading text-primary-foreground text-xl">
						Contact
					</p>
					<p>hello@ovation.network</p>
				</div> */}

				<div className="flex flex-col gap-6 footer-left">
					<p className="font-heading text-primary-foreground text-xl">
						Support
					</p>

					<div className="flex flex-col gap-3">
						<Link
							href="https://ovationnetwork.notion.site/Ovation-Terms-of-Service-4f90f9d4f85c4e95bdd28c47e187323c"
							target="_blank"
						>
							Terms of service
						</Link>
						<Link href="https://ovationnetwork.notion.site/" target="_blank">
							Privacy policy
						</Link>
					</div>
				</div>

				<div className="flex flex-col gap-6 footer-left">
					<p className="font-heading text-primary-foreground text-xl">
						Socials
					</p>

					<div className="flex gap-3 w-fit">
						<Link
							href="https://www.linkedin.com/company/ovationnetwork/posts/?feedView=all"
							target="_blank"
						>
							<div className="rounded-full w-8 h-8 flex justify-center items-center bg-[#272727]">
								<LinkedinIcon size={18} color="white" />
							</div>
						</Link>
						<Link target="_blank" href="https://ovation.beehiiv.com/subscribe">
							<div className="rounded-full w-8 h-8 flex justify-center items-center bg-[#272727]">
								<DiscordLogoIcon width={18} height={18} color="white" />
							</div>
						</Link>
						<Link
							target="_blank"
							href="https://x.com/Ovation_Network?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor"
						>
							<img
								src="/assets/images/footer/footer3.png"
								alt=""
								className="w-8 h-8"
							/>
						</Link>
						<Link
							target="_blank"
							href="https://opensea.io/collection/founder-nfts"
						>
							<img
								src="/assets/images/footer/footer5.png"
								alt=""
								className="w-8 h-8 rounded-full"
							/>
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
