"use client";
import Socials from "../_sections/socials";
import Image from "next/image";
import Link from "next/link";
import { blogs } from "./data";

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
						<div className="relative w-full h-auto sm:h-[461px] rounded-xl overflow-hidden">
							<img
								src={`${blogs[0].image}`}
								alt="Blog"
								className="relative z-10 w-auto h-full mx-auto  object-cover"
							/>
							<div
								className="absolute inset-0 bg-cover bg-center blur-lg"
								style={{
									backgroundImage: `url(${blogs[0].image})`,
									filter: "blur(20px)",
									zIndex: 1,
								}}
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
