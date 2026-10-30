# Temporal greeting and retry example

Adapted from Temporal’s official TypeScript Hello World sample.

The Client supplies `Samuel` as its input. The greeting Activity deliberately fails on its first attempt, then succeeds when Temporal retries it.

## Requirements

- Node.js 24: developed using version 24.16.0.
- npm: developed using version 12.0.1.
- Temporal CLI available on PATH: developed using version 1.9.1.

From this `my-app` folder, install the locked dependencies:

```powershell
npm ci
```

## Run

Use three terminals. Start the server in the first:

```powershell
temporal server start-dev
```

In a second terminal, inside `my-app`, start the Worker:

```powershell
npm start
```

In a third terminal, also inside `my-app`, start a Workflow:

```powershell
npm run workflow
```

Expected Worker output includes:

```text
Greeting attempt 1
Greeting attempt 2
```

An Activity failure warning between those lines is intentional. The Client should eventually print:

```text
Hello, Samuel!
```

Inspect the execution at http://localhost:8233.

The default development server keeps its history in memory. Stopping it clears that history. Stop the Worker and server with Ctrl+C when finished.

## Repeat the Worker-availability experiment

Keep the server running, stop the Worker, then submit a Workflow. The Client should wait. Restart the Worker, and the waiting execution should complete.

## Checks

Run these from `my-app`:

```powershell
npm run build
npm run lint
npm test
npm audit
```

The Activity unit test checks the greeting on attempt 2. The Workflow integration test uses the real Activity, including its deliberate first-attempt failure and subsequent retry.

## Attribution

Based on [Temporal’s TypeScript samples](https://github.com/temporalio/samples-typescript/tree/main/hello-world). The upstream MIT licence is included in [LICENSE](LICENSE).