import { Connection, Client } from '@temporalio/client';
import { loadClientConnectConfig } from '@temporalio/envconfig';
import { recoveryExample } from './workflows';
import { nanoid } from 'nanoid';

async function run() {
  const config = loadClientConnectConfig();
  const connection = await Connection.connect(config.connectionOptions);

  try {
    const client = new Client({ connection });

    const handle = await client.workflow.start(recoveryExample, {
      taskQueue: 'hello-world',
      args: ['Samuel'],
      workflowId: 'recovery-' + nanoid(),
    });

    console.log(`Started recovery Workflow ${handle.workflowId}`);
    console.log(await handle.result());
  } finally {
    await connection.close();
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
