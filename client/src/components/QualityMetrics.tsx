import { CodeQuality, ActivityMetrics, CommunityEngagement } from "@shared/schema";
import ActivityChart from "@/components/charts/ActivityChart";
import EngagementChart from "@/components/charts/EngagementChart";

interface QualityMetricsProps {
  codeQuality: CodeQuality;
  activityMetrics: ActivityMetrics;
  communityEngagement: CommunityEngagement;
}

export default function QualityMetrics({ codeQuality, activityMetrics, communityEngagement }: QualityMetricsProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {/* Code Quality Metrics */}
      <div className="bg-white rounded-lg shadow-md p-6 col-span-1">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-semibold text-lg">Code Quality</h3>
          <span className="text-github-green font-medium">
            <span className="text-xl">{codeQuality.score}</span>
            <span className="text-gray-500">/100</span>
          </span>
        </div>
        
        <div className="space-y-4">
          {codeQuality.metrics.map((metric, index) => (
            <div key={index} className="flex justify-between items-center">
              <div>
                <p className="font-medium">{metric.name}</p>
                <p className="text-sm text-gray-500">{metric.description}</p>
              </div>
              <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-github-green rounded-full" 
                  style={{ width: `${metric.value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Metrics */}
      <div className="bg-white rounded-lg shadow-md p-6 col-span-1">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-semibold text-lg">Activity & Velocity</h3>
          <span className="text-github-green font-medium">
            <span className="text-xl">{activityMetrics.score}</span>
            <span className="text-gray-500">/100</span>
          </span>
        </div>
        
        <div className="relative h-60 mb-4">
          <ActivityChart data={activityMetrics.commitHistory} />
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-center">
          {activityMetrics.summary.map((item, index) => (
            <div key={index} className="bg-github-light rounded-lg p-3">
              <p className="text-sm text-gray-600">{item.label}</p>
              <p className="text-xl font-semibold">{item.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popularity & Engagement */}
      <div className="bg-white rounded-lg shadow-md p-6 col-span-1">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-semibold text-lg">Community & Engagement</h3>
          <span className="text-github-green font-medium">
            <span className="text-xl">{communityEngagement.score}</span>
            <span className="text-gray-500">/100</span>
          </span>
        </div>
        
        <div className="relative h-60 mb-4">
          <EngagementChart data={communityEngagement.growthMetrics} />
        </div>
        
        <div className="space-y-3 mt-4">
          {communityEngagement.metrics.map((metric, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm font-medium">{metric.name}</span>
              {metric.type === "percentage" ? (
                <span className="text-sm font-semibold">{metric.value}%</span>
              ) : metric.type === "status" ? (
                <span className="inline-flex items-center text-github-green">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {metric.value}
                </span>
              ) : (
                <span className="text-sm font-semibold text-github-green">{metric.value}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
