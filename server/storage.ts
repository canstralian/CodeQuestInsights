import { repositoryAnalyses, RepositoryAnalysis, InsertRepositoryAnalysis, RepositoryAnalysisRecord } from "@shared/schema";

export interface IStorage {
  getAnalysisByUrl(url: string): Promise<RepositoryAnalysisRecord | undefined>;
  saveAnalysis(analysis: InsertRepositoryAnalysis): Promise<RepositoryAnalysisRecord>;
  getRecentAnalyses(limit: number): Promise<RepositoryAnalysisRecord[]>;
}

export class MemStorage implements IStorage {
  private analyses: Map<number, RepositoryAnalysisRecord>;
  private currentId: number;

  constructor() {
    this.analyses = new Map();
    this.currentId = 1;
  }

  async getAnalysisByUrl(url: string): Promise<RepositoryAnalysisRecord | undefined> {
    return Array.from(this.analyses.values()).find(analysis => analysis.url === url);
  }

  async saveAnalysis(analysis: InsertRepositoryAnalysis): Promise<RepositoryAnalysisRecord> {
    const id = this.currentId++;
    const record: RepositoryAnalysisRecord = { 
      ...analysis, 
      id, 
      createdAt: new Date() 
    };
    this.analyses.set(id, record);
    return record;
  }

  async getRecentAnalyses(limit: number): Promise<RepositoryAnalysisRecord[]> {
    return Array.from(this.analyses.values())
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
