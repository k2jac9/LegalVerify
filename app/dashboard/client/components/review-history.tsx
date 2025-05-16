"use client";

import { useState, useEffect } from 'react';
import { LegalReview } from '@/lib/types';
import { VerificationBadge } from '@/components/blockchain/verification-badge';
import { Card, CardContent } from "@/components/ui/card";
import { StarIcon } from "lucide-react";
import { Skeleton } from '@/components/ui/skeleton';

// Mock review history for demonstration
const mockReviewHistory: LegalReview[] = [
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
    id: '3',
    clientId: 'c1',
    clientName: 'John Doe',
    lawyerId: 'l3',
    lawyerName: 'Lisa Chen, Attorney',
    rating: 4,
    comment: 'Good communication throughout my case. Lisa was very responsive and explained complex matters clearly.',
    isAnonymous: false,
    timestamp: new Date('2024-12-05'),
    blockchainProof: {
      id: 'bp5',
      network: 'stellar',
      transactionId: 'Stellar-TX-XYZABC789012',
      timestamp: new Date('2024-12-05'),
      verified: true,
      dataHash: 'stellar-hash-xyz789',
      verificationUrl: 'https://stellar.expert/explorer/tx/Stellar-TX-XYZABC789012'
    }
  }
];

export function ReviewHistory() {
  const [reviews, setReviews] = useState<LegalReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulating API fetch with delay
    const fetchReviews = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setReviews(mockReviewHistory);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReviews();
  }, []);
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-start space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-1/3" />
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  if (reviews.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">You haven't submitted any reviews yet.</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <Card key={review.id} className="overflow-hidden">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-lg">{review.lawyerName}</h3>
                  <div className="flex items-center mt-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-xs text-muted-foreground">
                      {new Date(review.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                
                <div>
                  <VerificationBadge proof={review.blockchainProof} size="sm" showDetails={false} />
                </div>
              </div>
              
              <div>
                <p className="text-sm">{review.comment}</p>
              </div>
              
              <div className="pt-2 border-t">
                <VerificationBadge proof={review.blockchainProof} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}