# Repository Analyzer

A powerful web-based tool for analyzing GitHub and Huggingface repositories with comprehensive project quality metrics and technical capability assessments.

## Features

- **Repository Analysis**: Analyze any GitHub or Huggingface repository to get detailed insights
- **Code Quality Assessment**: Get detailed metrics on code complexity, test coverage, and more
- **Activity Analysis**: View commit history and project activity over time
- **Community Engagement**: See how the community engages with the repository
- **Technical Capability Assessment**: Visualize the repository's strengths and weaknesses
- **Key Findings & Recommendations**: Get actionable insights to improve repository quality

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS, Chart.js, Shadcn UI
- **Backend**: Express.js, Node.js
- **Data Visualization**: Chart.js with custom components
- **State Management**: TanStack Query (React Query)
- **Form Handling**: React Hook Form with Zod validation

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate to [http://localhost:5000](http://localhost:5000)

## How to Use

1. Enter a GitHub or Huggingface repository URL in the input field
2. Click "Analyze" to generate a comprehensive report
3. View the analysis results, including:
   - Repository overview and basic metrics
   - Code quality assessment
   - Activity and contribution metrics
   - Community engagement analysis
   - Technical capabilities radar chart
   - Key findings and recommendations

## Project Structure

- `/client`: React frontend application
  - `/src/components`: UI components
  - `/src/pages`: Application pages
  - `/src/hooks`: Custom React hooks
  - `/src/lib`: Utility functions and API client
- `/server`: Express.js backend
  - `/routes.ts`: API route definitions
  - `/storage.ts`: Data storage interface and implementation
  - `/mock-data.ts`: Mock data generation for demo purposes
- `/shared`: Shared types and schemas used by both frontend and backend

## Screenshots

![Repository Analysis Dashboard](https://example.com/screenshot.png)