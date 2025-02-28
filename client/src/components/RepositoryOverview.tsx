import { Badge } from "@/components/ui/badge";
import { RepositoryInfo } from "@shared/schema";

interface RepositoryOverviewProps {
  repository: RepositoryInfo;
}

export default function RepositoryOverview({ repository }: RepositoryOverviewProps) {
  return (
    <section id="repository-overview" className="mb-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div className="flex items-center">
            <img 
              src={repository.ownerAvatar} 
              alt="Repository owner avatar" 
              className="h-12 w-12 rounded-full mr-4" 
            />
            <div>
              <h2 className="text-xl font-semibold">{repository.name}</h2>
              <p className="text-gray-600">{repository.description}</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-1" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              <span className="font-medium">{repository.stars}</span>
              <span className="text-gray-600 ml-1">stars</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-1" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 100-1.5.75.75 0 000 1.5z"></path>
              </svg>
              <span className="font-medium">{repository.forks}</span>
              <span className="text-gray-600 ml-1">forks</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-1" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 16A8 8 0 108 0a8 8 0 000 16zm.25-14.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 011.5 0zm0 13v-1.5a.75.75 0 01-1.5 0v1.5a.75.75 0 011.5 0zM3.5 12.5l1-1a.75.75 0 00-1-1l-1 1a.75.75 0 001 1zM12.5 3.5l-1 1a.75.75 0 111-1l1-1a.75.75 0 00-1 1zM1.75 8a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5zM14.25 8a.75.75 0 000 1.5h-1.5a.75.75 0 000-1.5h1.5zM3.5 3.5l1 1a.75.75 0 11-1 1l-1-1a.75.75 0 111-1zM12.5 12.5l-1-1a.75.75 0 00-1 1l1 1a.75.75 0 101-1z"></path>
              </svg>
              <span className="font-medium">{repository.issues}</span>
              <span className="text-gray-600 ml-1">issues</span>
            </div>
          </div>
        </div>
        
        <div className="bg-github-light rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="h-16 w-16 rounded-full bg-github-green flex items-center justify-center text-white text-2xl font-bold mr-4">
              <span>{repository.score}</span>
            </div>
            <div>
              <h3 className="font-semibold text-lg">Overall Quality Score</h3>
              <p className="text-gray-600">{repository.scoreDescription}</p>
            </div>
            <div className="ml-auto">
              <Badge variant="outline" className="bg-green-100 text-green-800 px-3 py-1 text-sm font-medium">
                {repository.percentileRank}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm text-gray-500 font-medium mb-2">Last Updated</h4>
            <p className="font-semibold">{repository.lastUpdated}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm text-gray-500 font-medium mb-2">Contributors</h4>
            <p className="font-semibold">{repository.contributors}</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm text-gray-500 font-medium mb-2">Primary Language</h4>
            <div className="flex items-center">
              <span 
                className="h-3 w-3 rounded-full mr-2" 
                style={{ backgroundColor: repository.languageColor }}
              ></span>
              <p className="font-semibold">{repository.language}</p>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="text-sm text-gray-500 font-medium mb-2">License</h4>
            <p className="font-semibold">{repository.license}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
