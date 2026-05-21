import { describe, it, expect } from 'vitest';
import { runAudit } from './auditEngine';
import { AuditProfile } from './types';

describe('Audit Engine Core Logic', () => {
  it('Test 1: Identifies overkill Cursor Business plan for small teams', () => {
    const profile: AuditProfile = {
      teamSize: 2,
      primaryUseCase: 'coding',
      tools: [{ id: '1', name: 'Cursor', plan: 'Business', monthlySpend: 80, seats: 2 }]
    };
    const report = runAudit(profile);
    expect(report.results[0].monthlySavings).toBe(40); // (40-20) * 2
    expect(report.results[0].recommendedAction).toBe('Downgrade to Cursor Pro');
  });

  it('Test 2: Recommends cheaper alternative if use case is mismatched', () => {
    const profile: AuditProfile = {
      teamSize: 1,
      primaryUseCase: 'writing',
      tools: [{ id: '1', name: 'Cursor', plan: 'Pro', monthlySpend: 20, seats: 1 }]
    };
    const report = runAudit(profile);
    expect(report.results[0].recommendedAction).toBe('Switch to Claude Pro');
  });

  it('Test 3: Returns $0 savings if already perfectly optimized', () => {
    const profile: AuditProfile = {
      teamSize: 1,
      primaryUseCase: 'coding',
      tools: [{ id: '1', name: 'Cursor', plan: 'Pro', monthlySpend: 20, seats: 1 }]
    };
    const report = runAudit(profile);
    expect(report.results[0].monthlySavings).toBe(0);
    expect(report.results[0].recommendedAction).toBe('Keep current plan');
  });

  it('Test 4: Correctly calculates total annual savings', () => {
    const profile: AuditProfile = {
      teamSize: 2,
      primaryUseCase: 'coding',
      tools: [{ id: '1', name: 'Cursor', plan: 'Business', monthlySpend: 80, seats: 2 }]
    };
    const report = runAudit(profile);
    expect(report.totalAnnualSavings).toBe(480); // 40 * 12
  });

  it('Test 5: Flags Credex eligibility for high-savings accounts', () => {
    const profile: AuditProfile = {
      teamSize: 50,
      primaryUseCase: 'data',
      tools: [{ id: '1', name: 'ChatGPT', plan: 'Enterprise', monthlySpend: 1500, seats: 50 }]
    };
    // Force a mock scenario where savings > $500
    profile.tools[0].monthlySpend = 2000; 
    const report = runAudit(profile);
    expect(report.credexEligible).toBe(true);
  });
});