"use client";

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useBlockchain } from '@/components/providers/blockchain-provider';
import { DashboardHeader } from '../components/dashboard-header';
import { CLEVerificationForm } from './components/cle-verification-form';
import { VerifiedRecords } from './components/verified-records';

export default function CLEProviderDashboard() {
  const { currentNetwork, switchNetwork } = useBlockchain();
  const [activeTab, setActiveTab] = useState("verify");
  
  return (
    <div className="container mx-auto p-4">
      <DashboardHeader 
        title="CLE Provider Portal" 
        description="Verify and manage continuing legal education records"
        userRole="provider"
      />
      
      <Tabs defaultValue="verify" className="space-y-6" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:w-[400px]">
          <TabsTrigger value="verify">Verify CLE</TabsTrigger>
          <TabsTrigger value="records">Verified Records</TabsTrigger>
        </TabsList>
        
        <TabsContent value="verify" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Verify CLE Completion</CardTitle>
              <CardDescription>
                Create a blockchain-verified record of completed CLE credits
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CLEVerificationForm />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>About Blockchain Verification</CardTitle>
              <CardDescription>
                Learn about our multi-blockchain verification system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg bg-card">
                    <h3 className="text-lg font-medium mb-2">Aptos Network</h3>
                    <p className="text-sm text-muted-foreground">
                      The Aptos blockchain provides advanced smart contract capabilities using the Move programming language, 
                      offering strong security guarantees for legal record verification.
                    </p>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-card">
                    <h3 className="text-lg font-medium mb-2">Stellar Network</h3>
                    <p className="text-sm text-muted-foreground">
                      The Stellar blockchain offers fast, low-cost transactions with built-in data storage capabilities,
                      making it ideal for CLE record verification and distribution.
                    </p>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg bg-card">
                  <h3 className="text-lg font-medium mb-2">Benefits for CLE Providers</h3>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    <li>Immutable verification of course completion</li>
                    <li>Transparent record management across jurisdictions</li>
                    <li>Simplified auditing and compliance verification</li>
                    <li>Reduced administrative overhead with automated verification</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="records" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Previously Verified CLE Records</CardTitle>
              <CardDescription>
                All blockchain-verified CLE records created by your organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <VerifiedRecords />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}