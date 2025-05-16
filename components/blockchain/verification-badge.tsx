"use client";

import { useState } from 'react';
import { Shield, ShieldCheck, ShieldAlert, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { BlockchainProof } from '@/lib/types';
import { 
  formatTransactionId, 
  getExplorerUrl, 
  getVerificationTime,
  verifyProof
} from '@/lib/utils/blockchain-utils';

interface VerificationBadgeProps {
  proof: BlockchainProof;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
}

export function VerificationBadge({ 
  proof, 
  size = 'md',
  showDetails = true 
}: VerificationBadgeProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationState, setVerificationState] = useState<'idle' | 'verifying' | 'verified' | 'failed'>('idle');
  
  const sizeMap = {
    sm: { icon: 16, text: 'text-xs' },
    md: { icon: 20, text: 'text-sm' },
    lg: { icon: 24, text: 'text-base' },
  };
  
  const { icon: iconSize, text: textSize } = sizeMap[size];
  
  const handleVerify = async () => {
    setIsVerifying(true);
    setVerificationState('verifying');
    
    try {
      const isVerified = await verifyProof(proof);
      setVerificationState(isVerified ? 'verified' : 'failed');
    } catch (error) {
      setVerificationState('failed');
      console.error('Verification failed:', error);
    } finally {
      setIsVerifying(false);
    }
  };
  
  return (
    <div className={`flex flex-col ${showDetails ? 'space-y-2' : ''}`}>
      <div className="flex items-center space-x-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={`flex items-center ${proof.verified ? 'text-green-500' : 'text-amber-500'}`}>
                {proof.verified ? (
                  <ShieldCheck size={iconSize} />
                ) : verificationState === 'verifying' ? (
                  <Shield size={iconSize} className="animate-pulse" />
                ) : verificationState === 'failed' ? (
                  <ShieldAlert size={iconSize} className="text-destructive" />
                ) : (
                  <Shield size={iconSize} />
                )}
                <span className={`ml-1.5 font-medium ${textSize}`}>
                  {verificationState === 'verifying' 
                    ? 'Verifying...' 
                    : verificationState === 'verified'
                    ? 'Verified'
                    : verificationState === 'failed'
                    ? 'Failed'
                    : proof.verified 
                    ? 'Verified Record' 
                    : 'Unverified Record'}
                </span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {proof.verified 
                  ? `Verified on ${proof.network} blockchain ${getVerificationTime(proof.timestamp)}`
                  : `Click to verify this record on the ${proof.network} blockchain`}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        {!proof.verified && verificationState !== 'verifying' && (
          <Button 
            variant="ghost" 
            size="sm" 
            className={textSize}
            onClick={handleVerify}
            disabled={isVerifying}
          >
            Verify Now
          </Button>
        )}
      </div>
      
      {showDetails && (
        <div className="flex flex-col space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center space-x-1">
            <span>Network:</span>
            <span className="font-medium capitalize">{proof.network}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Transaction:</span>
            <a 
              href={getExplorerUrl(proof.network, proof.transactionId)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:underline flex items-center"
            >
              {formatTransactionId(proof.transactionId)}
              <ExternalLink size={12} className="ml-1" />
            </a>
          </div>
          <div className="flex items-center space-x-1">
            <span>Timestamp:</span>
            <span className="font-medium">
              {proof.timestamp.toLocaleString()}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}