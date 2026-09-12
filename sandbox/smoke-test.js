// Confirms the SDK + API key work before Day 1 starts.
// Run: npm install && npm run smoke

import 'dotenv/config';
import Anthropic from '@anthropic-ai/sdk';

if (!process.env.ANTHROPIC_API_KEY) {
  console.error('ANTHROPIC_API_KEY is not set. Put it in sandbox/.env (see .env.example).');
  process.exit(1);
}

const client = new Anthropic();

const message = await client.messages.create({
  model: 'claude-sonnet-4-5',
  max_tokens: 64,
  messages: [{ role: 'user', content: 'Reply with exactly: sandbox ready' }],
});

console.log('stop_reason:', message.stop_reason);
console.log('reply:', message.content[0].text);
