import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, BookOpen, AlignCenterVertical as Certificate, Scale } from "lucide-react"
import Link from "next/link"

export default function LearnMore() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-8">Learn More About ProofBox</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="p-6">
            <BookOpen className="h-12 w-12 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-3">Educational Verification</h2>
            <p className="text-gray-600">
              Our platform provides a secure and transparent way to verify continuing legal education credits using blockchain technology.
            </p>
          </Card>

          <Card className="p-6">
            <Scale className="h-12 w-12 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-3">Legal Compliance</h2>
            <p className="text-gray-600">
              Stay compliant with state bar requirements while maintaining an immutable record of your educational achievements.
            </p>
          </Card>

          <Card className="p-6">
            <Certificate className="h-12 w-12 text-primary mb-4" />
            <h2 className="text-xl font-semibold mb-3">Certification Management</h2>
            <p className="text-gray-600">
              Easily manage and verify your certifications with our blockchain-powered verification system.
            </p>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Link href="/dashboard">
            <Button size="lg" className="gap-2">
              Get Started
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}