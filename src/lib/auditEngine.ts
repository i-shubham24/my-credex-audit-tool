import { AuditProfile, AuditResult, FullReport } from './types';

export function runAudit(profile: AuditProfile): FullReport {
  let totalMonthlySavings = 0;
  const results: AuditResult[] = [];

  profile.tools.forEach((tool) => {
    let savings = 0;
    let action = 'Keep current plan';
    let reason = 'Your spend is perfectly optimized for your use case.';

    // Rule 1: Overkill Plans (e.g., Team/Business plan for small seats)
    if (tool.name === 'Cursor' && tool.plan === 'Business' && tool.seats < 5) {
      savings = tool.seats * (40 - 20); // Business is $40, Pro is $20
      action = 'Downgrade to Cursor Pro';
      reason = `You are paying $40/seat for Business, but with only ${tool.seats} seats, Pro ($20/seat) covers your needs.`;
    } 
    else if (tool.name === 'ChatGPT' && tool.plan === 'Team' && tool.seats < 2) {
      savings = tool.monthlySpend - 20; // Plus is $20
      action = 'Downgrade to ChatGPT Plus';
      reason = 'Team plans require a minimum of 2 seats. For a single user, Plus offers identical core capabilities for $20/mo.';
    }
    
    // Rule 2: Cheaper Alternative based on Use Case
    else if (tool.name === 'Cursor' && profile.primaryUseCase === 'writing') {
      savings = tool.monthlySpend - (tool.seats * 20); // Assuming switch to Claude Pro ($20)
      action = 'Switch to Claude Pro';
      reason = 'Cursor is optimized for coding. For pure writing workflows, Claude Pro provides better prose generation at a lower or equal cost.';
    }

    // Rule 3: Retail vs Credits (Wholesale API vs Retail Chat)
    else if ((tool.name === 'Claude' || tool.name === 'ChatGPT') && tool.monthlySpend > 200 && profile.primaryUseCase === 'data') {
      savings = tool.monthlySpend * 0.4; // Estimate 40% savings moving to API
      action = 'Migrate to Direct API via Credex';
      reason = 'At >$200/mo for data tasks, paying retail GUI subscriptions is inefficient. Using direct APIs with Credex discounts cuts costs by ~40%.';
    }

    results.push({
      toolId: tool.id,
      toolName: tool.name,
      currentSpend: tool.monthlySpend,
      recommendedAction: action,
      reason: reason,
      monthlySavings: savings,
      annualSavings: savings * 12
    });

    totalMonthlySavings += savings;
  });

  return {
    results,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    credexEligible: totalMonthlySavings > 500
  };
}