"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBlockchain } from '@/components/providers/blockchain-provider';
import { DashboardHeader } from '../components/dashboard-header';
import { ReviewForm } from './components/review-form';
import { ReviewHistory } from './components/review-history';

// Mock lawyer data for demonstration
const mockLawyers = [
  { id: 'l1', name: 'Jane Smith, Esq.', firm: 'Smith & Associates' },
  { id: 'l2', name: 'Robert Johnson, JD', firm: 'Johnson Legal Group' },
  { id: 'l3', name: 'Lisa Chen, Attorney', firm: 'Chen Law Offices' },
];

export default function ClientDashboard() {
  const { currentNetwork, switchNetwork } = useBlockchain();
  const [activeTab, setActiveTab] = useState("submit");
  
  return (
    <div className="container mx-auto p-4">
      <DashboardHeader 
        title="Client Portal" 
        description="Submit and view your legal reviews"
        userRole="client"
      />
      
      <Tabs defaultValue="submit" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:w-[400px]">
          <TabsTrigger value="submit">Submit Review</TabsTrigger>
          <TabsTrigger value="history">Review History</TabsTrigger>
        </TabsList>
        
        <TabsContent value="submit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Submit a New Legal Review</CardTitle>
              <CardDescription>
                Your review will be securely recorded on the blockchain for verification
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReviewForm lawyers={mockLawyers} />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Why Blockchain-Verified Reviews?</CardTitle>
              <CardDescription>
                Benefits of submitting blockchain-verified legal reviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-medium mb-1">Tamper-Proof</h3>
                  <p className="text-sm text-muted-foreground">
                    Reviews cannot be altered or deleted once recorded
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </div>
                  <h3 className="font-medium mb-1">Transparency</h3>
                  <p className="text-sm text-muted-foreground">
                    Publicly verifiable while maintaining privacy
                  </p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4 border rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    <svg className="w-6 h-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="font-medium mb-1">Anonymity Option</h3>
                  <p className="text-sm text-muted-foreground">
                    Submit anonymous reviews with the same verification
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Review History</CardTitle>
              <CardDescription>
                All your blockchain-verified legal reviews
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReviewHistory />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}