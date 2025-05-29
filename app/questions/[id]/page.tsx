"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, CheckCircle, AlertCircle, Clock } from "lucide-react"
import QuestionOne from "@/components/defects/question-one";
import QuestionTwo from "@/components/defects/question-two";
// Sample questions data
const questionsData = {
  1: {
    title: "Infinite re-render loop",
    category: "React Basics",
		difficulty: "Easy",
		component: <QuestionOne />
  },
  2: {
    title: "Loading Expensive Child Component",
    category: "React",
    difficulty: "Medium",
    component: <QuestionTwo />
  },
  3: {
    title: "Question 3",
    category: "CSS",
    difficulty: "Easy",
    component: <></>
  },
  4: {
    title: "Question 4",
    category: "Next.js",
    difficulty: "Hard",
    component: <></>
  },
  5: {
    title: "Question 5",
    category: "JavaScript",
    difficulty: "Hard",
    component: <></>
  },
}

export default function QuestionDetail() {
  const params = useParams()
  const questionId = params.id as string

  // Get question data based on ID
  const question = questionsData[Number(questionId) as keyof typeof questionsData]

  if (!question) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Questions
          </Button>
        </Link>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-medium">Question not found</h2>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Critical":
        return "bg-red-500"
      case "High":
        return "bg-orange-500"
      case "Medium":
        return "bg-yellow-500"
      case "Low":
        return "bg-green-500"
      default:
        return "bg-blue-500"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Open":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "In Progress":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "Resolved":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Link href="/">
        <Button variant="ghost" className="mb-4">
          <ChevronLeft className="mr-2 h-4 w-4" /> Back to Questions
        </Button>
      </Link>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{question.title}</CardTitle>
          <CardDescription>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">{question.category}</Badge>
              <Badge
                variant={
                  question.difficulty === "Easy"
                    ? "secondary"
                    : question.difficulty === "Medium"
                      ? "default"
                      : "destructive"
                }
              >
                {question.difficulty}
              </Badge>
            </div>
          </CardDescription>
        </CardHeader>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Defects to Fix</h2>

			<div className="grid gap-4 md:grid-cols-2 border p-4 rounded-md">
				{question.component}
      </div>
    </div>
  )
}
