import { useState } from "react";
import { useLocation } from "wouter";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { RepositoryInputSchema } from "@shared/schema";

interface RepositoryInputFormProps {
  onAnalysisSuccess?: () => void;
}

const formSchema = RepositoryInputSchema.extend({});

export default function RepositoryInputForm({ onAnalysisSuccess }: RepositoryInputFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  const validateMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) => {
      const response = await apiRequest("POST", "/api/validate-repo", values);
      return response.json();
    },
    onSuccess: (data, variables) => {
      setIsLoading(false);
      if (onAnalysisSuccess) {
        onAnalysisSuccess();
      }
      // Navigate to the analysis page with the repository URL as a parameter
      setLocation(`/analysis/${encodeURIComponent(variables.url)}`);
    },
    onError: (error) => {
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Validation Failed",
        description: error instanceof Error ? error.message : "Failed to validate repository URL.",
      });
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    validateMutation.mutate(values);
  }

  return (
    <section className="mb-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Analyze Repository</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Repository URL</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://github.com/username/repository" 
                        className="w-full px-3 py-2"
                        {...field} 
                      />
                    </FormControl>
                    <p className="text-xs text-gray-500 mt-1">Enter a GitHub or Huggingface repository URL</p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-end">
              <Button 
                type="submit" 
                className="bg-github-green hover:bg-opacity-90 px-4 py-2"
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                {isLoading ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </section>
  );
}
