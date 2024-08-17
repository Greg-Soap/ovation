"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Stars from "../_components/star";
import { toast } from "sonner";

const formSchema = z.object({
	username: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	email: z.string().email({
		message: "Email must be correct.",
	}),
	feedback: z.string().min(2, {
		message: "Cannot be empty",
	}),
	improvement: z.string().min(2, {
		message: "Cannot be empty",
	}),
	description: z.string().min(2, {
		message: "Cannot be empty",
	}),
});

function onSubmit(values: z.infer<typeof formSchema>) {
	console.log(values);
	toast("Thank you for subscribing to our newsletter!");
}

export function FeedbackModal() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			email: "",
			feedback: "",
			improvement: "",
			description: "",
		},
	});

	return (
		<div className="px-6 py-8 gap-[30px] bg-[#232227] rounded-2xl flex flex-col min-w-[638px] w-[700px] max-h-[95%] overflow-auto">
			<div className="flex flex-col gap-1">
				<p className="text-xl text-[#F8F8FF] font-semibold">
					We&apos;d love your feedback!
				</p>
				<p className="text-sm text-[#999999]">
					Ovation is currently in alpha. Feedback helps us get better!
				</p>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full flex flex-wrap gap-x-5 gap-y-[30px]"
				>
					<div className="flex flex-wrap w-full gap-x-5 gap-y-[30px]">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem className="flex flex-col min-w-[267px] w-[48%] relative">
									<FormLabel className="text-sm text-[#F8F8FF]">
										Username
									</FormLabel>
									<FormControl {...field}>
										<>
											<Input
												placeholder=""
												className="h-[37px] bg-[#18181C] w-full rounded-full pl-[30px] text-xs text-[#B3B3B3]"
												type="text"
											/>
											<p className="text-xs absolute text-[#B3B3B3] top-[30px] left-4">
												@
											</p>
										</>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem className="flex flex-col w-[48.5%] min-w-[267px]">
									<FormLabel className="text-sm text-[#F8F8FF]">
										Email address
									</FormLabel>
									<FormControl {...field}>
										<Input
											placeholder="Enter your email address"
											className="h-[37px] bg-[#18181C] w-full rounded-full text-xs text-[#B3B3B3]"
											type="text"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<FormField
						control={form.control}
						name="feedback"
						render={({ field }) => (
							<FormItem className="flex flex-col w-full">
								<FormLabel className="text-sm text-[#F8F8FF]">
									What are we doing good?
								</FormLabel>
								<FormControl {...field}>
									<Textarea
										placeholder="Tell us what you think"
										className="max-h-[88px] w-full bg-[#18181C] rounded-2xl text-xs text-[#B3B3B3]"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="improvement"
						render={({ field }) => (
							<FormItem className="flex flex-col w-full">
								<FormLabel className="text-sm text-[#F8F8FF]">
									What can we improve on?
								</FormLabel>
								<FormControl {...field}>
									<Textarea
										placeholder="Tell us what you think"
										className="max-h-[88px] w-full bg-[#18181C] rounded-2xl text-xs text-[#B3B3B3]"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem className="flex flex-col w-full">
								<FormLabel className="text-sm text-[#F8F8FF]">
									Description
								</FormLabel>
								<FormControl {...field}>
									<Textarea
										placeholder="Tell us what you think"
										className="max-h-[88px] w-full bg-[#18181C] rounded-2xl text-xs text-[#B3B3B3]"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem className="flex flex-col w-full gap-[14px]">
								<FormLabel className="text-sm text-[#F8F8FF]">
									How would you rate Ovation?
								</FormLabel>
								<FormControl {...field}>
									<div className="flex">
										<Stars />
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<div className="p-[1px] bg-[#29292F] w-full" />

					<div className="flex justify-end gap-[10px] w-full">
						<Button
							variant={"default"}
							onClick={() => form.reset()}
							className="text-[#F8F8FF] text-[10px] font-semibold px-3 py-2 outline outline-1 outline-[#29292F] h-fit bg-transparent"
						>
							Discard
						</Button>
						<Button
							variant={"default"}
							type="submit"
							className="text-[10px] font-semibold px-3 py-2 outline-[#29292F] h-fit"
						>
							Submit
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
}
