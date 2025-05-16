// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'lawyer' | 'client' | 'provider';
  createdAt: Date;
}

// Legal Review Types
export interface LegalReview {
  id: string;
  clientId: string;
  clientName: string;
  lawyerId: string;
  lawyerName: string;
  rating: number;
  comment: string;
  isAnonymous: boolean;
  timestamp: Date;
  blockchainProof: BlockchainProof;
}

// CLE Record Types
export interface CLERecord {
  id: string;
  lawyerId: string;
  lawyerName: string;
  providerId: string;
  providerName: string;
  courseTitle: string;
  courseDescription: string;
  creditHours: number;
  completionDate: Date;
  blockchainProof: BlockchainProof;
}

// Blockchain Proof Types
export interface BlockchainProof {
  id: string;
  network: 'aptos' | 'stellar';
  transactionId: string;
  timestamp: Date;
  verified: boolean;
  dataHash: string;
  verificationUrl: string;
}

// ProofBox API Response Types
export interface ProofBoxResponse {
  success: boolean;
  message: string;
  data?: any;
  error?: string;
}

// Dashboard Stats
export interface DashboardStats {
  totalReviews: number;
  averageRating: number;
  totalCLECredits: number;
  pendingVerifications: number;
}