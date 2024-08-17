/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { ArticleSection } from "../../_components/new-article";
import { blogs } from "../data";

export default function NewsDetails({ params }: any) {
	const [copied, setCopied] = useState(false);
	const blog = blogs.find((b) => b.id === Number.parseInt(params.newsId));

	if (!blog) {
		return <div>Blog not found</div>;
	}

	const filteredBlogs = blogs.filter((b) => b.id !== blog.id);

	const copyToClipboard = () => {
		const currentUrl = window.location.href;
		navigator.clipboard
			.writeText(currentUrl)
			.then(() => {
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			})
			.catch((err) => {
				console.error("Failed to copy: ", err);
			});
	};

	if (!blog) {
		return (
			<section>
				<p>Blog not found</p>
			</section>
		);
	}

	return (
		<section className="flex flex-col w-full container">
			<div className="flex flex-col gap-[61px] items-center pt-[120px] pb-[80px]">
				<p className="text-[#F8F8FF] text-[30px] sm:text-5xl font-bold w-[90%] sm:w-[80%] text-center">
					{blog.blogHeader}
				</p>
				<div className="relative w-full h-auto sm:h-[461px] rounded-xl overflow-hidden">
					<img
						src={`${blog.image}`}
						alt="Blog"
						className="relative z-10 w-auto h-full mx-auto  object-cover"
					/>
					<div
						className="absolute inset-0 bg-cover bg-center blur-lg"
						style={{
							backgroundImage: `url(${blog.image})`,
							filter: "blur(20px)",
							zIndex: 1,
						}}
					/>
				</div>

				<div className="flex w-full items-center justify-between">
					<div className="flex gap-3 items-center">
						<Image
							src={"/assets/images/news/OVA.png"}
							alt="Ovation Logo"
							width={40}
							height={40}
						/>

						<div className="flex flex-col gap-1">
							<p className="text-lg text-[#F8F8FF] font-semibold">Ovation</p>
							<p className="text-sm text-[#CCCCCC]">Admin</p>
						</div>
					</div>

					<div className="flex flex-col gap-2 items-end">
						<Button
							variant={"default"}
							className="px-[10px] py-1.5 border border-[#29292F] rounded-[5px] text-xs text-[#F8F8FF] h-fit bg-transparent transition-all duration-300"
							onClick={() => copyToClipboard()}
							disabled={!!copied}
						>
							{copied ? "Link copied!" : "Copy link"}
						</Button>
					</div>
				</div>
			</div>

			<div className="flex flex-col py-[106px] border-y border-[#29292F] gap-[60px]">
				<p className="text-[22px] text-[#F8F8FF] leading-[34px]">
					{blog.blogDetails}
				</p>

				{blog.sections.map((section, index) => (
					<ArticleSection
						key={index}
						header={section.header}
						content={section.content}
						list={section.list}
						image={section.image}
						link={section.link}
					/>
				))}

				<p className="text-lg text-[#CCCCCC] italic">{blog.otherInfo}</p>
			</div>

			<div className="flex flex-col gap-7 py-[93px]">
				<p className="text-[#E4E4EC] text-[28px] leading-[42px] font-semibold">
					Related blog
				</p>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-9">
					{filteredBlogs.slice(1).map((blog, index) => (
						<Link
							href={`/news/${blog.id}`}
							className="flex flex-col gap-6 h-auto w-fit max-w-[385px]"
							key={index}
						>
							<img
								src={`${blog.image}`}
								alt="Blog post"
								className="w-full h-auto"
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
	);
}
