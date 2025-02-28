import { useToast } from "@/hooks/use-toast";
import RepositoryInputForm from "@/components/RepositoryInputForm";

export default function Home() {
  const { toast } = useToast();

  const handleAnalysisSuccess = () => {
    toast({
      title: "Analysis Complete",
      description: "Repository analysis has been completed successfully.",
    });
  };

  return (
    <main className="container mx-auto py-6 px-4">
      <div className="max-w-4xl mx-auto mt-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-github-dark">
            Repository Analysis Tool
          </h1>
          <p className="text-xl text-github-text">
            Analyze GitHub and Huggingface repositories for code quality, technical capabilities, and more.
          </p>
        </div>
        
        <RepositoryInputForm onAnalysisSuccess={handleAnalysisSuccess} />
        
        <section className="mt-16 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-github-light p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-github-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Input Repository URL</h3>
              <p className="text-gray-600">Enter a GitHub or Huggingface repository URL to begin the analysis process.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-github-light p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-github-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Analyze Metrics</h3>
              <p className="text-gray-600">Our system analyzes code quality, activity, community engagement, and technical capabilities.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-github-light p-4 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-github-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Results</h3>
              <p className="text-gray-600">View comprehensive analysis with actionable insights to improve repository quality.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
