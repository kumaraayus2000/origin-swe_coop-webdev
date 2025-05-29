import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"

// Sample interview questions data
const interviewQuestions = [
  // useState, useEffect, event handling
  {
    id: 1,
    title: "Infinite re-render loop",
    category: "React Basics",
    difficulty: "Easy",
  },
  // trigger re-render
  {
    id: 2,
    title: "Loading Expensive Child Component",
    category: "React Basics",
    difficulty: "Medium",
  },
]

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Interview Questions</h1>
      <p className="text-muted-foreground mb-8">Select a question to view the defects that need to be fixed.</p>

      <div className="grid gap-4">
        {interviewQuestions.map((question) => (
          <Link href={`/questions/${question.id}`} key={question.id}>
            <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-medium">{question.title}</h2>
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
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  )
}
