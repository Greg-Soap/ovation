/* eslint-disable @next/next/no-img-element */
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { BorderBeam } from "@/components/animations/border-beam";
import { FadeText } from "@/components/animations/fade";

const formSchema = z.object({
	email: z.string().email({
		message: "Email must be correct.",
	}),
});

export default function Hero() {
	//closest bg-gradient
	//bg-gradient-to-t from-green-400 to-cyan-900

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		toast("Thank you for subscribing to our newsletter!");
	}

	return (
		<section className="pt-32 pb-8 flex flex-col items-center justify-center w-fit h-fit bg-vector-one bg-top bg-contain bg-no-repeat relative ">
			<img
				src="assets/images/hero/hero1.png"
				alt=""
				className="absolute hero-img-top-left left-72 top-[70px]"
			/>

			<img
				src="assets/images/hero/hero2.png"
				alt=""
				className="absolute right-72 top-[72px] hero-img-top-right"
			/>

			<img
				src="assets/images/hero/hero3.png"
				alt=""
				className="absolute left-40 bottom-[290px] hero-img-bottom-left"
			/>

			<img
				src="assets/images/hero/hero4.png"
				alt=""
				className="absolute right-40 bottom-[290px] hero-img-bottom-right"
			/>

			<div className="text-[10px] leading-[15px] md:text-base text-[#C1FE17] py-[6.5px] px-4 rounded-[20px] border border-[#828774] flex items-center gap-3 bg-custom-gradient mb-10">
				<img
					src="assets/images/Cone.png"
					alt="logo"
					className="w-[14px] h-[14px] md:w-[25px] md:h-[25px]"
				/>
				<p>THE LEADING NFT SOCIAL PLATFORM</p>
			</div>

			<FadeText
				direction="up"
				className="text-primary-foreground font-heading text-[30px] leading-[38px] md:text-5xl font-bold text-center w-[55%] mb-3 md:leading-[60px] hero-header"
			>
				Experience the Next-Generation NFT Social Platform
			</FadeText>

			<FadeText
				direction="up"
				className="text-base md:text-[22px] md:leading-9  text-center lg:w-[45%]"
			>
				The only web3 social platform offering intelligent profiles,
				personalized portfolios, and a blockchain-enabled UI for a unified NFT
				experience.
			</FadeText>

			<div className="lg:w-[50%] w-[90%] flex flex-col gap-4 items-center justify-center mb-10">
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-8 w-full mt-10"
					>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="relative">
									<FormControl className="relative ">
										<div className="relative border border-[#666666] bg-[#FFFFFF1A] rounded-[500px]">
											<Input
												placeholder="Enter your email"
												{...field}
												className="text-lg"
											/>
											<Button
												className="absolute top-[20%] right-[15px] text-xs text-[#111115] px-4 py-3 h-fit"
												type="submit"
											>
												Submit
											</Button>
											<BorderBeam
												size={125}
												duration={8}
												anchor={90}
												colorFrom="#C1FE17"
												colorTo="#bbff00"
											/>
										</div>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>

					<p className="text-[#999999] text-center">
						Sign up and be the first to know about our MVP Launch!
					</p>
				</Form>
			</div>
		</section>
	);
}
