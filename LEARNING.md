# Learning notes

## 30 October 2026 — Running my first Temporal Workflow

### What I did

I followed Temporal’s official TypeScript quickstart, set up the local service and ran the Hello World example. Before running it, I worked through the Activity, Workflow, Worker and Client files with guidance from Codex.

I changed the Client’s input from `Temporal` to `Samuel`. The execution returned `Hello, Samuel!`, and I checked the input, result and completion events in Temporal’s web interface.

### What I learned

The different parts made more sense once I could connect the code to a working example:

- The **Client** requests a Workflow execution and supplies its input.
- The **Workflow** defines the process.
- An **Activity** performs an individual task.
- The **Worker** runs the Workflow and Activity code.
- The **Temporal service** coordinates the work and records its history.

A useful distinction was where to put my name. Changing the Workflow to always greet Samuel would fix its behaviour to one person. Passing the name through the Client keeps the same Workflow usable with different inputs.

### How I checked it

The terminal printed `Hello, Samuel!`. In the web interface, I confirmed that the input was `Samuel`, the Activity completed and the Workflow returned the expected result.

This was a successful execution. It hasn’t yet shown me what happens when something fails.

### What I want to understand next

What happens if the Worker stops before a Workflow finishes? I want to test that and compare what I observe with Temporal’s explanation of recovery.

### Sources and assistance

- [Temporal’s TypeScript quickstart](https://docs.temporal.io/develop/typescript/set-up-your-local-typescript)
- The example code is provided by Temporal. I performed this walkthrough myself, with Codex explaining the steps and helping me interpret the output.

## 30 October 2026 — Work waiting for an available Worker

### Experiment

I stopped the Worker while leaving the Temporal service running, then submitted another Workflow through the Client.

The Client printed a Workflow ID but waited for the greeting. In Temporal’s interface, the execution showed as Running. When I restarted the Worker, the Client received `Hello, Samuel!` without another submission.

### What this demonstrated

Temporal accepted the request while the Worker was unavailable. The work waited until the Worker returned.

“Running” describes an execution that hasn’t finished; it doesn’t necessarily mean application code is executing at that moment.

This tested Worker unavailability before execution. It did not test interrupting an Activity halfway through its work.

## 30 October 2026 — Retrying a temporary Activity failure

### Experiment

With guidance and example code from Codex, I changed the greeting Activity to print its attempt number and deliberately throw an error on attempt 1. I saved the change, restarted the Worker and submitted a new Workflow.

The Worker printed `Greeting attempt 1`, reported the simulated failure, then printed `Greeting attempt 2`. The Client received `Hello, Samuel!`.

### What this demonstrated

I submitted the Workflow once. Temporal retried the failed Activity within that same execution, without a retry loop in my application code.

For the planned demo-submission app, a temporary failure could occur when sending a notification. This experiment demonstrated retry behaviour using a simulated failure; it did not contact a real notification service.

A retry also means an action may be attempted more than once. When building the app, I’ll need to consider how to avoid duplicate notifications or other repeated effects.