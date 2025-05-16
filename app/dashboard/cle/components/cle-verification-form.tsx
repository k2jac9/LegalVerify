"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { useBlockchain } from '@/components/providers/blockchain-provider';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Loader2, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

// CLE verification form schema
const formSchema = z.object({
  lawyerEmail: z.string().email("Please enter a valid email address"),
  lawyerName: z.string().min(2, "Please enter the lawyer's full name"),
  courseTitle: z.string().min(2, "Please enter the course title"),
  courseDescription: z.string().min(10, "Please enter a course description"),
  creditHours: z.string().refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, {
    message: "Credit hours must be a positive number",
  }),
  completionDate: z.date({
    required_error: "Please select the completion date",
  }),
  network: z.enum(['aptos', 'stellar'], {
    required_error: "Please select a blockchain network",
  }),
});

export function CLEVerificationForm() {
  const { currentNetwork, switchNetwork, createRecord, isLoading } = useBlockchain();
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [transactionId, setTransactionId] = useState<string | null>(null);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lawyerEmail: "",
      lawyerName: "",
      courseTitle: "",
      courseDescription: "",
      creditHours: "",
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
      
      // Generate a unique lawyer ID based on email
      const lawyerId = `lawyer-${btoa(values.lawyerEmail).substring(0, 10)}`;
      
      // Prepare data for blockchain record
      const cleData = {
        lawyerId,
        lawyerName: values.lawyerName,
        lawyerEmail: values.lawyerEmail,
        providerId: 'provider-current', // In a real app, this would be the logged-in provider's ID
        providerName: 'State Bar Association', // In a real app, this would be the logged-in provider's name
        courseTitle: values.courseTitle,
        courseDescription: values.courseDescription,
        creditHours: parseFloat(values.creditHours),
        completionDate: values.completionDate.toISOString(),
        verificationTimestamp: new Date().toISOString(),
      };
      
      // Create blockchain record
      const record = await createRecord(cleData);
      
      if (record) {
        setSubmissionState('success');
        setTransactionId(record.transactionId);
        form.reset();
      } else {
        setSubmissionState('error');
      }
    } catch (error) {
      console.error('Error submitting CLE verification:', error);
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
            <AlertTitle>CLE Record Verified Successfully!</AlertTitle>
            <AlertDescription>
              The CLE completion record has been securely recorded on the {form.getValues().network} blockchain.
              {transactionId && (
                <p className="mt-2 text-xs">
                  Transaction ID: <span className="font-mono">{transactionId}</span>
                </p>
              )}
            </AlertDescription>
            <Button variant="outline" size="sm" className="mt-2" onClick={handleReset}>
              Verify Another CLE Record
            </Button>
          </Alert>
        );
      case 'error':
        return (
          <Alert variant="destructive" className="mt-6">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Verification Failed</AlertTitle>
            <AlertDescription>
              There was an error recording the CLE verification on the blockchain. Please try again.
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
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="lawyerEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lawyer's Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    The email associated with the lawyer's account
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="lawyerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lawyer's Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe, Esq." {...field} />
                  </FormControl>
                  <FormDescription>
                    Full legal name of the lawyer
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="courseTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Title</FormLabel>
                <FormControl>
                  <Input placeholder="Ethics in Legal Practice" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="courseDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="A comprehensive course covering ethical considerations in modern legal practice..."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="grid md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="creditHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Credit Hours</FormLabel>
                  <FormControl>
                    <Input placeholder="3.0" type="number" step="0.1" min="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="completionDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Completion Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("2020-01-01")
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
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
                  Choose which blockchain will store this CLE record.
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
                Verifying...
              </>
            ) : (
              "Verify CLE Completion"
            )}
          </Button>
        </form>
      </Form>
      
      {renderAlert()}
    </div>
  );
}