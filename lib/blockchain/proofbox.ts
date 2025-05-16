import aptosClient, { AptosTransaction } from './aptos';
import stellarClient, { StellarTransaction } from './stellar';
import { BlockchainProof } from '../types';

// ProofBox API - Blockchain Integration Service
class ProofBoxService {
  // Create a new record on the specified blockchain
  async createRecord(
    network: 'aptos' | 'stellar', 
    data: any
  ): Promise<BlockchainProof> {
    let transaction: AptosTransaction | StellarTransaction;
    
    // Select blockchain based on network parameter
    if (network === 'aptos') {
      transaction = await aptosClient.createRecord(data);
      
      return {
        id: `aptos-${Date.now()}`,
        network: 'aptos',
        transactionId: transaction.hash,
        timestamp: new Date(transaction.timestamp),
        verified: transaction.status === 'success',
        dataHash: this._generateDataHash(data),
        verificationUrl: `https://explorer.aptoslabs.com/txn/${transaction.hash}`
      };
    } else {
      transaction = await stellarClient.createRecord(data);
      
      return {
        id: `stellar-${Date.now()}`,
        network: 'stellar',
        transactionId: transaction.id,
        timestamp: new Date(transaction.timestamp),
        verified: transaction.status === 'success',
        dataHash: this._generateDataHash(data),
        verificationUrl: `https://stellar.expert/explorer/public/tx/${transaction.id}`
      };
    }
  }
  
  // Verify a record on the specified blockchain
  async verifyRecord(
    network: 'aptos' | 'stellar',
    transactionId: string
  ): Promise<boolean> {
    if (network === 'aptos') {
      return aptosClient.verifyRecord(transactionId);
    } else {
      return stellarClient.verifyRecord(transactionId);
    }
  }
  
  // Get a record from the specified blockchain
  async getRecord(
    network: 'aptos' | 'stellar',
    transactionId: string
  ): Promise<BlockchainProof | null> {
    try {
      let transaction;
      
      if (network === 'aptos') {
        transaction = await aptosClient.getRecord(transactionId);
        
        if (!transaction) return null;
        
        return {
          id: `aptos-${Date.now()}`,
          network: 'aptos',
          transactionId: transaction.hash,
          timestamp: new Date(transaction.timestamp),
          verified: transaction.status === 'success',
          dataHash: this._generateDataHash(transaction.data),
          verificationUrl: `https://explorer.aptoslabs.com/txn/${transaction.hash}`
        };
      } else {
        transaction = await stellarClient.getRecord(transactionId);
        
        if (!transaction) return null;
        
        return {
          id: `stellar-${Date.now()}`,
          network: 'stellar',
          transactionId: transaction.id,
          timestamp: new Date(transaction.timestamp),
          verified: transaction.status === 'success',
          dataHash: this._generateDataHash(transaction.data),
          verificationUrl: `https://stellar.expert/explorer/public/tx/${transaction.id}`
        };
      }
    } catch (error) {
      console.error(`Error retrieving record from ${network}:`, error);
      return null;
    }
  }
  
  // Simple hash generation (in a real app, this would use a proper crypto library)
  private _generateDataHash(data: any): string {
    const jsonString = JSON.stringify(data);
    let hash = 0;
    
    for (let i = 0; i < jsonString.length; i++) {
      const char = jsonString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    // Convert to hex string
    return '0x' + Math.abs(hash).toString(16).padStart(8, '0');
  }
}

export const proofBoxService = new ProofBoxService();
export default proofBoxService;