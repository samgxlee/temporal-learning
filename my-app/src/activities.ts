import { activityInfo } from '@temporalio/activity';

export async function greet(name: string): Promise<string> {
  const attempt = activityInfo().attempt;
  console.log(`Greeting attempt ${attempt}`);

  if (attempt === 1) {
    throw new Error('Simulated temporary failure');
  }

  return `Hello, ${name}!`;
}

export async function recordSubmission(name: string): Promise<string> {
  const submissionId = `demo-${name}`;
  console.log(`[recovery] Simulated submission recorded: ${submissionId}`);
  return submissionId;
}

export async function sendReminder(submissionId: string): Promise<string> {
  const message = `Simulated reminder sent for ${submissionId}`;
  console.log(`[recovery] ${message}`);
  return message;
}
