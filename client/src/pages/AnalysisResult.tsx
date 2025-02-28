import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import RepositoryOverview from "@/components/RepositoryOverview";
import QualityMetrics from "@/components/QualityMetrics";
import TechnicalCapabilitiesAssessment from "@/components/TechnicalCapabilitiesAssessment";
import DetailedAnalysisReport from "@/components/DetailedAnalysisReport";
import { RepositoryAnalysis } from "@shared/schema";

export default function AnalysisResult() {
  const { repoUrl } = useParams<{ repoUrl: string }>();
  const decodedUrl = decodeURIComponent(repoUrl || "");

  const { data, isLoading, error } = useQuery<RepositoryAnalysis>({
    queryKey: [`/api/analyze?url=${encodeURIComponent(decodedUrl)}`],
    enabled: !!decodedUrl,
  });

  if (isLoading) {
    return (
      <div className="container mx-auto py-6 px-4">
        <LoadingState />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="container mx-auto py-6 px-4">
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error ? 
              `Failed to analyze repository: ${error.message}` : 
              "Failed to analyze repository. Please try again later."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <main className="container mx-auto py-6 px-4">
      <RepositoryOverview repository={data.repository} />
      <QualityMetrics 
        codeQuality={data.codeQuality} 
        activityMetrics={data.activityMetrics} 
        communityEngagement={data.communityEngagement} 
      />
      <TechnicalCapabilitiesAssessment capabilities={data.capabilities} />
      <DetailedAnalysisReport 
        keyFindings={data.keyFindings} 
        highlights={data.highlights} 
        recommendations={data.recommendations} 
      />
    </main>
  );
}

function LoadingState() {
  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center">
            <Skeleton className="h-12 w-12 rounded-full mr-4" />
            <div>
              <Skeleton className="h-6 w-64 mb-2" />
              <Skeleton className="h-4 w-80" />
            </div>
          </div>
        </div>
        <Skeleton className="h-16 w-full mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full" />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-80 w-full" />
        ))}
      </div>
      
      <Skeleton className="h-96 w-full mb-8" />
      <Skeleton className="h-96 w-full" />
    </>
  );
}
