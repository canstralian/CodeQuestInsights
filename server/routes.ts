import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { RepositoryInputSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

// Mock GitHub API responses for demonstration purposes
import { mockAnalyzeRepository } from "./mock-data";

export async function registerRoutes(app: Express): Promise<Server> {
  // Validate repository URL
  app.post("/api/validate-repo", async (req, res) => {
    try {
      const { url } = RepositoryInputSchema.parse(req.body);
      res.json({ success: true, url });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ success: false, message: validationError.message });
      } else {
        res.status(500).json({ success: false, message: "Internal server error" });
      }
    }
  });

  // Analyze repository
  app.get("/api/analyze", async (req, res) => {
    try {
      const url = req.query.url as string;
      if (!url) {
        return res.status(400).json({ success: false, message: "URL parameter is required" });
      }

      // Validate URL format
      RepositoryInputSchema.parse({ url });

      // Check if analysis exists in storage
      let analysis = await storage.getAnalysisByUrl(url);

      if (!analysis) {
        // For demo purposes, we'll use mock data instead of making actual API calls
        const repositoryData = mockAnalyzeRepository(url);
        
        // Save the analysis to storage
        analysis = await storage.saveAnalysis({
          url,
          data: repositoryData,
        });
      }

      // Return the analysis data
      res.json(analysis.data);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ success: false, message: validationError.message });
      } else {
        console.error("Error analyzing repository:", error);
        res.status(500).json({ success: false, message: "Failed to analyze repository" });
      }
    }
  });

  // Get recent analyses
  app.get("/api/recent-analyses", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 5;
      const analyses = await storage.getRecentAnalyses(limit);
      res.json(analyses);
    } catch (error) {
      console.error("Error fetching recent analyses:", error);
      res.status(500).json({ success: false, message: "Failed to fetch recent analyses" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
