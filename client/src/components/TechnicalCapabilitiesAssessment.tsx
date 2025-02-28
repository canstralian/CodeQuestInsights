import { Capability } from "@shared/schema";
import CapabilitiesRadarChart from "@/components/charts/CapabilitiesRadarChart";

interface TechnicalCapabilitiesAssessmentProps {
  capabilities: Capability[];
}

export default function TechnicalCapabilitiesAssessment({ capabilities }: TechnicalCapabilitiesAssessmentProps) {
  // Extract data for radar chart
  const radarLabels = capabilities.map(cap => cap.name);
  const radarData = capabilities.map(cap => cap.score);

  // Helper function to determine badge color based on rating
  const getBadgeColor = (rating: string) => {
    switch (rating) {
      case "Excellent":
        return "bg-green-100 text-green-800";
      case "Very Good":
        return "bg-blue-100 text-blue-800";
      case "Good":
        return "bg-indigo-100 text-indigo-800";
      case "Fair":
        return "bg-yellow-100 text-yellow-800";
      case "Needs Improvement":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Technical Capabilities Assessment</h2>
        
        {/* Capability Score Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="relative h-64">
              <CapabilitiesRadarChart labels={radarLabels} data={radarData} />
            </div>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            {capabilities.map((capability, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{capability.name}</h4>
                  <span className={`px-2 py-1 rounded-md text-sm ${getBadgeColor(capability.rating)}`}>
                    {capability.rating}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{capability.description}</p>
                <div className="flex items-center">
                  <div className="h-2 flex-grow bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-github-green rounded-full" 
                      style={{ width: `${capability.score}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm font-medium">{capability.score}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
