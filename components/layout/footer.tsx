import Link from "next/link";
import { Github, Twitter, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
          {/* Brand Column */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">LegalVerify</h3>
            <p className="text-sm text-muted-foreground mb-6">
              Verifiable professional reviews for legal professionals powered by blockchain technology.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="mailto:contact@legalverify.com" className="text-muted-foreground hover:text-primary">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/features" className="text-muted-foreground hover:text-primary">Features</Link>
              </li>
              <li>
                <Link href="/pricing" className="text-muted-foreground hover:text-primary">Pricing</Link>
              </li>
              <li>
                <Link href="/blockchain" className="text-muted-foreground hover:text-primary">Blockchains</Link>
              </li>
              <li>
                <Link href="/verification" className="text-muted-foreground hover:text-primary">Verification</Link>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/documentation" className="text-muted-foreground hover:text-primary">Documentation</Link>
              </li>
              <li>
                <Link href="/guides" className="text-muted-foreground hover:text-primary">Guides</Link>
              </li>
              <li>
                <Link href="/faqs" className="text-muted-foreground hover:text-primary">FAQs</Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-primary">Blog</Link>
              </li>
              <li>
                <Link href="/careers" className="text-muted-foreground hover:text-primary">Careers</Link>
              </li>
              <li>
                <Link href="/press" className="text-muted-foreground hover:text-primary">Press</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} LegalVerify. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/legal" className="text-sm text-muted-foreground hover:text-primary">
                Legal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}