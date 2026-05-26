// src/lib/types.ts

// 1. Define what a single selected tool looks like
export interface SelectedTool {
  toolId: string;
  planId: string;
}

// 2. Add the array of SelectedTools to the AuditProfile
export interface AuditProfile {
  teamSize: number;
  selectedTools: SelectedTool[]; // <-- This is the exact line fixing your error
}

// 3. Define the resulting audit data
export interface AuditResult {
  toolId: string;
  toolName: string;
  currentSpend: number;
  monthlySavings: number;
  annualSavings: number;
  recommendedAction: string;
  reason: string;
}

export interface FullReport {
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  credexEligible: boolean;
  results: AuditResult[];
}