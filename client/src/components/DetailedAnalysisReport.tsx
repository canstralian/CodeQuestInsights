import { KeyFinding, Highlight, Recommendation } from "@shared/schema";
import { ArrowDownToLine, CheckCircle, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DetailedAnalysisReportProps {
  keyFindings: KeyFinding[];
  highlights: Highlight[];
  recommendations: Recommendation[];
}

export default function DetailedAnalysisReport({ 
  keyFindings, 
  highlights, 
  recommendations 
}: DetailedAnalysisReportProps) {
  
  // Function to handle export report (mock functionality)
  const handleExport = () => {
    alert("Export functionality would generate a PDF or CSV report here.");
  };

  return (
    <section className="mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-xl font-semibold">Detailed Analysis Report</h2>
          <Button 
            variant="outline" 
            className="text-github-green hover:text-github-green hover:bg-github-light"
            onClick={handleExport}
          >
            <ArrowDownToLine className="h-4 w-4 mr-1" />
            Export Report
          </Button>
        </div>
        
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h3 className="font-semibold text-lg mb-3">Key Findings</h3>
          <ul className="space-y-2">
            {keyFindings.map((finding, index) => (
              <li key={index} className="flex items-start">
                {finding.type === "positive" ? (
                  <CheckCircle className="h-5 w-5 text-github-green mr-2 mt-0.5 flex-shrink-0" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-warning mr-2 mt-0.5 flex-shrink-0" />
                )}
                <span>{finding.text}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="border-b border-gray-200 pb-4 mb-4">
          <h3 className="font-semibold text-lg mb-3">Repository Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {highlights.map((highlight, index) => (
              <div key={index} className="bg-github-light rounded-lg p-4">
                <h4 className="font-medium mb-2">{highlight.title}</h4>
                <p className="text-sm text-gray-600">{highlight.description}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold text-lg mb-3">Recommendations</h3>
          <div className="space-y-4">
            {recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-blue-100 text-blue-800 rounded-full p-1 mr-3 mt-0.5">
                  <Info className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-medium">{recommendation.title}</h4>
                  <p className="text-sm text-gray-600">{recommendation.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
