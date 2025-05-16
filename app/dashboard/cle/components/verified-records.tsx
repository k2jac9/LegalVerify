"use client";

import { useState, useEffect } from 'react';
import { CLERecord } from '@/lib/types';
import { VerificationBadge } from '@/components/blockchain/verification-badge';
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, BookOpen, User } from "lucide-react";
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

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
    lawyerId: 'l2',
    lawyerName: 'Robert Johnson, JD',
    providerId: 'p1',
    providerName: 'State Bar Association',
    courseTitle: 'Digital Evidence & E-Discovery',
    courseDescription: 'The latest approaches to handling electronic evidence and discovery procedures.',
    creditHours: 4,
    completionDate: new Date('2024-12-15'),
    blockchainProof: {
      id: 'bp4',
      network: 'stellar',
      transactionId: 'Stellar-TX-9876543210',
      timestamp: new Date('2024-12-15'),
      verified: true,
      dataHash: 'stellar-hash-98765',
      verificationUrl: 'https://stellar.expert/explorer/tx/Stellar-TX-9876543210'
    }
  },
  {
    id: 'cle3',
    lawyerId: 'l3',
    lawyerName: 'Lisa Chen, Attorney',
    providerId: 'p1',
    providerName: 'State Bar Association',
    courseTitle: 'Intellectual Property Law Update',
    courseDescription: 'Recent developments in IP law focusing on digital assets and AI-generated content.',
    creditHours: 3,
    completionDate: new Date('2024-11-20'),
    blockchainProof: {
      id: 'bp5',
      network: 'aptos',
      transactionId: '0xdef456ghi789jkl012',
      timestamp: new Date('2024-11-20'),
      verified: true,
      dataHash: '0xdef456789abcdef',
      verificationUrl: 'https://explorer.aptos.com/tx/0xdef456ghi789jkl012'
    }
  }
];

export function VerifiedRecords() {
  const [records, setRecords] = useState<CLERecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // Simulating API fetch with delay
    const fetchRecords = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRecords(mockCLERecords);
      } catch (error) {
        console.error('Error fetching CLE records:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRecords();
  }, []);
  
  // Filter records based on search term
  const filteredRecords = records.filter(record => 
    record.lawyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.courseTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-1/3" />
                  <Skeleton className="h-5 w-20" />
                </div>
                <Skeleton className="h-4 w-full" />
                <div className="flex space-x-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          placeholder="Search by lawyer name or course title..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        {searchTerm && (
          <Button variant="ghost" onClick={() => setSearchTerm('')}>
            Clear
          </Button>
        )}
      </div>
      
      {filteredRecords.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">
            {searchTerm ? "No records match your search criteria." : "No verified CLE records found."}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRecords.map((record) => (
            <Card key={record.id}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-medium">{record.courseTitle}</h3>
                    <Badge variant="outline">
                      {record.creditHours} Credit{record.creditHours !== 1 ? "s" : ""}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center text-muted-foreground">
                      <User className="h-4 w-4 mr-1" />
                      <span>{record.lawyerName}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>
                        {new Date(record.completionDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p>{record.courseDescription}</p>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <VerificationBadge proof={record.blockchainProof} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}