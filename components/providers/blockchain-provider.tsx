"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Types
type BlockchainNetwork = 'aptos' | 'stellar';

interface BlockchainRecord {
  id: string;
  network: BlockchainNetwork;
  transactionId: string;
  timestamp: Date;
  verified: boolean;
  data: any;
}

interface BlockchainContextType {
  currentNetwork: BlockchainNetwork;
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
  switchNetwork: (network: BlockchainNetwork) => void;
  createRecord: (data: any) => Promise<BlockchainRecord | null>;
  verifyRecord: (record: BlockchainRecord) => Promise<boolean>;
}

const BlockchainContext = createContext<BlockchainContextType>({
  currentNetwork: 'aptos',
  isConnected: false,
  isLoading: false,
  error: null,
  isInitialized: false,
  switchNetwork: () => {},
  createRecord: async () => null,
  verifyRecord: async () => false,
});

export const useBlockchain = () => useContext(BlockchainContext);

export function BlockchainProvider({ children }: { children: ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [currentNetwork, setCurrentNetwork] = useState<BlockchainNetwork>('aptos');
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize the provider on the client side only
  useEffect(() => {
    const initializeProvider = async () => {
      try {
        // Here you would add actual initialization logic
        // For now, we'll just simulate a delay
        await new Promise(resolve => setTimeout(resolve, 100));
        setIsInitialized(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to initialize blockchain provider');
      }
    };

    initializeProvider();
  }, []);

  const switchNetwork = (network: BlockchainNetwork) => {
    if (!isInitialized) return;
    setCurrentNetwork(network);
    console.log(`Switched to ${network} network`);
  };

  const createRecord = async (data: any): Promise<BlockchainRecord | null> => {
    if (!isInitialized) return null;
    
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const record: BlockchainRecord = {
        id: `${currentNetwork}-${Date.now()}`,
        network: currentNetwork,
        transactionId: `tx-${Math.random().toString(36).substring(2, 15)}`,
        timestamp: new Date(),
        verified: true,
        data
      };
      
      return record;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create record');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyRecord = async (record: BlockchainRecord): Promise<boolean> => {
    if (!isInitialized) return false;
    
    setIsLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify record');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Initializing blockchain provider...</div>
      </div>
    );
  }

  return (
    <BlockchainContext.Provider 
      value={{
        currentNetwork,
        isConnected,
        isLoading,
        error,
        isInitialized,
        switchNetwork,
        createRecord,
        verifyRecord,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  );
}