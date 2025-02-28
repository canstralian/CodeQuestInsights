import { RepositoryAnalysis } from "@shared/schema";

// Generate a random number within a range
const randomNum = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Generate random repository data for demonstration purposes
export const mockAnalyzeRepository = (url: string): RepositoryAnalysis => {
  // Extract repository name from URL
  const urlParts = url.split("/");
  const repoName = urlParts[urlParts.length - 1] || "repository";
  const ownerName = urlParts[urlParts.length - 2] || "owner";
  
  // Random score between 65 and 95
  const overallScore = randomNum(65, 95);
  
  // Generate random commit history for the past 6 months
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const commitHistory = months.map(month => ({
    month,
    count: randomNum(5, 100)
  }));
  
  // Generate random growth metrics
  const growthCategories = ["Stars", "Forks", "Contributors", "Issues Closed"];
  const growthMetrics = growthCategories.map(category => ({
    category,
    growthPercentage: randomNum(5, 40)
  }));
  
  // Generate random capabilities
  const capabilityNames = [
    "Code Organization", 
    "Documentation", 
    "Testing", 
    "CI/CD", 
    "Issue Management", 
    "Community Engagement"
  ];
  
  const getRating = (score: number): string => {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Very Good";
    if (score >= 70) return "Good";
    if (score >= 60) return "Fair";
    return "Needs Improvement";
  };

  const capabilities = capabilityNames.map(name => {
    const score = randomNum(50, 95);
    return {
      name,
      score,
      rating: getRating(score),
      description: `Evaluation of ${name.toLowerCase()} practices and implementation.`
    };
  });
  
  // Random language color
  const languageColors: Record<string, string> = {
    "JavaScript": "#f1e05a",
    "TypeScript": "#3178c6",
    "Python": "#3572A5",
    "Java": "#b07219",
    "Go": "#00ADD8"
  };
  
  const languages = Object.keys(languageColors);
  const language = languages[randomNum(0, languages.length - 1)];
  
  return {
    repository: {
      name: `${ownerName}/${repoName}`,
      description: `A high-quality ${language} repository for ${repoName.replace(/-/g, ' ')}`,
      ownerAvatar: `https://avatars.githubusercontent.com/${ownerName}`,
      stars: randomNum(100, 5000).toLocaleString(),
      forks: randomNum(20, 1000).toLocaleString(),
      issues: randomNum(5, 100).toLocaleString(),
      score: overallScore,
      scoreDescription: `This repository has a ${overallScore >= 80 ? "strong" : "good"} quality score indicating ${overallScore >= 80 ? "excellent" : "decent"} code quality and community engagement.`,
      percentileRank: `Top ${randomNum(5, 25)}%`,
      lastUpdated: `${randomNum(1, 30)} days ago`,
      contributors: randomNum(5, 50).toString(),
      language,
      languageColor: languageColors[language],
      license: ["MIT", "Apache-2.0", "GPL-3.0", "BSD-3-Clause"][randomNum(0, 3)]
    },
    codeQuality: {
      score: randomNum(70, 95),
      metrics: [
        {
          name: "Code Complexity",
          description: "Measure of code complexity and cognitive load",
          value: randomNum(70, 95)
        },
        {
          name: "Documentation",
          description: "Code comments and documentation coverage",
          value: randomNum(60, 90)
        },
        {
          name: "Test Coverage",
          description: "Percentage of code covered by tests",
          value: randomNum(50, 95)
        },
        {
          name: "Code Duplication",
          description: "Amount of redundant or duplicated code",
          value: randomNum(75, 95)
        }
      ]
    },
    activityMetrics: {
      score: randomNum(65, 95),
      commitHistory,
      summary: [
        {
          label: "Avg. Commits/Month",
          value: randomNum(20, 100).toString()
        },
        {
          label: "Active Contributors",
          value: randomNum(3, 15).toString()
        },
        {
          label: "Response Time",
          value: `${randomNum(1, 5)} days`
        },
        {
          label: "Release Frequency",
          value: `${randomNum(1, 4)}/month`
        }
      ]
    },
    communityEngagement: {
      score: randomNum(60, 90),
      growthMetrics,
      metrics: [
        {
          name: "Issue Resolution Rate",
          value: `${randomNum(70, 95)}`,
          type: "percentage"
        },
        {
          name: "PR Review Time",
          value: `${randomNum(1, 5)} days`,
          type: "trend"
        },
        {
          name: "Community Guidelines",
          value: "Present",
          type: "status"
        },
        {
          name: "Contributor Growth",
          value: `${randomNum(5, 30)}`,
          type: "percentage"
        }
      ]
    },
    capabilities,
    keyFindings: [
      {
        type: "positive",
        text: `Strong ${capabilities[0].name.toLowerCase()} practices with clear structure and maintainability.`
      },
      {
        type: "positive",
        text: `Active contribution community with consistent commit activity.`
      },
      {
        type: "negative",
        text: `${capabilities.sort((a, b) => a.score - b.score)[0].name} could be improved for better project quality.`
      },
      {
        type: "negative",
        text: `Documentation could benefit from more examples and use cases.`
      }
    ],
    highlights: [
      {
        title: "Robust CI/CD Pipeline",
        description: "Repository has well-configured automated testing and deployment processes."
      },
      {
        title: "Active Issue Management",
        description: "Issues are addressed promptly with good discussion and resolution."
      },
      {
        title: "Clear Documentation",
        description: "README and documentation provide clear guidance for users and contributors."
      },
      {
        title: "Consistent Coding Style",
        description: "Code follows established style guidelines with good readability."
      }
    ],
    recommendations: [
      {
        title: "Increase Test Coverage",
        description: "Add more unit and integration tests to improve reliability and maintainability."
      },
      {
        title: "Enhance Documentation",
        description: "Add more examples and use cases to help new users get started quickly."
      },
      {
        title: "Optimize Performance",
        description: "Consider performance optimizations in critical code paths."
      },
      {
        title: "Improve Issue Templates",
        description: "Create more detailed issue templates to standardize bug reports and feature requests."
      }
    ]
  };
};