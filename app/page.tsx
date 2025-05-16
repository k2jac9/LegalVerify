import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowRight, Shield, FileCheck, Award, CheckCircle2, Search, Lock } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-background to-secondary/20 py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-primary">LegalVerify</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
              Secure, transparent, and tamper-proof legal records powered by blockchain technology.
              Verifiable legal reviews and CLE records for lawyers, clients, and providers.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Button asChild className="px-8 py-6 text-lg">
                <Link href="/dashboard/lawyer">
                  Lawyer Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="px-8 py-6 text-lg">
                <Link href="/dashboard/client">
                  Client Portal <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose LegalVerify</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="p-6">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Immutable Records</h3>
              <p className="text-muted-foreground">
                All reviews are permanently recorded on the Aptos and Stellar blockchain, ensuring they cannot be altered or deleted.
              </p>
            </Card>
            
            <Card className="p-6">
              <FileCheck className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Blockchain Verification</h3>
              <p className="text-muted-foreground">
                Each review is linked to a unique blockchain transaction for transparent verification.
              </p>
            </Card>
            
            <Card className="p-6">
              <Search className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Searchable Database</h3>
              <p className="text-muted-foreground">
                Easily search and find verified reviews based on case type, jurisdiction, or keywords.
              </p>
            </Card>

            <Card className="p-6">
              <Lock className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Professional Security</h3>
              <p className="text-muted-foreground">
                Designed for legal professionals with privacy and security built into every aspect.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4 text-xl font-bold">1</div>
              <h3 className="text-xl font-bold mb-2">Create a Review</h3>
              <p className="text-muted-foreground">
                Draft your legal review with our easy-to-use template system designed for legal professionals.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4 text-xl font-bold">2</div>
              <h3 className="text-xl font-bold mb-2">Submit for Verification</h3>
              <p className="text-muted-foreground">
                Submit your review to be cryptographically signed and permanently recorded on the blockchain.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4 text-xl font-bold">3</div>
              <h3 className="text-xl font-bold mb-2">Share Verified Reviews</h3>
              <p className="text-muted-foreground">
                Share your blockchain-verified review with clients, colleagues, or the court with full confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What Legal Professionals Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6">
              <div className="flex flex-col items-center">
                <img
                  src="https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg"
                  alt="Sarah Chen"
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-bold">Sarah Chen</h3>
                <p className="text-sm text-muted-foreground mb-4">Intellectual Property Attorney</p>
                <p className="text-muted-foreground text-center italic">
                  "LegalVerify has revolutionized how I provide expert opinions. My clients appreciate the added layer of trust that blockchain verification provides."
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex flex-col items-center">
                <img
                  src="https://images.pexels.com/photos/5397723/pexels-photo-5397723.jpeg"
                  alt="Michael Johnson"
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-bold">Michael Johnson</h3>
                <p className="text-sm text-muted-foreground mb-4">Corporate Law Partner</p>
                <p className="text-muted-foreground text-center italic">
                  "The ability to provide verifiable contract reviews has strengthened our firm's reputation and given our clients peace of mind in high-stakes negotiations."
                </p>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex flex-col items-center">
                <img
                  src="https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg"
                  alt="Elena Rodriguez"
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-bold">Elena Rodriguez</h3>
                <p className="text-sm text-muted-foreground mb-4">Compliance Officer</p>
                <p className="text-muted-foreground text-center italic">
                  "LegalVerify has streamlined our compliance reviews and created an immutable audit trail that has simplified our regulatory reporting requirements."
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Legal Reviews?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg">
            Join the growing community of legal professionals using blockchain verification to establish trust and transparency.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="secondary" className="px-6 py-5 text-lg">
              <Link href="/dashboard/lawyer">
                Create Your Account
              </Link>
            </Button>
            <Button asChild variant="outline" className="px-6 py-5 text-lg bg-transparent border-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/learn-more">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}