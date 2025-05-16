import { BlockchainProof } from '../types';

// Network display names
export const networkNames = {
  aptos: 'Aptos',
  stellar: 'Stellar',
};

// Format transaction ID for display (truncate long IDs)
export function formatTransactionId(transactionId: string): string {
  if (!transactionId) return '';
  if (transactionId.length <= 16) return transactionId;
  return `${transactionId.substring(0, 8)}...${transactionId.substring(transactionId.length - 8)}`;
}

// Generate blockchain explorer URL for a transaction
export function getExplorerUrl(network: string, transactionId: string): string {
  switch (network) {
    case 'aptos':
      // Replace with actual Aptos explorer URL
      return `https://explorer.aptoslabs.com/txn/${transactionId}`;
    case 'stellar':
      // Replace with actual Stellar explorer URL
      return `https://stellar.expert/explorer/public/tx/${transactionId}`;
    default:
      return '#';
  }
}

// Calculate verification time (how long ago the record was verified)
export function getVerificationTime(timestamp: Date): string {
  const now = new Date();
  const verifiedDate = new Date(timestamp);
  const diffInMs = now.getTime() - verifiedDate.getTime();
  
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
  } else {
    return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
  }
}

// Verify blockchain proof (placeholder for actual implementation)
export async function verifyProof(proof: BlockchainProof): Promise<boolean> {
  // This would be replaced with actual verification logic
  console.log('Verifying blockchain proof:', proof);
  
  // Simulate verification delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return placeholder result
  return true;
}

// Get network icon based on blockchain network
export function getNetworkIcon(network: string): string {
  switch (network) {
    case 'aptos':
      return 'AptosCoin'; // Would be replaced with actual icon component
    case 'stellar':
      return 'StellarLogo'; // Would be replaced with actual icon component
    default:
      return 'Blockchain'; // Default icon
  }
}