import { pgTable, text, serial, integer, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Repository input schema for validation
export const RepositoryInputSchema = z.object({
  url: z.string().url("Please enter a valid URL")
    .refine(url => url.includes("github.com") || url.includes("huggingface.co"), {
      message: "URL must be from GitHub or Huggingface"
    })
});

// Repository analysis tables
export const repositoryAnalyses = pgTable("repository_analyses", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  data: jsonb("data").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertRepositoryAnalysisSchema = createInsertSchema(repositoryAnalyses).pick({
  url: true,
  data: true,
});

// Type definitions for repository analysis
export interface CommitHistory {
  month: string;
  count: number;
}

export interface ActivitySummary {
  label: string;
  value: string;
}

export interface GrowthMetric {
  category: string;
  growthPercentage: number;
}

export interface CommunityMetric {
  name: string;
  value: string;
  type: "percentage" | "status" | "trend";
}

export interface QualityMetric {
  name: string;
  description: string;
  value: number;
}

export interface KeyFinding {
  type: "positive" | "negative";
  text: string;
}

export interface Highlight {
  title: string;
  description: string;
}

export interface Recommendation {
  title: string;
  description: string;
}

export interface Capability {
  name: string;
  score: number;
  rating: string;
  description: string;
}

export interface RepositoryInfo {
  name: string;
  description: string;
  ownerAvatar: string;
  stars: string;
  forks: string;
  issues: string;
  score: number;
  scoreDescription: string;
  percentileRank: string;
  lastUpdated: string;
  contributors: string;
  language: string;
  languageColor: string;
  license: string;
}

export interface CodeQuality {
  score: number;
  metrics: QualityMetric[];
}

export interface ActivityMetrics {
  score: number;
  commitHistory: CommitHistory[];
  summary: ActivitySummary[];
}

export interface CommunityEngagement {
  score: number;
  growthMetrics: GrowthMetric[];
  metrics: CommunityMetric[];
}

export interface RepositoryAnalysis {
  repository: RepositoryInfo;
  codeQuality: CodeQuality;
  activityMetrics: ActivityMetrics;
  communityEngagement: CommunityEngagement;
  capabilities: Capability[];
  keyFindings: KeyFinding[];
  highlights: Highlight[];
  recommendations: Recommendation[];
}

export type InsertRepositoryAnalysis = z.infer<typeof insertRepositoryAnalysisSchema>;
export type RepositoryAnalysisRecord = typeof repositoryAnalyses.$inferSelect;
