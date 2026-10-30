import { MockActivityEnvironment } from '@temporalio/testing';
import { describe, it } from 'mocha';
import * as activities from '../activities';
import assert from 'assert';

describe('greet activity', () => {
  it('returns the greeting on a retry attempt', async () => {
    const env = new MockActivityEnvironment({ attempt: 2 });
    const result = await env.run(activities.greet, 'Samuel');
    assert.equal(result, 'Hello, Samuel!');
  });
});
