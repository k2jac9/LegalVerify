"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useBlockchain } from '@/components/providers/blockchain-provider';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

// Review form schema
const formSchema = z.object({
  lawyerId: z.string({
    required_error: "Please select a lawyer",
  }),
  rating: z.string({
    required_error: "Please select a rating",
  }),
  comment: z.string()
    .min(10, "Comment must be at least 10 characters")
    .max(500, "Comment cannot exceed 500 characters"),
  isAnonymous: z.boolean().default(false),
  network: z.enum(['aptos', 'stellar'], {
    required_error: "Please select a blockchain network",
  }),
});

interface ReviewFormProps {
  lawyers: { id: string; name: string; firm: string }[];
}

export function ReviewForm({ lawyers }: ReviewFormProps) {
  const { currentNetwork, switchNetwork, createRecord, isLoading } = useBlockchain();
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [transactionId, setTransactionId] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      comment: "",
      isAnonymous: false,
      network: currentNetwork,
    },
  });
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setSubmissionState('submitting');
    
    try {
      // Switch to the selected network if different from current
      if (values.network !== currentNetwork) {
        switchNetwork(values.network as 'aptos' | 'stellar');
      }
      
      // Prepare data for blockchain record
      const reviewData = {
        lawyerId: values.lawyerId,
        rating: parseInt(values.rating),
        comment: values.comment,
        isAnonymous: values.isAnonymous,
        timestamp: new Date().toISOString(),
      };
      
      // Create blockchain record
      const record = await createRecord(reviewData);
      
      if (record) {
        setSubmissionState('success');
        setTransactionId(record.transactionId);
        form.reset();
      } else {
        setSubmissionState('error');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      setSubmissionState('error');
    }
  }
  
  // Reset the form
  const handleReset = () => {
    form.reset();
    setSubmissionState('idle');
    setTransactionId(null);
  };
  
  // Render appropriate alert based on submission state
  const renderAlert = () => {
    switch (submissionState) {
      case 'success':
        return (
          <Alert className="bg-green-50 border-green-200 dark:bg-green-900/20 mt-6">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertTitle>Review Submitted Successfully!</AlertTitle>
            <AlertDescription>
              Your review has been securely recorded on the {form.getValues().network} blockchain.
              {transactionId && (
                <p className="mt-2 text-xs">
                  Transaction ID: <span className="font-mono">{transactionId}</span>
                </p>
              )}
            </AlertDescription>
            <Button variant="outline" size="sm" className="mt-2" onClick={handleReset}>
              Submit Another Review
            </Button>
          </Alert>
        );
      case 'error':
        return (
          <Alert variant="destructive" className="mt-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Submission Failed</AlertTitle>
            <AlertDescription>
              There was an error recording your review on the blockchain. Please try again.
            </AlertDescription>
            <Button variant="outline" size="sm" className="mt-2" onClick={() => setSubmissionState('idle')}>
              Try Again
            </Button>
          </Alert>
        );
      default:
        return null;
    }
  };
  
  // If submission was successful, show only the success message
  if (submissionState === 'success') {
    return renderAlert();
  }
  
  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="lawyerId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Lawyer</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a lawyer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {lawyers.map((lawyer) => (
                      <SelectItem key={lawyer.id} value={lawyer.id}>
                        {lawyer.name} ({lawyer.firm})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex space-x-4"
                  >
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <FormItem key={rating} className="flex items-center space-x-1">
                        <FormControl>
                          <RadioGroupItem value={rating.toString()} />
                        </FormControl>
                        <FormLabel className="font-normal cursor-pointer">
                          {rating}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review Comment</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Please share your experience with this lawyer..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Your feedback helps others make informed decisions.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="isAnonymous"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Anonymous Review</FormLabel>
                  <FormDescription>
                    Hide your identity from the public review.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="network"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blockchain Network</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select blockchain network" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="aptos">Aptos</SelectItem>
                    <SelectItem value="stellar">Stellar</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Choose which blockchain will store your review.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={submissionState === 'submitting' || isLoading}
          >
            {submissionState === 'submitting' || isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Review"
            )}
          </Button>
        </form>
      </Form>
      
      {renderAlert()}
    </div>
  );
}