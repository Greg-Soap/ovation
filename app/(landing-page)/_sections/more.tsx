import { Button } from "@/components/ui/button";
import Link from "next/link";
import { blogs } from "../news/data";

export default function MoreFromOvation() {
	return (
		<section className="container w-[75%] grid grid-cols-3 gap-x-[20px] gap-y-12 py-20 more-section">
			<div className="flex flex-col">
				<p className="font-heading text-white font-bold text-2xl md:text-3xl section-header">
					More from ovation
				</p>

				<p className="text-base md:text-xl font-medium tracking-[-0.87px] mb-8 section-description">
					Artists, projects, and enthusiasts can effortlessly
				</p>
				<Link href="/news" className="flex items-center gap-2">
					<Button className="bg-[#CFF073] text-sm text-[#0B0A10] h-fit gap-2">
						Browse articles
					</Button>
				</Link>
			</div>

			{blogs.map((blog, index) => (
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
		</section>
	);
}
