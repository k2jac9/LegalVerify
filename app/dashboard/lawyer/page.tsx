"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useBlockchain } from '@/components/providers/blockchain-provider';
import { VerificationBadge } from '@/components/blockchain/verification-badge';
import { DashboardStats, LegalReview, CLERecord } from '@/lib/types';
import { RecentReviews } from './components/recent-reviews';
import { CLERecords } from './components/cle-records';
import { DashboardHeader } from '../components/dashboard-header';
import { DashboardCards } from '../components/dashboard-cards';
import { Send, Copy, CheckCircle2 } from 'lucide-react';

// Mock data for demonstration
const mockStats: DashboardStats = {
  totalReviews: 28,
  averageRating: 4.7,
  totalCLECredits: 45,
  pendingVerifications: 3
};

// Mock reviews for demonstration
const mockReviews: LegalReview[] = [
  {
    id: '1',
    clientId: 'c1',
    clientName: 'John Doe',
    lawyerId: 'l1',
    lawyerName: 'Jane Smith, Esq.',
    rating: 5,
    comment: 'Excellent legal counsel. Very thorough and professional.',
    isAnonymous: false,
    timestamp: new Date('2025-01-15'),
    blockchainProof: {
      id: 'bp1',
      network: 'aptos',
      transactionId: '0x1a2b3c4d5e6f7g8h9i0j',
      timestamp: new Date('2025-01-15'),
      verified: true,
      dataHash: '0xabcdef1234567890',
      verificationUrl: 'https://explorer.aptos.com/tx/0x1a2b3c4d5e6f7g8h9i0j'
    }
  },
  {
    id: '2',
    clientId: 'c2',
    clientName: 'Anonymous',
    lawyerId: 'l1',
    lawyerName: 'Jane Smith, Esq.',
    rating: 4,
    comment: 'Good communication and follow-through. Would recommend.',
    isAnonymous: true,
    timestamp: new Date('2025-01-10'),
    blockchainProof: {
      id: 'bp2',
      network: 'stellar',
      transactionId: 'Stellar-TX-ABCDEF12345',
      timestamp: new Date('2025-01-10'),
      verified: true,
      dataHash: 'stellar-hash-12345',
      verificationUrl: 'https://stellar.expert/explorer/tx/Stellar-TX-ABCDEF12345'
    }
  }
];

// Mock CLE records for demonstration
const mockCLERecords: CLERecord[] = [
  {
    id: 'cle1',
    lawyerId: 'l1',
    lawyerName: 'Jane Smith, Esq.',
    providerId: 'p1',
    providerName: 'State Bar Association',
    courseTitle: 'Ethics in Legal Practice',
    courseDescription: 'A comprehensive course on ethical considerations in modern legal practice.',
    creditHours: 6,
    completionDate: new Date('2025-01-02'),
    blockchainProof: {
      id: 'bp3',
      network: 'aptos',
      transactionId: '0xabc123def456ghi789',
      timestamp: new Date('2025-01-02'),
      verified: true,
      dataHash: '0x123456abcdef',
      verificationUrl: 'https://explorer.aptos.com/tx/0xabc123def456ghi789'
    }
  },
  {
    id: 'cle2',
    lawyerId: 'l1',
    lawyerName: 'Jane Smith, Esq.',
    providerId: 'p2',
    providerName: 'National Law Institute',
    courseTitle: 'Digital Evidence & E-Discovery',
    courseDescription: 'The latest approaches to handling electronic evidence and discovery procedures.',
    creditHours: 4,
    completionDate: new Date('2024-12-15'),
    blockchainProof: {
      id: 'bp4',
      network: 'stellar',
      transactionId: 'Stellar-TX-9876543210',
      timestamp: new Date('2024-12-15'),
      verified: false,
      dataHash: 'stellar-hash-98765',
      verificationUrl: 'https://stellar.expert/explorer/tx/Stellar-TX-9876543210'
    }
  }
];

export default function LawyerDashboard() {
  const { currentNetwork, switchNetwork } = useBlockchain();
  const [activeTab, setActiveTab] = useState("overview");
  const [clientEmail, setClientEmail] = useState("");
  const [linkCopied, setLinkCopied] = useState(false);
  const [linkGenerated, setLinkGenerated] = useState(false);
  const [reviewLink, setReviewLink] = useState("");

  const handleGenerateLink = () => {
    if (!clientEmail) return;
    
    // In a real app, this would make an API call to generate a unique review link
    const uniqueId = Math.random().toString(36).substring(2, 15);
    const link = `${window.location.origin}/review/${uniqueId}`;
    setReviewLink(link);
    setLinkGenerated(true);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(reviewLink);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <DashboardHeader 
        title="Lawyer Dashboard" 
        description="Manage your legal reviews and CLE records"
        userRole="lawyer"
      />
      
      <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 md:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="cle">CLE Records</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <DashboardCards stats={mockStats} />
          
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Reviews</CardTitle>
                <CardDescription>
                  Your most recent client reviews
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentReviews reviews={mockReviews.slice(0, 3)} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent CLE Credits</CardTitle>
                <CardDescription>
                  Your latest continuing legal education records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CLERecords records={mockCLERecords.slice(0, 3)} />
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Request Client Review</CardTitle>
              <CardDescription>
                Generate a secure link to send to your client for their review
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <Input
                    type="email"
                    placeholder="Enter client's email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleGenerateLink}
                    disabled={!clientEmail || linkGenerated}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Generate Link
                  </Button>
                </div>

                {linkGenerated && (
                  <div className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium truncate">{reviewLink}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCopyLink}
                        className="ml-2"
                      >
                        {linkCopied ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Share this link with your client to collect their review. The link will expire in 7 days.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reviews" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All Client Reviews</CardTitle>
              <CardDescription>
                Complete history of your client reviews with blockchain verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RecentReviews reviews={mockReviews} />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="cle" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>All CLE Records</CardTitle>
              <CardDescription>
                Your complete continuing legal education history
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <CLERecords records={mockCLERecords} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}