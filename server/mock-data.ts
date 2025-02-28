import { 
  RepositoryAnalysis, 
  CommitHistory, 
  ActivitySummary, 
  GrowthMetric,
  CommunityMetric,
  QualityMetric,
  KeyFinding,
  Highlight,
  Recommendation,
  Capability
} from "@shared/schema";

/**
 * Generate mock data for repository analysis
 * This function creates a comprehensive mock analysis for any repository URL
 */
export const mockAnalyzeRepository = (url: string): RepositoryAnalysis => {
  // Extract repository name and owner from URL
  const urlParts = url.split('/');
  const repoName = urlParts[urlParts.length - 1] || 'repository';
  const owner = urlParts[urlParts.length - 2] || 'owner';
  
  // Generate random repository info
  const stars = Math.floor(Math.random() * 10000).toLocaleString();
  const forks = Math.floor(Math.random() * 1000).toLocaleString();
  const issues = Math.floor(Math.random() * 200).toLocaleString();
  const contributors = Math.floor(Math.random() * 50).toLocaleString();
  
  // Overall score (0-100)
  const overallScore = Math.floor(Math.random() * 30) + 70;
  
  // Generate mock commit history (last 12 months)
  const commitHistory: CommitHistory[] = [];
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const month = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthName = month.toLocaleString('default', { month: 'short' });
    const count = Math.floor(Math.random() * 200) + 10;
    commitHistory.push({ month: monthName, count });
  }
  
  // Activity summary metrics
  const activitySummary: ActivitySummary[] = [
    { label: "Commits (30 days)", value: `${Math.floor(Math.random() * 200) + 20}` },
    { label: "Pull Requests", value: `${Math.floor(Math.random() * 50) + 5}` },
    { label: "Contributors", value: contributors },
    { label: "Issues Closed", value: `${Math.floor(Math.random() * 100) + 10}` }
  ];
  
  // Growth metrics
  const growthMetrics: GrowthMetric[] = [
    { category: "Stars", growthPercentage: Math.floor(Math.random() * 100) - 20 },
    { category: "Forks", growthPercentage: Math.floor(Math.random() * 80) + 10 },
    { category: "Contributors", growthPercentage: Math.floor(Math.random() * 60) + 5 },
    { category: "Issues", growthPercentage: Math.floor(Math.random() * 40) - 10 }
  ];
  
  // Community metrics
  const communityMetrics: CommunityMetric[] = [
    { name: "Documentation", value: `${Math.floor(Math.random() * 100)}%`, type: "percentage" },
    { name: "Issue Response Time", value: `${Math.floor(Math.random() * 72)}h`, type: "status" },
    { name: "Community Support", value: Math.random() > 0.5 ? "High" : "Medium", type: "status" },
    { name: "Contribution Guide", value: Math.random() > 0.3 ? "Present" : "Missing", type: "status" },
    { name: "Engagement", value: Math.random() > 0.5 ? "Increasing" : "Steady", type: "trend" }
  ];
  
  // Code quality metrics
  const qualityMetrics: QualityMetric[] = [
    { name: "Code Complexity", description: "Average cyclomatic complexity per function", value: Math.random() * 8 + 2 },
    { name: "Test Coverage", description: "Percentage of code covered by tests", value: Math.floor(Math.random() * 100) },
    { name: "Documentation Level", description: "Percentage of documented public API", value: Math.floor(Math.random() * 100) },
    { name: "Technical Debt", description: "Hours needed to fix all issues", value: Math.floor(Math.random() * 200) },
    { name: "Dependencies", description: "Number of external dependencies", value: Math.floor(Math.random() * 50) + 5 }
  ];
  
  // Technical capabilities assessment
  const capabilities: Capability[] = [
    { name: "Performance", score: Math.floor(Math.random() * 40) + 60, rating: "Good", description: "Efficient runtime performance with minimal bottlenecks" },
    { name: "Security", score: Math.floor(Math.random() * 30) + 70, rating: "Excellent", description: "Strong security practices with regular dependency updates" },
    { name: "Maintainability", score: Math.floor(Math.random() * 20) + 75, rating: "Excellent", description: "Well-structured codebase with clear separation of concerns" },
    { name: "Scalability", score: Math.floor(Math.random() * 50) + 50, rating: "Fair", description: "Reasonably scalable architecture with some potential bottlenecks" },
    { name: "Testability", score: Math.floor(Math.random() * 40) + 60, rating: "Good", description: "Decent test coverage with room for improvement" }
  ];
  
  // Key findings
  const keyFindings: KeyFinding[] = [
    { type: "positive", text: "Strong community engagement with regular contributions" },
    { type: "positive", text: "Comprehensive documentation making it easy for new contributors" },
    { type: "negative", text: "Some potential security vulnerabilities in dependencies" },
    { type: "negative", text: "Test coverage could be improved in critical modules" }
  ];
  
  // Highlights
  const highlights: Highlight[] = [
    { title: "Active Development", description: "Regular commits and active development cycle" },
    { title: "Community Support", description: "Responsive maintainers address issues quickly" },
    { title: "Well Documented", description: "Excellent documentation and examples for users" }
  ];
  
  // Recommendations
  const recommendations: Recommendation[] = [
    { title: "Improve Test Coverage", description: "Add more unit and integration tests to critical modules" },
    { title: "Update Dependencies", description: "Several dependencies have newer versions available" },
    { title: "Optimize Performance", description: "Profile and optimize performance bottlenecks in data processing" }
  ];
  
  // Language determination
  const languages = ["JavaScript", "TypeScript", "Python", "Rust", "Go", "Java"];
  const language = languages[Math.floor(Math.random() * languages.length)];
  
  // Language color (simplified)
  const languageColors = {
    "JavaScript": "#f1e05a",
    "TypeScript": "#3178c6",
    "Python": "#3572A5",
    "Rust": "#dea584",
    "Go": "#00ADD8",
    "Java": "#b07219"
  };
  
  const languageColor = languageColors[language as keyof typeof languageColors];
  
  // Licenses
  const licenses = ["MIT", "Apache-2.0", "GPL-3.0", "BSD-3-Clause", "None"];
  const license = licenses[Math.floor(Math.random() * licenses.length)];
  
  return {
    repository: {
      name: repoName,
      description: `A high-quality ${language} project for ${repoName.split('-').join(' ')}`,
      ownerAvatar: `https://github.com/${owner}.png`,
      stars,
      forks,
      issues,
      score: overallScore,
      scoreDescription: overallScore > 90 ? "Exceptional" : overallScore > 80 ? "Excellent" : overallScore > 70 ? "Very Good" : "Good",
      percentileRank: `${Math.floor(Math.random() * 15) + 85}%`,
      lastUpdated: new Date().toLocaleDateString(),
      contributors,
      language,
      languageColor,
      license
    },
    codeQuality: {
      score: Math.floor(Math.random() * 30) + 70,
      metrics: qualityMetrics
    },
    activityMetrics: {
      score: Math.floor(Math.random() * 20) + 80,
      commitHistory,
      summary: activitySummary
    },
    communityEngagement: {
      score: Math.floor(Math.random() * 25) + 75,
      growthMetrics,
      metrics: communityMetrics
    },
    capabilities,
    keyFindings,
    highlights,
    recommendations
  };
};