"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

export default function NewsDetails({ params }: any) {
	const blog = blogs.find((b) => b.id === Number.parseInt(params.newsId));

	if (!blog) {
		return <div>Blog not found</div>;
	}

	const filteredBlogs = blogs.filter((b) => b.id !== blog.id);

	const [copied, setCopied] = useState(false);

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

				<img
					src={`${blog.image}`}
					alt="Blog"
					className="w-full h-auto sm:h-[461px] bg-news-gradient rounded-xl"
				/>

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
						<p className="text-sm text-[#CCCCCC]">Publish 11.05.2023</p>
					</div>
				</div>
			</div>

			<div className="flex flex-col py-[106px] border-y border-[#29292F] gap-[60px]">
				<p className="text-[22px] text-[#F8F8FF] leading-[34px]">
					{blog.blogDetails}
				</p>

				{blog.paragraphs?.map((item, index) => (
					<div className="flex flex-col gap-4" key={index}>
						<p className="text-[28px] font-semibold text-[#F8F8FF] leading-[42px]">
							{item.paragraphHeader}
						</p>
						<p className="text-[#CCCCCC] text-xl">{item.paragraphDetails}</p>

						{item.hasList &&
							item.list.map((list, index) => (
								<div className="flex flex-col gap-4" key={index}>
									<p className="text-[#F8F8FF] text-[22px] font-medium">
										{`${index + 1})`} {list.listHeader}
									</p>
									<p className="text-[#CCCCCC] text-lg leading-[33px]">
										{list.listDetails}
									</p>
								</div>
							))}
					</div>
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

const blogs = [
	{
		id: 1,
		image: "/assets/images/news/news-bg.png",
		blogHeader: `Ovation Technologies Secures ArchwayHQ Grant for Expanded
                Operations`,
		blogDetails: `A space dedicated to sharing our journeys, experiences, and
              insights. Join us as we explore and connect through the power of
              storytelling.`,
		paragraphs: [
			{
				paragraphHeader: "What determines a Security?",
				paragraphDetails:
					"If there is an “investment of money in a common enterprise with a reasonable expectation of profits to be derived from the efforts of others,” the transaction is subject to disclosure and registration requirements under the Securities Act of 1933 and the Security Exchange Act of 1934. In others words a Security.",
				list: [
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
				],
				hasList: false,
			},
			{
				paragraphHeader: "How is a Security Defined?",
				paragraphDetails: `The Securities Act of 1933 and the Security Exchange Act of 1934 define what a security is.
          They define things such as stocks, bonds, other common investment instruments, and also what is called an “investment contract.” This is a flexible term to capture investments that act like securities, but don’t fit within any other categories of securities.`,
				list: [
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
				],
				hasList: false,
			},
			{
				paragraphHeader:
					"The Howey Test — Determining if an Investment Contract exists",
				paragraphDetails: `SEC v. W.J. Howey Co. 1946 was the case that legally defined if a transaction qualifies as an “investment contract” and thus a Security.
          The supreme court determined that an “investment contract” or the “Howey Test” is defined by the following attributes.
          For a transaction to qualify as a security it must involve as 4 elements below:`,
				list: [
					{
						listHeader: "An investment of money",
						listDetails:
							"Straightforward, an exchange of money or wealth must occur.",
					},
					{
						listHeader: "In a common enterprise",
						listDetails:
							"The enterprise in which the investor’s fortunes are interwoven with either the person offering the investment, a third party, or one or more investors.",
					},
					{
						listHeader: "With the expectation of profit",
						listDetails:
							"This element looks at the investor’s intent for buying the asset. Are they buying the transaction because they’re expecting a profit? Was this communicated to them through advertisements, social media, discussions, on the contract/NFT, or on the website? Or are they investing in the NFT project because they like the art or see it as a mechanism to store wealth?",
					},
					{
						listHeader: "To be derived from the efforts of others",
						listDetails: `This element is used to separate the investor from the third party. If the investor is actively working in the investment and thus has a role in its success, it’s most likely not an investment.
              If all 4 of these elements are met, your NFT project is a Security`,
					},
				],
				hasList: true,
			},
			{
				paragraphHeader: "What does this mean for your NFT project?",
				paragraphDetails:
					"Use the Howey Test to determine if your project falls under an “investment contract” definition and thus a Security. If it does, you will need to register as a Security. Consult a lawyer that is familiar with SEC Securities law and NFTs as a technology. Disclaimer: This is not legal advice, consult a lawyer when making decisions regarding securities law.",
				list: [
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
				],
				hasList: false,
			},
		],
		otherInfo: "(Dated back to February 6th 2024).",
	},
	{
		id: 2,
		image: "/assets/images/news/news1.png",
		blogHeader:
			"Ovation Technologies Secures ArchwayHQ Grant for Expanded Operations",
		blogDetails: `It is with great excitement that we announce that Ovation has been
              approved for the ArchwayHQ grant!`,
		paragraphs: [
			{
				paragraphHeader: "What determines a Security?",
				paragraphDetails:
					"If there is an “investment of money in a common enterprise with a reasonable expectation of profits to be derived from the efforts of others,” the transaction is subject to disclosure and registration requirements under the Securities Act of 1933 and the Security Exchange Act of 1934. In others words a Security.",
				list: [
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
				],
				hasList: false,
			},
			{
				paragraphHeader: "How is a Security Defined?",
				paragraphDetails: `The Securities Act of 1933 and the Security Exchange Act of 1934 define what a security is.
          They define things such as stocks, bonds, other common investment instruments, and also what is called an “investment contract.” This is a flexible term to capture investments that act like securities, but don’t fit within any other categories of securities.`,
				list: [
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
				],
				hasList: false,
			},
			{
				paragraphHeader:
					"The Howey Test — Determining if an Investment Contract exists",
				paragraphDetails: `SEC v. W.J. Howey Co. 1946 was the case that legally defined if a transaction qualifies as an “investment contract” and thus a Security.
          The supreme court determined that an “investment contract” or the “Howey Test” is defined by the following attributes.
          For a transaction to qualify as a security it must involve as 4 elements below:`,
				list: [
					{
						listHeader: "An investment of money",
						listDetails:
							"Straightforward, an exchange of money or wealth must occur.",
					},
					{
						listHeader: "In a common enterprise",
						listDetails:
							"The enterprise in which the investor’s fortunes are interwoven with either the person offering the investment, a third party, or one or more investors.",
					},
					{
						listHeader: "With the expectation of profit",
						listDetails:
							"This element looks at the investor’s intent for buying the asset. Are they buying the transaction because they’re expecting a profit? Was this communicated to them through advertisements, social media, discussions, on the contract/NFT, or on the website? Or are they investing in the NFT project because they like the art or see it as a mechanism to store wealth?",
					},
					{
						listHeader: "To be derived from the efforts of others",
						listDetails: `This element is used to separate the investor from the third party. If the investor is actively working in the investment and thus has a role in its success, it’s most likely not an investment.
              If all 4 of these elements are met, your NFT project is a Security`,
					},
				],
				hasList: true,
			},
			{
				paragraphHeader: "What does this mean for your NFT project?",
				paragraphDetails:
					"Use the Howey Test to determine if your project falls under an “investment contract” definition and thus a Security. If it does, you will need to register as a Security. Consult a lawyer that is familiar with SEC Securities law and NFTs as a technology. Disclaimer: This is not legal advice, consult a lawyer when making decisions regarding securities law.",
				list: [
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
				],
				hasList: false,
			},
		],
		otherInfo: "(Dated back to February 6th 2024).",
	},
	{
		id: 3,
		image: "/assets/images/news/news2.png",
		blogHeader: "See you at NFT NYC",
		blogDetails: "Ovation will be attending NFT NYC 2023!",
		paragraphs: [
			{
				paragraphHeader: "What determines a Security?",
				paragraphDetails:
					"If there is an “investment of money in a common enterprise with a reasonable expectation of profits to be derived from the efforts of others,” the transaction is subject to disclosure and registration requirements under the Securities Act of 1933 and the Security Exchange Act of 1934. In others words a Security.",
				list: [
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
				],
				hasList: false,
			},
			{
				paragraphHeader: "How is a Security Defined?",
				paragraphDetails: `The Securities Act of 1933 and the Security Exchange Act of 1934 define what a security is.
          They define things such as stocks, bonds, other common investment instruments, and also what is called an “investment contract.” This is a flexible term to capture investments that act like securities, but don’t fit within any other categories of securities.`,
				list: [
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
				],
				hasList: false,
			},
			{
				paragraphHeader:
					"The Howey Test — Determining if an Investment Contract exists",
				paragraphDetails: `SEC v. W.J. Howey Co. 1946 was the case that legally defined if a transaction qualifies as an “investment contract” and thus a Security.
          The supreme court determined that an “investment contract” or the “Howey Test” is defined by the following attributes.
          For a transaction to qualify as a security it must involve as 4 elements below:`,
				list: [
					{
						listHeader: "An investment of money",
						listDetails:
							"Straightforward, an exchange of money or wealth must occur.",
					},
					{
						listHeader: "In a common enterprise",
						listDetails:
							"The enterprise in which the investor’s fortunes are interwoven with either the person offering the investment, a third party, or one or more investors.",
					},
					{
						listHeader: "With the expectation of profit",
						listDetails:
							"This element looks at the investor’s intent for buying the asset. Are they buying the transaction because they’re expecting a profit? Was this communicated to them through advertisements, social media, discussions, on the contract/NFT, or on the website? Or are they investing in the NFT project because they like the art or see it as a mechanism to store wealth?",
					},
					{
						listHeader: "To be derived from the efforts of others",
						listDetails: `This element is used to separate the investor from the third party. If the investor is actively working in the investment and thus has a role in its success, it’s most likely not an investment.
              If all 4 of these elements are met, your NFT project is a Security`,
					},
				],
				hasList: true,
			},
			{
				paragraphHeader: "What does this mean for your NFT project?",
				paragraphDetails:
					"Use the Howey Test to determine if your project falls under an “investment contract” definition and thus a Security. If it does, you will need to register as a Security. Consult a lawyer that is familiar with SEC Securities law and NFTs as a technology. Disclaimer: This is not legal advice, consult a lawyer when making decisions regarding securities law.",
				list: [
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
				],
				hasList: false,
			},
		],
		otherInfo: "(Dated back to February 6th 2024).",
	},
	{
		id: 4,
		image: "/assets/images/news/news3.png",
		blogHeader:
			"Imagine if X, OpenSea, and Discord had a Web3 baby, that would be Ovation- The First NFT Super App.",
		blogDetails:
			"The current NFT landscape consists of a multitude of disconnected applications where NFT enthusiasts manage portfolios across multiple wallets and blockchains",
		paragraphs: [
			{
				paragraphHeader: "What determines a Security?",
				paragraphDetails:
					"If there is an “investment of money in a common enterprise with a reasonable expectation of profits to be derived from the efforts of others,” the transaction is subject to disclosure and registration requirements under the Securities Act of 1933 and the Security Exchange Act of 1934. In others words a Security.",
				list: [
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
				],
				hasList: false,
			},
			{
				paragraphHeader: "How is a Security Defined?",
				paragraphDetails: `The Securities Act of 1933 and the Security Exchange Act of 1934 define what a security is.
          They define things such as stocks, bonds, other common investment instruments, and also what is called an “investment contract.” This is a flexible term to capture investments that act like securities, but don’t fit within any other categories of securities.`,
				list: [
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
				],
				hasList: false,
			},
			{
				paragraphHeader:
					"The Howey Test — Determining if an Investment Contract exists",
				paragraphDetails: `SEC v. W.J. Howey Co. 1946 was the case that legally defined if a transaction qualifies as an “investment contract” and thus a Security.
          The supreme court determined that an “investment contract” or the “Howey Test” is defined by the following attributes.
          For a transaction to qualify as a security it must involve as 4 elements below:`,
				list: [
					{
						listHeader: "An investment of money",
						listDetails:
							"Straightforward, an exchange of money or wealth must occur.",
					},
					{
						listHeader: "In a common enterprise",
						listDetails:
							"The enterprise in which the investor’s fortunes are interwoven with either the person offering the investment, a third party, or one or more investors.",
					},
					{
						listHeader: "With the expectation of profit",
						listDetails:
							"This element looks at the investor’s intent for buying the asset. Are they buying the transaction because they’re expecting a profit? Was this communicated to them through advertisements, social media, discussions, on the contract/NFT, or on the website? Or are they investing in the NFT project because they like the art or see it as a mechanism to store wealth?",
					},
					{
						listHeader: "To be derived from the efforts of others",
						listDetails: `This element is used to separate the investor from the third party. If the investor is actively working in the investment and thus has a role in its success, it’s most likely not an investment.
              If all 4 of these elements are met, your NFT project is a Security`,
					},
				],
				hasList: true,
			},
			{
				paragraphHeader: "What does this mean for your NFT project?",
				paragraphDetails:
					"Use the Howey Test to determine if your project falls under an “investment contract” definition and thus a Security. If it does, you will need to register as a Security. Consult a lawyer that is familiar with SEC Securities law and NFTs as a technology. Disclaimer: This is not legal advice, consult a lawyer when making decisions regarding securities law.",
				list: [
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
				],
				hasList: false,
			},
		],
		otherInfo: "(Dated back to February 6th 2024).",
	},
	{
		id: 5,
		image: "/assets/images/news/news4.png",
		blogHeader: "Ovation is speaking at NFT NYC 2024!",
		blogDetails: "Ovation will be speaking at NFT NYC 2024!",
		paragraphs: [
			{
				paragraphHeader: "What determines a Security?",
				paragraphDetails:
					"If there is an “investment of money in a common enterprise with a reasonable expectation of profits to be derived from the efforts of others,” the transaction is subject to disclosure and registration requirements under the Securities Act of 1933 and the Security Exchange Act of 1934. In others words a Security.",
				list: [
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
				],
				hasList: false,
			},
			{
				paragraphHeader: "How is a Security Defined?",
				paragraphDetails: `The Securities Act of 1933 and the Security Exchange Act of 1934 define what a security is.
          They define things such as stocks, bonds, other common investment instruments, and also what is called an “investment contract.” This is a flexible term to capture investments that act like securities, but don’t fit within any other categories of securities.`,
				list: [
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
				],
				hasList: false,
			},
			{
				paragraphHeader:
					"The Howey Test — Determining if an Investment Contract exists",
				paragraphDetails: `SEC v. W.J. Howey Co. 1946 was the case that legally defined if a transaction qualifies as an “investment contract” and thus a Security.
          The supreme court determined that an “investment contract” or the “Howey Test” is defined by the following attributes.
          For a transaction to qualify as a security it must involve as 4 elements below:`,
				list: [
					{
						listHeader: "An investment of money",
						listDetails:
							"Straightforward, an exchange of money or wealth must occur.",
					},
					{
						listHeader: "In a common enterprise",
						listDetails:
							"The enterprise in which the investor’s fortunes are interwoven with either the person offering the investment, a third party, or one or more investors.",
					},
					{
						listHeader: "With the expectation of profit",
						listDetails:
							"This element looks at the investor’s intent for buying the asset. Are they buying the transaction because they’re expecting a profit? Was this communicated to them through advertisements, social media, discussions, on the contract/NFT, or on the website? Or are they investing in the NFT project because they like the art or see it as a mechanism to store wealth?",
					},
					{
						listHeader: "To be derived from the efforts of others",
						listDetails: `This element is used to separate the investor from the third party. If the investor is actively working in the investment and thus has a role in its success, it’s most likely not an investment.
              If all 4 of these elements are met, your NFT project is a Security`,
					},
				],
				hasList: true,
			},
			{
				paragraphHeader: "What does this mean for your NFT project?",
				paragraphDetails:
					"Use the Howey Test to determine if your project falls under an “investment contract” definition and thus a Security. If it does, you will need to register as a Security. Consult a lawyer that is familiar with SEC Securities law and NFTs as a technology. Disclaimer: This is not legal advice, consult a lawyer when making decisions regarding securities law.",
				list: [
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
					{
						listHeader: "",
						listDetails: "",
					},
				],
				hasList: false,
			},
		],
		otherInfo: "(Dated back to February 6th 2024).",
	},
];
