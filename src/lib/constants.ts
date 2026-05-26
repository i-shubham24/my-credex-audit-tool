export const SUPPORTED_TOOLS = [
  { 
    id: 'openai', 
    name: 'OpenAI (ChatGPT)', 
    plans: [{id:'plus', name:'Plus', price:20}, {id:'team', name:'Team', price:25}, {id:'enterprise', name:'Enterprise', price:60}] 
  },
  { 
    id: 'anthropic', 
    name: 'Anthropic (Claude)', 
    plans: [{id:'pro', name:'Pro', price:20}, {id:'team', name:'Team', price:30}, {id:'enterprise', name:'Enterprise', price:75}] 
  },
  { 
    id: 'cursor', 
    name: 'Cursor (AI Code Editor)', 
    plans: [{id:'pro', name:'Pro', price:20}, {id:'business', name:'Business', price:40}] 
  },
  { 
    id: 'deepseek', 
    name: 'DeepSeek', 
    plans: [{id:'pro', name:'Pro', price:15}, {id:'team', name:'Team', price:25}] 
  },
  { 
    id: 'grok', 
    name: 'Grok (xAI)', 
    plans: [{id:'premium', name:'Premium', price:16}, {id:'premium-plus', name:'Premium+', price:32}] 
  },
  { 
    id: 'github-copilot', 
    name: 'GitHub Copilot', 
    plans: [{id:'individual', name:'Individual', price:10}, {id:'business', name:'Business', price:19}, {id:'enterprise', name:'Enterprise', price:39}] 
  },
  { 
    id: 'perplexity', 
    name: 'Perplexity AI', 
    plans: [{id:'pro', name:'Pro', price:20}, {id:'enterprise', name:'Enterprise', price:40}] 
  },
  { 
    id: 'blackbox', 
    name: 'Blackbox AI', 
    plans: [{id:'individual', name:'Individual', price:10}, {id:'team', name:'Team', price:20}] 
  },
  { 
    id: 'midjourney', 
    name: 'Midjourney', 
    plans: [{id:'basic', name:'Basic', price:10}, {id:'standard', name:'Standard', price:30}, {id:'pro', name:'Pro', price:60}] 
  },
  { 
    id: 'stitch', 
    name: 'Stitch AI', 
    plans: [{id:'starter', name:'Starter', price:25}, {id:'pro', name:'Professional', price:50}] 
  },
  { 
    id: 'antigravity', 
    name: 'Antigravity', 
    plans: [{id:'base', name:'Base', price:30}, {id:'enterprise', name:'Enterprise', price:80}] 
  },
  { 
    id: 'codex', 
    name: 'OpenAI Codex', 
    plans: [{id:'api', name:'API Usage (Est)', price:5}] 
  }
];