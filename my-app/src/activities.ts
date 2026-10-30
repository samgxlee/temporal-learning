import { activityInfo } from '@temporalio/activity';

export async function greet(name: string): Promise<string> {
  const attempt = activityInfo().attempt;
  console.log(`Greeting attempt ${attempt}`);

  if (attempt === 1) {
    throw new Error('Simulated temporary failure');
  }

  return `Hello, ${name}!`;
}