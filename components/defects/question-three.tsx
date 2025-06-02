"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function QuestionThree() {
	const [user, setUser] = useState({
		name: "John Doe",
		email: "john.doe@example.com"
	})

	const handleUpdateEmail = async () => {

		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000))
			
			const newEmail = (document.getElementById("new-email") as HTMLInputElement).value;
			user.email = newEmail;
			setUser(user);
		} catch (err) {
			console.error(err)
		}
	}

	return (
		<div className="relative flex flex-col gap-4">
			<h1 className="text-xl mb-4">User email update didn't take effect</h1>
			<Card className="w-full max-w-md mx-auto">
				<CardHeader>
					<CardTitle>Update Email Address</CardTitle>
					<CardDescription>
					Change email address. Current email should be updated immediately after clicking the button.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="current-email">Current Email</Label>
						<div className="p-2 bg-muted rounded-md text-sm">{user.email}</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="new-email">New Email</Label>
						<div className="flex items-center relative">
							<Input
								id="new-email"
								type="email"
								defaultValue={user.email}
								className="pr-10"
								placeholder="Enter your new email address"
							/>
							<Mail className="absolute right-3 h-4 w-4 text-muted-foreground" />
						</div>
					</div>
				</CardContent>
				<CardFooter>
					<Button onClick={handleUpdateEmail} className="w-full">
					Update Email
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}

