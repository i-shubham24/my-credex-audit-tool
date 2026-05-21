export type UseCase = 'coding' | 'writing' | 'data' | 'research' | 'mixed';
export type ToolName = 'Cursor' | 'GitHub Copilot' | 'Claude' | 'ChatGPT' | 'Anthropic API' | 'OpenAI API' | 'Gemini' | 'v0';

export interface ToolInput {
  id: string;
  name: ToolName;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditProfile {
  teamSize: number;
  primaryUseCase: UseCase;
  tools: ToolInput[];
}

export interface AuditResult {
  toolId: string;
  toolName: string;
  currentSpend: number;
  recommendedAction: string;
  reason: string;
  monthlySavings: number;
  annualSavings: number;
}

export interface FullReport {
  results: AuditResult[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  credexEligible: boolean;
}