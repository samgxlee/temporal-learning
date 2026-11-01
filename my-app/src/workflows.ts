import { proxyActivities, sleep } from '@temporalio/workflow';
import type * as activities from './activities';

const { greet, recordSubmission, sendReminder } = proxyActivities<typeof activities>({
  startToCloseTimeout: '1 minute',
});

/** The original greeting example. */
export async function example(name: string): Promise<string> {
  return await greet(name);
}

/** Complete one step, wait, then complete another step. */
export async function recoveryExample(name: string): Promise<string> {
  const submissionId = await recordSubmission(name);

  await sleep('5 minutes');

  return await sendReminder(submissionId);
}
